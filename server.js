import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import os from 'os';
import pg from 'pg';
import { handleSendEmailRequest } from './server/sendEmail.mjs';
import { handleCreateOrderRequest, handleVerifyPaymentRequest, handleRazorpayWebhook } from './server/razorpay.mjs';
import { handleCompleteEnrollmentRequest } from './server/enrollmentWorkflow.mjs';
import { handleDownloadInvoiceRequest } from './server/invoiceHandler.mjs';
import { handleVerifyEnrollmentAccessRequest } from './server/verifyEnrollmentAccess.mjs';
import { getRazorpayMode } from './server/razorpayConfig.mjs';
import { guardApiRequest } from './server/security.mjs';

// Load environment variables
dotenv.config();

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:5173',
  process.env.PORTAL_URL,
  process.env.VITE_APP_URL,
  'https://www.zyvotrix.com',
  'https://zyvotrix.com',
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed'));
      }
    },
  }),
);

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

function applyApiGuard(req, res, rateKey, maxRequests) {
  const guard = guardApiRequest(req, { rateKey, maxRequests });
  if (guard) {
    res.status(guard.status).json(guard.body);
    return false;
  }
  return true;
}

// Razorpay webhook — must use raw body (before express.json())
app.post('/api/razorpay-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const result = await handleRazorpayWebhook({
    rawBody: req.body?.toString?.() ?? '',
    signature: typeof signature === 'string' ? signature : undefined,
  });
  res.status(result.status).json(result.body);
});

app.use(express.json());

// Database configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'way2upskill_db',
  user: process.env.DB_USER || os.userInfo().username,
  password: process.env.DB_PASSWORD || '',
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

// Helper function to execute queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production') {
      console.log('📊 Query executed:', { duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('❌ Query error:', error);
    throw error;
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const result = await query('SELECT * FROM courses WHERE is_active = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get all instructors
app.get('/api/instructors', async (req, res) => {
  try {
    const result = await query('SELECT * FROM instructors WHERE is_active = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: 'Failed to fetch instructors' });
  }
});

// Create user (signup) — disabled in production; use Supabase Auth
app.post('/api/users', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(410).json({ error: 'Endpoint removed. Use Supabase Auth.' });
  }
  return createUserHandler(req, res);
});

async function createUserHandler(req, res) {
  try {
    const { firstName, lastName, email, phone, username, passwordHash, interestedSubject } = req.body;
    
    const result = await query(
      `INSERT INTO users (first_name, last_name, email, phone, username, password_hash, interested_subject)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [firstName, lastName, email, phone, username, passwordHash, interestedSubject]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === '23505') { // Unique constraint violation
      res.status(400).json({ error: 'User with this email already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
}

// Get user by email — disabled in production
app.get('/api/users/email/:email', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(410).json({ error: 'Endpoint removed.' });
  }
  return getUserByEmailHandler(req, res);
});

async function getUserByEmailHandler(req, res) {
  try {
    const { email } = req.params;
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const { password_hash: _passwordHash, ...safeUser } = result.rows[0];
      res.json(safeUser);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

// Create enrollment — disabled; enrollments require verified payment via /api/complete-enrollment
app.post('/api/enrollments', (req, res) => {
  return res.status(410).json({ error: 'Use /api/complete-enrollment after verified payment.' });
});

// Create contact message
app.post('/api/contacts', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    
    const result = await query(
      `INSERT INTO contacts (first_name, last_name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [firstName, lastName, email, phone, subject, message]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact message' });
  }
});

// Resend transactional email (local dev — production uses /api/send-email on Vercel)
app.post('/api/send-email', async (req, res) => {
  if (!applyApiGuard(req, res, 'send-email', 10)) return;
  const result = await handleSendEmailRequest(req.body);
  res.status(result.status).json(result.body);
});

// Razorpay — create order (local dev — production uses /api/create-order on Vercel)
app.post('/api/create-order', async (req, res) => {
  if (!applyApiGuard(req, res, 'create-order', 15)) return;
  const result = await handleCreateOrderRequest(req.body);
  res.status(result.status).json(result.body);
});

// Razorpay — verify payment signature
app.post('/api/verify-payment', async (req, res) => {
  if (!applyApiGuard(req, res, 'verify-payment', 20)) return;
  const result = await handleVerifyPaymentRequest(req.body);
  res.status(result.status).json(result.body);
});

// Post-payment enrollment workflow (verify + enroll + email + admin notify)
app.post('/api/complete-enrollment', async (req, res) => {
  if (!applyApiGuard(req, res, 'complete-enrollment', 10)) return;
  const result = await handleCompleteEnrollmentRequest(req.body);
  res.status(result.status).json(result.body);
});

// Verify paid enrollment access (guest learning portal)
app.post('/api/verify-enrollment-access', async (req, res) => {
  if (!applyApiGuard(req, res, 'verify-enrollment-access', 30)) return;
  const result = await handleVerifyEnrollmentAccessRequest(req.body);
  res.status(result.status).json(result.body);
});

// Learner invoice PDF download
app.get('/api/download-invoice', async (req, res) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const enrollmentId = typeof req.query.enrollmentId === 'string' ? req.query.enrollmentId : '';

  const result = await handleDownloadInvoiceRequest({ accessToken, enrollmentId });

  if (result.pdf) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    return res.status(200).send(result.pdf);
  }

  return res.status(result.status).json(result.body);
});

// Admin endpoints — require API key in production
function requireAdminKey(req, res, next) {
  const configuredKey = process.env.ADMIN_API_KEY;
  if (!configuredKey) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({ error: 'Admin API is disabled' });
    }
    return next();
  }

  const provided = req.headers['x-admin-key'];
  if (provided !== configuredKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return next();
}

// Get all users (for admin dashboard)
app.get('/api/admin/users', requireAdminKey, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, first_name, last_name, email, phone, interested_subject, 
        created_at, updated_at
      FROM users 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get all enrollments (for admin dashboard)
app.get('/api/admin/enrollments', requireAdminKey, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        e.id, e.user_id, e.course_id, e.payment_plan, e.created_at,
        u.first_name || ' ' || u.last_name as user_name, u.email as user_email,
        c.title as course_name, c.price as amount,
        'pending' as status
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ message: 'Error fetching enrollments', error: error.message });
  }
});

// Get user's courses and progress (for user landing page)
app.get('/api/users/:userId/courses', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // First check if user exists
    const userCheck = await query('SELECT id FROM users WHERE id = $1', [userId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const result = await query(`
      SELECT 
        e.id, e.course_id, e.status, e.created_at as enrollment_date,
        c.title as course_name, c.duration, c.price,
        'Mohammad Shafaque Arif' as instructor
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1
      ORDER BY e.created_at DESC
    `, [userId]);
    
    // If no enrollments found, return empty array
    if (result.rows.length === 0) {
      return res.json([]);
    }
    
    // Add mock progress data for enrolled courses
    const coursesWithProgress = result.rows.map(course => ({
      ...course,
      progress: Math.floor(Math.random() * 100), // Mock progress
      next_lesson: `Lesson ${Math.floor(Math.random() * 20) + 1}`,
      total_lessons: Math.floor(Math.random() * 50) + 20,
      completed_lessons: Math.floor(Math.random() * 30) + 5
    }));
    
    res.json(coursesWithProgress);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ message: 'Error fetching user courses', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  const razorpayMode = getRazorpayMode();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`💳 Razorpay mode: ${razorpayMode.toUpperCase()} (local dev uses test keys)`);
});

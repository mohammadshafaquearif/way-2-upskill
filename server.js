import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import os from 'os';
import pg from 'pg';
import { handleSendEmailRequest } from './server/sendEmail.mjs';

// Load environment variables
dotenv.config();

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
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
    console.log('📊 Query executed:', { text, duration, rows: res.rowCount });
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

// Create user (signup)
app.post('/api/users', async (req, res) => {
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
});

// Get user by email
app.get('/api/users/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create enrollment (from checkout)
app.post('/api/enrollments', async (req, res) => {
  try {
    const { userId, courseId, paymentPlan, amount, status } = req.body;

    // Get user details from users table
    const userResult = await query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult.rows[0];

    const result = await query(
      `INSERT INTO enrollments (
        user_id, course_id, payment_plan, status, created_at
      ) VALUES ($1, $2, $3, $4, NOW())
      RETURNING *`,
      [userId, courseId, paymentPlan, status || 'completed']
    );
    
    console.log('✅ Enrollment created:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error creating enrollment:', error);
    res.status(500).json({ error: 'Failed to create enrollment', details: error.message });
  }
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
  const result = await handleSendEmailRequest(req.body);
  res.status(result.status).json(result.body);
});

// Admin endpoints
// Get all users (for admin dashboard)
app.get('/api/admin/users', async (req, res) => {
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
app.get('/api/admin/enrollments', async (req, res) => {
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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});

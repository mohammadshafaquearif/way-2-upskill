import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { isAllowedOrigin, isValidEmail } from './security.mjs';

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const SUPER_ADMIN_EMAIL = 'admin@zyvotrix.com';

/** Dev fallback when Supabase table is not migrated yet */
const memoryStore = new Map();

function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) return null;
  return createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function generateToken() {
  return crypto.randomBytes(18).toString('base64url');
}

function expiresAt() {
  return new Date(Date.now() + TOKEN_TTL_MS).toISOString();
}

function isExpired(record) {
  return new Date(record.expires_at).getTime() <= Date.now();
}

async function verifySalesAdmin(admin, accessToken) {
  if (!accessToken) {
    return { ok: false, status: 401, error: 'Authentication required' };
  }

  const { data: authData, error: authError } = await admin.auth.getUser(accessToken);
  if (authError || !authData?.user?.email) {
    return { ok: false, status: 401, error: 'Invalid or expired session' };
  }

  const email = authData.user.email.toLowerCase();
  if (email === SUPER_ADMIN_EMAIL) {
    return { ok: true, email };
  }

  const { data: row } = await admin
    .from('admin_access')
    .select('permissions, is_active')
    .ilike('email', email)
    .maybeSingle();

  const permissions = row?.permissions ?? [];
  if (!row?.is_active || !permissions.includes('sales_report')) {
    return { ok: false, status: 403, error: 'Sales report permission required' };
  }

  return { ok: true, email };
}

async function insertToken(admin, record) {
  if (admin) {
    const { error } = await admin.from('checkout_payment_tokens').insert(record);
    if (!error) return { ok: true };

    const missingTable =
      error.code === '42P01' ||
      error.message?.includes('checkout_payment_tokens') ||
      error.message?.includes('does not exist');

    if (!missingTable) {
      return { ok: false, error: error.message || 'Failed to store checkout link' };
    }
  }

  memoryStore.set(record.token, record);
  return { ok: true, fallback: true };
}

async function fetchToken(admin, token) {
  if (admin) {
    const { data, error } = await admin
      .from('checkout_payment_tokens')
      .select('token, course_slug, email, phone, learner_name, expires_at, used_at')
      .eq('token', token)
      .maybeSingle();

    if (!error && data) return data;

    const missingTable =
      error?.code === '42P01' ||
      error?.message?.includes('checkout_payment_tokens') ||
      error?.message?.includes('does not exist');

    if (!missingTable && error) {
      throw new Error(error.message);
    }
  }

  return memoryStore.get(token) ?? null;
}

export async function handleCreateCheckoutLinkRequest({ body = {}, accessToken } = {}) {
  const courseSlug = String(body.courseSlug || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim() || null;
  const learnerName = String(body.learnerName || body.name || '').trim() || null;

  if (!courseSlug) {
    return { status: 400, body: { error: 'courseSlug is required' } };
  }

  if (!isValidEmail(email)) {
    return { status: 400, body: { error: 'A valid email is required' } };
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return { status: 500, body: { error: 'Server configuration missing' } };
  }

  const auth = await verifySalesAdmin(admin, accessToken);
  if (!auth.ok) {
    return { status: auth.status, body: { error: auth.error } };
  }

  const token = generateToken();
  const record = {
    token,
    course_slug: courseSlug,
    email,
    phone,
    learner_name: learnerName,
    created_by: auth.email,
    expires_at: expiresAt(),
  };

  const stored = await insertToken(admin, record);
  if (!stored.ok) {
    return { status: 500, body: { error: stored.error } };
  }

  const baseUrl = (() => {
    const requested = String(body.baseUrl || '').trim().replace(/\/$/, '');
    if (requested && isAllowedOrigin(requested)) return requested;
    return (process.env.PORTAL_URL || process.env.VITE_APP_URL || 'https://www.zyvotrix.com').replace(
      /\/$/,
      '',
    );
  })();
  const checkoutPath = `/checkout/${courseSlug}`;

  return {
    status: 200,
    body: {
      token,
      url: `${baseUrl}${checkoutPath}?t=${token}`,
      expires_at: record.expires_at,
      storage: stored.fallback ? 'memory' : 'database',
    },
  };
}

export async function handleResolveCheckoutLinkRequest({ token } = {}) {
  const value = String(token || '').trim();
  if (!value) {
    return { status: 400, body: { error: 'Token is required' } };
  }

  const admin = getSupabaseAdmin();
  let record;

  try {
    record = await fetchToken(admin, value);
  } catch (error) {
    return {
      status: 500,
      body: { error: error instanceof Error ? error.message : 'Failed to resolve link' },
    };
  }

  if (!record) {
    return { status: 404, body: { error: 'Checkout link not found or expired' } };
  }

  if (isExpired(record)) {
    return { status: 410, body: { error: 'Checkout link has expired' } };
  }

  return {
    status: 200,
    body: {
      courseSlug: record.course_slug,
      email: record.email,
      phone: record.phone || '',
      name: record.learner_name || '',
      autoPay: true,
    },
  };
}

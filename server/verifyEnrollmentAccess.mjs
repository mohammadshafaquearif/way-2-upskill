import { createClient } from '@supabase/supabase-js';
import { normalizeProgramCode } from './coursePricing.mjs';

function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) return null;

  return createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function slugToProgramCode(slug) {
  return normalizeProgramCode(String(slug || '').toLowerCase());
}

export async function handleVerifyEnrollmentAccessRequest(body = {}) {
  const email = String(body.email ?? '').trim().toLowerCase();
  const paymentId = String(body.paymentId ?? '').trim();
  const programSlug = String(body.programSlug ?? body.programCode ?? '').trim();

  if (!email || !paymentId || !programSlug) {
    return { status: 400, body: { error: 'email, paymentId, and programSlug are required' } };
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return { status: 503, body: { error: 'Enrollment verification unavailable' } };
  }

  const expectedCode = slugToProgramCode(programSlug);

  const { data, error } = await admin
    .from('enrollments')
    .select('id, status, payment_status, razorpay_payment_id, courses ( code )')
    .eq('email', email)
    .eq('razorpay_payment_id', paymentId)
    .maybeSingle();

  if (error || !data) {
    return { status: 200, body: { hasAccess: false } };
  }

  const courseCode = normalizeProgramCode(data.courses?.code);
  const hasAccess =
    String(data.payment_status).toLowerCase() === 'completed' &&
    String(data.status).toLowerCase() === 'active' &&
    courseCode === expectedCode;

  return { status: 200, body: { hasAccess } };
}

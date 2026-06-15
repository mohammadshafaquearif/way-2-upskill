import { createClient } from '@supabase/supabase-js';
import { enrollmentGrantsAccess } from './enrollmentAccess.mjs';
import { generateEnrollmentInvoicePdf } from './invoicePdf.mjs';

function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) return null;
  return createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function inferCurrency(country) {
  const value = String(country ?? '').toLowerCase();
  if (!value || value.includes('india') || value === 'in') return 'INR';
  return 'USD';
}

function programCodeFromEnrollment(enrollment) {
  const course = enrollment.courses;
  if (course?.code) return String(course.code).toUpperCase();
  const title = course?.title || '';
  if (title.toLowerCase().includes('devops')) return 'DOP';
  if (title.toLowerCase().includes('agentic') || title.toLowerCase().includes('ai')) return 'AAC';
  if (title.toLowerCase().includes('aws')) return 'AWS';
  if (title.toLowerCase().includes('data')) return 'DSP';
  return 'GEN';
}

function invoiceNumberFor(enrollment) {
  if (enrollment.enrollment_number) return enrollment.enrollment_number;
  const shortId = String(enrollment.id || '').slice(0, 8).toUpperCase();
  return `ZYV-INV-${shortId}`;
}

export async function handleDownloadInvoiceRequest({ accessToken, enrollmentId }) {
  if (!accessToken) {
    return { status: 401, body: { error: 'Authentication required' } };
  }

  if (!enrollmentId) {
    return { status: 400, body: { error: 'enrollmentId is required' } };
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return { status: 500, body: { error: 'Server configuration missing' } };
  }

  const { data: authData, error: authError } = await admin.auth.getUser(accessToken);
  if (authError || !authData?.user) {
    return { status: 401, body: { error: 'Invalid or expired session' } };
  }

  const { data: enrollment, error: enrollmentError } = await admin
    .from('enrollments')
    .select(`
      id, user_id, email, first_name, last_name, country, status, payment_status,
      enrollment_number, razorpay_payment_id, razorpay_order_id,
      total_amount, paid_amount, created_at, enrollment_date,
      courses ( title, code )
    `)
    .eq('id', enrollmentId)
    .eq('user_id', authData.user.id)
    .maybeSingle();

  if (enrollmentError) {
    return { status: 500, body: { error: enrollmentError.message } };
  }

  if (!enrollment) {
    return { status: 404, body: { error: 'Enrollment not found' } };
  }

  if (!enrollmentGrantsAccess(enrollment.status)) {
    return { status: 403, body: { error: 'Invoice not available for cancelled enrollment' } };
  }

  const hasPayment =
    enrollment.payment_status === 'completed' ||
    Boolean(enrollment.razorpay_payment_id) ||
    Number(enrollment.paid_amount) > 0;

  if (!hasPayment) {
    return { status: 403, body: { error: 'No completed payment found for this enrollment' } };
  }

  const invoiceNumber = invoiceNumberFor(enrollment);
  const amount = Number(enrollment.paid_amount ?? enrollment.total_amount ?? 0);
  const currency = inferCurrency(enrollment.country);
  const invoiceDate = new Date(enrollment.enrollment_date || enrollment.created_at).toLocaleDateString(
    'en-IN',
    { day: '2-digit', month: 'short', year: 'numeric' },
  );

  const learnerName =
    `${enrollment.first_name ?? ''} ${enrollment.last_name ?? ''}`.trim() ||
    authData.user.user_metadata?.first_name ||
    'Learner';
  const learnerEmail = enrollment.email || authData.user.email || '';
  const programCode = programCodeFromEnrollment(enrollment);
  const courseTitle = enrollment.courses?.title || 'Zyvotrix Program';

  try {
    const pdfBytes = await generateEnrollmentInvoicePdf({
      invoiceNumber,
      invoiceDate,
      learnerName,
      learnerEmail,
      courseTitle,
      programCode,
      amount,
      currency,
      paymentId: enrollment.razorpay_payment_id,
      orderId: enrollment.razorpay_order_id,
      country: enrollment.country,
    });

    return {
      status: 200,
      pdf: Buffer.from(pdfBytes),
      filename: `Zyvotrix-Invoice-${invoiceNumber}.pdf`,
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: error instanceof Error ? error.message : 'Failed to generate invoice' },
    };
  }
}

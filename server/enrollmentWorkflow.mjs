import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { handleVerifyPaymentRequest, verifyPaymentWithRazorpay } from './razorpay.mjs';
import { sendTransactionalEmail } from './sendEmail.mjs';
import {
  buildAdminEnrollmentHtml,
  buildWelcomeEnrollmentHtml,
} from './enrollmentEmails.mjs';
import { formatMoney } from './formatMoney.mjs';
import { generateEnrollmentInvoicePdf } from './invoicePdf.mjs';
import { getExpectedOrderAmount } from './coursePricing.mjs';

function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    return null;
  }

  return createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function splitName(fullName, email) {
  const trimmed = String(fullName ?? '').trim();
  if (!trimmed) {
    const local = email.split('@')[0] || 'Learner';
    return { firstName: local, lastName: '' };
  }

  const parts = trimmed.split(/\s+/);
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function generatePassword() {
  return crypto.randomBytes(9).toString('base64url');
}

export async function generateEnrollmentNumber(programCode) {
  const code = String(programCode || 'GEN').toUpperCase();
  const year = new Date().getFullYear();
  const prefix = `ZYV-${code}-${year}-`;

  const admin = getSupabaseAdmin();
  if (admin) {
    const { data } = await admin
      .from('enrollments')
      .select('enrollment_number')
      .like('enrollment_number', `${prefix}%`)
      .order('created_at', { ascending: false })
      .limit(1);

    let next = 1;
    if (data?.[0]?.enrollment_number) {
      const match = data[0].enrollment_number.match(/-(\d+)$/);
      if (match) next = Number(match[1]) + 1;
    }

    return `${prefix}${String(next).padStart(3, '0')}`;
  }

  const fallback = String(Math.floor(Math.random() * 900) + 100);
  return `${prefix}${fallback}`;
}

function getCommunityLinks() {
  return {
    discord: process.env.VITE_COMMUNITY_DISCORD || process.env.COMMUNITY_DISCORD || '',
    whatsapp: process.env.VITE_COMMUNITY_WHATSAPP || process.env.COMMUNITY_WHATSAPP || '',
    telegram: process.env.VITE_COMMUNITY_TELEGRAM || process.env.COMMUNITY_TELEGRAM || '',
  };
}

function getPortalBaseUrl() {
  return process.env.PORTAL_URL || process.env.VITE_APP_URL || 'https://www.zyvotrix.com';
}

async function upsertLeadStatus(admin, email) {
  const normalized = email.toLowerCase().trim();
  const { data: contacts } = await admin
    .from('contacts')
    .select('id, status')
    .ilike('email', normalized)
    .order('created_at', { ascending: false })
    .limit(1);

  if (contacts?.[0]?.id) {
    await admin.from('contacts').update({ status: 'converted' }).eq('id', contacts[0].id);
  }
}

async function ensureLearnerAccount(admin, { email, firstName, lastName, phone, programCode, country }) {
  const portalBase = getPortalBaseUrl();
  let magicLink = null;
  let isNewAccount = false;
  let userId = null;
  let tempPassword = null;

  const { data: profileRow } = await admin.from('users').select('id').eq('email', email).maybeSingle();

  if (profileRow?.id) {
    userId = profileRow.id;
  } else {
    tempPassword = generatePassword();
    const { data: created, error } = await admin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        phone: phone || '',
      },
    });

    if (error) {
      console.warn('Could not create auth user:', error.message);
    } else if (created.user) {
      isNewAccount = true;
      userId = created.user.id;

      await admin.from('users').upsert(
        {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phone || 'N/A',
          interested_subject: programCode,
          country: country || null,
          learner_status: 'active',
          assigned_program: programCode,
        },
        { onConflict: 'id' },
      );
    }
  }

  if (userId) {
    await admin
      .from('users')
      .update({
        learner_status: 'active',
        assigned_program: programCode,
        country: country || null,
      })
      .eq('id', userId);

    const linkResult = await admin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: `${portalBase}/dashboard` },
    });
    magicLink = linkResult.data?.properties?.action_link ?? null;
  }

  return { userId, magicLink, isNewAccount, tempPassword };
}

async function saveEnrollment(admin, payload) {
  const { data: existing } = await admin
    .from('enrollments')
    .select('id, enrollment_number')
    .eq('razorpay_payment_id', payload.paymentId)
    .maybeSingle();

  if (existing?.id) {
    return existing;
  }

  const row = {
    course_id: payload.courseId,
    user_id: payload.userId || null,
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone: payload.phone || null,
    country: payload.country || null,
    enrollment_number: payload.enrollmentNumber,
    razorpay_payment_id: payload.paymentId,
    razorpay_order_id: payload.orderId,
    payment_plan: payload.paymentPlan || 'full',
    payment_method: `razorpay:${payload.paymentId}`,
    total_amount: payload.amount,
    paid_amount: payload.amount,
    status: 'active',
    payment_status: 'completed',
    enrollment_date: new Date().toISOString(),
  };

  const { data, error } = await admin.from('enrollments').insert(row).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function handleCompleteEnrollmentRequest(body = {}) {
  const verifyResult = await handleVerifyPaymentRequest({
    razorpay_order_id: body.razorpay_order_id,
    razorpay_payment_id: body.razorpay_payment_id,
    razorpay_signature: body.razorpay_signature,
  });

  if (verifyResult.status !== 200 || !verifyResult.body?.verified) {
    return verifyResult;
  }

  const email = String(body.email ?? '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { error: 'Valid email is required' } };
  }

  if (!body.courseId || !body.programCode || !body.courseTitle) {
    return { status: 400, body: { error: 'courseId, programCode, and courseTitle are required' } };
  }

  const countryCode = String(body.countryCode || 'IN').toUpperCase().slice(0, 2);
  const expectedPrice = await getExpectedOrderAmount({
    courseId: body.courseId,
    courseCode: body.programCode,
    country: countryCode,
  });

  if (expectedPrice.error) {
    return { status: 400, body: { error: expectedPrice.error } };
  }

  const amountVerify = await verifyPaymentWithRazorpay({
    orderId: body.razorpay_order_id,
    paymentId: body.razorpay_payment_id,
    expectedAmountMinor: expectedPrice.amountMinor,
    expectedCurrency: expectedPrice.currency,
  });

  if (amountVerify.status !== 200) {
    return amountVerify;
  }

  const verifiedAmount = amountVerify.body.amount;
  const currency = amountVerify.body.currency;

  const { firstName, lastName } = splitName(body.learnerName, email);
  const programCode = String(body.programCode).toUpperCase();
  const enrollmentNumber = await generateEnrollmentNumber(programCode);
  const community = getCommunityLinks();
  const portalBase = getPortalBaseUrl();
  const learnUrl = `${portalBase}/learn/${body.programSlug || body.programCode.toLowerCase()}`;
  const dashboardUrl = `${portalBase}/dashboard`;

  let enrollmentId = null;
  let magicLink = null;
  let isNewAccount = false;
  let tempPassword = null;
  let userId = body.userId || null;

  const admin = getSupabaseAdmin();
  if (admin) {
    try {
      if (!userId) {
        const account = await ensureLearnerAccount(admin, {
          email,
          firstName,
          lastName,
          phone: body.phone,
          programCode,
          country: body.country,
        });
        userId = account.userId;
        magicLink = account.magicLink;
        isNewAccount = account.isNewAccount;
        tempPassword = account.tempPassword;
      } else {
        await admin
          .from('users')
          .update({
            learner_status: 'active',
            assigned_program: programCode,
            country: body.country || null,
          })
          .eq('id', userId);

        const linkResult = await admin.auth.admin.generateLink({
          type: 'magiclink',
          email,
          options: { redirectTo: dashboardUrl },
        });
        magicLink = linkResult.data?.properties?.action_link ?? null;
      }

      const enrollment = await saveEnrollment(admin, {
        courseId: body.courseId,
        userId,
        firstName,
        lastName,
        email,
        phone: body.phone,
        country: body.country,
        enrollmentNumber,
        paymentId: body.razorpay_payment_id,
        orderId: body.razorpay_order_id,
        paymentPlan: body.paymentPlan,
        amount: verifiedAmount / 100,
      });

      enrollmentId = enrollment.id;
      await upsertLeadStatus(admin, email);
    } catch (error) {
      console.error('Enrollment workflow DB error:', error);
      return {
        status: 500,
        body: {
          error: 'Failed to save enrollment',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  const amountPaidLabel = formatMoney(verifiedAmount / 100, currency);
  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const welcomeHtml = buildWelcomeEnrollmentHtml({
    firstName,
    courseTitle: body.courseTitle,
    programCode,
    duration: body.duration || '—',
    enrollmentNumber,
    portalUrl: learnUrl,
    dashboardUrl,
    magicLink,
    communityDiscord: community.discord,
    communityWhatsapp: community.whatsapp,
    amountPaid: amountPaidLabel,
    currency,
  });

  let invoiceAttachment = null;
  try {
    const pdfBytes = await generateEnrollmentInvoicePdf({
      invoiceNumber: enrollmentNumber,
      invoiceDate,
      learnerName: `${firstName} ${lastName}`.trim(),
      learnerEmail: email,
      courseTitle: body.courseTitle,
      programCode,
      amount: verifiedAmount / 100,
      currency,
      paymentId: body.razorpay_payment_id,
      orderId: body.razorpay_order_id,
      country: body.country,
    });

    invoiceAttachment = {
      filename: `Zyvotrix-Invoice-${enrollmentNumber}.pdf`,
      content: Buffer.from(pdfBytes).toString('base64'),
    };
  } catch (error) {
    console.warn('Invoice PDF generation failed:', error);
  }

  try {
    await sendTransactionalEmail({
      type: 'enrollment',
      to: email,
      subject: `Payment confirmed — ${body.courseTitle} | Zyvotrix`,
      html: welcomeHtml,
      notifyAdmin: false,
      attachments: invoiceAttachment ? [invoiceAttachment] : undefined,
      data: {
        Name: `${firstName} ${lastName}`.trim(),
        firstName,
        Email: email,
        Program: programCode,
        Course: body.courseTitle,
        'Enrollment ID': enrollmentNumber,
        'Amount Paid': amountPaidLabel || '—',
        Currency: currency,
        Country: body.country || 'Not provided',
        Phone: body.phone || 'Not provided',
        subject: `Payment confirmed — ${programCode}`,
      },
    });

    const adminHtml = buildAdminEnrollmentHtml({
      Name: `${firstName} ${lastName}`.trim(),
      Email: email,
      Program: `${body.courseTitle} (${programCode})`,
      'Enrollment ID': enrollmentNumber,
      'Amount Paid': amountPaidLabel || '—',
      Country: body.country || 'Not provided',
      Phone: body.phone || 'Not provided',
      'Payment ID': body.razorpay_payment_id,
      Status: 'Active — Dashboard access granted',
    });

    await sendTransactionalEmail({
      type: 'enrollment',
      to: process.env.ADMIN_EMAIL || 'support@zyvotrix.com',
      subject: `[Enrollment] New paid enrollment — ${programCode}`,
      html: adminHtml,
      notifyAdmin: false,
      data: {
        Name: `${firstName} ${lastName}`.trim(),
        Email: email,
        Program: programCode,
        subject: `New enrollment — ${programCode}`,
      },
    });
  } catch (error) {
    console.warn('Enrollment emails failed:', error);
  }

  return {
    status: 200,
    body: {
      success: true,
      verified: true,
      enrollmentNumber,
      enrollmentId,
      programCode,
      courseTitle: body.courseTitle,
      duration: body.duration || '',
      email,
      learnerName: `${firstName} ${lastName}`.trim(),
      amount: verifiedAmount / 100,
      paymentId: body.razorpay_payment_id,
      currency,
      amountPaidLabel,
      isNewAccount,
      hasServerEnrollment: Boolean(enrollmentId),
      portalUrl: learnUrl,
      dashboardUrl,
      nextSteps: [
        'Check your email for payment confirmation and PDF invoice',
        'Access your learning dashboard — course is now unlocked',
        'Join the learner community',
        'Complete onboarding and attend orientation',
      ],
    },
  };
}

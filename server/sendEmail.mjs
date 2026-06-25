const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@zyvotrix.com';
const FROM_NAME = process.env.FROM_NAME || 'Zyvotrix';
const DEFAULT_FROM_ADDRESS = 'support@zyvotrix.com';
const LEADS_CC_EMAIL = process.env.LEADS_CC_EMAIL || 'paul.stephano@zyvotrix.com';

/** Resend rejects malformed `from` (common when FROM_EMAIL is unquoted in .env). */
function resolveFromEmail() {
  const dedicatedAddress = (process.env.FROM_EMAIL_ADDRESS || '').trim();
  if (dedicatedAddress && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dedicatedAddress)) {
    return `${FROM_NAME} <${dedicatedAddress}>`;
  }

  const raw = (process.env.FROM_EMAIL || '').trim();
  if (!raw) {
    return `${FROM_NAME} <${DEFAULT_FROM_ADDRESS}>`;
  }

  const namedMatch = raw.match(/^(.+?)\s*<([^>\s]+@[^>\s]+\.[^>\s]+)>$/);
  if (namedMatch) {
    return `${namedMatch[1].trim()} <${namedMatch[2]}>`;
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
    return `${FROM_NAME} <${raw}>`;
  }

  console.warn(
    '[send-email] Invalid or truncated FROM_EMAIL env — using default sender.',
    JSON.stringify(raw),
  );
  return `${FROM_NAME} <${DEFAULT_FROM_ADDRESS}>`;
}

const FROM_EMAIL = resolveFromEmail();
export const PAYMENT_ADMIN_EMAIL = process.env.PAYMENT_ADMIN_EMAIL || 'admin@zyvotrix.com';

const DEFAULT_PAYMENT_ADMIN_CC = [
  'paul.stephano@zyvotrix.com',
  'mohd.shafaque@zyvotrix.com',
  'md.taslim@zyvotrix.com',
  'support@zyvotrix.com',
];

export function getPaymentAdminCc(primaryTo) {
  const fromEnv = process.env.PAYMENT_ADMIN_CC;
  const list = fromEnv
    ? fromEnv.split(',').map((email) => email.trim()).filter(Boolean)
    : DEFAULT_PAYMENT_ADMIN_CC;
  const to = String(primaryTo || '').trim().toLowerCase();
  return list.filter((email) => email.trim().toLowerCase() !== to);
}

/** Email types that CC the leads coordinator (single address) */
const CC_EMAIL_TYPES = new Set(['contact', 'enrollment', 'inquiry', 'lead_assignment']);

function leadsCcFor(type, primaryTo) {
  if (!CC_EMAIL_TYPES.has(type)) return undefined;
  const cc = LEADS_CC_EMAIL.trim().toLowerCase();
  const to = String(primaryTo || '').trim().toLowerCase();
  if (!cc || cc === to) return undefined;
  return [LEADS_CC_EMAIL];
}

function resolveCc(type, to, explicitCc) {
  if (explicitCc !== undefined) return explicitCc;
  if (type === 'payment_confirmation') return undefined;
  return leadsCcFor(type, to);
}

const ADMIN_SUBJECT_LABELS = {
  contact: 'Contact Us',
  enrollment: 'Enrollment',
  inquiry: 'Program Inquiry',
  signup: 'New Sign Up',
  admin_notification: 'Admin Notification',
  payment_confirmation: 'Payment Confirmed',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildContactUserHtml({ firstName, subject }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:560px">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thank you for contacting <strong>Zyvotrix</strong>. We received your message${
        subject ? ` about <strong>${escapeHtml(subject)}</strong>` : ''
      }.</p>
      <p>Our team will get back to you within a few hours.</p>
      <p style="color:#64748b;font-size:14px">— Zyvotrix<br/>admin@zyvotrix.com</p>
    </div>
  `;
}

function buildEnrollmentUserHtml({ firstName, program }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:560px">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thank you for applying to <strong>Zyvotrix</strong>${
        program ? ` for <strong>${escapeHtml(program)}</strong>` : ''
      }.</p>
      <p>Our team will review your application and contact you with next steps.</p>
      <p style="color:#64748b;font-size:14px">— Zyvotrix Admissions<br/>admin@zyvotrix.com</p>
    </div>
  `;
}

function buildSignupUserHtml({ firstName }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:560px">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Welcome to <strong>Zyvotrix</strong> — your account has been created successfully.</p>
      <p>Explore programs, track your learning, and connect with our community from your dashboard.</p>
      <p style="color:#64748b;font-size:14px">— Team Zyvotrix<br/>admin@zyvotrix.com</p>
    </div>
  `;
}

function buildContactAdminHtml(data) {
  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">${escapeHtml(key)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px">
      <h2 style="margin:0 0 12px">New website lead</h2>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
    </div>
  `;
}

function buildLeadAssignmentHtml(data) {
  const skipKeys = new Set(['firstName', 'subject']);
  const rows = Object.entries(data)
    .filter(([key]) => !skipKeys.has(key))
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">${escapeHtml(key)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px">
      <p>Hi ${escapeHtml(data.firstName || 'there')},</p>
      <p>A new contact lead has been <strong>assigned to you</strong>. Please follow up with the lead at your earliest convenience.</p>
      <table style="border-collapse:collapse;width:100%;margin-top:16px">${rows}</table>
      <p style="margin-top:20px;color:#64748b;font-size:14px">— Zyvotrix Admin</p>
    </div>
  `;
}

export async function sendTransactionalEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  const { type, to, subject, data = {} } = payload;
  if (!to || !subject) {
    throw new Error('Missing required email fields');
  }

  let userHtml = payload.html;
  // Admin-only notifications: send a structured lead table, no secondary admin copy.
  if (!userHtml && type === 'admin_notification') {
    userHtml = buildContactAdminHtml(data);
    payload = { ...payload, notifyAdmin: false };
  }
  if (!userHtml && type === 'contact') {
    userHtml = buildContactUserHtml({
      firstName: data.firstName || 'there',
      subject: data.Subject || data.subject,
    });
  } else if (!userHtml && type === 'enrollment') {
    userHtml = buildEnrollmentUserHtml({
      firstName: data.firstName || 'there',
      program: data.Program,
    });
  } else if (!userHtml && type === 'signup') {
    userHtml = buildSignupUserHtml({
      firstName: data.firstName || 'there',
    });
  } else if (!userHtml && type === 'lead_assignment') {
    userHtml = buildLeadAssignmentHtml(data);
  }

  const userResult = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html: userHtml || `<p>${escapeHtml(subject)}</p>`,
    replyTo:
      type === 'lead_assignment' || type === 'payment_confirmation' ? ADMIN_EMAIL : undefined,
    cc: resolveCc(type, to, payload.cc),
    attachments: payload.attachments,
  });

  if (userResult.error) {
    throw new Error(userResult.error.message);
  }

  if (
    payload.notifyAdmin !== false &&
    type !== 'lead_assignment' &&
    type !== 'payment_confirmation' &&
    (type === 'contact' || type === 'enrollment' || type === 'inquiry' || type === 'signup')
  ) {
    const label = ADMIN_SUBJECT_LABELS[type] || type;
    const adminSubject = `[${label}] ${data.subject || subject}`;
    const adminResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: adminSubject,
      html: buildContactAdminHtml(data),
      cc: leadsCcFor(type, ADMIN_EMAIL),
    });

    if (adminResult.error) {
      throw new Error(adminResult.error.message);
    }
  }

  return { success: true };
}

const ALLOWED_EMAIL_TYPES = new Set([
  'contact',
  'enrollment',
  'inquiry',
  'signup',
  'admin_notification',
  'lead_assignment',
  'payment_confirmation',
]);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

export async function handleSendEmailRequest(body) {
  const { type, to, subject, data, notifyAdmin, cc } = body || {};

  if (!type || !to || !subject) {
    return { status: 400, body: { error: 'type, to, and subject are required' } };
  }

  if (!ALLOWED_EMAIL_TYPES.has(type)) {
    return { status: 400, body: { error: 'Invalid email type' } };
  }

  if (!isValidEmail(to)) {
    return { status: 400, body: { error: 'Valid recipient email is required' } };
  }

  if (body?.html) {
    return { status: 400, body: { error: 'Custom HTML is not allowed' } };
  }

  if (subject.length > 200) {
    return { status: 400, body: { error: 'Subject too long' } };
  }

  try {
    await sendTransactionalEmail({ type, to, subject, data, notifyAdmin, cc });
    return { status: 200, body: { success: true } };
  } catch (error) {
    console.error('[send-email]', error);
    return { status: 500, body: { error: 'Failed to send email' } };
  }
}

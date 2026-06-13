const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'support@zyvotrix.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Zyvotrix <onboarding@resend.dev>';

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
      <p style="color:#64748b;font-size:14px">— Zyvotrix Support<br/>support@zyvotrix.com</p>
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
  if (!userHtml && type === 'contact') {
    userHtml = buildContactUserHtml({
      firstName: data.firstName || 'there',
      subject: data.subject,
    });
  }

  const userResult = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html: userHtml || `<p>${escapeHtml(subject)}</p>`,
  });

  if (userResult.error) {
    throw new Error(userResult.error.message);
  }

  if (type === 'contact' || type === 'enrollment' || type === 'inquiry') {
    const adminSubject = `[${type.toUpperCase()}] ${data.subject || subject}`;
    const adminResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: adminSubject,
      html: buildContactAdminHtml(data),
    });

    if (adminResult.error) {
      throw new Error(adminResult.error.message);
    }
  }

  return { success: true };
}

export async function handleSendEmailRequest(body) {
  const { type, to, subject, html, data } = body || {};

  if (!type || !to || !subject) {
    return { status: 400, body: { error: 'type, to, and subject are required' } };
  }

  try {
    await sendTransactionalEmail({ type, to, subject, html, data });
    return { status: 200, body: { success: true } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email';
    return { status: 500, body: { error: message } };
  }
}

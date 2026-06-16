function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildWelcomeEnrollmentHtml({
  firstName,
  courseTitle,
  programCode,
  duration,
  enrollmentNumber,
  portalUrl,
  dashboardUrl,
  magicLink,
  communityDiscord,
  communityWhatsapp,
  amountPaid,
  currency,
}) {
  const loginBlock = magicLink
    ? `<p><a href="${escapeHtml(magicLink)}" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Access Your Dashboard</a></p>
       <p style="font-size:13px;color:#64748b">This secure login link expires in 24 hours. You can also sign in anytime at <a href="${escapeHtml(dashboardUrl || portalUrl)}">${escapeHtml(dashboardUrl || portalUrl)}</a></p>`
    : `<p><a href="${escapeHtml(dashboardUrl || portalUrl)}" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Access Your Dashboard</a></p>`;

  const communityBlock = [communityDiscord, communityWhatsapp]
    .filter(Boolean)
    .map(
      (link, index) =>
        `<li><a href="${escapeHtml(link)}">${index === 0 && communityDiscord ? 'Join Discord Community' : 'Join WhatsApp Community'}</a></li>`,
    )
    .join('');

  const amountRow = amountPaid
    ? `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Amount Paid</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;color:#16a34a">${escapeHtml(amountPaid)}</td></tr>`
    : '';

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#0f172a;max-width:600px">
      <h1 style="color:#6366f1;margin:0 0 16px">Payment confirmed — Welcome to Zyvotrix 🎉</h1>
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thank you for your payment. Your enrollment for <strong>${escapeHtml(courseTitle)}</strong> is now <strong style="color:#16a34a">active</strong>.</p>
      <p style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;font-size:14px">
        📎 Your PDF invoice is attached to this email for your records.
      </p>
      <table style="border-collapse:collapse;width:100%;margin:16px 0">
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Course</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(courseTitle)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Program</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(programCode)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Duration</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(duration)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Enrollment ID</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-family:monospace">${escapeHtml(enrollmentNumber)}</td></tr>
        ${amountRow}
      </table>
      ${loginBlock}
      <p><strong>Next Steps:</strong></p>
      <ol>
        <li>Open your <strong>Learning Dashboard</strong> — curriculum, sessions &amp; assignments are unlocked</li>
        ${communityBlock || '<li>Join the learner community (link in your portal)</li>'}
        <li>Review the curriculum and attend the orientation session</li>
      </ol>
      <p style="color:#64748b;font-size:14px;margin-top:24px">— Team Zyvotrix<br/>support@zyvotrix.com</p>
    </div>
  `;
}

export function buildAdminEnrollmentHtml(data) {
  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">${escapeHtml(key)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px">
      <h2 style="margin:0 0 12px;color:#16a34a">Payment received — new enrollment</h2>
      <p style="margin:0 0 16px;color:#475569">A learner has completed payment and enrollment is now active.</p>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
    </div>
  `;
}

export function buildWhatsAppMessage({
  firstName,
  programCode,
  enrollmentNumber,
  portalUrl,
  communityWhatsapp,
}) {
  const lines = [
    `Welcome to Zyvotrix 🎉`,
    ``,
    `Hi ${firstName}, your enrollment for ${programCode} is confirmed.`,
    `Enrollment ID: ${enrollmentNumber}`,
    ``,
    `Portal: ${portalUrl}`,
  ];
  if (communityWhatsapp) {
    lines.push(`Community: ${communityWhatsapp}`);
  }
  lines.push(``, `— Team Zyvotrix`);
  return lines.join('\n');
}

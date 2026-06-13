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
  magicLink,
  communityDiscord,
  communityWhatsapp,
}) {
  const loginBlock = magicLink
    ? `<p><a href="${escapeHtml(magicLink)}" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Access Learning Portal</a></p>
       <p style="font-size:13px;color:#64748b">This secure login link expires in 24 hours. You can also sign in anytime at <a href="${escapeHtml(portalUrl)}">${escapeHtml(portalUrl)}</a></p>`
    : `<p>Login: <a href="${escapeHtml(portalUrl)}">${escapeHtml(portalUrl)}</a></p>`;

  const communityBlock = [communityDiscord, communityWhatsapp]
    .filter(Boolean)
    .map(
      (link, index) =>
        `<li><a href="${escapeHtml(link)}">${index === 0 && communityDiscord ? 'Join Discord Community' : 'Join WhatsApp Community'}</a></li>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#0f172a;max-width:600px">
      <h1 style="color:#6366f1;margin:0 0 16px">Welcome to Zyvotrix 🎉</h1>
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Your enrollment for <strong>${escapeHtml(courseTitle)}</strong> has been successfully confirmed.</p>
      <table style="border-collapse:collapse;width:100%;margin:16px 0">
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Program</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(programCode)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Duration</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(duration)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Enrollment ID</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-family:monospace">${escapeHtml(enrollmentNumber)}</td></tr>
      </table>
      ${loginBlock}
      <p><strong>Next Steps:</strong></p>
      <ol>
        <li>Access your Learning Portal and complete onboarding</li>
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
      <h2 style="margin:0 0 12px;color:#16a34a">🎉 New Enrollment — Payment Received</h2>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
      <p style="margin-top:16px;color:#64748b;font-size:14px">Lead status updated: Enrolled</p>
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

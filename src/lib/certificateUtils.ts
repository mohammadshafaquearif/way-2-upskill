import type { AdminCertificate } from '@/lib/adminTypes';

export function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ZYX-${year}-${random}`;
}

export function buildCertificateHtml(cert: AdminCertificate, programName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Certificate — ${cert.student_name}</title>
  <style>
    body { font-family: Georgia, serif; margin: 0; padding: 40px; background: #f8fafc; }
    .cert {
      max-width: 900px; margin: 0 auto; background: #fff; border: 8px solid #1e40af;
      padding: 48px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.08);
    }
    .brand { color: #1e40af; letter-spacing: .2em; font-size: 14px; text-transform: uppercase; }
    h1 { font-size: 42px; margin: 16px 0; color: #0f172a; }
    .name { font-size: 32px; color: #1d4ed8; margin: 24px 0; }
    .meta { color: #475569; line-height: 1.8; }
    .id { margin-top: 32px; font-size: 13px; color: #64748b; }
  </style>
</head>
<body>
  <div class="cert">
    <div class="brand">Zyvotrix</div>
    <h1>Certificate of Completion</h1>
    <p class="meta">This certifies that</p>
    <div class="name">${cert.student_name}</div>
    <p class="meta">
      has successfully completed<br />
      <strong>${programName}</strong><br />
      on ${new Date(cert.completion_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
    </p>
    <p class="id">Certificate ID: ${cert.certificate_id}</p>
  </div>
  <script>window.onload = () => window.print();</script>
</body>
</html>`;
}

export function downloadCertificatePdf(cert: AdminCertificate, programName: string) {
  const html = buildCertificateHtml(cert, programName);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cert.certificate_id}.html`;
    a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

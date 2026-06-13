export type EmailType = 'contact' | 'enrollment' | 'inquiry' | 'newsletter' | 'resource';

export interface SendEmailPayload {
  type: EmailType;
  to: string;
  subject: string;
  html?: string;
  data?: Record<string, string>;
}

export async function sendEmail(payload: SendEmailPayload): Promise<void> {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || 'Failed to send email');
  }
}

export function buildContactEmailPayload(contact: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type?: EmailType;
}): SendEmailPayload {
  const fullName = `${contact.firstName} ${contact.lastName}`.trim();
  const emailType = contact.type || 'contact';

  return {
    type: emailType,
    to: contact.email,
    subject: contact.subject
      ? `We received your message — ${contact.subject}`
      : 'We received your message — Zyvotrix',
    data: {
      Name: fullName,
      firstName: contact.firstName,
      Email: contact.email,
      Phone: contact.phone || 'Not provided',
      Subject: contact.subject || 'General inquiry',
      Message: contact.message,
      subject: contact.subject || 'General inquiry',
    },
  };
}

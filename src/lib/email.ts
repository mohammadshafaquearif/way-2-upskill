export type EmailType = 'contact' | 'enrollment' | 'inquiry' | 'signup' | 'newsletter' | 'resource';

export interface SendEmailPayload {
  type: EmailType;
  to: string;
  subject: string;
  html?: string;
  data?: Record<string, string>;
}

const EMAIL_TIMEOUT_MS = 8000;

export async function sendEmail(payload: SendEmailPayload): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      throw new Error(body.error || 'Failed to send email');
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Email request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

/** Fire-and-forget — never block form submission on email delivery. */
export function notifyByEmail(payload: SendEmailPayload): void {
  void sendEmail(payload).catch((error) => {
    console.warn('Email notification failed:', error);
  });
}

function formatOptional(value: string | number | undefined | null, fallback = 'Not provided') {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value);
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
  const leadSubject = contact.subject || 'General inquiry';

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
      Phone: formatOptional(contact.phone),
      Subject: leadSubject,
      Message: contact.message,
      subject: leadSubject,
    },
  };
}

export function buildEnrollmentEmailPayload(enrollment: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  courseName?: string;
  paymentPlan?: string;
  paymentMethod?: string;
  totalAmount?: number;
  country?: string;
  education?: string;
  field?: string;
  employmentStatus?: string;
  programmingExperience?: string;
  goals?: string;
  linkedin?: string;
  github?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  status?: string;
}): SendEmailPayload {
  const fullName = `${enrollment.firstName ?? ''} ${enrollment.lastName ?? ''}`.trim() || 'Applicant';
  const program = enrollment.courseName || 'Zyvotrix Program';
  const leadSubject = `Application — ${program}`;

  return {
    type: 'enrollment',
    to: enrollment.email || '',
    subject: `Application received — ${program}`,
    data: {
      firstName: enrollment.firstName || 'there',
      subject: leadSubject,
      Name: fullName,
      Email: formatOptional(enrollment.email),
      Phone: formatOptional(enrollment.phone),
      Program: program,
      'Payment plan': formatOptional(enrollment.paymentPlan),
      'Payment method': formatOptional(enrollment.paymentMethod),
      Amount: enrollment.totalAmount != null ? String(enrollment.totalAmount) : 'Not specified',
      Country: formatOptional(enrollment.country),
      Education: formatOptional(enrollment.education),
      Field: formatOptional(enrollment.field),
      'Employment status': formatOptional(enrollment.employmentStatus),
      'Programming experience': formatOptional(enrollment.programmingExperience),
      Goals: formatOptional(enrollment.goals),
      LinkedIn: formatOptional(enrollment.linkedin),
      GitHub: formatOptional(enrollment.github),
      Address: formatOptional(enrollment.address),
      City: formatOptional(enrollment.city),
      State: formatOptional(enrollment.state),
      ZIP: formatOptional(enrollment.zip),
      Status: formatOptional(enrollment.status, 'pending'),
    },
  };
}

export function buildSignupEmailPayload(params: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interestedSubject: string;
}): SendEmailPayload {
  const fullName = `${params.firstName} ${params.lastName}`.trim();
  const leadSubject = `New account — ${params.interestedSubject}`;

  return {
    type: 'signup',
    to: params.email,
    subject: 'Welcome to Zyvotrix!',
    data: {
      firstName: params.firstName,
      subject: leadSubject,
      Name: fullName,
      Email: params.email,
      Phone: params.phone,
      'Interested in': params.interestedSubject,
    },
  };
}

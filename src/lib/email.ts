export type EmailType =
  | 'contact'
  | 'enrollment'
  | 'inquiry'
  | 'signup'
  | 'admin_notification'
  | 'newsletter'
  | 'resource'
  | 'lead_assignment';

export interface SendEmailPayload {
  type: EmailType;
  to: string;
  subject: string;
  html?: string;
  data?: Record<string, string>;
  /** Server-side: when false, skips secondary admin CC email */
  notifyAdmin?: boolean;
  /** Server-side: optional CC list (validated/filtered server-side) */
  cc?: string[];
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
      throw new Error('Failed to send email');
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

export function buildEnrollmentAdminNotificationPayload(enrollment: {
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
  const leadSubject = `Enrollment — ${program}`;

  return {
    type: 'admin_notification',
    to: 'admin@zyvotrix.com',
    subject: `[Enrollment] ${fullName} — ${program}`,
    notifyAdmin: false,
    data: {
      Name: fullName,
      Email: formatOptional(enrollment.email),
      Phone: formatOptional(enrollment.phone),
      Program: program,
      Subject: leadSubject,
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
      // Never include passwords/secrets in emails.
    },
  };
}

export function buildLeadAssignmentEmailPayload(params: {
  agentEmail: string;
  contact: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    subject?: string | null;
    message: string;
    created_at: string;
  };
  assignedBy?: string | null;
}): SendEmailPayload {
  const leadName = `${params.contact.first_name} ${params.contact.last_name}`.trim();

  return {
    type: 'lead_assignment',
    to: params.agentEmail,
    subject: `Lead assigned to you — ${leadName}`,
    data: {
      firstName: params.agentEmail.split('@')[0] || 'there',
      subject: `Lead assigned — ${leadName}`,
      Name: leadName,
      Email: params.contact.email,
      Phone: formatOptional(params.contact.phone),
      Subject: formatOptional(params.contact.subject, 'General inquiry'),
      Message: params.contact.message,
      'Submitted on': new Date(params.contact.created_at).toLocaleString('en-IN'),
      'Assigned by': formatOptional(params.assignedBy, 'Admin'),
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

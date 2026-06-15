export interface CompleteEnrollmentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  email: string;
  learnerName?: string;
  phone?: string;
  country?: string;
  countryCode?: string;
  courseId: string;
  programCode: string;
  programSlug: string;
  courseTitle: string;
  duration?: string;
  paymentPlan?: string;
  userId?: string;
}

export interface CompleteEnrollmentResult {
  success: boolean;
  verified: boolean;
  enrollmentNumber: string;
  enrollmentId?: string | null;
  programCode: string;
  courseTitle: string;
  duration: string;
  email: string;
  learnerName: string;
  amount?: number;
  amountPaidLabel?: string;
  currency?: string;
  paymentId: string;
  isNewAccount?: boolean;
  hasServerEnrollment?: boolean;
  portalUrl: string;
  dashboardUrl: string;
  nextSteps: string[];
  error?: string;
}

export const ENROLLMENT_SUCCESS_KEY = 'zyvotrix_enrollment_success';

export function saveEnrollmentSuccess(data: CompleteEnrollmentResult): void {
  const safe: CompleteEnrollmentResult = {
    success: data.success,
    verified: data.verified,
    enrollmentNumber: data.enrollmentNumber,
    enrollmentId: data.enrollmentId,
    programCode: data.programCode,
    courseTitle: data.courseTitle,
    duration: data.duration,
    email: data.email,
    learnerName: data.learnerName,
    amount: data.amount,
    amountPaidLabel: data.amountPaidLabel,
    currency: data.currency,
    paymentId: data.paymentId,
    isNewAccount: data.isNewAccount,
    hasServerEnrollment: data.hasServerEnrollment,
    portalUrl: data.portalUrl,
    dashboardUrl: data.dashboardUrl,
    nextSteps: data.nextSteps,
  };
  sessionStorage.setItem(ENROLLMENT_SUCCESS_KEY, JSON.stringify(safe));
}

export function hasVerifiedGuestAccess(programSlug: string): boolean {
  const data = loadEnrollmentSuccess();
  if (!data?.success || !data.hasServerEnrollment || !data.paymentId || !data.email) return false;
  const slug = data.programCode?.toLowerCase().replace(/\s+/g, '-') || '';
  return slug === programSlug.toLowerCase();
}

export async function verifyEnrollmentAccess(params: {
  email: string;
  paymentId: string;
  programSlug: string;
}): Promise<boolean> {
  try {
    const response = await fetch('/api/verify-enrollment-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return Boolean(data.hasAccess);
  } catch {
    return false;
  }
}

export function loadEnrollmentSuccess(): CompleteEnrollmentResult | null {
  try {
    const raw = sessionStorage.getItem(ENROLLMENT_SUCCESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CompleteEnrollmentResult;
  } catch {
    return null;
  }
}

export function clearEnrollmentSuccess(): void {
  sessionStorage.removeItem(ENROLLMENT_SUCCESS_KEY);
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.details || 'Enrollment workflow failed');
  }
  return data as T;
}

export async function completeEnrollment(
  payload: CompleteEnrollmentPayload,
): Promise<CompleteEnrollmentResult> {
  const response = await fetch('/api/complete-enrollment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse<CompleteEnrollmentResult>(response);
}

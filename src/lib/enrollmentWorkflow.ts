export interface CompleteEnrollmentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  email: string;
  learnerName?: string;
  phone?: string;
  country?: string;
  courseId: string;
  programCode: string;
  programSlug: string;
  courseTitle: string;
  duration?: string;
  amount?: number;
  currency?: string;
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
  magicLink?: string | null;
  tempPassword?: string;
  portalUrl: string;
  dashboardUrl: string;
  community: {
    discord: string;
    whatsapp: string;
    telegram: string;
  };
  whatsappNotifyUrl: string;
  nextSteps: string[];
  error?: string;
}

export const ENROLLMENT_SUCCESS_KEY = 'zyvotrix_enrollment_success';

export function saveEnrollmentSuccess(data: CompleteEnrollmentResult): void {
  sessionStorage.setItem(ENROLLMENT_SUCCESS_KEY, JSON.stringify(data));
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

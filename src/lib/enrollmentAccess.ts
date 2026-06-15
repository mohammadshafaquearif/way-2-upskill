/** Enrollment statuses that block LMS / course access */
const REVOKED_ENROLLMENT_STATUSES = new Set(['cancelled', 'canceled']);

const PAID_PAYMENT_STATUSES = new Set(['completed', 'paid']);

const ADMIN_GRANTED_PAYMENT_STATUSES = new Set(['manual', 'waived', 'admin']);

const SOLD_ENROLLMENT_STATUSES = new Set(['active', 'completed']);

export function normalizeEnrollmentStatus(status: string | null | undefined): string {
  return (status ?? 'pending').toLowerCase().trim();
}

export function normalizePaymentStatus(status: string | null | undefined): string {
  return (status ?? 'pending').toLowerCase().trim();
}

export function isEnrollmentCancelled(status: string | null | undefined): boolean {
  return REVOKED_ENROLLMENT_STATUSES.has(normalizeEnrollmentStatus(status));
}

export function isPaymentCompleted(status: string | null | undefined): boolean {
  return PAID_PAYMENT_STATUSES.has(normalizePaymentStatus(status));
}

export function isAdminGrantedPayment(status: string | null | undefined): boolean {
  return ADMIN_GRANTED_PAYMENT_STATUSES.has(normalizePaymentStatus(status));
}

export function hasRazorpayPayment(enrollment: {
  razorpay_payment_id?: string | null;
  payment_status?: string | null;
}): boolean {
  const paymentId = enrollment.razorpay_payment_id?.trim();
  if (!paymentId) return false;
  return isPaymentCompleted(enrollment.payment_status);
}

/** Counts as sold only after verified Razorpay payment (admin enrollments excluded). */
export function enrollmentCountsAsSold(enrollment: {
  status?: string | null;
  razorpay_payment_id?: string | null;
  payment_status?: string | null;
}): boolean {
  if (isEnrollmentCancelled(enrollment.status)) return false;
  if (!SOLD_ENROLLMENT_STATUSES.has(normalizeEnrollmentStatus(enrollment.status))) return false;
  return hasRazorpayPayment(enrollment);
}

export function enrollmentRevenueAmount(enrollment: {
  paid_amount?: number | null;
  total_amount?: number | null;
  amount?: number;
}): number {
  const paid = Number(enrollment.paid_amount);
  if (paid > 0) return paid;
  return Number(enrollment.total_amount ?? enrollment.amount ?? 0);
}

/** Maps admin enrollment status to payment_status (manual = admin grant, not a sale). */
export function paymentStatusForEnrollmentStatus(status: string | null | undefined): string {
  const normalized = normalizeEnrollmentStatus(status);
  if (isEnrollmentCancelled(normalized)) return 'cancelled';
  if (normalized === 'pending') return 'pending';
  return 'manual';
}

export function enrollmentGrantsAccess(
  status: string | null | undefined,
  paymentStatus?: string | null,
): boolean {
  if (isEnrollmentCancelled(status)) return false;
  if (normalizeEnrollmentStatus(status) !== 'active') return false;
  return isPaymentCompleted(paymentStatus) || isAdminGrantedPayment(paymentStatus);
}

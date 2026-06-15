/** Enrollment statuses that block LMS / course access */
const REVOKED_ENROLLMENT_STATUSES = new Set(['cancelled', 'canceled']);

const PAID_PAYMENT_STATUSES = new Set(['completed', 'paid']);

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

/** Counts toward programs sold and net revenue (excludes pending & cancelled/refunded). */
export function enrollmentCountsAsSold(status: string | null | undefined): boolean {
  return SOLD_ENROLLMENT_STATUSES.has(normalizeEnrollmentStatus(status));
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

/** Maps admin enrollment status to payment_status column semantics. */
export function paymentStatusForEnrollmentStatus(status: string | null | undefined): string {
  const normalized = normalizeEnrollmentStatus(status);
  if (isEnrollmentCancelled(normalized)) return 'cancelled';
  if (normalized === 'pending') return 'pending';
  return 'completed';
}

export function enrollmentGrantsAccess(
  status: string | null | undefined,
  paymentStatus?: string | null,
): boolean {
  if (isEnrollmentCancelled(status)) return false;
  if (!isPaymentCompleted(paymentStatus)) return false;
  return normalizeEnrollmentStatus(status) === 'active';
}

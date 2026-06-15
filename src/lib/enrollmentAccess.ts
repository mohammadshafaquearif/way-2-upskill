/** Enrollment statuses that block LMS / course access */
const REVOKED_ENROLLMENT_STATUSES = new Set(['cancelled', 'canceled']);

const PAID_PAYMENT_STATUSES = new Set(['completed', 'paid']);

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

export function enrollmentGrantsAccess(
  status: string | null | undefined,
  paymentStatus?: string | null,
): boolean {
  if (isEnrollmentCancelled(status)) return false;
  if (!isPaymentCompleted(paymentStatus)) return false;
  return normalizeEnrollmentStatus(status) === 'active';
}

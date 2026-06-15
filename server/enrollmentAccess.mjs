const REVOKED = new Set(['cancelled', 'canceled']);
const PAID = new Set(['completed', 'paid']);

export function isEnrollmentCancelled(status) {
  return REVOKED.has(String(status ?? '').toLowerCase().trim());
}

export function isPaymentCompleted(status) {
  return PAID.has(String(status ?? 'pending').toLowerCase().trim());
}

export function enrollmentGrantsAccess(status, paymentStatus) {
  if (isEnrollmentCancelled(status)) return false;
  if (!isPaymentCompleted(paymentStatus)) return false;
  return String(status ?? '').toLowerCase().trim() === 'active';
}

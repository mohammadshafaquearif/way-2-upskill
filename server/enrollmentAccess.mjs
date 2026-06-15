const REVOKED = new Set(['cancelled', 'canceled']);
const PAID = new Set(['completed', 'paid']);
const ADMIN_GRANTED = new Set(['manual', 'waived', 'admin']);
const ACCESS_STATUSES = new Set(['active', 'completed']);

export function isEnrollmentCancelled(status) {
  return REVOKED.has(String(status ?? '').toLowerCase().trim());
}

export function isPaymentCompleted(status) {
  return PAID.has(String(status ?? 'pending').toLowerCase().trim());
}

function isAdminGrantedPayment(status) {
  return ADMIN_GRANTED.has(String(status ?? '').toLowerCase().trim());
}

export function enrollmentGrantsAccess(status, paymentStatus) {
  if (isEnrollmentCancelled(status)) return false;

  const normalizedStatus = String(status ?? '').toLowerCase().trim();
  if (!ACCESS_STATUSES.has(normalizedStatus)) return false;

  return isPaymentCompleted(paymentStatus) || isAdminGrantedPayment(paymentStatus);
}

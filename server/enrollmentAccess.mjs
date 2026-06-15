const REVOKED = new Set(['cancelled', 'canceled']);
const PAID = new Set(['completed', 'paid']);
const ADMIN_GRANTED = new Set(['manual', 'waived', 'admin']);

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
  if (String(status ?? '').toLowerCase().trim() !== 'active') return false;
  return isPaymentCompleted(paymentStatus) || isAdminGrantedPayment(paymentStatus);
}

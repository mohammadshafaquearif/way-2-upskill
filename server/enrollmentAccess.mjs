const REVOKED = new Set(['cancelled', 'canceled']);

export function isEnrollmentCancelled(status) {
  return REVOKED.has(String(status ?? '').toLowerCase().trim());
}

export function enrollmentGrantsAccess(status) {
  return !isEnrollmentCancelled(status);
}

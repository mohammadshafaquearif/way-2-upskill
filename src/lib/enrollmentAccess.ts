/** Enrollment statuses that block LMS / course access */
const REVOKED_ENROLLMENT_STATUSES = new Set(['cancelled', 'canceled']);

export function normalizeEnrollmentStatus(status: string | null | undefined): string {
  return (status ?? 'pending').toLowerCase().trim();
}

export function isEnrollmentCancelled(status: string | null | undefined): boolean {
  return REVOKED_ENROLLMENT_STATUSES.has(normalizeEnrollmentStatus(status));
}

export function enrollmentGrantsAccess(status: string | null | undefined): boolean {
  return !isEnrollmentCancelled(status);
}

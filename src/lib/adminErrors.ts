/** User-safe admin messages — never expose DB/RPC internals */
export const ADMIN_ACCESS_DENIED =
  'You do not have permission to access the admin panel.';

export const ADMIN_ACCESS_VERIFY_FAILED =
  'Unable to verify admin access right now. Please try again in a moment.';

export const ADMIN_DATA_LOAD_FAILED =
  'Unable to load admin data. Please refresh the page or try again later.';

export const ADMIN_SAVE_FAILED =
  'Unable to save changes. Please try again later.';

const SENSITIVE_PATTERNS = [
  /function\s+public\./i,
  /schema cache/i,
  /relation\s+public\./i,
  /row-level security/i,
  /permission denied/i,
  /jwt/i,
  /rpc/i,
  /pgrst/i,
  /postgres/i,
  /supabase/i,
  /sql/i,
  /policy/i,
  /admin_access/i,
  /get_my_admin_permissions/i,
  /has_admin_permission/i,
];

export function isSensitiveAdminError(message: string): boolean {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(message));
}

export function toSafeAdminMessage(
  error: unknown,
  fallback = ADMIN_DATA_LOAD_FAILED,
): string {
  if (!(error instanceof Error)) return fallback;
  if (isSensitiveAdminError(error.message)) return fallback;
  return fallback;
}

export function logAdminError(context: string, error: unknown): void {
  if (import.meta.env.DEV) {
    console.error(`[admin] ${context}`, error);
  }
}

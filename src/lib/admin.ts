/** Must match admin emails in supabase RLS policies and is_admin() */
export const ADMIN_EMAILS = [
  'letsupskill57@gmail.com',
  'admin@zyvotrix.com',
  'support@zyvotrix.com',
] as const;

export function isAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some((adminEmail) => adminEmail === normalized);
}

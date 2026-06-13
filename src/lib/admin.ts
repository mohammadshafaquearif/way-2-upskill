/** Must match admin emails in supabase/schema.sql RLS policies */
export const ADMIN_EMAILS = [
  'letsupskill57@gmail.com',
  'admin@zyvotrix.com',
] as const;

export function isAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some((adminEmail) => adminEmail === normalized);
}

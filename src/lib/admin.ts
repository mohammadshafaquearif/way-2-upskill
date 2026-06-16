import type { AdminPermission, AdminSection } from '@/lib/adminTypes';

/** Permanent super admin — always has full access (matches Supabase is_super_admin()) */
export const SUPER_ADMIN_EMAIL = 'admin@zyvotrix.com';

/** Tab-level permissions assignable to delegated admins */
export const ADMIN_TAB_PERMISSIONS = [
  'dashboard',
  'learners',
  'programs',
  'sessions',
  'assignments',
  'certificates',
  'contacts',
  'sales_report',
] as const satisfies readonly AdminPermission[];

/** Maps each admin sidebar section to the permission required to view it */
export const SECTION_PERMISSION: Record<AdminSection, AdminPermission | 'super_admin'> = {
  dashboard: 'dashboard',
  learners: 'learners',
  programs: 'programs',
  sessions: 'sessions',
  assignments: 'assignments',
  certificates: 'certificates',
  contacts: 'contacts',
  sales_report: 'sales_report',
  admin_access: 'super_admin',
};

export interface AdminAccessState {
  isSuperAdmin: boolean;
  permissions: AdminPermission[];
}

export function normalizeAdminEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isSuperAdminEmail(email: string): boolean {
  return normalizeAdminEmail(email) === SUPER_ADMIN_EMAIL;
}

export function hasAdminPermission(
  access: AdminAccessState | null | undefined,
  permission: AdminPermission,
): boolean {
  if (!access) return false;
  if (access.isSuperAdmin) return true;
  return access.permissions.includes(permission);
}

export function canAccessAdminSection(
  access: AdminAccessState | null | undefined,
  section: AdminSection,
): boolean {
  if (!access) return false;
  const required = SECTION_PERMISSION[section];
  if (required === 'super_admin') return access.isSuperAdmin;
  return hasAdminPermission(access, required);
}

export function hasAnyAdminAccess(access: AdminAccessState | null | undefined): boolean {
  if (!access) return false;
  if (access.isSuperAdmin) return true;
  return access.permissions.length > 0;
}

export function firstAllowedAdminSection(
  access: AdminAccessState | null | undefined,
): AdminSection | null {
  if (!access) return null;
  if (access.isSuperAdmin) return 'dashboard';

  const order: AdminSection[] = [
    'dashboard',
    'learners',
    'programs',
    'sessions',
    'assignments',
    'certificates',
    'contacts',
    'sales_report',
  ];

  for (const section of order) {
    if (canAccessAdminSection(access, section)) return section;
  }
  return null;
}

export function parseAdminAccessPayload(data: unknown): AdminAccessState {
  const row = (data ?? {}) as { is_super_admin?: boolean; permissions?: unknown };
  const permissions = Array.isArray(row.permissions)
    ? row.permissions.filter((p): p is AdminPermission =>
        ADMIN_TAB_PERMISSIONS.includes(p as AdminPermission),
      )
    : [];

  return {
    isSuperAdmin: Boolean(row.is_super_admin),
    permissions,
  };
}

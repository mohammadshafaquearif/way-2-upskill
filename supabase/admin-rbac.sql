-- Admin RBAC — granular tab permissions per admin user
-- Run in Supabase SQL Editor after admin-phase1.sql / security-hardening.sql
--
-- admin@zyvotrix.com always has full access (super admin).
-- Other admins are stored in admin_access with per-tab permissions.

-- ---------------------------------------------------------------------------
-- Super admin helper (no table dependency)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@zyvotrix.com';
$$;

GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

-- ---------------------------------------------------------------------------
-- Admin access table (must exist before functions that reference it)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.admin_access (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    permissions TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    notes TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT admin_access_permissions_valid CHECK (
        permissions <@ ARRAY[
            'dashboard', 'learners', 'programs', 'sessions',
            'assignments', 'certificates', 'contacts', 'sales_report'
        ]::text[]
    )
);

CREATE INDEX IF NOT EXISTS idx_admin_access_email ON public.admin_access (lower(email));

DROP TRIGGER IF EXISTS update_admin_access_updated_at ON public.admin_access;
CREATE TRIGGER update_admin_access_updated_at
    BEFORE UPDATE ON public.admin_access
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.admin_access ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_access_super_all ON public.admin_access;
CREATE POLICY admin_access_super_all ON public.admin_access
    FOR ALL TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS admin_access_read_own ON public.admin_access;
CREATE POLICY admin_access_read_own ON public.admin_access
    FOR SELECT TO authenticated
    USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- Seed legacy full-access admins (super admin is hardcoded, not stored here)
INSERT INTO public.admin_access (email, permissions, notes, created_by)
VALUES
  (
    'letsupskill57@gmail.com',
    ARRAY['dashboard','learners','programs','sessions','assignments','certificates','contacts','sales_report'],
    'Legacy full-access admin',
    'migration'
  ),
  (
    'support@zyvotrix.com',
    ARRAY['dashboard','learners','programs','sessions','assignments','certificates','contacts','sales_report'],
    'Legacy full-access admin',
    'migration'
  )
ON CONFLICT (email) DO NOTHING;

-- ---------------------------------------------------------------------------
-- RBAC functions (require admin_access table)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    public.is_super_admin()
    OR EXISTS (
      SELECT 1
      FROM public.admin_access a
      WHERE lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        AND a.is_active = true
        AND cardinality(a.permissions) > 0
    ),
    false
  );
$$;

CREATE OR REPLACE FUNCTION public.has_admin_permission(p_permission text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE
    WHEN public.is_super_admin() THEN true
    ELSE EXISTS (
      SELECT 1
      FROM public.admin_access a
      WHERE lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        AND a.is_active = true
        AND p_permission = ANY(a.permissions)
    )
  END;
$$;

CREATE OR REPLACE FUNCTION public.get_my_admin_permissions()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE
    WHEN public.is_super_admin() THEN jsonb_build_object(
      'is_super_admin', true,
      'permissions', jsonb_build_array(
        'dashboard', 'learners', 'programs', 'sessions',
        'assignments', 'certificates', 'contacts', 'sales_report'
      )
    )
    ELSE coalesce(
      (
        SELECT jsonb_build_object(
          'is_super_admin', false,
          'permissions', to_jsonb(a.permissions)
        )
        FROM public.admin_access a
        WHERE lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
          AND a.is_active = true
        LIMIT 1
      ),
      jsonb_build_object('is_super_admin', false, 'permissions', '[]'::jsonb)
    )
  END;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_admin_permission(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_admin_permissions() TO authenticated;

-- ---------------------------------------------------------------------------
-- Section-scoped RLS (replaces broad is_admin() on data tables)
-- ---------------------------------------------------------------------------

-- Users (learners tab)
DROP POLICY IF EXISTS "users_admin_select" ON public.users;
CREATE POLICY "users_admin_select" ON public.users
    FOR SELECT TO authenticated
    USING (public.has_admin_permission('learners'));

DROP POLICY IF EXISTS users_admin_update ON public.users;
CREATE POLICY users_admin_update ON public.users
    FOR UPDATE TO authenticated
    USING (public.has_admin_permission('learners'))
    WITH CHECK (public.has_admin_permission('learners'));

-- Enrollments (learners + sales report tabs)
DROP POLICY IF EXISTS "enrollments_admin_select" ON public.enrollments;
CREATE POLICY "enrollments_admin_select" ON public.enrollments
    FOR SELECT TO authenticated
    USING (
      public.has_admin_permission('learners')
      OR public.has_admin_permission('sales_report')
    );

DROP POLICY IF EXISTS enrollments_admin_update ON public.enrollments;
CREATE POLICY enrollments_admin_update ON public.enrollments
    FOR UPDATE TO authenticated
    USING (public.has_admin_permission('learners'))
    WITH CHECK (public.has_admin_permission('learners'));

DROP POLICY IF EXISTS enrollments_admin_insert ON public.enrollments;
CREATE POLICY enrollments_admin_insert ON public.enrollments
    FOR INSERT TO authenticated
    WITH CHECK (public.has_admin_permission('learners'));

-- Courses / programs
DROP POLICY IF EXISTS courses_admin_all ON public.courses;
CREATE POLICY courses_admin_all ON public.courses
    FOR ALL TO authenticated
    USING (public.has_admin_permission('programs'))
    WITH CHECK (public.has_admin_permission('programs'));

-- Contacts
DROP POLICY IF EXISTS "contacts_admin_read" ON public.contacts;
CREATE POLICY "contacts_admin_read" ON public.contacts
    FOR SELECT TO authenticated
    USING (public.has_admin_permission('contacts'));

DROP POLICY IF EXISTS "contacts_admin_update" ON public.contacts;
CREATE POLICY contacts_admin_update ON public.contacts
    FOR UPDATE TO authenticated
    USING (public.has_admin_permission('contacts'))
    WITH CHECK (public.has_admin_permission('contacts'));

-- Sessions, assignments, certificates (admin-phase1 tables)
DO $$
DECLARE
  rec text[];
BEGIN
  FOREACH rec SLICE 1 IN ARRAY ARRAY[
    ARRAY['program_sessions', 'sessions'],
    ARRAY['assignments', 'assignments'],
    ARRAY['assignment_submissions', 'assignments'],
    ARRAY['certificates', 'certificates']
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', rec[1] || '_admin_all', rec[1]);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO authenticated
       USING (public.has_admin_permission(%L))
       WITH CHECK (public.has_admin_permission(%L))',
      rec[1] || '_admin_all', rec[1], rec[2], rec[2]
    );
  END LOOP;
END $$;

-- ---------------------------------------------------------------------------
-- Patch: add sales_report to existing delegated admins (safe to re-run)
-- ---------------------------------------------------------------------------

ALTER TABLE public.admin_access DROP CONSTRAINT IF EXISTS admin_access_permissions_valid;
ALTER TABLE public.admin_access ADD CONSTRAINT admin_access_permissions_valid CHECK (
  permissions <@ ARRAY[
    'dashboard', 'learners', 'programs', 'sessions',
    'assignments', 'certificates', 'contacts', 'sales_report'
  ]::text[]
);

UPDATE public.admin_access
SET permissions = array_append(permissions, 'sales_report')
WHERE 'sales_report' <> ALL (permissions)
  AND cardinality(permissions) >= 6;

-- Refresh PostgREST schema cache so RPC is available immediately
NOTIFY pgrst, 'reload schema';

-- Contact lead assignment — run after admin-rbac.sql

ALTER TABLE public.contacts
  ADD COLUMN IF NOT EXISTS assigned_to VARCHAR(255),
  ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS assigned_by VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_contacts_assigned_to ON public.contacts (lower(assigned_to));

-- Agents cannot reassign leads; only super admin can change assignee fields
CREATE OR REPLACE FUNCTION public.protect_contact_assignment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    NEW.assigned_to := OLD.assigned_to;
    NEW.assigned_at := OLD.assigned_at;
    NEW.assigned_by := OLD.assigned_by;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_contact_assignment ON public.contacts;
CREATE TRIGGER protect_contact_assignment
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_contact_assignment();

-- Super admin: all leads. Agents: only leads assigned to them.
DROP POLICY IF EXISTS "contacts_admin_read" ON public.contacts;
CREATE POLICY "contacts_admin_read" ON public.contacts
  FOR SELECT TO authenticated
  USING (
    public.is_super_admin()
    OR (
      public.has_admin_permission('contacts')
      AND assigned_to IS NOT NULL
      AND lower(assigned_to) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  );

DROP POLICY IF EXISTS contacts_admin_update ON public.contacts;
CREATE POLICY contacts_admin_update ON public.contacts
  FOR UPDATE TO authenticated
  USING (
    public.is_super_admin()
    OR (
      public.has_admin_permission('contacts')
      AND assigned_to IS NOT NULL
      AND lower(assigned_to) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  )
  WITH CHECK (
    public.is_super_admin()
    OR (
      public.has_admin_permission('contacts')
      AND assigned_to IS NOT NULL
      AND lower(assigned_to) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  );

NOTIFY pgrst, 'reload schema';

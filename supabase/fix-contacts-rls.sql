-- Fix: Contact form RLS — run in Supabase SQL Editor if you see
-- "new row violates row-level security policy for table contacts"

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone (logged in or guest) to submit the contact form
DROP POLICY IF EXISTS "contacts_anon_insert" ON public.contacts;
DROP POLICY IF EXISTS "contacts_public_insert" ON public.contacts;
CREATE POLICY "contacts_public_insert" ON public.contacts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Admin can read + update leads (for /admin Contact Leads)
DROP POLICY IF EXISTS "contacts_admin_read" ON public.contacts;
CREATE POLICY "contacts_admin_read" ON public.contacts
  FOR SELECT TO authenticated
  USING (
    (auth.jwt() ->> 'email') IN (
      'letsupskill57@gmail.com',
      'admin@zyvotrix.com'
    )
  );

DROP POLICY IF EXISTS "contacts_admin_update" ON public.contacts;
CREATE POLICY "contacts_admin_update" ON public.contacts
  FOR UPDATE TO authenticated
  USING (
    (auth.jwt() ->> 'email') IN (
      'letsupskill57@gmail.com',
      'admin@zyvotrix.com'
    )
  )
  WITH CHECK (
    (auth.jwt() ->> 'email') IN (
      'letsupskill57@gmail.com',
      'admin@zyvotrix.com'
    )
  );

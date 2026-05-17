-- Run in Supabase SQL Editor — fixes Contact + Enroll forms for anon/guest users

-- Guest enrollments (no login required on /enroll)
ALTER TABLE public.enrollments ALTER COLUMN user_id DROP NOT NULL;

DROP POLICY IF EXISTS "enrollments_insert_own" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_guest" ON public.enrollments;
CREATE POLICY "enrollments_insert_guest" ON public.enrollments
  FOR INSERT TO anon, authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "enrollments_select_own" ON public.enrollments;
CREATE POLICY "enrollments_select_own" ON public.enrollments
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Contact form — public submit
DROP POLICY IF EXISTS "contacts_anon_insert" ON public.contacts;
DROP POLICY IF EXISTS "contacts_public_insert" ON public.contacts;
CREATE POLICY "contacts_public_insert" ON public.contacts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Run in Supabase SQL Editor — fixes checkout enrollment after Razorpay payment
-- (guest checkout + logged-in checkout)

ALTER TABLE public.enrollments ALTER COLUMN user_id DROP NOT NULL;

DROP POLICY IF EXISTS "enrollments_insert_own" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_guest" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_checkout" ON public.enrollments;

-- Guest (anon): user_id must be NULL. Logged-in: user_id must match auth.uid()
CREATE POLICY "enrollments_insert_checkout" ON public.enrollments
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND btrim(email) <> ''
    AND (
      user_id IS NULL
      OR auth.uid() = user_id
    )
  );

DROP POLICY IF EXISTS "enrollments_select_own" ON public.enrollments;
CREATE POLICY "enrollments_select_own" ON public.enrollments
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Re-apply admin read if missing
DROP POLICY IF EXISTS "enrollments_admin_select" ON public.enrollments;
CREATE POLICY "enrollments_admin_select" ON public.enrollments
  FOR SELECT TO authenticated
  USING (
    (auth.jwt() ->> 'email') IN (
      'letsupskill57@gmail.com',
      'admin@zyvotrix.com',
      'support@zyvotrix.com'
    )
  );

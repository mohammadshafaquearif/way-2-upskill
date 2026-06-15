-- Run in Supabase SQL Editor — fixes checkout enrollment after Razorpay payment
-- (guest checkout + logged-in checkout)
-- Paid enrollments are created server-side via service role in /api/complete-enrollment

ALTER TABLE public.enrollments ALTER COLUMN user_id DROP NOT NULL;

DROP POLICY IF EXISTS "enrollments_insert_own" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_guest" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_checkout" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_application" ON public.enrollments;

CREATE POLICY "enrollments_insert_application" ON public.enrollments
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND btrim(email) <> ''
    AND (user_id IS NULL OR auth.uid() = user_id)
    AND lower(coalesce(status, 'pending')) = 'pending'
    AND lower(coalesce(payment_status, 'pending')) = 'pending'
    AND (razorpay_payment_id IS NULL OR btrim(razorpay_payment_id) = '')
    AND lower(coalesce(payment_method, '')) NOT LIKE 'razorpay:%'
  );

DROP POLICY IF EXISTS "enrollments_select_own" ON public.enrollments;
CREATE POLICY "enrollments_select_own" ON public.enrollments
  FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

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

CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_razorpay_payment_unique
  ON public.enrollments (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL AND btrim(razorpay_payment_id) <> '';

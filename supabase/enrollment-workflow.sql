-- Enrollment workflow — run in Supabase SQL Editor after schema.sql / admin-phase1.sql

ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS enrollment_number VARCHAR(50) UNIQUE;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS razorpay_payment_id VARCHAR(100);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS razorpay_order_id VARCHAR(100);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS country VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_enrollments_number ON public.enrollments(enrollment_number);
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON public.enrollments(email);

-- Allow guest enrollments (checkout without login)
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

CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_razorpay_payment_unique
  ON public.enrollments (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL AND btrim(razorpay_payment_id) <> '';

DROP POLICY IF EXISTS "enrollments_select_own" ON public.enrollments;
CREATE POLICY "enrollments_select_own" ON public.enrollments
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

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

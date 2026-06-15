-- Security hardening — run in Supabase SQL Editor after schema.sql / enrollment-workflow.sql

-- Prevent payment replay across enrollments
CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_razorpay_payment_unique
  ON public.enrollments (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL AND btrim(razorpay_payment_id) <> '';

-- Remove public enrollment INSERT — enrollments must be created server-side via service role after verified payment
DROP POLICY IF EXISTS "enrollments_insert_checkout" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_own" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_guest" ON public.enrollments;

-- Learners can read their own enrollments (by user_id or matching email)
DROP POLICY IF EXISTS "enrollments_select_own" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_select_by_email" ON public.enrollments;
CREATE POLICY "enrollments_select_own" ON public.enrollments
  FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

-- Restrict certificate public verify to non-sensitive columns via view
CREATE OR REPLACE VIEW public.certificates_public AS
SELECT
  certificate_id,
  student_name,
  program_code,
  completion_date,
  status
FROM public.certificates
WHERE status = 'issued';

GRANT SELECT ON public.certificates_public TO anon, authenticated;

-- Security hardening — run in Supabase SQL Editor after schema.sql / enrollment-workflow.sql / admin-phase1.sql

-- Prevent payment replay across enrollments
CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_razorpay_payment_unique
  ON public.enrollments (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL AND btrim(razorpay_payment_id) <> '';

-- Sync admin emails (client + RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.jwt() ->> 'email') IN (
      'letsupskill57@gmail.com',
      'admin@zyvotrix.com',
      'support@zyvotrix.com'
    ),
    false
  );
$$;

-- Remove permissive enrollment INSERT — allow application form only (pending, no payment proof)
DROP POLICY IF EXISTS "enrollments_insert_checkout" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_own" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_guest" ON public.enrollments;
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
DROP POLICY IF EXISTS certificates_public_verify ON public.certificates;

ALTER TABLE public.certificates
  ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'issued';

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

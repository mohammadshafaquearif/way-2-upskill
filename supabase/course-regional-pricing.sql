-- Country / region-wise course pricing (Zyvotrix official fees)
-- Run in Supabase SQL Editor after schema.sql + admin-phase1.sql
--
-- IN  = India base fee (before 18% GST; GST added at checkout)
-- ROW = International list price in USD (converted to local Razorpay currency)

CREATE TABLE IF NOT EXISTS public.course_regional_prices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    region_code VARCHAR(10) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    amount_inr DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (course_id, region_code)
);

CREATE INDEX IF NOT EXISTS idx_course_regional_prices_course
    ON public.course_regional_prices(course_id);

ALTER TABLE public.course_regional_prices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read regional prices" ON public.course_regional_prices;
CREATE POLICY "Anyone can read regional prices"
    ON public.course_regional_prices FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admins manage regional prices" ON public.course_regional_prices;
CREATE POLICY "Admins manage regional prices"
    ON public.course_regional_prices FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- AAC: ₹23,689 + GST | $359 international
INSERT INTO public.course_regional_prices (course_id, region_code, amount, currency, amount_inr)
SELECT c.id, v.region, v.amount, v.currency, v.amount_inr
FROM public.courses c
CROSS JOIN (
    VALUES
    ('IN', 23689::decimal, 'INR', NULL::decimal),
    ('ROW', 359::decimal, 'USD', NULL::decimal)
) AS v(region, amount, currency, amount_inr)
WHERE c.code = 'AAC'
ON CONFLICT (course_id, region_code) DO UPDATE SET
    amount = EXCLUDED.amount,
    currency = EXCLUDED.currency,
    amount_inr = EXCLUDED.amount_inr,
    updated_at = NOW();

-- DOP: ₹24,179 + GST | $370 international
INSERT INTO public.course_regional_prices (course_id, region_code, amount, currency, amount_inr)
SELECT c.id, v.region, v.amount, v.currency, v.amount_inr
FROM public.courses c
CROSS JOIN (
    VALUES
    ('IN', 24179::decimal, 'INR', NULL::decimal),
    ('ROW', 370::decimal, 'USD', NULL::decimal)
) AS v(region, amount, currency, amount_inr)
WHERE c.code = 'DOP'
ON CONFLICT (course_id, region_code) DO UPDATE SET
    amount = EXCLUDED.amount,
    currency = EXCLUDED.currency,
    amount_inr = EXCLUDED.amount_inr,
    updated_at = NOW();

-- AWS: ₹19,569 + GST | $215 international
INSERT INTO public.course_regional_prices (course_id, region_code, amount, currency, amount_inr)
SELECT c.id, v.region, v.amount, v.currency, v.amount_inr
FROM public.courses c
CROSS JOIN (
    VALUES
    ('IN', 19569::decimal, 'INR', NULL::decimal),
    ('ROW', 215::decimal, 'USD', NULL::decimal)
) AS v(region, amount, currency, amount_inr)
WHERE c.code = 'AWS'
ON CONFLICT (course_id, region_code) DO UPDATE SET
    amount = EXCLUDED.amount,
    currency = EXCLUDED.currency,
    amount_inr = EXCLUDED.amount_inr,
    updated_at = NOW();

-- DSP: ₹22,569 + GST | $344 international
INSERT INTO public.course_regional_prices (course_id, region_code, amount, currency, amount_inr)
SELECT c.id, v.region, v.amount, v.currency, v.amount_inr
FROM public.courses c
CROSS JOIN (
    VALUES
    ('IN', 22569::decimal, 'INR', NULL::decimal),
    ('ROW', 344::decimal, 'USD', NULL::decimal)
) AS v(region, amount, currency, amount_inr)
WHERE c.code = 'DSP'
ON CONFLICT (course_id, region_code) DO UPDATE SET
    amount = EXCLUDED.amount,
    currency = EXCLUDED.currency,
    amount_inr = EXCLUDED.amount_inr,
    updated_at = NOW();

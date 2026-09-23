-- Masked checkout payment links — store learner PII server-side, share only ?t= token in URL
-- Run in Supabase SQL Editor after admin-rbac.sql

CREATE TABLE IF NOT EXISTS public.checkout_payment_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    token VARCHAR(64) UNIQUE NOT NULL,
    course_slug VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    learner_name VARCHAR(255),
    created_by VARCHAR(255),
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checkout_payment_tokens_token ON public.checkout_payment_tokens (token);
CREATE INDEX IF NOT EXISTS idx_checkout_payment_tokens_expires ON public.checkout_payment_tokens (expires_at);

ALTER TABLE public.checkout_payment_tokens ENABLE ROW LEVEL SECURITY;

-- No policies: only service role (server) reads/writes this table.

NOTIFY pgrst, 'reload schema';

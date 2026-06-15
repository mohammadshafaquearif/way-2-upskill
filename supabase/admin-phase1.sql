-- Admin Phase 1 — run after schema.sql in Supabase SQL Editor

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

-- Learner fields on users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS learner_status VARCHAR(50) DEFAULT 'active';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS assigned_program VARCHAR(50);
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Program fields on courses
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS code VARCHAR(20);
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS curriculum TEXT;

-- Contact lead status (may already exist)
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new';

-- Sessions
CREATE TABLE IF NOT EXISTS public.program_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    meet_link TEXT,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    mentor_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignments
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT,
    file_name VARCHAR(255),
    due_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignment submissions
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    learner_name VARCHAR(255),
    learner_email VARCHAR(255),
    file_url TEXT,
    file_name VARCHAR(255),
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'submitted',
    notes TEXT
);

-- Certificates
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    certificate_id VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
    program_code VARCHAR(20),
    completion_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'issued',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_program_sessions_date ON public.program_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_assignments_course ON public.assignments(course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_id ON public.certificates(certificate_id);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);

-- Seed core programs (DOP, AAC, AWS, DSP)
INSERT INTO public.courses (code, title, description, duration, price, category, level, curriculum) VALUES
('DOP', 'AI-Powered DevOps Engineer Program (DOP)', 'DevOps with AI-assisted automation, CI/CD, containers, and cloud deployments.', '4 Months', 350.00, 'DevOps', 'Intermediate', 'Linux, Git, CI/CD, Docker, Kubernetes, Terraform, AWS, DevSecOps, Capstone'),
('AAC', 'Agentic AI Certification Training (AAC)', 'Build intelligent agents, LLM workflows, and automation systems.', '3 Months', 300.00, 'AI/ML', 'Intermediate', 'Python, LLMs, RAG, Agents, LangChain, MCP, Production AI'),
('AWS', 'AWS Solutions Architect Certification Program', 'SAA-C03 focused AWS architecture and hands-on labs.', '3 Months', 350.00, 'Cloud', 'Intermediate', 'IAM, EC2, S3, VPC, RDS, Lambda, Route53, Terraform'),
('DSP', 'Data Science & Machine Learning with Python', 'Analytics, visualization, statistics, and ML portfolio projects.', '3 Months', 300.00, 'Data Science', 'Intermediate', 'Python, SQL, Pandas, ML, Deep Learning, MLOps basics')
ON CONFLICT DO NOTHING;

-- RLS
ALTER TABLE public.program_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Admin full access on new tables
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['program_sessions','assignments','assignment_submissions','certificates']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_admin_all', t);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())',
      t || '_admin_all', t
    );
  END LOOP;
END $$;

-- Public certificate verification uses certificates_public view (see security-hardening.sql)
DROP POLICY IF EXISTS certificates_public_verify ON public.certificates;

-- Admin update users
DROP POLICY IF EXISTS users_admin_update ON public.users;
CREATE POLICY users_admin_update ON public.users
    FOR UPDATE TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Admin CRUD courses
DROP POLICY IF EXISTS courses_admin_all ON public.courses;
CREATE POLICY courses_admin_all ON public.courses
    FOR ALL TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Admin update enrollments
DROP POLICY IF EXISTS enrollments_admin_update ON public.enrollments;
CREATE POLICY enrollments_admin_update ON public.enrollments
    FOR UPDATE TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS enrollments_admin_insert ON public.enrollments;
CREATE POLICY enrollments_admin_insert ON public.enrollments
    FOR INSERT TO authenticated
    WITH CHECK (public.is_admin());

-- Admin update contacts
DROP POLICY IF EXISTS contacts_admin_update ON public.contacts;
CREATE POLICY contacts_admin_update ON public.contacts
    FOR UPDATE TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

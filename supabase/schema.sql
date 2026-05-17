-- Way2Upskill / Zyvotrix — Supabase production schema
-- Run in: Supabase Dashboard → SQL Editor → New query → Run

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users profile (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE,
    interested_subject VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    level VARCHAR(50),
    instructor_id UUID,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.instructors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    specialization TEXT,
    bio TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_plan VARCHAR(50),
    payment_method VARCHAR(50),
    total_amount DECIMAL(10,2),
    paid_amount DECIMAL(10,2) DEFAULT 0,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip VARCHAR(20),
    country VARCHAR(100),
    education VARCHAR(100),
    field VARCHAR(100),
    employment_status VARCHAR(50),
    programming_experience VARCHAR(50),
    goals TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile when user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (
        id, first_name, last_name, phone, email, interested_subject
    ) VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        NEW.email,
        NEW.raw_user_meta_data->>'interested_subject'
    )
    ON CONFLICT (id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,
        interested_subject = EXCLUDED.interested_subject,
        updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sample data
INSERT INTO public.courses (title, description, duration, price, category, level) VALUES
('Full Stack Web Development', 'Master modern web development from frontend to backend with React, Node.js, and cloud deployment.', '10 Weeks', 300.00, 'Web Development', 'Beginner to Advanced'),
('Professional AI/ML & Generative AI Career Accelerator', 'Transform your career with our intensive AI/ML program.', '8 Weeks', 300.00, 'AI/ML', 'Intermediate'),
('DevOps Engineering', 'Learn CI/CD, containerization, cloud infrastructure, and automation tools.', '8 Weeks', 350.00, 'DevOps', 'Intermediate'),
('Cloud Computing', 'Master AWS, Azure, and GCP with hands-on experience.', '10 Weeks', 350.00, 'Cloud Computing', 'Intermediate'),
('Cybersecurity', 'Comprehensive cybersecurity training covering ethical hacking and security protocols.', '12 Weeks', 300.00, 'Cybersecurity', 'Beginner to Advanced')
ON CONFLICT DO NOTHING;

INSERT INTO public.instructors (first_name, last_name, email, phone, specialization, bio, linkedin) VALUES
('Mohammad', 'Shafaque Arif', 'letsupskill57@gmail.com', '+91 9611513741', 'Full Stack, AI/ML, DevOps, Cloud Computing, Cybersecurity', 'Experienced tech professional committed to student success.', 'https://www.linkedin.com/in/shafaquearif26/')
ON CONFLICT (email) DO NOTHING;

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Users: read/update own profile
DROP POLICY IF EXISTS "users_select_own" ON public.users;
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own" ON public.users;
CREATE POLICY "users_update_own" ON public.users
    FOR UPDATE TO authenticated
    USING (auth.uid() = id);

-- Admin can read all users (set your admin email in Supabase or use service role for dashboard)
DROP POLICY IF EXISTS "users_admin_select" ON public.users;
CREATE POLICY "users_admin_select" ON public.users
    FOR SELECT TO authenticated
    USING (
        (auth.jwt() ->> 'email') IN (
            'letsupskill57@gmail.com',
            'admin@zyvotrix.com'
        )
    );

-- Courses & instructors: public read
DROP POLICY IF EXISTS "courses_public_read" ON public.courses;
CREATE POLICY "courses_public_read" ON public.courses
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "instructors_public_read" ON public.instructors;
CREATE POLICY "instructors_public_read" ON public.instructors
    FOR SELECT USING (is_active = true);

-- Enrollments
DROP POLICY IF EXISTS "enrollments_insert_own" ON public.enrollments;
CREATE POLICY "enrollments_insert_own" ON public.enrollments
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

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
            'admin@zyvotrix.com'
        )
    );

-- Contacts: anyone can submit
DROP POLICY IF EXISTS "contacts_anon_insert" ON public.contacts;
CREATE POLICY "contacts_anon_insert" ON public.contacts
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "contacts_admin_read" ON public.contacts;
CREATE POLICY "contacts_admin_read" ON public.contacts
    FOR SELECT TO authenticated
    USING (
        (auth.jwt() ->> 'email') IN (
            'letsupskill57@gmail.com',
            'admin@zyvotrix.com'
        )
    );

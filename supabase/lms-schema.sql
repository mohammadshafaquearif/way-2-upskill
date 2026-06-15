-- LMS curriculum schema — run after schema.sql, admin-phase1.sql, enrollment-workflow.sql, security-hardening.sql
-- Phase → Module → Topic → Learning Assets (PPT, Zoom recording, YouTube, PDF) + Quizzes + Progress
--
-- Deploy order (Supabase SQL Editor, in order):
--   1. schema.sql
--   2. admin-phase1.sql
--   3. enrollment-workflow.sql
--   4. security-hardening.sql
--   5. THIS FILE (lms-schema.sql)
--   6. lms-seed-quizzes.sql  OR  SELECT public.seed_lms_curriculum(); SELECT public.seed_topic_quizzes();
--
-- lms-quiz-attempts-best-score.sql is UPGRADE-ONLY (skip on fresh install — already included below).

-- ---------------------------------------------------------------------------
-- Extensions & helpers
-- ---------------------------------------------------------------------------

-- Merge duplicate program rows (e.g. admin-phase1.sql run twice before unique index existed)
CREATE OR REPLACE FUNCTION public.dedupe_courses_by_code()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_norm_code text;
  v_keep_id uuid;
  v_drop_id uuid;
  v_tbl text;
BEGIN
  FOR v_norm_code IN
    SELECT upper(btrim(code))
    FROM public.courses
    WHERE code IS NOT NULL AND btrim(code) <> ''
    GROUP BY upper(btrim(code))
    HAVING COUNT(*) > 1
  LOOP
    SELECT id INTO v_keep_id
    FROM public.courses
    WHERE upper(btrim(code)) = v_norm_code
    ORDER BY created_at NULLS LAST, id
    LIMIT 1;

    FOR v_drop_id IN
      SELECT id
      FROM public.courses
      WHERE upper(btrim(code)) = v_norm_code
        AND id <> v_keep_id
    LOOP
      -- Drop enrollments that would violate UNIQUE(user_id, course_id) after merge
      DELETE FROM public.enrollments e_drop
      WHERE e_drop.course_id = v_drop_id
        AND EXISTS (
          SELECT 1
          FROM public.enrollments e_keep
          WHERE e_keep.course_id = v_keep_id
            AND e_keep.user_id IS NOT DISTINCT FROM e_drop.user_id
        );

      UPDATE public.enrollments SET course_id = v_keep_id WHERE course_id = v_drop_id;

      FOR v_tbl IN
        SELECT c.table_name
        FROM information_schema.columns c
        JOIN information_schema.tables t
          ON t.table_schema = c.table_schema
         AND t.table_name = c.table_name
        WHERE c.table_schema = 'public'
          AND c.column_name = 'course_id'
          AND c.table_name <> 'courses'
          AND t.table_type = 'BASE TABLE'
      LOOP
        EXECUTE format(
          'UPDATE public.%I SET course_id = $1 WHERE course_id = $2',
          v_tbl
        ) USING v_keep_id, v_drop_id;
      END LOOP;

      DELETE FROM public.courses WHERE id = v_drop_id;
    END LOOP;
  END LOOP;
END;
$$;

SELECT public.dedupe_courses_by_code();

CREATE UNIQUE INDEX IF NOT EXISTS idx_courses_code_unique
  ON public.courses (upper(code))
  WHERE code IS NOT NULL AND btrim(code) <> '';

CREATE OR REPLACE FUNCTION public.has_course_access(p_course_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.enrollments e
    WHERE e.course_id = p_course_id
      AND (
        e.user_id = auth.uid()
        OR lower(e.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
      AND lower(coalesce(e.status, '')) IN ('active', 'completed')
      AND lower(coalesce(e.payment_status, 'pending')) IN (
        'completed', 'paid', 'manual', 'waived', 'admin'
      )
  );
$$;

-- ---------------------------------------------------------------------------
-- Cohorts (live batches)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (course_id, name)
);

ALTER TABLE public.enrollments
  ADD COLUMN IF NOT EXISTS cohort_id UUID REFERENCES public.cohorts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_enrollments_cohort ON public.enrollments(cohort_id);

-- ---------------------------------------------------------------------------
-- Curriculum hierarchy
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.program_phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    slug VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    label VARCHAR(100) NOT NULL,
    meta VARCHAR(100),
    sort_order SMALLINT NOT NULL DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (course_id, slug)
);

CREATE TABLE IF NOT EXISTS public.program_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id UUID NOT NULL REFERENCES public.program_phases(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    module_number SMALLINT NOT NULL,
    slug VARCHAR(80) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    has_quiz BOOLEAN DEFAULT true,
    has_assignment BOOLEAN DEFAULT false,
    pass_score SMALLINT DEFAULT 70,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (phase_id, module_number),
    UNIQUE (course_id, module_number)
);

CREATE TABLE IF NOT EXISTS public.module_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.program_modules(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    release_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (module_id, sort_order)
);

-- ---------------------------------------------------------------------------
-- Learning assets (PPT, recordings, YouTube, PDF, labs)
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lms_asset_type') THEN
    CREATE TYPE public.lms_asset_type AS ENUM (
      'ppt',
      'pdf',
      'zoom_recording',
      'youtube',
      'external_link',
      'lab',
      'assignment'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lms_asset_scope') THEN
    CREATE TYPE public.lms_asset_scope AS ENUM ('topic', 'module', 'phase', 'program');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.learning_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    scope public.lms_asset_scope NOT NULL DEFAULT 'topic',
    topic_id UUID REFERENCES public.module_topics(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.program_modules(id) ON DELETE CASCADE,
    phase_id UUID REFERENCES public.program_phases(id) ON DELETE CASCADE,
    asset_type public.lms_asset_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    storage_path TEXT,
    external_url TEXT,
    embed_url TEXT,
    duration_sec INT,
    file_size_bytes BIGINT,
    sort_order SMALLINT DEFAULT 0,
    is_required BOOLEAN DEFAULT true,
    is_supplementary BOOLEAN DEFAULT false,
    version INT DEFAULT 1,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT learning_assets_scope_parent CHECK (
      (scope = 'topic' AND topic_id IS NOT NULL)
      OR (scope = 'module' AND module_id IS NOT NULL)
      OR (scope = 'phase' AND phase_id IS NOT NULL)
      OR (scope = 'program')
    )
);

CREATE INDEX IF NOT EXISTS idx_learning_assets_topic ON public.learning_assets(topic_id);
CREATE INDEX IF NOT EXISTS idx_learning_assets_module ON public.learning_assets(module_id);
CREATE INDEX IF NOT EXISTS idx_learning_assets_course ON public.learning_assets(course_id);

-- ---------------------------------------------------------------------------
-- Quizzes
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.program_modules(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES public.module_topics(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    pass_score SMALLINT DEFAULT 70,
    time_limit_min SMALLINT,
    max_attempts SMALLINT DEFAULT 3,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT quizzes_parent_xor CHECK (
      (module_id IS NOT NULL AND topic_id IS NULL)
      OR (module_id IS NULL AND topic_id IS NOT NULL)
    )
);

CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL DEFAULT 'mcq',
    options JSONB NOT NULL,
    explanation TEXT,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    score SMALLINT,
    passed BOOLEAN,
    answers JSONB,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id, quiz_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_quizzes_module_unique
  ON public.quizzes(module_id) WHERE module_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_quizzes_topic_unique
  ON public.quizzes(topic_id) WHERE topic_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- Learner progress
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.learner_topic_progress (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES public.module_topics(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'not_started',
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, topic_id)
);

CREATE TABLE IF NOT EXISTS public.learner_asset_progress (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES public.learning_assets(id) ON DELETE CASCADE,
    watched_sec INT DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, asset_id)
);

CREATE TABLE IF NOT EXISTS public.learner_module_progress (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES public.program_modules(id) ON DELETE CASCADE,
    topics_done SMALLINT DEFAULT 0,
    quiz_passed BOOLEAN DEFAULT false,
    assignment_done BOOLEAN DEFAULT false,
    status VARCHAR(20) NOT NULL DEFAULT 'locked',
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, module_id)
);

CREATE TABLE IF NOT EXISTS public.learner_quiz_progress (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    attempts_used SMALLINT NOT NULL DEFAULT 0,
    best_score SMALLINT NOT NULL DEFAULT 0,
    best_passed BOOLEAN NOT NULL DEFAULT false,
    last_attempt_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, quiz_id)
);

-- ---------------------------------------------------------------------------
-- Extend live sessions
-- ---------------------------------------------------------------------------

ALTER TABLE public.program_sessions
  ADD COLUMN IF NOT EXISTS module_id UUID REFERENCES public.program_modules(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS cohort_id UUID REFERENCES public.cohorts(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS recording_asset_id UUID REFERENCES public.learning_assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS slides_asset_id UUID REFERENCES public.learning_assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS recording_url TEXT,
  ADD COLUMN IF NOT EXISTS slides_url TEXT,
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'scheduled';

CREATE INDEX IF NOT EXISTS idx_program_sessions_module ON public.program_sessions(module_id);

-- Link assignments to modules
ALTER TABLE public.assignments
  ADD COLUMN IF NOT EXISTS module_id UUID REFERENCES public.program_modules(id) ON DELETE SET NULL;

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------

DROP TRIGGER IF EXISTS program_phases_updated_at ON public.program_phases;
CREATE TRIGGER program_phases_updated_at
  BEFORE UPDATE ON public.program_phases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS program_modules_updated_at ON public.program_modules;
CREATE TRIGGER program_modules_updated_at
  BEFORE UPDATE ON public.program_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS module_topics_updated_at ON public.module_topics;
CREATE TRIGGER module_topics_updated_at
  BEFORE UPDATE ON public.module_topics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS learning_assets_updated_at ON public.learning_assets;
CREATE TRIGGER learning_assets_updated_at
  BEFORE UPDATE ON public.learning_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Quiz progress: best of max 3 attempts counts (70% pass default on quizzes)
CREATE OR REPLACE FUNCTION public.sync_quiz_progress_after_attempt()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_module_id UUID;
  v_topic_id UUID;
  v_pass_score SMALLINT;
  v_best_score SMALLINT;
  v_attempts_used INT;
  v_best_passed BOOLEAN;
BEGIN
  IF NEW.submitted_at IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT q.module_id, q.topic_id, COALESCE(q.pass_score, 70)
  INTO v_module_id, v_topic_id, v_pass_score
  FROM public.quizzes q
  WHERE q.id = NEW.quiz_id;

  SELECT COALESCE(MAX(score), 0), COUNT(*)::int
  INTO v_best_score, v_attempts_used
  FROM public.quiz_attempts
  WHERE quiz_id = NEW.quiz_id
    AND user_id = NEW.user_id
    AND submitted_at IS NOT NULL;

  v_best_passed := v_best_score >= v_pass_score;

  INSERT INTO public.learner_quiz_progress (
    user_id, quiz_id, attempts_used, best_score, best_passed, last_attempt_at, updated_at
  )
  VALUES (
    NEW.user_id, NEW.quiz_id, v_attempts_used, v_best_score, v_best_passed, NEW.submitted_at, NOW()
  )
  ON CONFLICT (user_id, quiz_id) DO UPDATE
  SET attempts_used = EXCLUDED.attempts_used,
      best_score = EXCLUDED.best_score,
      best_passed = EXCLUDED.best_passed,
      last_attempt_at = EXCLUDED.last_attempt_at,
      updated_at = NOW();

  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.learner_topic_progress (user_id, topic_id, status, completed_at, updated_at)
    VALUES (
      NEW.user_id,
      v_topic_id,
      CASE WHEN v_best_passed THEN 'completed' ELSE 'in_progress' END,
      CASE WHEN v_best_passed THEN NOW() ELSE NULL END,
      NOW()
    )
    ON CONFLICT (user_id, topic_id) DO UPDATE
    SET status = CASE
          WHEN v_best_passed THEN 'completed'
          WHEN public.learner_topic_progress.status = 'completed' THEN 'completed'
          ELSE 'in_progress'
        END,
        completed_at = CASE
          WHEN v_best_passed THEN COALESCE(public.learner_topic_progress.completed_at, NOW())
          ELSE public.learner_topic_progress.completed_at
        END,
        updated_at = NOW();
  END IF;

  IF v_module_id IS NOT NULL THEN
    INSERT INTO public.learner_module_progress (user_id, module_id, quiz_passed, status, updated_at)
    VALUES (NEW.user_id, v_module_id, v_best_passed, 'in_progress', NOW())
    ON CONFLICT (user_id, module_id) DO UPDATE
    SET quiz_passed = v_best_passed,
        status = CASE
          WHEN v_best_passed AND public.learner_module_progress.assignment_done THEN 'completed'
          WHEN v_best_passed THEN 'in_progress'
          ELSE public.learner_module_progress.status
        END,
        completed_at = CASE
          WHEN v_best_passed AND public.learner_module_progress.assignment_done
            THEN COALESCE(public.learner_module_progress.completed_at, NOW())
          ELSE public.learner_module_progress.completed_at
        END,
        updated_at = NOW();
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS quiz_attempt_sync_module ON public.quiz_attempts;
DROP TRIGGER IF EXISTS quiz_attempt_sync_progress ON public.quiz_attempts;
CREATE TRIGGER quiz_attempt_sync_progress
  AFTER INSERT OR UPDATE ON public.quiz_attempts
  FOR EACH ROW EXECUTE FUNCTION public.sync_quiz_progress_after_attempt();

-- ---------------------------------------------------------------------------
-- Curriculum tree view (learner-safe metadata, no quiz answers)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.lms_curriculum_tree AS
SELECT
  c.id AS course_id,
  c.code AS course_code,
  ph.id AS phase_id,
  ph.slug AS phase_slug,
  ph.label AS phase_label,
  ph.title AS phase_title,
  ph.meta AS phase_meta,
  ph.sort_order AS phase_sort,
  m.id AS module_id,
  m.module_number,
  m.slug AS module_slug,
  m.title AS module_title,
  m.has_quiz,
  m.has_assignment,
  m.pass_score,
  t.id AS topic_id,
  t.title AS topic_title,
  t.sort_order AS topic_sort
FROM public.courses c
JOIN public.program_phases ph ON ph.course_id = c.id
JOIN public.program_modules m ON m.phase_id = ph.id
LEFT JOIN public.module_topics t ON t.module_id = m.id
WHERE ph.is_published = true
  AND m.is_published = true
  AND (t.id IS NULL OR t.is_published = true)
ORDER BY ph.sort_order, m.sort_order, t.sort_order;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_asset_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_module_progress ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.learner_quiz_progress ENABLE ROW LEVEL SECURITY;

-- Admin full access
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'cohorts',
    'program_phases',
    'program_modules',
    'module_topics',
    'learning_assets',
    'quizzes',
    'quiz_questions'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_admin_all', t);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())',
      t || '_admin_all', t
    );
  END LOOP;
END $$;

-- Learners: read published curriculum when enrolled
DROP POLICY IF EXISTS program_phases_learner_read ON public.program_phases;
CREATE POLICY program_phases_learner_read ON public.program_phases
  FOR SELECT TO authenticated
  USING (is_published = true AND public.has_course_access(course_id));

DROP POLICY IF EXISTS program_modules_learner_read ON public.program_modules;
CREATE POLICY program_modules_learner_read ON public.program_modules
  FOR SELECT TO authenticated
  USING (is_published = true AND public.has_course_access(course_id));

DROP POLICY IF EXISTS module_topics_learner_read ON public.module_topics;
CREATE POLICY module_topics_learner_read ON public.module_topics
  FOR SELECT TO authenticated
  USING (is_published = true AND public.has_course_access(course_id));

DROP POLICY IF EXISTS learning_assets_learner_read ON public.learning_assets;
CREATE POLICY learning_assets_learner_read ON public.learning_assets
  FOR SELECT TO authenticated
  USING (is_published = true AND public.has_course_access(course_id));

DROP POLICY IF EXISTS quizzes_learner_read ON public.quizzes;
CREATE POLICY quizzes_learner_read ON public.quizzes
  FOR SELECT TO authenticated
  USING (is_published = true AND public.has_course_access(course_id));

-- Quiz questions: enrolled learners only (answers stripped client-side)
DROP POLICY IF EXISTS quiz_questions_learner_read ON public.quiz_questions;
CREATE POLICY quiz_questions_learner_read ON public.quiz_questions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.quizzes q
      WHERE q.id = quiz_id
        AND q.is_published = true
        AND public.has_course_access(q.course_id)
    )
  );

-- Quiz attempts: own rows only
DROP POLICY IF EXISTS quiz_attempts_learner_own ON public.quiz_attempts;
CREATE POLICY quiz_attempts_learner_own ON public.quiz_attempts
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS quiz_attempts_admin_all ON public.quiz_attempts;
CREATE POLICY quiz_attempts_admin_all ON public.quiz_attempts
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Progress: own rows
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'learner_topic_progress',
    'learner_asset_progress',
    'learner_module_progress',
    'learner_quiz_progress'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_own', t);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid())',
      t || '_own', t
    );
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_admin', t);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())',
      t || '_admin', t
    );
  END LOOP;
END $$;

-- Cohorts: learners read active cohorts for enrolled courses
DROP POLICY IF EXISTS cohorts_learner_read ON public.cohorts;
CREATE POLICY cohorts_learner_read ON public.cohorts
  FOR SELECT TO authenticated
  USING (is_active = true AND public.has_course_access(course_id));

-- Learners read sessions for enrolled courses
DROP POLICY IF EXISTS program_sessions_learner_read ON public.program_sessions;
CREATE POLICY program_sessions_learner_read ON public.program_sessions
  FOR SELECT TO authenticated
  USING (course_id IS NOT NULL AND public.has_course_access(course_id));

-- ---------------------------------------------------------------------------
-- Storage bucket for PPT/PDF (private — serve via signed URLs)
-- ---------------------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lms-content',
  'lms-content',
  false,
  52428800,
  ARRAY[
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'video/mp4'
  ]::text[]
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS lms_content_admin_all ON storage.objects;
CREATE POLICY lms_content_admin_all ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'lms-content' AND public.is_admin())
  WITH CHECK (bucket_id = 'lms-content' AND public.is_admin());

DROP POLICY IF EXISTS lms_content_learner_read ON storage.objects;
CREATE POLICY lms_content_learner_read ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'lms-content'
    AND (storage.foldername(name))[1] IN ('DOP', 'AAC', 'AWS', 'DSP')
  );

-- ---------------------------------------------------------------------------
-- Seed curriculum (idempotent) — all four programs
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.seed_lms_curriculum()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r RECORD;
  v_course_id UUID;
  v_phase_id UUID;
  v_module_id UUID;
  v_topic_id UUID;
  v_quiz_id UUID;
  v_topic_title TEXT;
  v_topic_idx INT;
BEGIN
  FOR r IN
    SELECT *
    FROM jsonb_to_recordset($seed$
    [
      {"code":"DOP","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"DevOps Foundations & Cloud Operations","phase_meta":"Module 1 · 5 Topics · → Project 1","phase_sort":1,"mod":1,"mod_title":"Linux, Git, Cloud & AI-Assisted DevOps","quiz":true,"assign":true,"topics":["Linux Administration, Files, Permissions & Processes","Shell Scripting & Automation","Git & GitHub Workflows, Branching & Pull Requests","Cloud Fundamentals — AWS IAM, EC2, S3, VPC","AI Tools — GitHub Copilot, Prompt Engineering for Infra"]},
      {"code":"DOP","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Containerization, Kubernetes & CI/CD","phase_meta":"Module 2 · 5 Topics · → Project 2","phase_sort":2,"mod":2,"mod_title":"Docker, Kubernetes & CI/CD Pipelines","quiz":true,"assign":true,"topics":["Docker & Containerization","Kubernetes — Architecture, Pods, Services, Deployments, ConfigMaps, Secrets, Helm","CI/CD — GitHub Actions, Jenkins","Blue-Green & Canary Deployments","AI-Assisted Pipeline Generation"]},
      {"code":"DOP","phase_slug":"phase-3","phase_label":"Phase 3","phase_title":"Infrastructure Automation & DevSecOps","phase_meta":"Module 3 · 5 Topics · → Project 3","phase_sort":3,"mod":3,"mod_title":"Terraform, Ansible & DevSecOps","quiz":true,"assign":true,"topics":["Terraform — Modules, State, Workspaces, IaC","Ansible — Configuration Management, Provisioning","DevSecOps — Vulnerability Scanning, Secrets Management","Vault, AWS Secrets Manager, Security Automation","AI-Assisted Infrastructure Generation"]},
      {"code":"DOP","phase_slug":"phase-4","phase_label":"Phase 4","phase_title":"AI Operations, Observability & Reliability Engineering","phase_meta":"Module 4 · 6 Topics · → Capstone","phase_sort":4,"mod":4,"mod_title":"Monitoring, Observability & SRE","quiz":true,"assign":true,"topics":["Prometheus, Grafana","Metrics, Logs, Traces","Incident Response, AIOps","AI-Powered Log Analysis","SRE — SLIs, SLOs, Error Budgets","Cost Optimization, Production Readiness Reviews"]},

      {"code":"AAC","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"LLM Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":1,"mod_title":"How LLMs Work","quiz":true,"assign":true,"topics":["Tokens & embeddings","Transformers","Sampling parameters"]},
      {"code":"AAC","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"LLM Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":2,"mod_title":"Prompt Engineering","quiz":true,"assign":true,"topics":["Zero-shot prompting","Chain-of-thought","System prompts"]},
      {"code":"AAC","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"LLM Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":3,"mod_title":"Function Calling & Open Source LLMs","quiz":true,"assign":true,"topics":["Structured outputs","Ollama & Llama 3","Local inference"]},
      {"code":"AAC","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Agent Engineering","phase_meta":"Modules 4–8","phase_sort":2,"mod":4,"mod_title":"LangChain Core","quiz":true,"assign":true,"topics":["LCEL pipelines","Chains & parsers","Runnable sequences"]},
      {"code":"AAC","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Agent Engineering","phase_meta":"Modules 4–8","phase_sort":2,"mod":5,"mod_title":"AI Agents","quiz":true,"assign":true,"topics":["ReAct loop","Tool use","Web search agents"]},
      {"code":"AAC","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Agent Engineering","phase_meta":"Modules 4–8","phase_sort":2,"mod":6,"mod_title":"RAG Systems","quiz":true,"assign":true,"topics":["Vector stores","Chunking strategies","Hybrid search"]},
      {"code":"AAC","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Agent Engineering","phase_meta":"Modules 4–8","phase_sort":2,"mod":7,"mod_title":"Memory Systems","quiz":true,"assign":false,"topics":["Buffer memory","Vector memory","Session storage"]},
      {"code":"AAC","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Agent Engineering","phase_meta":"Modules 4–8","phase_sort":2,"mod":8,"mod_title":"LangGraph & Multi-Agent","quiz":true,"assign":true,"topics":["State graphs","CrewAI","Agent orchestration"]},
      {"code":"AAC","phase_slug":"phase-3","phase_label":"Phase 3","phase_title":"Production & Capstone","phase_meta":"Modules 9–10","phase_sort":3,"mod":9,"mod_title":"Production Agent Deployment","quiz":true,"assign":true,"topics":["FastAPI serving","Observability","Cost optimization"]},
      {"code":"AAC","phase_slug":"phase-3","phase_label":"Phase 3","phase_title":"Production & Capstone","phase_meta":"Modules 9–10","phase_sort":3,"mod":10,"mod_title":"Capstone Project","quiz":false,"assign":true,"topics":["End-to-end agent","Portfolio presentation","Mentor review"]},

      {"code":"AWS","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"Cloud Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":1,"mod_title":"AWS Core & IAM","quiz":true,"assign":true,"topics":["Shared responsibility","IAM policies","Organizations"]},
      {"code":"AWS","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"Cloud Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":2,"mod_title":"Compute & Networking","quiz":true,"assign":true,"topics":["EC2","VPC design","Load balancers"]},
      {"code":"AWS","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"Cloud Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":3,"mod_title":"Storage & Databases","quiz":true,"assign":true,"topics":["S3","RDS","DynamoDB"]},
      {"code":"AWS","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Architecting & Certification","phase_meta":"Modules 4–6","phase_sort":2,"mod":4,"mod_title":"Serverless & Lambda","quiz":true,"assign":true,"topics":["Lambda patterns","API Gateway","EventBridge"]},
      {"code":"AWS","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Architecting & Certification","phase_meta":"Modules 4–6","phase_sort":2,"mod":5,"mod_title":"High Availability & DR","quiz":true,"assign":true,"topics":["Multi-AZ","Route 53","Backup strategies"]},
      {"code":"AWS","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Architecting & Certification","phase_meta":"Modules 4–6","phase_sort":2,"mod":6,"mod_title":"SAA-C03 Exam Prep","quiz":true,"assign":true,"topics":["Exam domains","Practice tests","Review sessions"]},

      {"code":"DSP","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"Analytics Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":1,"mod_title":"Python for Data Science","quiz":true,"assign":true,"topics":["NumPy","Pandas","Data cleaning"]},
      {"code":"DSP","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"Analytics Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":2,"mod_title":"SQL & Data Warehousing","quiz":true,"assign":true,"topics":["Joins & aggregations","Window functions","Query optimization"]},
      {"code":"DSP","phase_slug":"phase-1","phase_label":"Phase 1","phase_title":"Analytics Foundations","phase_meta":"Modules 1–3","phase_sort":1,"mod":3,"mod_title":"Statistics & EDA","quiz":true,"assign":true,"topics":["Distributions","Hypothesis testing","Visualization"]},
      {"code":"DSP","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Machine Learning","phase_meta":"Modules 4–6","phase_sort":2,"mod":4,"mod_title":"Supervised Learning","quiz":true,"assign":true,"topics":["Regression","Classification","Model evaluation"]},
      {"code":"DSP","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Machine Learning","phase_meta":"Modules 4–6","phase_sort":2,"mod":5,"mod_title":"Unsupervised & Feature Engineering","quiz":true,"assign":true,"topics":["Clustering","PCA","Feature selection"]},
      {"code":"DSP","phase_slug":"phase-2","phase_label":"Phase 2","phase_title":"Machine Learning","phase_meta":"Modules 4–6","phase_sort":2,"mod":6,"mod_title":"ML Portfolio Capstone","quiz":false,"assign":true,"topics":["End-to-end pipeline","Model deployment","Stakeholder presentation"]}
    ]
    $seed$::jsonb) AS x(
      code text,
      phase_slug text,
      phase_label text,
      phase_title text,
      phase_meta text,
      phase_sort int,
      mod int,
      mod_title text,
      quiz boolean,
      assign boolean,
      topics jsonb
    )
  LOOP
    SELECT id INTO v_course_id FROM public.courses WHERE upper(code) = upper(r.code) LIMIT 1;
    IF v_course_id IS NULL THEN
      CONTINUE;
    END IF;

    INSERT INTO public.program_phases (course_id, slug, title, label, meta, sort_order, is_published)
    VALUES (v_course_id, r.phase_slug, r.phase_title, r.phase_label, r.phase_meta, r.phase_sort, true)
    ON CONFLICT (course_id, slug) DO UPDATE
      SET title = EXCLUDED.title,
          label = EXCLUDED.label,
          meta = EXCLUDED.meta,
          sort_order = EXCLUDED.sort_order,
          is_published = true
    RETURNING id INTO v_phase_id;

    INSERT INTO public.program_modules (
      phase_id, course_id, module_number, slug, title, sort_order,
      has_quiz, has_assignment, is_published
    )
    VALUES (
      v_phase_id,
      v_course_id,
      r.mod,
      'module-' || r.mod::text,
      r.mod_title,
      r.mod,
      r.quiz,
      r.assign,
      true
    )
    ON CONFLICT (course_id, module_number) DO UPDATE
      SET title = EXCLUDED.title,
          has_quiz = EXCLUDED.has_quiz,
          has_assignment = EXCLUDED.has_assignment,
          is_published = true,
          phase_id = EXCLUDED.phase_id
    RETURNING id INTO v_module_id;

    v_topic_idx := 0;
    FOR v_topic_title IN
      SELECT jsonb_array_elements_text(r.topics)
    LOOP
      v_topic_idx := v_topic_idx + 1;

      INSERT INTO public.module_topics (module_id, course_id, title, sort_order, is_published)
      VALUES (v_module_id, v_course_id, v_topic_title, v_topic_idx, true)
      ON CONFLICT (module_id, sort_order) DO UPDATE
        SET title = EXCLUDED.title,
            is_published = true
      RETURNING id INTO v_topic_id;

      -- Placeholder PPT asset per topic (admin replaces storage_path after upload)
      INSERT INTO public.learning_assets (
        course_id, scope, topic_id, asset_type, title,
        storage_path, is_required, is_published, sort_order
      )
      SELECT
        v_course_id, 'topic', v_topic_id, 'ppt',
        v_topic_title || ' — Slides',
        upper(r.code) || '/phase-' || r.phase_sort::text || '/module-' || r.mod::text || '/topic-' || v_topic_idx::text || '/slides.pptx',
        true, true, 1
      WHERE NOT EXISTS (
        SELECT 1 FROM public.learning_assets la
        WHERE la.topic_id = v_topic_id AND la.asset_type = 'ppt'
      );
    END LOOP;

    -- Module quiz shell
    IF r.quiz THEN
      INSERT INTO public.quizzes (course_id, module_id, title, pass_score, is_published)
      SELECT v_course_id, v_module_id, r.mod_title || ' — Module Quiz', 70, true
      WHERE NOT EXISTS (
        SELECT 1 FROM public.quizzes q WHERE q.module_id = v_module_id
      );

      SELECT id INTO v_quiz_id
      FROM public.quizzes
      WHERE module_id = v_module_id
      LIMIT 1;

      IF v_quiz_id IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM public.quiz_questions WHERE quiz_id = v_quiz_id
      ) THEN
        INSERT INTO public.quiz_questions (quiz_id, question_text, options, sort_order) VALUES
        (v_quiz_id, 'What is the primary learning objective of ' || r.mod_title || '?', jsonb_build_array(
          jsonb_build_object('id','a','text','Understand core concepts and apply them in labs', 'is_correct', true),
          jsonb_build_object('id','b','text','Memorize definitions only', 'is_correct', false),
          jsonb_build_object('id','c','text','Skip hands-on practice', 'is_correct', false),
          jsonb_build_object('id','d','text','Avoid production patterns', 'is_correct', false)
        ), 1),
        (v_quiz_id, 'Which resource should you review before the live session?', jsonb_build_array(
          jsonb_build_object('id','a','text','Module slides (PPT) for each topic', 'is_correct', true),
          jsonb_build_object('id','b','text','Unrelated social media posts', 'is_correct', false),
          jsonb_build_object('id','c','text','Only the capstone brief', 'is_correct', false),
          jsonb_build_object('id','d','text','Nothing — skip prep', 'is_correct', false)
        ), 2);
      END IF;
    END IF;
  END LOOP;

  -- Retire legacy DOP modules from the old 7-module layout (now 4 phases × 1 module)
  UPDATE public.program_modules
  SET is_published = false, updated_at = NOW()
  WHERE course_id IN (SELECT id FROM public.courses WHERE upper(code) = 'DOP')
    AND module_number > 4;
END;
$$;

SELECT public.seed_lms_curriculum();

-- Re-run anytime after curriculum changes:
-- SELECT public.seed_lms_curriculum();
--
-- Then run: npm run sync:quiz-seed  →  supabase/lms-seed-quizzes.sql in SQL Editor
-- Or: SELECT public.seed_topic_quizzes();
--
-- Quiz best-of-3 attempts: run supabase/lms-quiz-attempts-best-score.sql once

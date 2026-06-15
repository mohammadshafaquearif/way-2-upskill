-- LMS learner dynamic data — run after lms-schema.sql
-- Assignments, submissions, sessions RLS + DOP phase project seed

ALTER TABLE public.assignments
  ADD COLUMN IF NOT EXISTS label VARCHAR(50),
  ADD COLUMN IF NOT EXISTS deliverables JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS is_capstone BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS sort_order SMALLINT DEFAULT 0;

ALTER TABLE public.assignment_submissions
  ADD COLUMN IF NOT EXISTS github_url TEXT,
  ADD COLUMN IF NOT EXISTS demo_url TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_assignments_course_module
  ON public.assignments(course_id, module_id);

-- Learners read assignments for enrolled courses
DROP POLICY IF EXISTS assignments_learner_read ON public.assignments;
CREATE POLICY assignments_learner_read ON public.assignments
  FOR SELECT TO authenticated
  USING (course_id IS NOT NULL AND public.has_course_access(course_id));

-- Learners manage own submissions
DROP POLICY IF EXISTS assignment_submissions_own ON public.assignment_submissions;
CREATE POLICY assignment_submissions_own ON public.assignment_submissions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.sync_assignment_progress_after_submit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_module_id UUID;
BEGIN
  IF NEW.user_id IS NULL OR NEW.assignment_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT a.module_id INTO v_module_id
  FROM public.assignments a
  WHERE a.id = NEW.assignment_id;

  IF v_module_id IS NULL THEN
    RETURN NEW;
  END IF;

  IF lower(coalesce(NEW.status, 'submitted')) IN ('submitted', 'reviewed', 'approved') THEN
    INSERT INTO public.learner_module_progress (user_id, module_id, assignment_done, status, updated_at)
    VALUES (NEW.user_id, v_module_id, true, 'in_progress', NOW())
    ON CONFLICT (user_id, module_id) DO UPDATE SET
      assignment_done = true,
      status = CASE
        WHEN public.learner_module_progress.quiz_passed AND EXCLUDED.assignment_done THEN 'completed'
        ELSE COALESCE(public.learner_module_progress.status, 'in_progress')
      END,
      completed_at = CASE
        WHEN public.learner_module_progress.quiz_passed AND EXCLUDED.assignment_done
          THEN COALESCE(public.learner_module_progress.completed_at, NOW())
        ELSE public.learner_module_progress.completed_at
      END,
      updated_at = NOW();
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS assignment_submissions_progress ON public.assignment_submissions;
CREATE TRIGGER assignment_submissions_progress
  AFTER INSERT OR UPDATE OF status ON public.assignment_submissions
  FOR EACH ROW EXECUTE FUNCTION public.sync_assignment_progress_after_submit();

-- Seed DOP phase projects as assignments (idempotent)
CREATE OR REPLACE FUNCTION public.seed_phase_assignments(p_course_code TEXT DEFAULT 'DOP')
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_course_id UUID;
  v_mod RECORD;
  v_defs JSONB := '[
    {"num":1,"label":"Project 1","title":"Cloud Infrastructure Automation Platform","desc":"Design and implement a cloud environment with IAM users, VPC networking, EC2 instances, and S3 storage — automating repetitive admin tasks with Bash scripting.","due":"2026-06-22","deliverables":["IAM users, VPC, EC2, and S3 setup","Bash scripts to automate admin tasks"],"skills":["Linux","Bash","Git","AWS IAM","EC2","S3","VPC"],"capstone":false},
    {"num":2,"label":"Project 2","title":"Production Application Delivery Platform","desc":"Containerize an application, deploy it on Kubernetes, and build an automated CI/CD pipeline that tests, builds, and deploys updates to production.","due":"2026-07-15","deliverables":["Containerized application","Kubernetes deployment","Automated CI/CD pipeline (test → build → deploy)"],"skills":["Docker","Kubernetes","Helm","Jenkins","GitHub Actions"],"capstone":false},
    {"num":3,"label":"Project 3","title":"Enterprise Infrastructure Automation Platform","desc":"Provision multi-environment infrastructure with Terraform and Ansible while implementing security controls, secrets management, and automated compliance checks.","due":"2026-08-10","deliverables":["Terraform + Ansible multi-environment infrastructure","Security controls, secrets management, and compliance checks"],"skills":["Terraform","Ansible","DevSecOps","Vault"],"capstone":false},
    {"num":4,"label":"Capstone","title":"AI-Powered DevOps Command Center","desc":"Architect and deploy an end-to-end production-grade DevOps platform — infrastructure automation, Kubernetes orchestration, CI/CD, observability, security controls, and AI-assisted operations ready for recruiter review.","due":"2026-09-05","deliverables":["Kubernetes Production Cluster","CI/CD Deployment Pipeline","Infrastructure as Code Platform","Monitoring & Alerting Stack (Prometheus, Grafana)","AI-Powered Incident Assistant","Security & Compliance Controls"],"skills":["AWS","Docker","Kubernetes","Terraform","Ansible","Jenkins","GitHub Actions","Prometheus","Grafana","DevSecOps","AIOps","SRE"],"capstone":true}
  ]'::jsonb;
  v_def JSONB;
BEGIN
  SELECT id INTO v_course_id FROM public.courses WHERE upper(btrim(code)) = upper(btrim(p_course_code)) LIMIT 1;
  IF v_course_id IS NULL THEN
    RETURN;
  END IF;

  FOR v_def IN SELECT * FROM jsonb_array_elements(v_defs)
  LOOP
    SELECT pm.id, pm.module_number INTO v_mod
    FROM public.program_modules pm
    WHERE pm.course_id = v_course_id
      AND pm.module_number = (v_def->>'num')::int
      AND pm.is_published = true
    LIMIT 1;

    IF v_mod.id IS NULL THEN
      CONTINUE;
    END IF;

    INSERT INTO public.assignments (
      course_id, module_id, title, description, due_date,
      label, deliverables, skills, is_capstone, sort_order
    )
    VALUES (
      v_course_id,
      v_mod.id,
      v_def->>'title',
      v_def->>'desc',
      (v_def->>'due')::date,
      v_def->>'label',
      v_def->'deliverables',
      v_def->'skills',
      coalesce((v_def->>'capstone')::boolean, false),
      (v_def->>'num')::smallint
    )
    ON CONFLICT (course_id, module_id) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      due_date = EXCLUDED.due_date,
      label = EXCLUDED.label,
      deliverables = EXCLUDED.deliverables,
      skills = EXCLUDED.skills,
      is_capstone = EXCLUDED.is_capstone,
      sort_order = EXCLUDED.sort_order,
      updated_at = NOW();
  END LOOP;
END;
$$;

SELECT public.seed_phase_assignments('DOP');

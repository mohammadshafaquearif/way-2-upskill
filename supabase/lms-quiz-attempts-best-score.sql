-- =============================================================================
-- UPGRADE ONLY — best-of-3 quiz attempts + learner_quiz_progress
-- =============================================================================
--
-- SKIP THIS FILE if you already ran the current supabase/lms-schema.sql end-to-end.
-- That file already creates quizzes, learner_quiz_progress, and sync_quiz_progress_after_attempt().
--
-- Use this file ONLY when upgrading an older database that had lms-schema.sql
-- applied BEFORE learner_quiz_progress was added.
--
-- Required order (fresh Supabase project):
--   1. schema.sql
--   2. admin-phase1.sql
--   3. enrollment-workflow.sql
--   4. security-hardening.sql
--   5. lms-schema.sql          ← creates public.quizzes and all LMS tables
--   6. lms-seed-quizzes.sql    ← or SELECT public.seed_topic_quizzes();
--   7. (optional) this file     ← only for old DBs missing learner_quiz_progress
-- =============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'quizzes'
  ) THEN
    RAISE EXCEPTION
      'Missing table public.quizzes. Run supabase/lms-schema.sql first, then lms-seed-quizzes.sql. '
      'You do not need this upgrade file on a fresh install if lms-schema.sql completed successfully.';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'quiz_attempts'
  ) THEN
    RAISE EXCEPTION
      'Missing table public.quiz_attempts. Run supabase/lms-schema.sql first.';
  END IF;
END $$;

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

ALTER TABLE public.learner_quiz_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS learner_quiz_progress_own ON public.learner_quiz_progress;
CREATE POLICY learner_quiz_progress_own ON public.learner_quiz_progress
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS learner_quiz_progress_admin ON public.learner_quiz_progress;
CREATE POLICY learner_quiz_progress_admin ON public.learner_quiz_progress
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

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
    VALUES (
      NEW.user_id,
      v_module_id,
      v_best_passed,
      'in_progress',
      NOW()
    )
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

-- Backfill learner_quiz_progress from existing attempts
INSERT INTO public.learner_quiz_progress (user_id, quiz_id, attempts_used, best_score, best_passed, last_attempt_at, updated_at)
SELECT
  a.user_id,
  a.quiz_id,
  COUNT(*)::smallint,
  MAX(a.score)::smallint,
  MAX(a.score) >= COALESCE(MAX(q.pass_score), 70),
  MAX(a.submitted_at),
  NOW()
FROM public.quiz_attempts a
JOIN public.quizzes q ON q.id = a.quiz_id
WHERE a.submitted_at IS NOT NULL
GROUP BY a.user_id, a.quiz_id
ON CONFLICT (user_id, quiz_id) DO UPDATE
SET attempts_used = EXCLUDED.attempts_used,
    best_score = EXCLUDED.best_score,
    best_passed = EXCLUDED.best_passed,
    last_attempt_at = EXCLUDED.last_attempt_at,
    updated_at = NOW();

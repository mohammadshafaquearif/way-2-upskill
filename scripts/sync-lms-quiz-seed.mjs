#!/usr/bin/env node
/**
 * Generates supabase/lms-seed-quizzes.sql from src/lib/lms/quiz-catalog.json
 * Run: npm run sync:quiz-seed
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const catalogPath = join(root, 'src/lib/lms/quiz-catalog.json');
const outPath = join(root, 'supabase/lms-seed-quizzes.sql');

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

function toDbOptions(options, correctAnswer) {
  return options.map((text, index) => ({
    id: String.fromCharCode(97 + index),
    text,
    is_correct: text === correctAnswer,
  }));
}

function generateSql(items) {
  const entries = items.map((item) => ({
    course_code: item.courseCode,
    module_number: item.moduleNumber,
    topic_sort: item.topicSort,
    topic_title: item.topicTitle ?? null,
    quiz_title: item.quizTitle,
    pass_score: item.passScore ?? 70,
    max_attempts: item.maxAttempts ?? 3,
    time_limit_min: item.questions.length * 2,
    questions: item.questions.map((q) => ({
      question: q.question,
      options: toDbOptions(q.options, q.correctAnswer),
    })),
  }));

  return `-- AUTO-GENERATED — do not edit by hand
-- Source: src/lib/lms/quiz-catalog.json
-- Regenerate: npm run sync:quiz-seed
-- Run in Supabase SQL Editor after lms-schema.sql

CREATE OR REPLACE FUNCTION public.seed_topic_quizzes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  entry RECORD;
  v_question RECORD;
  v_course_id UUID;
  v_module_id UUID;
  v_topic_id UUID;
  v_quiz_id UUID;
  v_sort INT;
  v_expected INT;
  v_existing INT;
BEGIN
  FOR entry IN
    SELECT *
    FROM jsonb_to_recordset($catalog$
${JSON.stringify(entries, null, 2)}
$catalog$::jsonb) AS x(
      course_code text,
      module_number int,
      topic_sort int,
      topic_title text,
      quiz_title text,
      pass_score int,
      max_attempts int,
      time_limit_min int,
      questions jsonb
    )
  LOOP
    SELECT id INTO v_course_id
    FROM public.courses
    WHERE upper(code) = upper(entry.course_code)
    LIMIT 1;

    IF v_course_id IS NULL THEN
      RAISE NOTICE 'Course % not found — skipping quiz %', entry.course_code, entry.quiz_title;
      CONTINUE;
    END IF;

    SELECT id INTO v_module_id
    FROM public.program_modules
    WHERE course_id = v_course_id AND module_number = entry.module_number
    LIMIT 1;

    IF v_module_id IS NULL THEN
      RAISE NOTICE 'Module % for % not found — run seed_lms_curriculum() first', entry.module_number, entry.course_code;
      CONTINUE;
    END IF;

    IF entry.topic_title IS NOT NULL THEN
      UPDATE public.module_topics
      SET title = entry.topic_title, is_published = true
      WHERE module_id = v_module_id AND sort_order = entry.topic_sort;
    END IF;

    SELECT id INTO v_topic_id
    FROM public.module_topics
    WHERE module_id = v_module_id AND sort_order = entry.topic_sort
    LIMIT 1;

    IF v_topic_id IS NULL THEN
      RAISE NOTICE 'Topic sort % not found for % M% — skipping', entry.topic_sort, entry.course_code, entry.module_number;
      CONTINUE;
    END IF;

    INSERT INTO public.quizzes (course_id, topic_id, title, pass_score, max_attempts, time_limit_min, is_published)
    SELECT v_course_id, v_topic_id, entry.quiz_title, entry.pass_score, entry.max_attempts, entry.time_limit_min, true
    WHERE NOT EXISTS (SELECT 1 FROM public.quizzes existing_quiz WHERE existing_quiz.topic_id = v_topic_id);

    SELECT id INTO v_quiz_id FROM public.quizzes WHERE topic_id = v_topic_id LIMIT 1;

    UPDATE public.quizzes
    SET
      title = entry.quiz_title,
      pass_score = entry.pass_score,
      max_attempts = entry.max_attempts,
      time_limit_min = entry.time_limit_min
    WHERE id = v_quiz_id;

    v_expected := jsonb_array_length(entry.questions);
    SELECT count(*)::int INTO v_existing FROM public.quiz_questions WHERE quiz_id = v_quiz_id;

    IF v_existing = v_expected THEN
      RAISE NOTICE 'Quiz already seeded: % (% questions)', entry.quiz_title, v_existing;
      CONTINUE;
    END IF;

    DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id;

    v_sort := 0;
    FOR v_question IN SELECT * FROM jsonb_to_recordset(entry.questions) AS r(question text, options jsonb)
    LOOP
      v_sort := v_sort + 1;
      INSERT INTO public.quiz_questions (quiz_id, question_text, options, sort_order)
      VALUES (v_quiz_id, v_question.question, v_question.options, v_sort);
    END LOOP;

    RAISE NOTICE 'Seeded quiz: % (% questions)', entry.quiz_title, v_sort;
  END LOOP;
END;
$$;

SELECT public.seed_topic_quizzes();
`;
}

writeFileSync(outPath, generateSql(catalog), 'utf8');
console.log(`Wrote ${outPath} (${catalog.length} topic quizzes)`);

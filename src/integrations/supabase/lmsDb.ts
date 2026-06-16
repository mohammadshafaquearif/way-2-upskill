import { supabase } from './client';
import type {
  DbAssignmentRow,
  DbAssignmentSubmissionRow,
  DbLearningAsset,
  DbModuleProgress,
  DbModuleTopic,
  DbProgramModule,
  DbProgramPhase,
  DbQuizAttempt,
  DbQuizAttemptListItem,
  DbQuiz,
  DbQuizQuestion,
  LearnerOverview,
  QuizAttemptSummary,
  QuizOption,
  QuizSubmitResult,
} from '@/lib/lms/dbTypes';
import type { LMSAssignment, LMSPhase, LMSModule, LMSProject, LMSSession, ProgramId } from '@/lib/lms/types';
import {
  mapAssignmentToProject,
  mapDbAssignmentToLms,
  mapDbSessionToLms,
} from '@/lib/lms/learnerMappers';
import { getDopPhaseProject } from '@/lib/lms/dopProjects';

function mapAsset(row: Record<string, unknown>): DbLearningAsset {
  return {
    id: row.id as string,
    course_id: row.course_id as string,
    scope: row.scope as DbLearningAsset['scope'],
    topic_id: (row.topic_id as string) ?? null,
    module_id: (row.module_id as string) ?? null,
    asset_type: row.asset_type as DbLearningAsset['asset_type'],
    title: row.title as string,
    description: (row.description as string) ?? null,
    storage_path: (row.storage_path as string) ?? null,
    external_url: (row.external_url as string) ?? null,
    embed_url: (row.embed_url as string) ?? null,
    duration_sec: row.duration_sec != null ? Number(row.duration_sec) : null,
    is_required: row.is_required !== false,
    is_supplementary: row.is_supplementary === true,
    sort_order: Number(row.sort_order) || 0,
    is_published: row.is_published !== false,
  };
}

function stripCorrectFlags(options: QuizOption[]): QuizOption[] {
  return options.map(({ id, text }) => ({ id, text }));
}

export function mapDbPhasesToLms(phases: DbProgramPhase[], programId?: ProgramId): LMSPhase[] {
  return phases.map((phase) => ({
    id: phase.slug,
    phase: phase.label,
    label: phase.title,
    meta: phase.meta ?? undefined,
    project: programId === 'dop' ? getDopPhaseProject(phase.slug) : undefined,
    modules: phase.modules.map(
      (mod): LMSModule => ({
        id: mod.module_number,
        dbId: mod.id,
        title: mod.title,
        phaseId: phase.slug,
        topics: mod.topics.map((t) => t.title),
        hasQuiz: mod.has_quiz,
        hasAssignment: mod.has_assignment,
        lessonCount: mod.topics.length,
        quizId: mod.quiz_id ?? undefined,
      }),
    ),
  }));
}

export const lmsDb = {
  async getCurriculumByCourseId(courseId: string): Promise<DbProgramPhase[]> {
    const { data: phases, error: phaseErr } = await supabase
      .from('program_phases')
      .select('*')
      .eq('course_id', courseId)
      .eq('is_published', true)
      .order('sort_order');

    if (phaseErr) throw new Error(phaseErr.message);
    if (!phases?.length) return [];

    const phaseIds = phases.map((p) => p.id as string);

    const { data: modules, error: modErr } = await supabase
      .from('program_modules')
      .select('*')
      .in('phase_id', phaseIds)
      .eq('is_published', true)
      .order('sort_order');

    if (modErr) throw new Error(modErr.message);

    const moduleIds = (modules ?? []).map((m) => m.id as string);

    const [topicsRes, assetsRes, quizzesRes] = await Promise.all([
      moduleIds.length
        ? supabase
            .from('module_topics')
            .select('*')
            .in('module_id', moduleIds)
            .eq('is_published', true)
            .order('sort_order')
        : Promise.resolve({ data: [], error: null }),
      moduleIds.length
        ? supabase
            .from('learning_assets')
            .select('*')
            .eq('course_id', courseId)
            .eq('is_published', true)
            .order('sort_order')
        : Promise.resolve({ data: [], error: null }),
      moduleIds.length
        ? supabase
            .from('quizzes')
            .select('id, module_id, topic_id')
            .eq('course_id', courseId)
            .eq('is_published', true)
        : Promise.resolve({ data: [], error: null }),
    ]);

    if (topicsRes.error) throw new Error(topicsRes.error.message);
    if (assetsRes.error) throw new Error(assetsRes.error.message);
    if (quizzesRes.error) throw new Error(quizzesRes.error.message);

    const assetsByTopic = new Map<string, DbLearningAsset[]>();
    for (const row of assetsRes.data ?? []) {
      const asset = mapAsset(row as Record<string, unknown>);
      if (!asset.topic_id) continue;
      const list = assetsByTopic.get(asset.topic_id) ?? [];
      list.push(asset);
      assetsByTopic.set(asset.topic_id, list);
    }

    const quizByTopic = new Map<string, string>();
    for (const q of quizzesRes.data ?? []) {
      if (q.topic_id) quizByTopic.set(q.topic_id as string, q.id as string);
    }

    const topicsByModule = new Map<string, DbModuleTopic[]>();
    for (const row of topicsRes.data ?? []) {
      const topicId = row.id as string;
      const moduleId = row.module_id as string;
      const topic: DbModuleTopic = {
        id: topicId,
        module_id: moduleId,
        title: row.title as string,
        sort_order: Number(row.sort_order) || 0,
        assets: assetsByTopic.get(topicId) ?? [],
        quiz_id: quizByTopic.get(topicId) ?? null,
      };
      const list = topicsByModule.get(moduleId) ?? [];
      list.push(topic);
      topicsByModule.set(moduleId, list);
    }

    const modulesByPhase = new Map<string, DbProgramModule[]>();
    for (const row of modules ?? []) {
      const modId = row.id as string;
      const phaseId = row.phase_id as string;
      const mod: DbProgramModule = {
        id: modId,
        course_id: row.course_id as string,
        phase_id: phaseId,
        module_number: Number(row.module_number),
        slug: row.slug as string,
        title: row.title as string,
        description: (row.description as string) ?? null,
        has_quiz: row.has_quiz !== false,
        has_assignment: row.has_assignment === true,
        pass_score: Number(row.pass_score) || 70,
        topics: topicsByModule.get(modId) ?? [],
        quiz_id: null,
      };
      const list = modulesByPhase.get(phaseId) ?? [];
      list.push(mod);
      modulesByPhase.set(phaseId, list);
    }

    return phases.map((row) => ({
      id: row.id as string,
      course_id: row.course_id as string,
      slug: row.slug as string,
      title: row.title as string,
      label: row.label as string,
      meta: (row.meta as string) ?? null,
      sort_order: Number(row.sort_order) || 0,
      modules: modulesByPhase.get(row.id as string) ?? [],
    }));
  },

  async getModuleDetail(
    courseId: string,
    moduleNumber: number,
  ): Promise<DbProgramModule | null> {
    const { data: mod, error } = await supabase
      .from('program_modules')
      .select('*')
      .eq('course_id', courseId)
      .eq('module_number', moduleNumber)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!mod) return null;

    const moduleId = mod.id as string;

    const [topicsRes, assetsRes, topicQuizzesRes] = await Promise.all([
      supabase
        .from('module_topics')
        .select('*')
        .eq('module_id', moduleId)
        .eq('is_published', true)
        .order('sort_order'),
      supabase
        .from('learning_assets')
        .select('*')
        .eq('course_id', courseId)
        .eq('is_published', true)
        .order('sort_order'),
      supabase
        .from('quizzes')
        .select('id, topic_id')
        .eq('course_id', courseId)
        .eq('is_published', true)
        .not('topic_id', 'is', null),
    ]);

    if (topicsRes.error) throw new Error(topicsRes.error.message);
    if (assetsRes.error) throw new Error(assetsRes.error.message);

    const quizByTopic = new Map<string, string>();
    for (const q of topicQuizzesRes.data ?? []) {
      if (q.topic_id) quizByTopic.set(q.topic_id as string, q.id as string);
    }

    const assetsByTopic = new Map<string, DbLearningAsset[]>();
    const moduleAssets: DbLearningAsset[] = [];

    for (const row of assetsRes.data ?? []) {
      const asset = mapAsset(row as Record<string, unknown>);
      if (asset.topic_id) {
        const list = assetsByTopic.get(asset.topic_id) ?? [];
        list.push(asset);
        assetsByTopic.set(asset.topic_id, list);
      } else if (asset.module_id === moduleId) {
        moduleAssets.push(asset);
      }
    }

    const topics: DbModuleTopic[] = (topicsRes.data ?? []).map((row) => ({
      id: row.id as string,
      module_id: moduleId,
      title: row.title as string,
      sort_order: Number(row.sort_order) || 0,
      assets: assetsByTopic.get(row.id as string) ?? [],
      quiz_id: quizByTopic.get(row.id as string) ?? null,
    }));

    return {
      id: moduleId,
      course_id: mod.course_id as string,
      phase_id: mod.phase_id as string,
      module_number: Number(mod.module_number),
      slug: mod.slug as string,
      title: mod.title as string,
      description: (mod.description as string) ?? null,
      has_quiz: mod.has_quiz !== false,
      has_assignment: mod.has_assignment === true,
      pass_score: Number(mod.pass_score) || 70,
      topics,
      quiz_id: null,
      moduleAssets,
    };
  },

  async getQuiz(quizId: string, includeAnswers = false): Promise<DbQuiz | null> {
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!quiz) return null;

    const { data: questions, error: qErr } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizId)
      .order('sort_order');

    if (qErr) throw new Error(qErr.message);

    const mappedQuestions: DbQuizQuestion[] = (questions ?? []).map((row) => {
      const options = (row.options as QuizOption[]) ?? [];
      return {
        id: row.id as string,
        quiz_id: quizId,
        question_text: row.question_text as string,
        question_type: (row.question_type as string) ?? 'mcq',
        options: includeAnswers ? options : stripCorrectFlags(options),
        explanation: (row.explanation as string) ?? null,
        sort_order: Number(row.sort_order) || 0,
      };
    });

    return {
      id: quiz.id as string,
      course_id: quiz.course_id as string,
      module_id: (quiz.module_id as string) ?? null,
      topic_id: (quiz.topic_id as string) ?? null,
      title: quiz.title as string,
      pass_score: Number(quiz.pass_score) || 70,
      time_limit_min: quiz.time_limit_min != null ? Number(quiz.time_limit_min) : null,
      max_attempts: Number(quiz.max_attempts) || 3,
      questions: mappedQuestions,
    };
  },

  async getQuizAttemptSummary(
    userId: string,
    quizId: string,
    passScore: number,
    maxAttempts: number,
  ): Promise<QuizAttemptSummary> {
    const { data: progress } = await supabase
      .from('learner_quiz_progress')
      .select('attempts_used, best_score, best_passed')
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .maybeSingle();

    if (progress) {
      const attemptsUsed = Number(progress.attempts_used) || 0;
      const bestScore = Number(progress.best_score) || 0;
      const bestPassed = progress.best_passed === true;
      const attemptsRemaining = Math.max(0, maxAttempts - attemptsUsed);
      return {
        attemptsUsed,
        attemptsRemaining,
        bestScore,
        bestPassed,
        maxAttempts,
        passScore,
        canRetry: attemptsRemaining > 0,
      };
    }

    const { data: attempts, count } = await supabase
      .from('quiz_attempts')
      .select('score', { count: 'exact' })
      .eq('quiz_id', quizId)
      .eq('user_id', userId)
      .not('submitted_at', 'is', null);

    const attemptsUsed = count ?? 0;
    const bestScore =
      attempts?.length ? Math.max(...attempts.map((a) => Number(a.score) || 0)) : 0;
    const bestPassed = bestScore >= passScore;
    const attemptsRemaining = Math.max(0, maxAttempts - attemptsUsed);

    return {
      attemptsUsed,
      attemptsRemaining,
      bestScore,
      bestPassed,
      maxAttempts,
      passScore,
      canRetry: attemptsRemaining > 0,
    };
  },

  async submitQuizAttempt(
    userId: string,
    quizId: string,
    answers: Record<string, string>,
  ): Promise<QuizSubmitResult> {
    const quiz = await this.getQuiz(quizId, true);
    if (!quiz) throw new Error('Quiz not found');

    const summary = await this.getQuizAttemptSummary(
      userId,
      quizId,
      quiz.pass_score,
      quiz.max_attempts,
    );

    if (!summary.canRetry) {
      throw new Error('Maximum quiz attempts reached');
    }

    let correct = 0;
    const total = quiz.questions.length;

    for (const q of quiz.questions) {
      const selected = answers[q.id];
      const match = q.options.find((o) => o.id === selected && o.is_correct);
      if (match) correct += 1;
    }

    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = score >= quiz.pass_score;

    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        quiz_id: quizId,
        user_id: userId,
        score,
        passed,
        answers,
        submitted_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);

    const updated = await this.getQuizAttemptSummary(
      userId,
      quizId,
      quiz.pass_score,
      quiz.max_attempts,
    );

    return {
      score,
      passed,
      attemptId: data.id as string,
      attemptsUsed: updated.attemptsUsed,
      attemptsRemaining: updated.attemptsRemaining,
      bestScore: updated.bestScore,
      bestPassed: updated.bestPassed,
      canRetry: updated.canRetry,
    };
  },

  async getQuizAttempt(attemptId: string): Promise<DbQuizAttempt | null> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('id, quiz_id, user_id, score, passed, answers, submitted_at')
      .eq('id', attemptId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;

    return {
      id: data.id as string,
      quiz_id: data.quiz_id as string,
      user_id: data.user_id as string,
      score: Number(data.score) || 0,
      passed: data.passed === true,
      answers: (data.answers as Record<string, string>) ?? {},
      submitted_at: (data.submitted_at as string) ?? null,
    };
  },

  async listQuizAttempts(userId: string, quizId: string): Promise<DbQuizAttemptListItem[]> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('id, score, passed, submitted_at')
      .eq('quiz_id', quizId)
      .eq('user_id', userId)
      .not('submitted_at', 'is', null)
      .order('submitted_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data ?? []).map((row) => ({
      id: row.id as string,
      score: Number(row.score) || 0,
      passed: row.passed === true,
      submitted_at: (row.submitted_at as string) ?? null,
    }));
  },

  async markAssetComplete(userId: string, assetId: string): Promise<void> {
    const { error } = await supabase.from('learner_asset_progress').upsert(
      {
        user_id: userId,
        asset_id: assetId,
        completed: true,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,asset_id' },
    );
    if (error) throw new Error(error.message);
  },

  async getModuleProgress(userId: string, courseId: string): Promise<DbModuleProgress[]> {
    const { data: modules, error: modErr } = await supabase
      .from('program_modules')
      .select('id')
      .eq('course_id', courseId);

    if (modErr) throw new Error(modErr.message);
    const moduleIds = (modules ?? []).map((m) => m.id as string);
    if (!moduleIds.length) return [];

    const { data, error } = await supabase
      .from('learner_module_progress')
      .select('*')
      .eq('user_id', userId)
      .in('module_id', moduleIds);

    if (error) throw new Error(error.message);

    return (data ?? []).map((row) => ({
      module_id: row.module_id as string,
      status: (row.status as string) ?? 'locked',
      quiz_passed: row.quiz_passed === true,
      assignment_done: row.assignment_done === true,
      topics_done: Number(row.topics_done) || 0,
    }));
  },

  async getSignedAssetUrl(storagePath: string, expiresIn = 900): Promise<string | null> {
    const { data, error } = await supabase.storage
      .from('lms-content')
      .createSignedUrl(storagePath, expiresIn);

    if (error) return null;
    return data.signedUrl;
  },

  async getLearnerAssignments(userId: string, courseId: string): Promise<LMSAssignment[]> {
    const { data: rows, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('course_id', courseId)
      .order('sort_order', { ascending: true })
      .order('due_date', { ascending: true });

    if (error) throw new Error(error.message);
    if (!rows?.length) return [];

    const assignmentIds = rows.map((r) => r.id as string);

    const [{ data: subs }, { data: modules }] = await Promise.all([
      supabase
        .from('assignment_submissions')
        .select('*')
        .eq('user_id', userId)
        .in('assignment_id', assignmentIds)
        .order('submitted_at', { ascending: false }),
      supabase
        .from('program_modules')
        .select('id, module_number')
        .eq('course_id', courseId),
    ]);

    const subByAssignment = new Map<string, DbAssignmentSubmissionRow>();
    for (const row of subs ?? []) {
      const aid = row.assignment_id as string;
      if (!subByAssignment.has(aid)) {
        subByAssignment.set(aid, row as DbAssignmentSubmissionRow);
      }
    }

    const moduleNumById = new Map<string, number>();
    for (const m of modules ?? []) {
      moduleNumById.set(m.id as string, Number(m.module_number));
    }

    return rows.map((row) => {
      const r = row as Record<string, unknown>;
      const dbRow: DbAssignmentRow = {
        id: r.id as string,
        course_id: r.course_id as string,
        module_id: (r.module_id as string) ?? null,
        title: r.title as string,
        description: (r.description as string) ?? null,
        due_date: r.due_date as string,
        label: (r.label as string) ?? null,
        deliverables: (r.deliverables as string[]) ?? [],
        skills: (r.skills as string[]) ?? [],
        is_capstone: r.is_capstone === true,
        sort_order: r.sort_order != null ? Number(r.sort_order) : null,
      };
      const moduleNumber = dbRow.module_id
        ? moduleNumById.get(dbRow.module_id)
        : undefined;
      return mapDbAssignmentToLms(dbRow, subByAssignment.get(dbRow.id), moduleNumber);
    });
  },

  async getLearnerProjects(userId: string, courseId: string): Promise<LMSProject[]> {
    const { data: rows, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('course_id', courseId)
      .order('sort_order', { ascending: true });

    if (error) throw new Error(error.message);
    if (!rows?.length) return [];

    const assignmentIds = rows.map((r) => r.id as string);
    const moduleIds = rows.map((r) => r.module_id as string).filter(Boolean);

    const [subsRes, modulesRes, progressRes] = await Promise.all([
      supabase
        .from('assignment_submissions')
        .select('*')
        .eq('user_id', userId)
        .in('assignment_id', assignmentIds)
        .order('submitted_at', { ascending: false }),
      supabase
        .from('program_modules')
        .select('id, module_number')
        .eq('course_id', courseId),
      moduleIds.length
        ? supabase
            .from('learner_module_progress')
            .select('*')
            .eq('user_id', userId)
            .in('module_id', moduleIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

    if (subsRes.error) throw new Error(subsRes.error.message);
    if (progressRes.error) throw new Error(progressRes.error.message);

    const subByAssignment = new Map<string, DbAssignmentSubmissionRow>();
    for (const row of subsRes.data ?? []) {
      const aid = row.assignment_id as string;
      if (!subByAssignment.has(aid)) {
        subByAssignment.set(aid, row as DbAssignmentSubmissionRow);
      }
    }

    const moduleNumById = new Map<string, number>();
    for (const m of modulesRes.data ?? []) {
      moduleNumById.set(m.id as string, Number(m.module_number));
    }

    const progressByModule = new Map<string, DbModuleProgress>();
    for (const row of progressRes.data ?? []) {
      progressByModule.set(row.module_id as string, {
        module_id: row.module_id as string,
        status: (row.status as string) ?? 'locked',
        quiz_passed: row.quiz_passed === true,
        assignment_done: row.assignment_done === true,
        topics_done: Number(row.topics_done) || 0,
      });
    }

    return rows.map((row) => {
      const r = row as Record<string, unknown>;
      const dbRow: DbAssignmentRow = {
        id: r.id as string,
        course_id: r.course_id as string,
        module_id: (r.module_id as string) ?? null,
        title: r.title as string,
        description: (r.description as string) ?? null,
        due_date: r.due_date as string,
        label: (r.label as string) ?? null,
        deliverables: (r.deliverables as string[]) ?? [],
        skills: (r.skills as string[]) ?? [],
        is_capstone: r.is_capstone === true,
        sort_order: r.sort_order != null ? Number(r.sort_order) : null,
      };
      const moduleNumber = dbRow.module_id
        ? moduleNumById.get(dbRow.module_id)
        : undefined;
      const assignment = mapDbAssignmentToLms(
        dbRow,
        subByAssignment.get(dbRow.id),
        moduleNumber,
      );
      const moduleProgress = dbRow.module_id
        ? progressByModule.get(dbRow.module_id)
        : undefined;
      return mapAssignmentToProject(
        assignment,
        subByAssignment.get(dbRow.id),
        moduleProgress,
      );
    });
  },

  async submitAssignment(
    userId: string,
    assignmentId: string,
    payload: { githubUrl?: string; demoUrl?: string; fileUrl?: string; notes?: string },
    learner?: { name?: string; email?: string },
  ): Promise<void> {
    const { data: existing } = await supabase
      .from('assignment_submissions')
      .select('id')
      .eq('user_id', userId)
      .eq('assignment_id', assignmentId)
      .maybeSingle();

    const row = {
      assignment_id: assignmentId,
      user_id: userId,
      learner_name: learner?.name ?? null,
      learner_email: learner?.email ?? null,
      github_url: payload.githubUrl?.trim() || null,
      demo_url: payload.demoUrl?.trim() || null,
      file_url: payload.fileUrl?.trim() || null,
      notes: payload.notes?.trim() || null,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    };

    if (existing?.id) {
      const { error } = await supabase
        .from('assignment_submissions')
        .update(row)
        .eq('id', existing.id as string);
      if (error) throw new Error(error.message);
      return;
    }

    const { error } = await supabase.from('assignment_submissions').insert(row);
    if (error) throw new Error(error.message);
  },

  async getLearnerSessions(courseId: string): Promise<LMSSession[]> {
    const { data, error } = await supabase
      .from('program_sessions')
      .select('*')
      .eq('course_id', courseId)
      .order('session_date', { ascending: false })
      .order('session_time', { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => mapDbSessionToLms(row as Record<string, unknown>));
  },

  async getLearnerOverview(userId: string, courseId: string): Promise<LearnerOverview> {
    const tree = await this.getCurriculumByCourseId(courseId);
    const allModules = tree.flatMap((p) => p.modules).sort((a, b) => a.module_number - b.module_number);
    const progressRows = await this.getModuleProgress(userId, courseId);

    const progressByModuleId = new Map(progressRows.map((p) => [p.module_id, p]));
    const enrichedProgress: DbModuleProgress[] = allModules.map((mod) => {
      const p = progressByModuleId.get(mod.id);
      return {
        module_id: mod.id,
        module_number: mod.module_number,
        status: p?.status ?? (mod.module_number === 1 ? 'in_progress' : 'locked'),
        quiz_passed: p?.quiz_passed ?? false,
        assignment_done: p?.assignment_done ?? false,
        topics_done: p?.topics_done ?? 0,
      };
    });

    let completedModules = enrichedProgress.filter((p) => p.status === 'completed').length;
    const totalModules = allModules.length || 1;
    let progress = Math.round((completedModules / totalModules) * 100);

    let current = allModules.find((mod) => {
      const p = progressByModuleId.get(mod.id);
      return p?.status !== 'completed';
    }) ?? allModules[0];

    if (!progressByModuleId.size && allModules.length > 0) {
      current = allModules[0];
      completedModules = 0;
      progress = 0;
    }

    const { data: lastProgress } = await supabase
      .from('learner_asset_progress')
      .select('asset_id, updated_at')
      .eq('user_id', userId)
      .eq('completed', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    let lastWatchedLesson = 'Getting started';
    if (lastProgress?.asset_id) {
      const { data: asset } = await supabase
        .from('learning_assets')
        .select('title')
        .eq('id', lastProgress.asset_id as string)
        .maybeSingle();
      if (asset?.title) lastWatchedLesson = asset.title as string;
    } else if (current?.topics[0]) {
      lastWatchedLesson = current.topics[0].title;
    }

    const assignments = await this.getLearnerAssignments(userId, courseId);
    const projects = await this.getLearnerProjects(userId, courseId);
    const pendingAssignments = assignments.filter((a) => a.status === 'pending').length;
    const submittedProjects = projects.filter(
      (p) => p.status === 'submitted' || p.status === 'reviewed',
    ).length;

    return {
      progress,
      completedModules,
      totalModules,
      currentModuleId: current?.module_number ?? null,
      currentModuleTitle: current?.title ?? 'Getting Started',
      currentModuleDbId: current?.id ?? null,
      lastWatchedLesson: lastWatchedLesson ?? 'Getting started',
      pendingAssignments,
      submittedProjects,
      certificateLocked: progress < 80,
      moduleProgress: enrichedProgress,
    };
  },
};

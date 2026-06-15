export type LmsAssetType =
  | 'ppt'
  | 'pdf'
  | 'zoom_recording'
  | 'youtube'
  | 'external_link'
  | 'lab'
  | 'assignment';

export type LmsAssetScope = 'topic' | 'module' | 'phase' | 'program';

export interface DbLearningAsset {
  id: string;
  course_id: string;
  scope: LmsAssetScope;
  topic_id: string | null;
  module_id: string | null;
  asset_type: LmsAssetType;
  title: string;
  description: string | null;
  storage_path: string | null;
  external_url: string | null;
  embed_url: string | null;
  duration_sec: number | null;
  is_required: boolean;
  is_supplementary: boolean;
  sort_order: number;
  is_published: boolean;
}

export interface DbModuleTopic {
  id: string;
  module_id: string;
  title: string;
  sort_order: number;
  assets: DbLearningAsset[];
  quiz_id?: string | null;
}

export interface DbProgramModule {
  id: string;
  course_id: string;
  phase_id: string;
  module_number: number;
  slug: string;
  title: string;
  description: string | null;
  has_quiz: boolean;
  has_assignment: boolean;
  pass_score: number;
  topics: DbModuleTopic[];
  quiz_id: string | null;
  moduleAssets?: DbLearningAsset[];
}

export interface DbProgramPhase {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  label: string;
  meta: string | null;
  sort_order: number;
  modules: DbProgramModule[];
}

export interface DbQuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: string;
  options: QuizOption[];
  explanation: string | null;
  sort_order: number;
}

export interface QuizOption {
  id: string;
  text: string;
  is_correct?: boolean;
}

export interface DbQuiz {
  id: string;
  course_id: string;
  module_id: string | null;
  topic_id: string | null;
  title: string;
  pass_score: number;
  time_limit_min: number | null;
  max_attempts: number;
  questions: DbQuizQuestion[];
}

export interface QuizSubmitResult {
  score: number;
  passed: boolean;
  attemptId: string;
  attemptsUsed: number;
  attemptsRemaining: number;
  bestScore: number;
  bestPassed: boolean;
  canRetry: boolean;
}

export interface QuizAttemptSummary {
  attemptsUsed: number;
  attemptsRemaining: number;
  bestScore: number;
  bestPassed: boolean;
  maxAttempts: number;
  passScore: number;
  canRetry: boolean;
}

export interface DbModuleProgress {
  module_id: string;
  status: string;
  quiz_passed: boolean;
  assignment_done: boolean;
  topics_done: number;
}

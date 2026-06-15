export interface QuizSessionDraft {
  userId: string;
  quizId: string;
  attemptNumber: number;
  phase: 'taking';
  currentIndex: number;
  answers: Record<string, string>;
  reviewQuestionIds: string[];
  /** Frozen remaining seconds while paused — timer does not drain until resume. */
  remainingSeconds: number;
  /** @deprecated Legacy wall-clock deadline; migrated to remainingSeconds on read. */
  endsAt?: number;
  startedAt: number;
  violationCount: number;
}

function draftKey(userId: string, quizId: string, attemptNumber: number): string {
  return `lms-quiz-draft:${userId}:${quizId}:${attemptNumber}`;
}

export function loadQuizDraft(
  userId: string,
  quizId: string,
  attemptNumber: number,
): QuizSessionDraft | null {
  try {
    const raw = localStorage.getItem(draftKey(userId, quizId, attemptNumber));
    if (!raw) return null;
    return JSON.parse(raw) as QuizSessionDraft;
  } catch {
    return null;
  }
}

export function saveQuizDraft(draft: QuizSessionDraft): void {
  try {
    localStorage.setItem(
      draftKey(draft.userId, draft.quizId, draft.attemptNumber),
      JSON.stringify(draft),
    );
  } catch {
    // Ignore quota errors — quiz can still continue in memory.
  }
}

export function clearQuizDraft(userId: string, quizId: string, attemptNumber: number): void {
  try {
    localStorage.removeItem(draftKey(userId, quizId, attemptNumber));
  } catch {
    // ignore
  }
}

export function isQuizDraftResumable(draft: QuizSessionDraft | null): boolean {
  if (!draft || draft.phase !== 'taking') return false;
  return getQuizDraftSecondsLeft(draft) > 0;
}

export function findResumableDraft(userId: string, quizId: string): QuizSessionDraft | null {
  const prefix = `lms-quiz-draft:${userId}:${quizId}:`;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(prefix)) continue;
    try {
      const draft = JSON.parse(localStorage.getItem(key)!) as QuizSessionDraft;
      if (isQuizDraftResumable(draft)) return draft;
    } catch {
      // ignore malformed entries
    }
  }
  return null;
}

export function getQuizDraftSecondsLeft(draft: QuizSessionDraft): number {
  if (typeof draft.remainingSeconds === 'number') {
    return Math.max(0, draft.remainingSeconds);
  }
  if (draft.endsAt) {
    return Math.max(0, Math.floor((draft.endsAt - Date.now()) / 1000));
  }
  return 0;
}

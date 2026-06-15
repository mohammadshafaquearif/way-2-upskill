import catalog from './quiz-catalog.json';

/** Default quiz duration: 2 minutes per question. */
export const QUIZ_MINUTES_PER_QUESTION = 2;

export function computeQuizTimeLimitMinutes(
  questionCount: number,
  storedLimit?: number | null,
): number {
  if (storedLimit != null && storedLimit > 0) return storedLimit;
  return questionCount * QUIZ_MINUTES_PER_QUESTION;
}

export function computeQuizTimeLimitSeconds(
  questionCount: number,
  storedLimit?: number | null,
): number {
  return computeQuizTimeLimitMinutes(questionCount, storedLimit) * 60;
}

export function formatQuizCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export interface RawQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface TopicQuizDefinition {
  courseCode: 'DOP' | 'AAC' | 'AWS' | 'DSP';
  moduleNumber: number;
  topicSort: number;
  topicTitle?: string;
  quizTitle: string;
  passScore?: number;
  maxAttempts?: number;
  questions: RawQuizQuestion[];
}

/** Single catalog — add new topic quizzes here (or edit quiz-catalog.json). */
export const TOPIC_QUIZ_CATALOG = catalog as TopicQuizDefinition[];

export function rawQuestionsToDbOptions(options: string[], correctAnswer: string) {
  return options.map((text, index) => ({
    id: String.fromCharCode(97 + index),
    text,
    is_correct: text === correctAnswer,
  }));
}

export function findTopicQuiz(courseCode: string, moduleNumber: number, topicSort: number) {
  return TOPIC_QUIZ_CATALOG.find(
    (q) =>
      q.courseCode === courseCode &&
      q.moduleNumber === moduleNumber &&
      q.topicSort === topicSort,
  );
}

import LinuxAdministrationQuiz, { type QuizPack } from './LinuxAdministrationQuiz';
import { ANSWER_PAYLOAD, QUESTIONS } from '@/lib/gitQuiz/questions.js';
import { REVISION_TOPICS } from '@/lib/gitQuiz/revision.js';

const pack: QuizPack = {
  title: 'Git & GitHub Interview Preparation',
  questions: QUESTIONS,
  topics: REVISION_TOPICS,
  answerPayload: ANSWER_PAYLOAD,
  progressPrefix: 'zyvotrix_git_quiz_progress_v1:',
  durationMinutes: 60,
};

const GitGithubQuiz = () => <LinuxAdministrationQuiz pack={pack} />;

export default GitGithubQuiz;

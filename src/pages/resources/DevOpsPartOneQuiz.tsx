import LinuxAdministrationQuiz, { type QuizPack } from './LinuxAdministrationQuiz';
import { ANSWER_PAYLOAD, QUESTIONS } from '@/lib/devopsQuiz/questions.js';
import { REVISION_TOPICS } from '@/lib/devopsQuiz/revision.js';

const pack: QuizPack = {
  title: 'Basic DevOps — Part 1',
  questions: QUESTIONS,
  topics: REVISION_TOPICS,
  answerPayload: ANSWER_PAYLOAD,
  progressPrefix: 'zyvotrix_devops_quiz_progress_v1:',
  durationMinutes: 100,
};

const DevOpsPartOneQuiz = () => <LinuxAdministrationQuiz pack={pack} />;

export default DevOpsPartOneQuiz;

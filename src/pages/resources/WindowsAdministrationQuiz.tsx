import LinuxAdministrationQuiz, { type QuizPack } from './LinuxAdministrationQuiz';
import { ANSWER_PAYLOAD, QUESTIONS } from '@/lib/windowsQuiz/questions.js';
import { REVISION_TOPICS } from '@/lib/windowsQuiz/revision.js';

const pack: QuizPack = {
  title: 'Windows Server Administration & Active Directory Enterprise Assessment',
  questions: QUESTIONS,
  topics: REVISION_TOPICS,
  answerPayload: ANSWER_PAYLOAD,
  progressPrefix: 'zyvotrix_windows_quiz_progress_v2:',
  durationMinutes: 120,
};

const WindowsAdministrationQuiz = () => <LinuxAdministrationQuiz pack={pack} />;

export default WindowsAdministrationQuiz;

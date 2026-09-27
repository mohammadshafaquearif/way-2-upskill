import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import {
  ANSWER_PAYLOAD,
  MARKS_PER_QUESTION,
  OPTION_LABELS,
  QUESTIONS,
} from '@/lib/linuxQuiz/questions.js';
import { REVISION_TOPICS } from '@/lib/linuxQuiz/revision.js';
import './linuxQuiz.css';

type Screen = 'start' | 'quiz' | 'result' | 'review' | 'revision';
type SubmitReason = 'manual' | 'timeout' | 'proctor';

type Question = { q: string; options: string[] };
type RevisionTopic = {
  id: string;
  title: string;
  emoji: string;
  memory: string;
  items: { cmd: string; meaning: string }[];
};

const labels = OPTION_LABELS as string[];

export type QuizPack = {
  title: string;
  questions: Question[];
  topics: RevisionTopic[];
  answerPayload: string;
  progressPrefix: string;
  durationMinutes?: number;
  passPercent?: number;
  marksPerQuestion?: number;
};

const linuxPack: QuizPack = {
  title: 'Linux Intermediate MCQ Test',
  questions: QUESTIONS as Question[],
  topics: REVISION_TOPICS as RevisionTopic[],
  answerPayload: ANSWER_PAYLOAD,
  progressPrefix: 'zyvotrix_quiz_progress_v1:',
};

function decodeKey(payload: string) {
  const raw = atob(payload);
  const out: number[] = [];
  for (let i = 0; i < raw.length; i += 1) {
    out.push(raw.charCodeAt(i) ^ ((0x5a + i * 7) & 0xff));
  }
  return out;
}

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isDocumentFullscreen() {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return Boolean(document.fullscreenElement || doc.webkitFullscreenElement);
}

function enterFullscreenNow() {
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => void;
  };
  try {
    if (typeof el.requestFullscreen === 'function') {
      void el.requestFullscreen().catch(() => undefined);
      return;
    }
    el.webkitRequestFullscreen?.();
  } catch {
    /* the next click inside the test tries again */
  }
}

function exitFullscreen() {
  const doc = document as Document & { webkitExitFullscreen?: () => void };
  if (document.fullscreenElement) {
    void document.exitFullscreen().catch(() => undefined);
    return;
  }
  doc.webkitExitFullscreen?.();
}

type ResumeOffer = {
  answers: (number | null)[];
  flagged: boolean[];
  index: number;
  remaining: number;
  startedAt: number;
  attempted: number;
  leftLabel: string;
};

const LinuxAdministrationQuiz = ({ pack = linuxPack }: { pack?: QuizPack }) => {
  const { user } = useAuth();
  const questions = pack.questions;
  const topics = pack.topics;
  const durationMs = (pack.durationMinutes ?? 100) * 60 * 1000;
  const marksEach = pack.marksPerQuestion ?? MARKS_PER_QUESTION;
  const totalMarks = questions.length * marksEach;
  const progressKey = (savedName: string, savedEmail: string) =>
    `${pack.progressPrefix}${savedEmail.trim().toLowerCase()}|${savedName.trim().toLowerCase()}`;
  const answerKey = useMemo(() => decodeKey(pack.answerPayload), [pack.answerPayload]);
  const [screen, setScreen] = useState<Screen>('start');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!user) return;
    setName((current) => current || `${user.firstName} ${user.lastName}`.trim());
    setEmail((current) => current || user.email);
  }, [user]);
  const [formError, setFormError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(questions.length).fill(null));
  const [flagged, setFlagged] = useState<boolean[]>(() => Array(questions.length).fill(false));
  const [remainingMs, setRemainingMs] = useState(durationMs);
  const [result, setResult] = useState({
    marks: 0,
    correct: 0,
    wrong: 0,
    skipped: 0,
    percent: 0,
    timeText: '',
    user: '',
  });

  const submittedRef = useRef(false);
  const startedAtRef = useRef(0);
  const identityRef = useRef({ name: '', email: '' });
  const tickRef = useRef(0);
  const answersRef = useRef(answers);
  const flaggedRef = useRef(flagged);
  const indexRef = useRef(currentIndex);
  const warningRef = useRef(0);
  const ignoreLeaveRef = useRef(false);
  const [warningCount, setWarningCount] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningText, setWarningText] = useState('You left this test.');
  const [resumeOffer, setResumeOffer] = useState<ResumeOffer | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  answersRef.current = answers;
  flaggedRef.current = flagged;
  indexRef.current = currentIndex;

  const attempted = answers.filter((answer) => answer !== null).length;
  const question = questions[currentIndex];

  const saveProgress = (ms = remainingMs) => {
    const { name: savedName, email: savedEmail } = identityRef.current;
    if (submittedRef.current || !savedName || !savedEmail) return;
    try {
      localStorage.setItem(
        progressKey(savedName, savedEmail),
        JSON.stringify({
          name: savedName,
          email: savedEmail,
          answers: answersRef.current,
          flagged: flaggedRef.current,
          currentIndex: indexRef.current,
          quizStartedAt: startedAtRef.current,
          endsAt: Date.now() + Math.max(0, ms),
          questionCount: questions.length,
          savedAt: Date.now(),
        }),
      );
    } catch {
      /* storage full or blocked */
    }
  };

  const finish = (reason: SubmitReason, nextAnswers?: (number | null)[]) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    exitFullscreen();
    const { name: savedName, email: savedEmail } = identityRef.current;
    try {
      localStorage.removeItem(progressKey(savedName, savedEmail));
    } catch {
      /* ignore */
    }

    const scoredAnswers = nextAnswers ?? answersRef.current;
    let correct = 0;
    let attemptedCount = 0;
    scoredAnswers.forEach((answer, index) => {
      if (answer === null) return;
      attemptedCount += 1;
      if (answer === answerKey[index]) correct += 1;
    });
    const wrong = attemptedCount - correct;
    const skipped = questions.length - attemptedCount;
    const marks = correct * marksEach;
    const timeTakenMs = Math.min(durationMs, Date.now() - startedAtRef.current);
    const percent = Math.round((marks / totalMarks) * 100);

    setResult({
      marks,
      correct,
      wrong,
      skipped,
      percent,
      user: `${savedName} · ${savedEmail}`,
      timeText:
        reason === 'timeout'
          ? `Time expired. Auto-submitted in ${formatDuration(timeTakenMs)}.`
          : reason === 'proctor'
            ? `Auto-submitted after 5 warnings, in ${formatDuration(timeTakenMs)}.`
            : `Completed in ${formatDuration(timeTakenMs)}.`,
    });
    setScreen('result');
  };

  useEffect(() => {
    if (screen !== 'quiz' || submittedRef.current) return undefined;
    const id = window.setInterval(() => {
      tickRef.current += 1;
      setRemainingMs((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          window.setTimeout(() => finish('timeout'), 0);
          return 0;
        }
        if (tickRef.current % 5 === 0) {
          saveProgress(next);
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // Timer is tied to the quiz screen only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  useEffect(() => {
    const onHide = () => {
      if (screen === 'quiz' && !submittedRef.current) saveProgress();
    };
    window.addEventListener('pagehide', onHide);
    return () => window.removeEventListener('pagehide', onHide);
  });

  useEffect(() => {
    if (screen !== 'quiz') return undefined;

    let away = false;
    let blurTimer = 0;
    let lastExitWarn = 0;
    let lastCopyWarn = 0;
    let lastShotWarn = 0;
    let sawFullscreen = isDocumentFullscreen();

    const warn = (message: string) => {
      if (submittedRef.current || ignoreLeaveRef.current) return;
      const next = warningRef.current + 1;
      warningRef.current = next;
      setWarningCount(next);
      setWarningText(message);
      if (next > 5) {
        finish('proctor');
        return;
      }
      setWarningOpen(true);
    };

    const lockTestKeys = () => {
      const keyboard = (navigator as Navigator & {
        keyboard?: { lock?: (keys?: string[]) => Promise<void> };
      }).keyboard;
      if (!isDocumentFullscreen() || !keyboard?.lock) return;
      void keyboard.lock(['Escape', 'PrintScreen']).catch(() => undefined);
    };

    const onFullscreen = () => {
      const on = isDocumentFullscreen();
      if (on) {
        sawFullscreen = true;
        lockTestKeys();
        return;
      }
      if (!sawFullscreen || submittedRef.current || ignoreLeaveRef.current) return;
      if (Date.now() - lastExitWarn < 2000) return;
    lastExitWarn = Date.now();
    warn('Full screen was turned off. Esc counts as a warning.');
  };

  const markAway = () => {
      if (submittedRef.current || ignoreLeaveRef.current || away) return;
      away = true;
      warn('You switched a tab, an app, or a desktop.');
    };

    const markBack = () => {
      window.clearTimeout(blurTimer);
      if (!away) return;
      if (document.hidden || !document.hasFocus()) return;
      away = false;
    };

    const onVisibility = () => {
      if (document.hidden) markAway();
      else markBack();
    };

    const onBlur = () => {
      window.clearTimeout(blurTimer);
      blurTimer = window.setTimeout(() => {
        if (document.hidden || !document.hasFocus()) markAway();
      }, 300);
    };

    const blockClipboard = (event: ClipboardEvent) => {
      event.preventDefault();
      if (Date.now() - lastCopyWarn < 400) return;
      lastCopyWarn = Date.now();
      warn('Copying a question is not allowed.');
    };

    const onDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const warnScreenshot = () => {
      if (Date.now() - lastShotWarn < 800) return;
      lastShotWarn = Date.now();
      void navigator.clipboard?.writeText('').catch(() => undefined);
      warn('Screenshots are not allowed during this test.');
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || submittedRef.current) return;
      const key = event.key;
      const lower = key.toLowerCase();
      const shortcut = event.metaKey || event.ctrlKey;
      const screenshot =
        key === 'PrintScreen' ||
        (event.metaKey && event.shiftKey && ['3', '4', '5'].includes(key)) ||
        (shortcut && event.shiftKey && lower === 's');

      if (key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        if (Date.now() - lastExitWarn < 2000) return;
        lastExitWarn = Date.now();
        warn('Full screen was turned off. Esc counts as a warning.');
        if (!isDocumentFullscreen()) enterFullscreenNow();
        return;
      }

      if (screenshot) {
        event.preventDefault();
        event.stopPropagation();
        warnScreenshot();
        return;
      }

      if (shortcut && (lower === 'c' || lower === 'x' || lower === 'p' || lower === 'a')) {
        event.preventDefault();
        event.stopPropagation();
        if (lower === 'a') return;
        if (Date.now() - lastCopyWarn < 400) return;
        lastCopyWarn = Date.now();
        warn(lower === 'p' ? 'Printing this test is not allowed.' : 'Copying a question is not allowed.');
      }
    };

    const onPrintScreen = (event: KeyboardEvent) => {
      if (event.key !== 'PrintScreen' || submittedRef.current) return;
      event.preventDefault();
      warnScreenshot();
    };

    document.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('webkitfullscreenchange', onFullscreen as EventListener);
    onFullscreen();
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('copy', blockClipboard);
    document.addEventListener('cut', blockClipboard);
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onPrintScreen);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', markBack);
    return () => {
      window.clearTimeout(blurTimer);
      const keyboard = (navigator as Navigator & { keyboard?: { unlock?: () => void } }).keyboard;
      keyboard?.unlock?.();
      document.removeEventListener('fullscreenchange', onFullscreen);
      document.removeEventListener('webkitfullscreenchange', onFullscreen as EventListener);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('copy', blockClipboard);
      document.removeEventListener('cut', blockClipboard);
      document.removeEventListener('dragstart', onDragStart);
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onPrintScreen);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', markBack);
    };
    // finish reads refs, so the listener stays valid for this attempt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (isDocumentFullscreen()) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('.linux-quiz.is-proctored')) return;
      enterFullscreenNow();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const launchQuiz = (
    nextAnswers: (number | null)[],
    nextFlagged: boolean[],
    nextIndex: number,
    nextRemaining: number,
    startedAt: number,
  ) => {
    submittedRef.current = false;
    tickRef.current = 0;
    warningRef.current = 0;
    setWarningCount(0);
    setWarningOpen(false);
    setResumeOffer(null);
    setSubmitOpen(false);
    startedAtRef.current = startedAt;
    setAnswers(nextAnswers);
    setFlagged(nextFlagged);
    setCurrentIndex(nextIndex);
    setRemainingMs(nextRemaining);
    setScreen('quiz');
    if (nextRemaining <= 0) {
      window.setTimeout(() => finish('timeout', nextAnswers), 0);
    }
  };

  const startQuiz = (event: React.SyntheticEvent) => {
    enterFullscreenNow();
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedName) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');
    identityRef.current = { name: trimmedName, email: trimmedEmail };

    try {
      const raw = localStorage.getItem(progressKey(trimmedName, trimmedEmail));
      if (raw) {
        const saved = JSON.parse(raw);
        const savedAttempted = Array.isArray(saved.answers)
          ? saved.answers.filter((answer: number | null) => answer !== null).length
          : 0;
        const leftMs = Math.max(0, Number(saved.endsAt) - Date.now());
        if (
          saved.questionCount === questions.length &&
          Array.isArray(saved.answers) &&
          saved.answers.length === questions.length
        ) {
          setResumeOffer({
            answers: saved.answers.map((answer: number | null) =>
              answer === null || answer === undefined ? null : Number(answer),
            ),
            flagged: (saved.flagged || []).map(Boolean),
            index: Math.min(Math.max(0, Number(saved.currentIndex) || 0), questions.length - 1),
            remaining: leftMs,
            startedAt: Number(saved.quizStartedAt) || Date.now(),
            attempted: savedAttempted,
            leftLabel: leftMs > 0 ? formatTime(leftMs) : 'time already over',
          });
          return;
        }
      }
    } catch {
      /* start fresh if the save cannot be read */
    }

    launchQuiz(Array(questions.length).fill(null), Array(questions.length).fill(false), 0, durationMs, Date.now());
  };

  const selectOption = (index: number) => {
    const next = answers.map((answer, i) => (i === currentIndex ? index : answer));
    answersRef.current = next;
    setAnswers(next);
    saveProgress();
  };

  const toggleFlag = () => {
    const next = flagged.map((value, i) => (i === currentIndex ? !value : value));
    flaggedRef.current = next;
    setFlagged(next);
    saveProgress();
  };

  const go = (index: number) => {
    indexRef.current = index;
    setCurrentIndex(index);
    saveProgress();
  };

  const submitManual = () => {
    if (questions.length - attempted > 0) {
      setSubmitOpen(true);
      return;
    }
    finish('manual');
  };

  const retry = () => {
    submittedRef.current = false;
    warningRef.current = 0;
    setWarningCount(0);
    setWarningOpen(false);
    setAnswers(Array(questions.length).fill(null));
    setFlagged(Array(questions.length).fill(false));
    setCurrentIndex(0);
    setRemainingMs(durationMs);
    setScreen('start');
  };

  const timerClass =
    remainingMs <= 60 * 1000 ? 'timer urgent' : remainingMs <= 5 * 60 * 1000 ? 'timer warning' : 'timer';

  return (
    <PageShell>
      {screen !== 'quiz' && <Navbar />}
      <main className={screen === 'quiz' ? 'flex-1' : 'page-main flex-1 pb-16 pt-24 sm:pt-28'}>
        {screen !== 'quiz' && (
          <div className="mx-auto mb-4 w-full max-w-[1180px] px-4">
            <Link to="/resources#quiz" className="text-sm font-semibold text-primary hover:underline">
              ← Quizzes
            </Link>
          </div>
        )}

        <div className={screen === 'quiz' ? 'linux-quiz is-proctored' : 'linux-quiz'}>
          {screen === 'start' && (
            <section className="screen active">
              <div className="card hero-card">
                <h1>{pack.title}</h1>
                <p className="subtitle">
                  {questions.length} questions · {marksEach} mark{marksEach === 1 ? '' : 's'} each · Total <strong>{totalMarks} marks</strong> · <strong>{pack.durationMinutes ?? 100} minutes</strong>
                  {pack.passPercent ? <> · Pass at <strong>{pack.passPercent}%</strong></> : null}
                </p>
                <div className="pill-row">
                  <span className="pill">Submit anytime</span>
                  <span className="pill">Auto-save by name + email</span>
                  <span className="pill">Fast-track revision after submit</span>
                  <span className="pill">Full screen · no copy, screenshot, or Esc</span>
                </div>
                <form className="start-form" onSubmit={startQuiz} noValidate autoComplete="off">
                  <div className="field">
                    <label htmlFor="user-name">Full Name</label>
                    <input
                      id="user-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="user-email">Email</label>
                    <input
                      id="user-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {formError ? <p className="form-error">{formError}</p> : null}
                  {resumeOffer ? (
                    <div className="resume-offer">
                      <p>
                        Saved progress: {resumeOffer.attempted} / {questions.length} attempted · {resumeOffer.leftLabel} left.
                      </p>
                      <button
                        type="button"
                        className="btn primary full"
                        onClick={() => {
                          enterFullscreenNow();
                          launchQuiz(
                            resumeOffer.answers,
                            resumeOffer.flagged,
                            resumeOffer.index,
                            resumeOffer.remaining,
                            resumeOffer.startedAt,
                          );
                        }}
                      >
                        Resume
                      </button>
                      <button
                        type="button"
                        className="btn secondary full"
                        onClick={() => {
                          enterFullscreenNow();
                          try {
                            localStorage.removeItem(progressKey(name.trim(), email.trim().toLowerCase()));
                          } catch {
                            /* ignore */
                          }
                          launchQuiz(
                            Array(questions.length).fill(null),
                            Array(questions.length).fill(false),
                            0,
                            durationMs,
                            Date.now(),
                          );
                        }}
                      >
                        Start fresh
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="btn primary full" onClick={startQuiz}>
                      Start Quiz <span className="btn-arrow">→</span>
                    </button>
                  )}
                </form>
              </div>
            </section>
          )}

          {screen === 'quiz' && question && (
            <section className="screen active quiz-layout">
              <header className="quiz-header card compact">
                <div className="top-bar">
                  <div className="user-chip">{identityRef.current.name}</div>
                  <div className={timerClass}>{formatTime(remainingMs)}</div>
                </div>
                <div className="progress-meta">
                  <span>Question {currentIndex + 1} / {questions.length}</span>
                  <span>Attempted: {attempted} / {questions.length}</span>
                  <span>Warnings: {Math.min(warningCount, 5)} / 5</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(attempted / questions.length) * 100}%` }} />
                </div>
              </header>

              <div className="quiz-body">
                <div className="quiz-main">
                  <div className="card question-card">
                    <div className="question-top">
                      <span className="marks-pill">{marksEach} mark{marksEach === 1 ? '' : 's'}</span>
                      <button type="button" className={`btn flag-btn${flagged[currentIndex] ? ' active' : ''}`} onClick={toggleFlag}>
                        {flagged[currentIndex] ? 'Flagged' : 'Flag'}
                      </button>
                    </div>
                    <h2>{question.q}</h2>
                    <div className="options">
                      {question.options.map((option, index) => (
                        <button
                          key={option}
                          type="button"
                          className={`option${answers[currentIndex] === index ? ' selected' : ''}`}
                          onClick={() => selectOption(index)}
                        >
                          <span className="option-key">{labels[index]}</span>
                          <span className="option-text">{option}</span>
                        </button>
                      ))}
                    </div>
                    <div className="nav-row">
                      <button type="button" className="btn ghost" disabled={currentIndex === 0} onClick={() => go(currentIndex - 1)}>
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn secondary"
                        disabled={currentIndex === questions.length - 1}
                        onClick={() => go(currentIndex + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <aside className="quiz-sidebar">
                  <div className="card sidebar-card">
                    <h3 className="sidebar-title">Questions</h3>
                    <div className="map-legend">
                      <span><i className="dot current" /> Current</span>
                      <span><i className="dot answered" /> Attempted</span>
                      <span><i className="dot flagged" /> Flagged</span>
                      <span><i className="dot pending" /> Pending</span>
                    </div>
                    <div className="question-map">
                      {questions.map((_, index) => {
                        const classes = ['map-btn'];
                        if (index === currentIndex) classes.push('current');
                        if (answers[index] !== null) classes.push('answered');
                        if (flagged[index]) classes.push('flagged');
                        return (
                          <button key={index} type="button" className={classes.join(' ')} onClick={() => go(index)}>
                            {index + 1}
                          </button>
                        );
                      })}
                    </div>
                    <div className="submit-bar">
                      <p className="submit-hint ready">
                        {questions.length - attempted === 0
                          ? 'All questions answered. Ready to submit.'
                          : `${questions.length - attempted} unanswered — you can still submit anytime.`}
                      </p>
                      {submitOpen ? (
                        <div className="resume-offer">
                          <p>
                            {questions.length - attempted} unanswered. Those questions score 0. Submit anyway?
                          </p>
                          <button type="button" className="btn primary full" onClick={() => finish('manual')}>
                            Submit anyway
                          </button>
                          <button type="button" className="btn secondary full" onClick={() => setSubmitOpen(false)}>
                            Keep going
                          </button>
                        </div>
                      ) : (
                        <button type="button" className="btn primary full" onClick={submitManual}>
                          Submit Quiz <span className="btn-arrow">→</span>
                        </button>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          )}

          {screen === 'result' && (
            <section className="screen active">
              <div className="card result-card">
                <div className="badge">Results</div>
                <h1>Your Score</h1>
                <p className="result-user">{result.user}</p>
                <div className="score-ring">
                  <div className="score-orb">
                    <span>{result.marks}</span>
                    <span className="score-total">/ {totalMarks}</span>
                  </div>
                </div>
                <p className="subtitle">
                  {result.correct} correct · {result.wrong} wrong · {result.skipped} skipped · {result.percent}%
                  {pack.passPercent
                    ? result.percent >= pack.passPercent
                      ? ` · Passed (${pack.passPercent}% required)`
                      : ` · Not passed (${pack.passPercent}% required)`
                    : ''}
                </p>
                <p className="time-summary">{result.timeText}</p>
                <div className="result-actions">
                  <button type="button" className="btn primary" onClick={() => setScreen('review')}>Review Answers</button>
                  <button type="button" className="btn secondary" onClick={() => setScreen('revision')}>Fast-Track Revision</button>
                  <button type="button" className="btn ghost" onClick={retry}>New Attempt</button>
                </div>
              </div>
            </section>
          )}

          {screen === 'review' && (
            <section className="screen active">
              <div className="review-header">
                <h1>Answer Review</h1>
                <div className="header-actions">
                  <button type="button" className="btn secondary" onClick={() => setScreen('revision')}>Fast-Track Revision</button>
                  <button type="button" className="btn ghost" onClick={() => setScreen('result')}>Back to Score</button>
                </div>
              </div>
              <div className="review-list">
                {questions.map((item, index) => {
                  const selected = answers[index];
                  const correctIndex = answerKey[index];
                  const skipped = selected === null;
                  const correct = !skipped && selected === correctIndex;
                  const status = skipped ? 'Skipped' : correct ? 'Correct' : 'Wrong';
                  const statusClass = skipped ? 'skip' : correct ? 'ok' : 'bad';
                  const marks = correct ? marksEach : 0;
                  return (
                    <article key={item.q} className={`review-item ${skipped ? 'skipped' : correct ? 'correct' : 'wrong'}`}>
                      <div className="review-top">
                        <span>Question {index + 1}{flagged[index] ? ' · Flagged' : ''}</span>
                        <span className={`status-pill ${statusClass}`}>
                          {status} · {marks} mark{marks === 1 ? '' : 's'}
                        </span>
                      </div>
                      <h3>{item.q}</h3>
                      <div className="review-answers">
                        {item.options.map((option, optionIndex) => {
                          const classes = ['option-line'];
                          if (optionIndex === correctIndex) classes.push('correct-option');
                          if (selected === optionIndex && optionIndex !== correctIndex) classes.push('wrong-option');
                          const tags = [];
                          if (optionIndex === correctIndex) tags.push('Correct');
                          if (selected === optionIndex) tags.push('Your pick');
                          return (
                            <div key={option} className={classes.join(' ')}>
                              <strong>{labels[optionIndex]})</strong>
                              <span className="option-text">{option}</span>
                              {tags.length ? <> · <em>{tags.join(' · ')}</em></> : null}
                            </div>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {screen === 'revision' && (
            <section className="screen active revision-layout">
              <div className="review-header">
                <div>
                  <h1>Fast-Track Revision</h1>
                  <p className="revision-tagline">Read once · Lock it in · Crush it next time</p>
                </div>
                <div className="header-actions">
                  <button type="button" className="btn secondary" onClick={() => setScreen('review')}>Answer Review</button>
                  <button type="button" className="btn ghost" onClick={() => setScreen('result')}>Back to Score</button>
                </div>
              </div>
              <div className="revision-intro card">
                <p>
                  This is your <strong>memory boost sheet</strong> — every topic from the quiz, compressed into sticky command patterns.
                </p>
              </div>
              <nav className="revision-nav card">
                {topics.map((topic) => (
                  <a
                    key={topic.id}
                    href={`#rev-${topic.id}`}
                    className="revision-nav-link"
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById(`rev-${topic.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    {topic.emoji} {topic.title.replace(/^\d+\.\s*/, '')}
                  </a>
                ))}
              </nav>
              <div className="revision-content">
                {topics.map((topic) => (
                  <article key={topic.id} id={`rev-${topic.id}`} className="revision-card card">
                    <div className="revision-card-head">
                      <span className="revision-emoji">{topic.emoji}</span>
                      <div>
                        <h2>{topic.title}</h2>
                        <p className="memory-tip"><strong>Memory tip:</strong> {topic.memory}</p>
                      </div>
                    </div>
                    <div className="revision-rows">
                      {topic.items.map((item) => (
                        <div key={item.cmd} className="revision-row">
                          <code className="revision-cmd">{item.cmd}</code>
                          <p className="revision-meaning">{item.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      {warningOpen && screen === 'quiz' && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600">Warning {warningCount} of 5</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">Stay on this test</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {warningText} Camera stays off. After 5 warnings, the next violation submits the test.
            </p>
            <button
              type="button"
              className="mt-5 h-11 w-full rounded-lg bg-primary font-semibold text-primary-foreground"
              onClick={() => {
                enterFullscreenNow();
                setWarningOpen(false);
              }}
            >
              Continue test
            </button>
          </div>
        </div>
      )}
      {screen !== 'quiz' && <Footer />}
    </PageShell>
  );
};

export default LinuxAdministrationQuiz;

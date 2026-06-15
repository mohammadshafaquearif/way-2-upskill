import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { useLmsCurriculum } from '@/hooks/useLmsCurriculum';
import { useQuizProctoring } from '@/hooks/useQuizProctoring';
import { lmsDb } from '@/integrations/supabase/lmsDb';
import type { DbQuiz, DbQuizQuestion } from '@/lib/lms/dbTypes';
import {
  computeQuizTimeLimitSeconds,
  formatQuizCountdown,
  formatTopicQuizSummary,
} from '@/lib/lms/quizCatalog';
import {
  clearQuizDraft,
  findResumableDraft,
  getQuizDraftSecondsLeft,
  isQuizDraftResumable,
  loadQuizDraft,
  saveQuizDraft,
} from '@/lib/lms/quizSessionStorage';
import { QuizQuestionPalette } from '@/components/lms/QuizQuestionPalette';
import {
  QuizExamFooter,
  QuizExamShell,
  QuizExamTopBar,
  QuizPageIntro,
} from '@/components/lms/QuizExamLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type QuizPhase = 'intro' | 'taking' | 'result';

const LMSQuiz = () => {
  const { moduleId, quizId: quizIdParam } = useParams<{ moduleId: string; quizId?: string }>();
  const [searchParams] = useSearchParams();
  const shouldAutoResume = searchParams.get('resume') === '1';
  const { user, courseId, programId } = useLearnerProgram();
  const { phases } = useLmsCurriculum(courseId, programId);
  const { toast } = useToast();

  const modNum = parseInt(moduleId ?? '0', 10);
  const module = phases.flatMap((p) => p.modules).find((m) => m.id === modNum);
  const activeQuizId = quizIdParam ?? module?.quizId;

  const [quiz, setQuiz] = useState<DbQuiz | null>(null);
  const [summary, setSummary] = useState<Awaited<ReturnType<typeof lmsDb.getQuizAttemptSummary>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reviewQuestionIds, setReviewQuestionIds] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [resumableSecondsLeft, setResumableSecondsLeft] = useState<number | null>(null);
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
    bestScore: number;
    bestPassed: boolean;
    attemptsUsed: number;
    attemptsRemaining: number;
    canRetry: boolean;
    timedOut?: boolean;
  } | null>(null);

  const autoSubmittedRef = useRef(false);
  const autoResumedRef = useRef(false);
  const answersRef = useRef(answers);
  const endsAtRef = useRef(0);
  const startedAtRef = useRef(0);
  answersRef.current = answers;

  const isTakingQuiz = phase === 'taking' && summary?.canRetry && !result;
  const { violationCount, setViolationCount, showReturnOverlay, dismissReturnOverlay } =
    useQuizProctoring(isTakingQuiz);

  const attemptNumber = summary ? summary.attemptsUsed + 1 : 1;
  const hasResumableSession = resumableSecondsLeft !== null && resumableSecondsLeft > 0;

  useEffect(() => {
    if (!activeQuizId || !user) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const data = await lmsDb.getQuiz(activeQuizId);
        if (cancelled) return;
        if (!data) {
          setQuiz(null);
          setSummary(null);
          return;
        }
        setQuiz(data);
        const attemptSummary = await lmsDb.getQuizAttemptSummary(
          user.id,
          activeQuizId,
          data.pass_score,
          data.max_attempts,
        );
        if (cancelled) return;
        setSummary(attemptSummary);

        const draft =
          loadQuizDraft(user.id, activeQuizId, attemptSummary.attemptsUsed + 1) ??
          findResumableDraft(user.id, activeQuizId);

        if (isQuizDraftResumable(draft)) {
          setResumableSecondsLeft(getQuizDraftSecondsLeft(draft!));
        } else if (draft) {
          clearQuizDraft(user.id, activeQuizId, attemptSummary.attemptsUsed + 1);
          setResumableSecondsLeft(null);
        } else {
          setResumableSecondsLeft(null);
        }
      } catch {
        if (!cancelled) {
          setQuiz(null);
          setSummary(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeQuizId, user?.id]);

  const persistDraft = useCallback(() => {
    if (!user || !quiz || !summary || phase !== 'taking' || !endsAtRef.current) return;
    saveQuizDraft({
      userId: user.id,
      quizId: quiz.id,
      attemptNumber,
      phase: 'taking',
      currentIndex,
      answers,
      reviewQuestionIds: [...reviewQuestionIds],
      endsAt: endsAtRef.current,
      startedAt: startedAtRef.current,
      violationCount,
    });
  }, [user, quiz, summary, phase, attemptNumber, currentIndex, answers, reviewQuestionIds, violationCount]);

  useEffect(() => {
    persistDraft();
  }, [persistDraft]);

  const initTimerFromEndsAt = useCallback((endsAt: number) => {
    endsAtRef.current = endsAt;
    const remaining = Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
    setSecondsLeft(remaining);
    return remaining;
  }, []);

  const submitQuiz = useCallback(
    async (options?: { timedOut?: boolean }) => {
      if (!user || !quiz || !summary?.canRetry || submitting) return;

      const currentAnswers = answersRef.current;
      const unanswered = quiz.questions.filter((q) => !currentAnswers[q.id]);

      if (!options?.timedOut && unanswered.length > 0) {
        toast({
          title: 'Answer all questions',
          description: `${unanswered.length} question(s) remaining.`,
          variant: 'destructive',
        });
        return;
      }

      setSubmitting(true);
      try {
        const res = await lmsDb.submitQuizAttempt(user.id, quiz.id, currentAnswers);
        clearQuizDraft(user.id, quiz.id, attemptNumber);
        setResumableSecondsLeft(null);
        setResult({
          score: res.score,
          passed: res.passed,
          bestScore: res.bestScore,
          bestPassed: res.bestPassed,
          attemptsUsed: res.attemptsUsed,
          attemptsRemaining: res.attemptsRemaining,
          canRetry: res.canRetry,
          timedOut: options?.timedOut,
        });
        setSummary({
          attemptsUsed: res.attemptsUsed,
          attemptsRemaining: res.attemptsRemaining,
          bestScore: res.bestScore,
          bestPassed: res.bestPassed,
          maxAttempts: quiz.max_attempts,
          passScore: quiz.pass_score,
          canRetry: res.canRetry,
        });
        setPhase('result');
        setSecondsLeft(null);
        toast({
          title: options?.timedOut
            ? 'Time is up — quiz submitted'
            : res.bestPassed
              ? 'Quiz passed!'
              : res.passed
                ? 'Attempt recorded'
                : 'Quiz not passed',
          description: options?.timedOut
            ? `Submitted with ${unanswered.length} unanswered · Score: ${res.score}%`
            : `This attempt: ${res.score}% · Best score: ${res.bestScore}% (pass ${quiz.pass_score}%)`,
          variant: res.bestPassed && !options?.timedOut ? 'default' : 'destructive',
        });
      } catch (err) {
        toast({
          title: 'Submission failed',
          description: err instanceof Error ? err.message : 'Try again later',
          variant: 'destructive',
        });
      } finally {
        setSubmitting(false);
        setShowSubmitDialog(false);
      }
    },
    [user, quiz, summary?.canRetry, submitting, toast, attemptNumber],
  );

  useEffect(() => {
    if (secondsLeft === null || phase !== 'taking' || result || submitting) return;

    if (secondsLeft <= 0) {
      if (!autoSubmittedRef.current) {
        autoSubmittedRef.current = true;
        void submitQuiz({ timedOut: true });
      }
      return;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((prev) => (prev === null ? null : prev - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [secondsLeft, phase, result, submitting, submitQuiz]);

  const beginSession = (options: {
    currentIndex: number;
    answers: Record<string, string>;
    reviewQuestionIds: string[];
    endsAt: number;
    startedAt: number;
    violationCount: number;
  }) => {
    autoSubmittedRef.current = false;
    startedAtRef.current = options.startedAt;
    setCurrentIndex(options.currentIndex);
    setAnswers(options.answers);
    setReviewQuestionIds(new Set(options.reviewQuestionIds));
    setViolationCount(options.violationCount);
    initTimerFromEndsAt(options.endsAt);
    setPhase('taking');
    setResumableSecondsLeft(getQuizDraftSecondsLeft({
      userId: user!.id,
      quizId: quiz!.id,
      attemptNumber,
      phase: 'taking',
      currentIndex: options.currentIndex,
      answers: options.answers,
      reviewQuestionIds: options.reviewQuestionIds,
      endsAt: options.endsAt,
      startedAt: options.startedAt,
      violationCount: options.violationCount,
    }));
  };

  const handleStartQuiz = () => {
    if (!quiz || !user) return;
    clearQuizDraft(user.id, quiz.id, attemptNumber);
    const total = computeQuizTimeLimitSeconds(quiz.questions.length, quiz.time_limit_min);
    const startedAt = Date.now();
    const endsAt = startedAt + total * 1000;
    beginSession({
      currentIndex: 0,
      answers: {},
      reviewQuestionIds: [],
      endsAt,
      startedAt,
      violationCount: 0,
    });
  };

  const handleResumeQuiz = useCallback(() => {
    if (!user || !quiz || !summary) return;
    const draft =
      loadQuizDraft(user.id, quiz.id, attemptNumber) ?? findResumableDraft(user.id, quiz.id);
    if (!isQuizDraftResumable(draft)) return;

    beginSession({
      currentIndex: draft!.currentIndex,
      answers: draft!.answers,
      reviewQuestionIds: draft!.reviewQuestionIds,
      endsAt: draft!.endsAt,
      startedAt: draft!.startedAt,
      violationCount: draft!.violationCount,
    });
  }, [user, quiz, summary, attemptNumber]);

  useEffect(() => {
    if (autoResumedRef.current || loading || !shouldAutoResume || phase !== 'intro' || result) return;
    if (resumableSecondsLeft && resumableSecondsLeft > 0 && summary?.canRetry) {
      autoResumedRef.current = true;
      handleResumeQuiz();
    }
  }, [loading, shouldAutoResume, resumableSecondsLeft, phase, result, summary?.canRetry, handleResumeQuiz]);

  const handleRetry = () => {
    if (user && quiz) clearQuizDraft(user.id, quiz.id, attemptNumber);
    setResult(null);
    setAnswers({});
    setReviewQuestionIds(new Set());
    setCurrentIndex(0);
    setPhase('intro');
    setSecondsLeft(null);
    setResumableSecondsLeft(null);
  };

  const currentQuestion: DbQuizQuestion | undefined = quiz?.questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isLastQuestion = quiz ? currentIndex === quiz.questions.length - 1 : false;
  const progressPercent = quiz ? ((currentIndex + 1) / quiz.questions.length) * 100 : 0;
  const isMarkedForReview = currentQuestion ? reviewQuestionIds.has(currentQuestion.id) : false;

  const unansweredIndices = quiz
    ? quiz.questions
        .map((q, index) => (!answers[q.id] ? index + 1 : null))
        .filter((n): n is number => n !== null)
    : [];

  const reviewIndices = quiz
    ? quiz.questions
        .map((q, index) => (reviewQuestionIds.has(q.id) ? index + 1 : null))
        .filter((n): n is number => n !== null)
    : [];

  const toggleReview = () => {
    if (!currentQuestion) return;
    setReviewQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  };

  const goNext = () => {
    if (!quiz || isLastQuestion) return;
    setCurrentIndex((index) => Math.min(index + 1, quiz.questions.length - 1));
  };

  const goPrevious = () => {
    if (currentIndex > 0) setCurrentIndex((index) => index - 1);
  };

  const openSubmitDialog = () => setShowSubmitDialog(true);

  const goToFirstReview = () => {
    if (!quiz) return;
    const firstReview = quiz.questions.findIndex((q) => reviewQuestionIds.has(q.id));
    if (firstReview >= 0) setCurrentIndex(firstReview);
    else if (unansweredIndices.length > 0) {
      setCurrentIndex(unansweredIndices[0] - 1);
    }
    setShowSubmitDialog(false);
  };

  const confirmSubmit = () => {
    if (unansweredIndices.length > 0) {
      toast({
        title: 'Complete all questions first',
        description: `Still unanswered: ${unansweredIndices.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }
    void submitQuiz();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading quiz…
      </div>
    );
  }

  if (!module || !quiz || !summary) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted-foreground">Quiz not available for this module.</p>
        <Button asChild variant="link" className="mt-2">
          <Link to={`/dashboard/curriculum/${moduleId ?? ''}`}>Back to module</Link>
        </Button>
      </div>
    );
  }

  const attemptLabel = `Attempt ${summary.attemptsUsed + 1} of ${summary.maxAttempts}`;
  const isTimerUrgent = secondsLeft !== null && secondsLeft <= 60;

  const answeredCount = quiz?.questions.filter((q) => answers[q.id]).length ?? 0;

  const backLink = (
    <Button asChild variant="ghost" size="sm" className="-ml-2 h-8 px-2 text-muted-foreground">
      <Link to={`/dashboard/curriculum/${module.id}`} onClick={persistDraft}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to {module.title}
      </Link>
    </Button>
  );

  const metaLine = `${quiz.questions.length} questions · ${formatTopicQuizSummary(quiz.questions.length, quiz.pass_score, quiz.time_limit_min)} · Best score counts`;

  const badges = (
    <>
      {summary.attemptsUsed > 0 && <Badge variant="secondary">Best: {summary.bestScore}%</Badge>}
      {summary.bestPassed && <Badge className="bg-emerald-600">Passed</Badge>}
      {summary.canRetry ? (
        <Badge variant="outline">{attemptLabel}</Badge>
      ) : (
        <Badge variant="outline">No attempts left</Badge>
      )}
    </>
  );

  if (phase === 'taking' && currentQuestion && summary.canRetry && !result) {
    return (
      <>
        {showReturnOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md space-y-4 rounded-xl border border-destructive/40 bg-card p-6 text-center shadow-lg">
              <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
              <div>
                <h2 className="text-lg font-semibold">Return to your test</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your answers and remaining time are saved. Continue the attempt.
                </p>
              </div>
              <Button className="w-full" onClick={dismissReturnOverlay}>
                Continue test
              </Button>
            </div>
          </div>
        )}

        <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit test?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3 text-sm text-muted-foreground">
                  {reviewIndices.length > 0 && (
                    <p>
                      <span className="font-medium text-amber-700 dark:text-amber-400">
                        {reviewIndices.length} marked for review:
                      </span>{' '}
                      {reviewIndices.join(', ')}
                    </p>
                  )}
                  {unansweredIndices.length > 0 ? (
                    <p>
                      <span className="font-medium text-destructive">
                        {unansweredIndices.length} unanswered:
                      </span>{' '}
                      {unansweredIndices.join(', ')}
                    </p>
                  ) : (
                    <p>All questions answered. You can submit your attempt.</p>
                  )}
                  <p>After submission you cannot change answers for this attempt.</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Go back</AlertDialogCancel>
              {(reviewIndices.length > 0 || unansweredIndices.length > 0) && (
                <Button variant="outline" onClick={goToFirstReview}>
                  Review questions
                </Button>
              )}
              <AlertDialogAction onClick={confirmSubmit} disabled={submitting || unansweredIndices.length > 0}>
                {submitting ? 'Submitting…' : 'Submit test'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <QuizExamShell
          topBar={
            <QuizExamTopBar
              moduleTitle={module.title}
              moduleId={module.id}
              quizTitle={quiz.title}
              attemptLabel={attemptLabel}
              secondsLeft={secondsLeft}
              isTimerUrgent={isTimerUrgent}
              onFinish={openSubmitDialog}
              onSaveAndExit={persistDraft}
            />
          }
          palette={
            <QuizQuestionPalette
              questions={quiz.questions}
              currentIndex={currentIndex}
              answers={answers}
              reviewQuestionIds={reviewQuestionIds}
              onSelect={setCurrentIndex}
            />
          }
          footer={
            <QuizExamFooter
              currentIndex={currentIndex}
              totalQuestions={quiz.questions.length}
              isMarkedForReview={isMarkedForReview}
              isLastQuestion={isLastQuestion}
              submitting={submitting}
              onPrevious={goPrevious}
              onToggleReview={toggleReview}
              onNext={goNext}
              onSubmit={openSubmitDialog}
            />
          }
        >
          <div
            className="mx-auto max-w-3xl select-none space-y-5"
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Question {currentIndex + 1}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {answeredCount} of {quiz.questions.length} answered
                  </p>
                </div>
                <Progress value={progressPercent} className="h-1.5 w-32 sm:w-48" />
              </div>
            </div>

            <article className="rounded-xl border border-border/80 bg-card shadow-sm">
              <div className="border-b border-border/60 bg-muted/30 px-5 py-4">
                <h2 className="text-base font-medium leading-relaxed text-foreground sm:text-lg">
                  {currentQuestion.question_text}
                </h2>
              </div>

              <div className="p-5">
                <RadioGroup
                  className="space-y-2.5"
                  value={currentAnswer ?? ''}
                  onValueChange={(value) =>
                    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
                  }
                >
                  {currentQuestion.options.map((opt, optIndex) => (
                    <label
                      key={opt.id}
                      htmlFor={`${currentQuestion.id}-${opt.id}`}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3.5 transition-colors',
                        currentAnswer === opt.id
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border/80 hover:border-foreground/20 hover:bg-muted/30',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                          currentAnswer === opt.id
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border text-muted-foreground',
                        )}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <RadioGroupItem
                        value={opt.id}
                        id={`${currentQuestion.id}-${opt.id}`}
                        className="sr-only"
                      />
                      <span className="pt-0.5 text-sm leading-relaxed">{opt.text}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </article>
          </div>
        </QuizExamShell>
      </>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <QuizPageIntro backLink={backLink} title={quiz.title} meta={metaLine} badges={badges}>
        {!summary.canRetry && !result ? (
          <div className="rounded-xl border border-border/80 bg-card p-8 text-center">
            <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">All attempts used</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Best score: {summary.bestScore}% ·{' '}
              {summary.bestPassed ? 'You passed this test.' : `Pass mark is ${quiz.pass_score}%.`}
            </p>
            <Button asChild className="mt-6">
              <Link to={`/dashboard/curriculum/${module.id}`}>Back to module</Link>
            </Button>
          </div>
        ) : phase === 'intro' && !result ? (
          <div className="space-y-4 rounded-xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Test instructions</p>
                <ul className="mt-2 space-y-1.5 text-muted-foreground">
                  <li>· One question at a time with a question palette on the left</li>
                  <li>· Mark questions for review before final submission</li>
                  <li>· Progress and timer are saved if you leave — use Resume to continue</li>
                  <li>· Do not switch tabs; screenshots and copying are not permitted</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {hasResumableSession && (
                <Button size="lg" className="flex-1" onClick={handleResumeQuiz}>
                  Resume test · {formatQuizCountdown(resumableSecondsLeft!)}
                </Button>
              )}
              <Button
                size="lg"
                variant={hasResumableSession ? 'outline' : 'default'}
                className="flex-1"
                onClick={handleStartQuiz}
              >
                {hasResumableSession ? 'Start fresh attempt' : `Begin test · ${attemptLabel}`}
              </Button>
            </div>
          </div>
        ) : result ? (
          <div className="rounded-xl border border-border/80 bg-card p-8 text-center shadow-sm">
            {result.bestPassed ? (
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
            ) : (
              <XCircle className="mx-auto h-14 w-14 text-destructive" />
            )}
            <div className="mt-4">
              {result.timedOut && (
                <Badge variant="destructive" className="mb-3">
                  Submitted when time expired
                </Badge>
              )}
              <p className="text-sm text-muted-foreground">This attempt</p>
              <p className="text-3xl font-bold">{result.score}%</p>
              <p className="mt-3 text-sm text-muted-foreground">Best score (counts for progress)</p>
              <p className="text-2xl font-bold text-primary">{result.bestScore}%</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {result.bestPassed
                  ? 'Passed — your progress has been updated.'
                  : `Need ${quiz.pass_score}% to pass. Review the module and retry if attempts remain.`}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {result.canRetry && (
                <Button variant="outline" onClick={handleRetry}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try again ({result.attemptsRemaining} left)
                </Button>
              )}
              <Button asChild>
                <Link to={`/dashboard/curriculum/${module.id}`}>Back to module</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </QuizPageIntro>
    </div>
  );
};

export default LMSQuiz;

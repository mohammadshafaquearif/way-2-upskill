import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { useLmsCurriculum } from '@/hooks/useLmsCurriculum';
import { lmsDb } from '@/integrations/supabase/lmsDb';
import type { DbQuiz, DbQuizQuestion, QuizAttemptSummary } from '@/lib/lms/dbTypes';
import {
  computeQuizTimeLimitMinutes,
  computeQuizTimeLimitSeconds,
  formatQuizCountdown,
  QUIZ_MINUTES_PER_QUESTION,
} from '@/lib/lms/quizCatalog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle2, Clock, Loader2, RotateCcw, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const LMSQuiz = () => {
  const { moduleId, quizId: quizIdParam } = useParams<{ moduleId: string; quizId?: string }>();
  const { user, courseId, programId } = useLearnerProgram();
  const { phases } = useLmsCurriculum(courseId, programId);
  const { toast } = useToast();

  const modNum = parseInt(moduleId ?? '0', 10);
  const module = phases.flatMap((p) => p.modules).find((m) => m.id === modNum);
  const activeQuizId = quizIdParam ?? module?.quizId;

  const [quiz, setQuiz] = useState<DbQuiz | null>(null);
  const [summary, setSummary] = useState<QuizAttemptSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [quizSessionKey, setQuizSessionKey] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
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
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const loadQuiz = async () => {
    if (!activeQuizId || !user) return;
    const data = await lmsDb.getQuiz(activeQuizId);
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
    setSummary(attemptSummary);
  };

  useEffect(() => {
    if (!activeQuizId || !user) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        await loadQuiz();
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
      }
    },
    [user, quiz, summary?.canRetry, submitting, toast],
  );

  useEffect(() => {
    if (!quiz || result || !summary?.canRetry) {
      setSecondsLeft(null);
      return;
    }

    autoSubmittedRef.current = false;
    const total = computeQuizTimeLimitSeconds(quiz.questions.length, quiz.time_limit_min);
    setSecondsLeft(total);
  }, [quiz, result, summary?.canRetry, quizSessionKey]);

  useEffect(() => {
    if (secondsLeft === null || result || submitting) return;

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
  }, [secondsLeft, result, submitting, submitQuiz]);

  const handleRetry = () => {
    setResult(null);
    setAnswers({});
    setQuizSessionKey((key) => key + 1);
  };

  const handleSubmit = () => {
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
          <Link to={`/dashboard/curriculum/${moduleId ?? ''}`}>Back to Module</Link>
        </Button>
      </div>
    );
  }

  const timeLimitMin = computeQuizTimeLimitMinutes(quiz.questions.length, quiz.time_limit_min);
  const attemptLabel = `Attempt ${summary.attemptsUsed + 1} of ${summary.maxAttempts}`;
  const isTimerUrgent = secondsLeft !== null && secondsLeft <= 60;
  const isTakingQuiz = summary.canRetry && !result && secondsLeft !== null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to={`/dashboard/curriculum/${module.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {module.title}
        </Link>
      </Button>

      <div>
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {quiz.questions.length} questions · {QUIZ_MINUTES_PER_QUESTION} min per question ({timeLimitMin}{' '}
          min total) · Pass {quiz.pass_score}% · Max {quiz.max_attempts} attempts · Best score counts
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {summary.attemptsUsed > 0 && (
            <Badge variant="secondary">Best: {summary.bestScore}%</Badge>
          )}
          {summary.bestPassed && <Badge className="bg-green-600">Passed</Badge>}
          {summary.canRetry ? (
            <Badge variant="outline">{attemptLabel}</Badge>
          ) : (
            <Badge variant="outline">No attempts left</Badge>
          )}
        </div>
      </div>

      {isTakingQuiz && (
        <Card
          className={cn(
            'sticky top-4 z-10 border-2 shadow-md transition-colors',
            isTimerUrgent ? 'border-destructive bg-destructive/5' : 'border-primary/30 bg-primary/5',
          )}
        >
          <CardContent className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <Clock className={cn('h-5 w-5', isTimerUrgent ? 'text-destructive' : 'text-primary')} />
              <div>
                <p className="text-sm font-medium">Time remaining</p>
                <p className="text-xs text-muted-foreground">
                  {QUIZ_MINUTES_PER_QUESTION} minutes allowed per question
                </p>
              </div>
            </div>
            <p
              className={cn(
                'font-mono text-3xl font-bold tabular-nums',
                isTimerUrgent ? 'text-destructive' : 'text-primary',
              )}
            >
              {formatQuizCountdown(secondsLeft)}
            </p>
          </CardContent>
        </Card>
      )}

      {!summary.canRetry && !result ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <XCircle className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-lg font-semibold">All attempts used</p>
              <p className="text-muted-foreground">
                Best score: {summary.bestScore}% ·{' '}
                {summary.bestPassed ? 'You passed this quiz.' : `Pass mark is ${quiz.pass_score}%.`}
              </p>
            </div>
            <Button asChild>
              <Link to={`/dashboard/curriculum/${module.id}`}>Back to Module</Link>
            </Button>
          </CardContent>
        </Card>
      ) : result ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            {result.bestPassed ? (
              <CheckCircle2 className="h-14 w-14 text-green-600" />
            ) : (
              <XCircle className="h-14 w-14 text-destructive" />
            )}
            <div>
              {result.timedOut && (
                <Badge variant="destructive" className="mb-3">
                  Submitted when time expired
                </Badge>
              )}
              <p className="text-sm text-muted-foreground">This attempt</p>
              <p className="text-2xl font-bold">{result.score}%</p>
              <p className="mt-2 text-sm text-muted-foreground">Best score (counts for progress)</p>
              <p className="text-xl font-bold text-primary">{result.bestScore}%</p>
              <p className="mt-2 text-muted-foreground">
                {result.bestPassed
                  ? 'You have passed — progress updated using your best score.'
                  : `You need ${quiz.pass_score}% to pass. Review materials and try again if attempts remain.`}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {result.attemptsUsed} of {quiz.max_attempts} attempts used
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {result.canRetry && (
                <Button variant="outline" onClick={handleRetry}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again ({result.attemptsRemaining} left)
                </Button>
              )}
              <Button asChild>
                <Link to={`/dashboard/curriculum/${module.id}`}>Back to Module</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {quiz.questions.map((q: DbQuizQuestion, index: number) => (
            <Card key={q.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">
                  {index + 1}. {q.question_text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[q.id] ?? ''}
                  onValueChange={(value) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: value }))
                  }
                >
                  {q.options.map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2 py-1.5">
                      <RadioGroupItem value={opt.id} id={`${q.id}-${opt.id}`} />
                      <Label htmlFor={`${q.id}-${opt.id}`} className="cursor-pointer font-normal">
                        {opt.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          <Button size="lg" className="w-full" onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              `Submit · ${attemptLabel}`
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default LMSQuiz;

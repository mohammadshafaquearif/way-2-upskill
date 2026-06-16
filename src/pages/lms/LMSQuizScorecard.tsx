import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { useLmsCurriculum } from '@/hooks/useLmsCurriculum';
import { lmsDb } from '@/integrations/supabase/lmsDb';
import type { DbQuiz, DbQuizAttempt, DbQuizAttemptListItem } from '@/lib/lms/dbTypes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

const formatAttemptTime = (iso: string | null) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const LMSQuizScorecard = () => {
  const { moduleId, quizId, attemptId } = useParams<{
    moduleId: string;
    quizId: string;
    attemptId: string;
  }>();

  const { user, courseId, programId } = useLearnerProgram();
  const { phases } = useLmsCurriculum(courseId, programId);

  const modNum = parseInt(moduleId ?? '0', 10);
  const module = useMemo(
    () => phases.flatMap((p) => p.modules).find((m) => m.id === modNum),
    [phases, modNum],
  );

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<DbQuiz | null>(null);
  const [attempt, setAttempt] = useState<DbQuizAttempt | null>(null);
  const [history, setHistory] = useState<DbQuizAttemptListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !quizId || !attemptId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const [loadedQuiz, loadedAttempt] = await Promise.all([
          lmsDb.getQuiz(quizId, true),
          lmsDb.getQuizAttempt(attemptId),
        ]);
        if (cancelled) return;

        if (!loadedQuiz) {
          setQuiz(null);
          setAttempt(null);
          setHistory([]);
          setError('Quiz not found.');
          return;
        }

        if (!loadedAttempt) {
          setQuiz(loadedQuiz);
          setAttempt(null);
          setHistory([]);
          setError('Attempt not found.');
          return;
        }

        if (loadedAttempt.user_id !== user.id) {
          setQuiz(loadedQuiz);
          setAttempt(null);
          setHistory([]);
          setError('You do not have access to this attempt.');
          return;
        }

        const attempts = await lmsDb.listQuizAttempts(user.id, quizId);
        if (cancelled) return;

        setQuiz(loadedQuiz);
        setAttempt(loadedAttempt);
        setHistory(attempts);
      } catch (e) {
        if (!cancelled) {
          setQuiz(null);
          setAttempt(null);
          setHistory([]);
          setError(e instanceof Error ? e.message : 'Failed to load scorecard.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id, quizId, attemptId]);

  const rows = useMemo(() => {
    if (!quiz || !attempt) return [];
    return quiz.questions.map((q, index) => {
      const selectedId = attempt.answers[q.id];
      const selected = q.options.find((o) => o.id === selectedId);
      const correct = q.options.find((o) => o.is_correct);
      const isCorrect = Boolean(selectedId && correct?.id && selectedId === correct.id);
      return {
        index,
        questionId: q.id,
        questionText: q.question_text,
        explanation: q.explanation,
        selectedId,
        selectedText: selected?.text ?? null,
        correctId: correct?.id ?? null,
        correctText: correct?.text ?? null,
        isCorrect,
      };
    });
  }, [quiz, attempt]);

  const correctCount = rows.filter((r) => r.isCorrect).length;
  const wrongCount = rows.length - correctCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading scorecard…
      </div>
    );
  }

  if (!module || !quizId || !attemptId) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted-foreground">Scorecard not available.</p>
        <Button asChild variant="link" className="mt-2">
          <Link to="/dashboard/curriculum">Back to curriculum</Link>
        </Button>
      </div>
    );
  }

  const backToModule = `/dashboard/curriculum/${module.id}`;
  const backToQuiz = `/dashboard/curriculum/${module.id}/quiz/${quizId}`;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Module {module.id}</p>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Scorecard{quiz?.title ? ` · ${quiz.title}` : ''}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Attempt: {formatAttemptTime(attempt?.submitted_at ?? null)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            <Link to={backToQuiz}>Back to test</Link>
          </Button>
          <Button asChild>
            <Link to={backToModule}>Back to module</Link>
          </Button>
        </div>
      </div>

      {error ? (
        <Card className="border-border/70">
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      ) : quiz && attempt ? (
        <>
          <Card className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex flex-wrap items-center justify-between gap-3 text-base">
                <span>Result</span>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">
                    {correctCount} correct · {wrongCount} wrong
                  </Badge>
                  {attempt.passed ? (
                    <Badge className="bg-emerald-600">Passed</Badge>
                  ) : (
                    <Badge variant="destructive">Not passed</Badge>
                  )}
                  <Badge variant="secondary">Score: {attempt.score}%</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Wrong answers show the correct answer and explanation so you can revise the concept
                quickly.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {rows.map((r) => (
              <Card key={r.questionId} className="border-border/70">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-start justify-between gap-3 text-base">
                    <span className="leading-relaxed">
                      <span className="mr-2 text-muted-foreground">Q{r.index + 1}.</span>
                      {r.questionText}
                    </span>
                    {r.isCorrect ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                        <XCircle className="h-4 w-4" />
                        Wrong
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className={cn('rounded-lg border p-3', r.isCorrect ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border/70 bg-muted/30')}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Your answer
                      </p>
                      <p className={cn('mt-1 font-medium', r.selectedText ? 'text-foreground' : 'text-muted-foreground')}>
                        {r.selectedText ?? 'Not answered'}
                      </p>
                    </div>

                    <div className={cn('rounded-lg border p-3', r.isCorrect ? 'border-border/70 bg-muted/30' : 'border-emerald-500/30 bg-emerald-500/5')}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Correct answer
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {r.correctText ?? '—'}
                      </p>
                    </div>
                  </div>

                  {!r.isCorrect && (r.explanation || r.correctText) ? (
                    <>
                      <Separator />
                      <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Explanation
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">
                          {r.explanation ?? 'Review this topic in the module content.'}
                        </p>
                      </div>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Test history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">No previous attempts.</p>
              ) : (
                <div className="space-y-2">
                  {history.map((h, idx) => {
                    const href = `/dashboard/curriculum/${module.id}/quiz/${quizId}/attempt/${h.id}`;
                    const active = h.id === attempt.id;
                    return (
                      <Link
                        key={h.id}
                        to={href}
                        className={cn(
                          'flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm transition-colors',
                          active
                            ? 'border-primary/30 bg-primary/5'
                            : 'border-border/70 bg-card hover:border-foreground/20 hover:bg-muted/30',
                        )}
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">
                            Attempt #{history.length - idx}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatAttemptTime(h.submitted_at)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {h.passed ? (
                            <Badge className="bg-emerald-600">Passed</Badge>
                          ) : (
                            <Badge variant="destructive">Failed</Badge>
                          )}
                          <Badge variant="secondary">{h.score}%</Badge>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
};

export default LMSQuizScorecard;


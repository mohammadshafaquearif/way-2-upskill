import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatQuizCountdown } from '@/lib/lms/quizCatalog';

interface QuizExamTopBarProps {
  moduleTitle: string;
  moduleId: number;
  quizTitle: string;
  attemptLabel: string;
  secondsLeft: number | null;
  isTimerUrgent: boolean;
  onFinish: () => void;
  onSaveAndExit: () => void;
}

export function QuizExamTopBar({
  moduleTitle,
  moduleId,
  quizTitle,
  attemptLabel,
  secondsLeft,
  isTimerUrgent,
  onFinish,
  onSaveAndExit,
}: QuizExamTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card shadow-sm">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 lg:px-5">
        <Button asChild variant="ghost" size="sm" className="h-8 shrink-0 px-2 text-muted-foreground">
          <Link to={`/dashboard/curriculum/${moduleId}`} onClick={onSaveAndExit}>
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            <span className="max-w-[10rem] truncate sm:max-w-xs">{moduleTitle}</span>
          </Link>
        </Button>

        <div className="hidden h-6 w-px bg-border sm:block" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{quizTitle}</p>
          <p className="text-xs text-muted-foreground">{attemptLabel}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-1.5',
              isTimerUrgent
                ? 'border-destructive/50 bg-destructive/10 text-destructive'
                : 'border-border/80 bg-muted/40',
            )}
          >
            <Clock className="h-4 w-4 shrink-0" />
            <span className="font-mono text-lg font-bold tabular-nums leading-none">
              {secondsLeft !== null ? formatQuizCountdown(secondsLeft) : '--:--'}
            </span>
          </div>
          <Button size="sm" onClick={onFinish}>
            Finish test
          </Button>
        </div>
      </div>
    </header>
  );
}

interface QuizExamFooterProps {
  currentIndex: number;
  totalQuestions: number;
  isMarkedForReview: boolean;
  isLastQuestion: boolean;
  submitting: boolean;
  onPrevious: () => void;
  onToggleReview: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function QuizExamFooter({
  currentIndex,
  totalQuestions,
  isMarkedForReview,
  isLastQuestion,
  submitting,
  onPrevious,
  onToggleReview,
  onNext,
  onSubmit,
}: QuizExamFooterProps) {
  return (
    <footer className="sticky bottom-0 z-40 border-t border-border/80 bg-card/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-card/90 lg:px-5">
      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="outline" size="sm" onClick={onPrevious} disabled={currentIndex === 0}>
          Previous
        </Button>

        <p className="hidden text-xs text-muted-foreground sm:block">
          Question {currentIndex + 1} of {totalQuestions}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={isMarkedForReview ? 'default' : 'outline'}
            size="sm"
            onClick={onToggleReview}
            className={cn(isMarkedForReview && 'bg-amber-600 hover:bg-amber-600/90')}
          >
            {isMarkedForReview ? 'Marked for review' : 'Mark for review'}
          </Button>

          {isLastQuestion ? (
            <Button type="button" size="sm" onClick={onSubmit} disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit test'}
            </Button>
          ) : (
            <Button type="button" size="sm" onClick={onNext}>
              Save &amp; next
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}

interface QuizExamShellProps {
  topBar: ReactNode;
  palette: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

export function QuizExamShell({ topBar, palette, children, footer }: QuizExamShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-var(--site-header-h))] flex-col bg-muted/20">
      {topBar}
      <div className="flex min-h-0 flex-1 flex-row">
        {palette}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
          {footer}
        </div>
      </div>
    </div>
  );
}

interface QuizPageIntroProps {
  backLink: ReactNode;
  title: string;
  meta: ReactNode;
  badges?: ReactNode;
  children: ReactNode;
}

export function QuizPageIntro({ backLink, title, meta, badges, children }: QuizPageIntroProps) {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      {backLink}
      <div className="space-y-2 border-b border-border/60 pb-5">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{meta}</p>
        {badges && <div className="flex flex-wrap gap-2 pt-1">{badges}</div>}
      </div>
      {children}
    </div>
  );
}

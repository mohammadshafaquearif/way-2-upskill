import type { DbQuizQuestion } from '@/lib/lms/dbTypes';
import { cn } from '@/lib/utils';
import { Flag } from 'lucide-react';

interface QuizQuestionPaletteProps {
  questions: DbQuizQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  reviewQuestionIds: Set<string>;
  onSelect: (index: number) => void;
}

export function QuizQuestionPalette({
  questions,
  currentIndex,
  answers,
  reviewQuestionIds,
  onSelect,
}: QuizQuestionPaletteProps) {
  const answeredCount = questions.filter((q) => answers[q.id]).length;

  const legend = (
    <div className="space-y-1.5 text-[11px] text-muted-foreground">
      <p className="flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-primary" />
        Answered
      </p>
      <p className="flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm border border-border" />
        Not answered
      </p>
      <p className="flex items-center gap-2">
        <Flag className="h-3 w-3 text-amber-600" />
        For review
      </p>
    </div>
  );

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border/80 bg-card">
      <div className="border-b border-border/60 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Question palette</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {answeredCount} of {questions.length} answered
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-4 gap-2">
          {questions.map((question, index) => {
            const answered = Boolean(answers[question.id]);
            const isCurrent = index === currentIndex;
            const isReview = reviewQuestionIds.has(question.id);

            return (
              <button
                key={question.id}
                type="button"
                onClick={() => onSelect(index)}
                className={cn(
                  'relative flex h-9 items-center justify-center rounded-md text-xs font-semibold transition-all',
                  isCurrent && 'ring-2 ring-primary ring-offset-1 ring-offset-background',
                  answered
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border bg-background text-muted-foreground hover:border-foreground/30 hover:bg-muted/60',
                  isReview && !answered && 'border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-200',
                  isReview && answered && 'ring-1 ring-amber-400',
                )}
                aria-label={`Question ${index + 1}${isReview ? ', marked for review' : ''}${answered ? ', answered' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {index + 1}
                {isReview && (
                  <Flag
                    className={cn(
                      'absolute -right-1 -top-1 h-2.5 w-2.5',
                      answered ? 'text-primary-foreground' : 'text-amber-600',
                    )}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="border-t border-border/60 p-3">{legend}</div>
    </aside>
  );
}

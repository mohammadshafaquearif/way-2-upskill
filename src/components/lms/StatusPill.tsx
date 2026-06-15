import { cn } from '@/lib/utils';

const variants = {
  neutral: 'bg-muted text-muted-foreground',
  active: 'bg-foreground text-background',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-800 dark:text-amber-300',
  muted: 'bg-muted/80 text-muted-foreground',
} as const;

interface StatusPillProps {
  label: string;
  variant?: keyof typeof variants;
  className?: string;
}

export function StatusPill({ label, variant = 'neutral', className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}

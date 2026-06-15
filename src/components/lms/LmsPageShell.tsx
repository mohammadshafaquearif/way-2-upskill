import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LmsPageShellProps {
  title?: string;
  description?: string;
  meta?: ReactNode;
  children: ReactNode;
}

export function LmsPageShell({ title, description, meta, children }: LmsPageShellProps) {
  const hasHeader = Boolean(title || description || meta);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      {hasHeader && (
        <header className={cn('space-y-1', title || description ? 'border-b border-border/60 pb-6' : 'pb-2')}>
          {title && (
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          )}
          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
          {meta}
        </header>
      )}
      {children}
    </div>
  );
}

import type { LMSAssignment, LMSPhaseProject, LMSProject } from '@/lib/lms/types';
import { StatusPill } from '@/components/lms/StatusPill';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type PhaseProjectData = LMSPhaseProject | LMSProject | LMSAssignment;

function isAssignment(item: PhaseProjectData): item is LMSAssignment {
  return 'dueDate' in item && 'status' in item && !('deliverables' in item && 'label' in item);
}

function isLmsProject(item: PhaseProjectData): item is LMSProject {
  return 'status' in item && !('dueDate' in item);
}

function getLabel(item: PhaseProjectData, index: number): string {
  if ('label' in item && item.label) return item.label;
  if (isAssignment(item)) return `Phase ${index + 1}`;
  return `Project ${index + 1}`;
}

function getStatus(item: PhaseProjectData): { label: string; variant: 'success' | 'warning' | 'active' | 'muted' } {
  if (isAssignment(item)) {
    if (item.status === 'approved') return { label: 'Approved', variant: 'success' };
    if (item.status === 'submitted' || item.status === 'reviewed') return { label: 'Submitted', variant: 'active' };
    return { label: 'Pending', variant: 'warning' };
  }
  if (isLmsProject(item)) {
    if (item.status === 'reviewed') return { label: 'Reviewed', variant: 'success' };
    if (item.status === 'submitted') return { label: 'Submitted', variant: 'active' };
    if (item.status === 'in_progress') return { label: 'In progress', variant: 'warning' };
    return { label: 'Not started', variant: 'muted' };
  }
  return { label: 'Portfolio', variant: 'muted' };
}

interface PhaseProjectPanelProps {
  item: PhaseProjectData;
  index: number;
  actions?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export function PhaseProjectPanel({ item, index, actions, compact, className }: PhaseProjectPanelProps) {
  const label = getLabel(item, index);
  const status = getStatus(item);
  const isCapstone = 'isCapstone' in item && item.isCapstone;
  const deliverables = item.deliverables ?? [];
  const skills = item.skills ?? [];

  return (
    <article
      className={cn(
        'rounded-xl border border-border/80 bg-card',
        compact ? 'p-4' : 'p-5',
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            {isCapstone ? 'Capstone' : label}
            {isAssignment(item) && item.moduleId ? ` · Module ${item.moduleId}` : ''}
          </p>
          <h3 className="text-base font-semibold leading-snug text-foreground">{item.title}</h3>
        </div>
        <StatusPill label={status.label} variant={status.variant} />
      </div>

      {!compact && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      )}

      {deliverables.length > 0 && (
        <ul className={cn('space-y-1.5 text-sm text-muted-foreground', compact ? 'mt-3' : 'mt-4')}>
          {deliverables.map((d) => (
            <li key={d} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}

      {skills.length > 0 && !compact && (
        <p className="mt-4 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">Skills:</span>{' '}
          {skills.join(' · ')}
        </p>
      )}

      {isAssignment(item) && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          Due{' '}
          {new Date(item.dueDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      )}

      {actions && <div className="mt-4">{actions}</div>}
    </article>
  );
}

export function PhaseProjectLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Button asChild variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground hover:text-foreground">
      <Link to={to}>
        {children}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );
}

export function SubmittedNote() {
  return (
    <p className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      Submitted — awaiting mentor review
    </p>
  );
}

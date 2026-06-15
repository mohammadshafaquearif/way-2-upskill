import { Link } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { useLmsCurriculum } from '@/hooks/useLmsCurriculum';
import { computeSimulatorProgress, getModuleStatuses } from '@/lib/lms/utils';
import type { ModuleStatus } from '@/lib/lms/types';
import { LmsPageShell } from '@/components/lms/LmsPageShell';
import { PhaseProjectPanel } from '@/components/lms/PhaseProjectPanel';
import { StatusPill } from '@/components/lms/StatusPill';
import { Loader2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusVariant: Record<ModuleStatus, 'success' | 'active' | 'muted'> = {
  completed: 'success',
  current: 'active',
  locked: 'muted',
};

const statusLabel: Record<ModuleStatus, string> = {
  completed: 'Done',
  current: 'In progress',
  locked: 'Locked',
};

const LMSCurriculum = () => {
  const { user, programId, courseId, learnerState } = useLearnerProgram();
  const { phases, isLoading } = useLmsCurriculum(courseId, programId);

  if (!user || !learnerState) return null;

  const { completedCount } = computeSimulatorProgress(user.id, programId);
  const moduleStatuses = getModuleStatuses(programId, completedCount);

  return (
    <LmsPageShell
      meta={
        <p className="text-sm text-muted-foreground">
          {learnerState.completedModules} of {learnerState.totalModules} modules completed
        </p>
      }
    >
      {isLoading ? (
        <div className="flex items-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading curriculum…
        </div>
      ) : (
        <div className="space-y-10">
          {phases.map((phase, phaseIndex) => (
            <section key={phase.id} className="relative">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {String(phaseIndex + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">{phase.label}</h2>
                  {phase.meta && (
                    <p className="mt-0.5 text-sm text-muted-foreground">{phase.meta}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 border-l border-border/80 pl-5">
                {phase.modules.map((mod) => {
                  const status = moduleStatuses.get(mod.id) ?? 'locked';
                  const locked = status === 'locked';

                  const body = (
                    <div
                      className={cn(
                        'rounded-xl border border-border/80 bg-card p-4 transition-colors',
                        !locked && 'hover:border-foreground/20 hover:bg-muted/30',
                        locked && 'opacity-60',
                      )}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Module {mod.id}</p>
                          <h3 className="mt-0.5 font-medium leading-snug">{mod.title}</h3>
                        </div>
                        <StatusPill label={statusLabel[status]} variant={statusVariant[status]} />
                      </div>

                      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        {mod.topics.slice(0, 4).map((topic) => (
                          <li key={topic} className="truncate">
                            {topic}
                          </li>
                        ))}
                        {mod.topics.length > 4 && (
                          <li className="text-xs">+{mod.topics.length - 4} more topics</li>
                        )}
                      </ul>

                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>{mod.lessonCount} topics</span>
                        {mod.hasQuiz && <span>Topic quizzes</span>}
                        {mod.hasAssignment && <span>Phase project</span>}
                      </div>

                      {locked && (
                        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Lock className="h-3.5 w-3.5" />
                          Complete previous modules to unlock
                        </p>
                      )}
                    </div>
                  );

                  return locked ? (
                    <div key={mod.id}>{body}</div>
                  ) : (
                    <Link key={mod.id} to={`/dashboard/curriculum/${mod.id}`} className="block">
                      {body}
                    </Link>
                  );
                })}

                {phase.project && (
                  <PhaseProjectPanel
                    item={phase.project}
                    index={phaseIndex}
                    compact
                    className="bg-muted/20"
                  />
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </LmsPageShell>
  );
};

export default LMSCurriculum;

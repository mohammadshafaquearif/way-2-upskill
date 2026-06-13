import React from 'react';
import { Link } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { PROGRAM_CURRICULUM } from '@/lib/lms/curriculum';
import { computeSimulatorProgress, getModuleStatuses } from '@/lib/lms/utils';
import type { ModuleStatus } from '@/lib/lms/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, Lock, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig: Record<
  ModuleStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'text-green-600 dark:text-green-400',
  },
  current: {
    label: 'Current',
    icon: PlayCircle,
    className: 'text-primary',
  },
  locked: {
    label: 'Locked',
    icon: Lock,
    className: 'text-muted-foreground',
  },
};

const LMSCurriculum = () => {
  const { user, programId, learnerState } = useLearnerProgram();

  if (!user || !learnerState) return null;

  const phases = PROGRAM_CURRICULUM[programId];
  const { completedCount } = computeSimulatorProgress(user.id, programId);
  const moduleStatuses = getModuleStatuses(programId, completedCount);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Curriculum</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {learnerState.programTitle} — {learnerState.completedModules} of {learnerState.totalModules} modules completed
        </p>
      </div>

      {phases.map((phase) => (
        <Card key={phase.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">{phase.phase}</Badge>
                <CardTitle className="text-xl">{phase.label}</CardTitle>
                {phase.meta && (
                  <p className="mt-1 text-sm text-muted-foreground">{phase.meta}</p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {phase.modules.map((mod) => {
                const status = moduleStatuses.get(mod.id) ?? 'locked';
                const config = statusConfig[status];
                const StatusIcon = config.icon;

                return (
                  <AccordionItem key={mod.id} value={`mod-${mod.id}`} className="border-b last:border-0">
                    <AccordionTrigger className="py-4 hover:no-underline">
                      <div className="flex flex-1 items-center gap-3 text-left">
                        <StatusIcon className={cn('h-5 w-5 shrink-0', config.className)} />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Module {mod.id}
                          </p>
                          <p className="font-semibold">{mod.title}</p>
                        </div>
                        <Badge
                          variant={status === 'current' ? 'default' : 'outline'}
                          className="mr-2 shrink-0"
                        >
                          {config.label}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-8">
                      <ul className="mb-4 space-y-1.5">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="h-1 w-1 rounded-full bg-primary" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {mod.hasQuiz && <Badge variant="secondary">Module Quiz — 10 Questions</Badge>}
                        {mod.hasAssignment && <Badge variant="secondary">Assignment</Badge>}
                        <Badge variant="outline">{mod.lessonCount} Lessons</Badge>
                      </div>
                      {status !== 'locked' && (
                        <Link
                          to={`/dashboard/curriculum/${mod.id}`}
                          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80"
                        >
                          Open Module
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LMSCurriculum;

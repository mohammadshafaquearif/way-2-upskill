import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Check, Hammer, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CurriculumModule {
  id: number;
  title: string;
  topics: string[];
  project: {
    title: string;
    description: string;
  };
}

export interface CurriculumPhase {
  phase: string;
  label: string;
  meta?: string;
  modules: CurriculumModule[];
  miniProject?: {
    title: string;
    description: string;
  };
  /** Phase milestone portfolio build (replaces legacy miniProject label in UI) */
  industryProject?: {
    title: string;
    description: string;
  };
}

interface ProgramCurriculumAccordionProps {
  phases: CurriculumPhase[];
  variant?: 'default' | 'premium';
}

const ProgramCurriculumAccordion = ({ phases, variant = 'default' }: ProgramCurriculumAccordionProps) => {
  const isPremium = variant === 'premium';

  return (
    <div className={cn('program-curriculum-path', isPremium && 'program-curriculum-path--premium')}>
      <div className="program-curriculum-timeline" aria-hidden />

      <div className="space-y-8">
        {phases.map((phase, phaseIndex) => (
          <div
            key={phase.phase}
            className={cn(isPremium && 'program-curriculum-phase-block')}
            data-phase={phaseIndex + 1}
          >
            <div
              className={cn(
                'program-curriculum-phase mb-4',
                isPremium && 'program-curriculum-phase--premium',
                isPremium && `program-curriculum-phase--p${phaseIndex + 1}`,
              )}
            >
              {isPremium ? (
                <div className="program-curriculum-phase-head">
                  <div className="program-curriculum-phase-copy">
                    <span className="program-curriculum-phase-badge">{phase.phase}</span>
                    <p className="program-curriculum-phase-title">{phase.label}</p>
                    {phase.meta && <p className="program-curriculum-phase-meta">{phase.meta}</p>}
                  </div>
                  <span className="program-curriculum-phase-count">
                    {phase.modules.length} modules
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {phase.phase} — {phase.label}
                  </p>
                  {phase.meta && <p className="text-sm text-muted-foreground">{phase.meta}</p>}
                </>
              )}
            </div>

            <Accordion type="single" collapsible className="program-curriculum-accordion w-full">
              {phase.modules.map((mod) => (
                <AccordionItem
                  key={mod.id}
                  value={`module-${mod.id}`}
                  className="program-curriculum-item border-none"
                >
                  <AccordionTrigger
                    className={cn(
                      'program-curriculum-trigger rounded-lg px-4 py-3.5 text-left hover:no-underline sm:px-5',
                      isPremium && 'program-curriculum-trigger--premium',
                    )}
                  >
                    <span className="program-curriculum-node" aria-hidden />
                    <span className="min-w-0 flex-1 pr-3">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-primary/80">
                        Module {mod.id}
                      </span>
                      <span className="block text-sm font-bold text-foreground sm:text-base">
                        {mod.title}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="program-curriculum-content px-4 pb-4 pt-1 sm:px-5">
                    <ul className="mb-4 space-y-2">
                      {mod.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-xl border border-primary/15 bg-primary/5 p-3.5">
                      <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-primary">
                        <Hammer className="h-3.5 w-3.5" />
                        {mod.project.title}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {mod.project.description}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}

              {(phase.industryProject ?? phase.miniProject) && (
                <AccordionItem
                  value={`industry-${phase.phase}`}
                  className="program-curriculum-item border-none"
                >
                  <AccordionTrigger className="program-curriculum-trigger program-curriculum-trigger--mini rounded-lg px-4 py-3.5 text-left hover:no-underline sm:px-5">
                    <span className="program-curriculum-node program-curriculum-node--mini" aria-hidden />
                    <span className="min-w-0 flex-1 pr-3">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-primary sm:text-base">
                        <Star className="h-4 w-4 shrink-0 fill-current" />
                        {(phase.industryProject ?? phase.miniProject)!.title}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="program-curriculum-content px-4 pb-4 pt-1 sm:px-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {(phase.industryProject ?? phase.miniProject)!.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramCurriculumAccordion;

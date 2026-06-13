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
  project?: {
    label?: string;
    title: string;
    description: string;
    skills?: string[];
  };
}

export interface CurriculumCapstone {
  title: string;
  description: string;
  skills: string[];
  demonstrates?: string[];
  builds?: string[];
}

export interface CurriculumPhase {
  phase: string;
  label: string;
  meta?: string;
  outcome?: string;
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
  capstone?: CurriculumCapstone;
}

const ProgramCurriculumAccordion = ({
  phases,
  variant = 'default',
  capstone,
}: ProgramCurriculumAccordionProps) => {
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
                        {isPremium ? 'Topics' : `Module ${mod.id}`}
                      </span>
                      <span className="block text-sm font-bold text-foreground sm:text-base">
                        {mod.title}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="program-curriculum-content px-4 pb-4 pt-1 sm:px-5">
                    <ul className={cn('space-y-2', mod.project && 'mb-4')}>
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
                    {mod.project && (
                      <div className="rounded-xl border border-primary/15 bg-primary/5 p-3.5 sm:p-4">
                        <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                          <Hammer className="h-3.5 w-3.5" />
                          {mod.project.label ?? mod.project.title}
                        </p>
                        {mod.project.label && (
                          <p className="mb-2 text-sm font-bold text-foreground">{mod.project.title}</p>
                        )}
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {mod.project.description}
                        </p>
                        {mod.project.skills && mod.project.skills.length > 0 && (
                          <div className="mt-3 border-t border-primary/10 pt-3">
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              Skills Covered
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {mod.project.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-full border border-primary/15 bg-white/80 px-2.5 py-1 text-xs font-semibold text-foreground"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}

              {!isPremium && (phase.industryProject ?? phase.miniProject) && (
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

            {phase.outcome && (
              <div className="program-curriculum-outcome mt-4 rounded-xl border border-primary/15 bg-gradient-to-br from-primary/5 to-teal-500/5 p-4 sm:p-5">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-primary">Outcome</p>
                <p className="text-sm leading-relaxed text-foreground sm:text-[0.9375rem]">{phase.outcome}</p>
              </div>
            )}
          </div>
        ))}

        {capstone && (
          <div className="program-curriculum-capstone rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-teal-500/5 p-5 sm:p-6">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <Star className="h-4 w-4 fill-current" />
              Capstone Project
            </p>
            <h3 className="mb-3 font-display text-lg font-bold text-foreground sm:text-xl">{capstone.title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              {capstone.description}
            </p>
            {(() => {
              const buildItems = capstone.builds ?? capstone.demonstrates;
              return buildItems && buildItems.length > 0 ? (
              <div className="mb-4 border-t border-primary/10 pt-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {capstone.builds ? 'What You&apos;ll Build' : 'What You&apos;ll Demonstrate'}
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {buildItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null;
            })()}
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Skills Covered
            </p>
            <div className="flex flex-wrap gap-1.5">
              {capstone.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-primary/15 bg-white/80 px-2.5 py-1 text-xs font-semibold text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramCurriculumAccordion;

import React from 'react';
import { BookOpen, Hammer, FolderGit2, Briefcase } from 'lucide-react';
import { RevealStagger } from '@/components/motion/Reveal3D';

const steps = [
  {
    icon: BookOpen,
    step: '01',
    title: 'Learn Foundations',
    description: 'Clear concepts, modern tools, zero fluff — build a strong base.',
  },
  {
    icon: Hammer,
    step: '02',
    title: 'Build & Implement',
    description: 'Hands-on labs and guided exercises in real dev workflows.',
  },
  {
    icon: FolderGit2,
    step: '03',
    title: 'Ship Projects',
    description: 'Portfolio-ready capstones you can demo in interviews.',
  },
  {
    icon: Briefcase,
    step: '04',
    title: 'Launch Your Career',
    description: 'Confidence, proof of work, and skills employers actually want.',
  },
];

const LearningJourney = () => (
  <section className="relative overflow-hidden py-16 sm:py-20">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-100/20 to-background" aria-hidden />

    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          Your Path
        </span>
        <h2 className="section-title mb-4">From Zero to Job-Ready</h2>
        <p className="leading-relaxed text-muted-foreground">
          A proven 4-step journey that turns curiosity into career-ready skills — one milestone at
          a time.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div
          className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-border lg:block"
          aria-hidden
        />

        <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" staggerMs={100}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="journey-depth-card group relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/15 transition-transform duration-300 group-hover:-translate-y-0.5">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="mb-2 block font-mono text-xs font-bold text-primary/50">
                {step.step}
              </span>
              <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

              <div className="absolute -top-3 left-6 hidden h-6 w-6 items-center justify-center rounded-full bg-card text-[10px] font-bold text-primary shadow-sm ring-1 ring-border lg:flex">
                {i + 1}
              </div>
            </div>
          ))}
        </RevealStagger>
      </div>
    </div>
  </section>
);

export default LearningJourney;

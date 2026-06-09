import React from 'react';
import { BookOpen, Hammer, FolderGit2, Briefcase } from 'lucide-react';

const steps = [
  {
    icon: BookOpen,
    step: '01',
    title: 'Learn Foundations',
    description: 'Clear concepts, modern tools, zero fluff — build a strong base.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Hammer,
    step: '02',
    title: 'Build & Implement',
    description: 'Hands-on labs and guided exercises in real dev workflows.',
    color: 'from-violet-500 to-purple-700',
  },
  {
    icon: FolderGit2,
    step: '03',
    title: 'Ship Projects',
    description: 'Portfolio-ready capstones you can demo in interviews.',
    color: 'from-teal-500 to-emerald-700',
  },
  {
    icon: Briefcase,
    step: '04',
    title: 'Launch Your Career',
    description: 'Confidence, proof of work, and skills employers actually want.',
    color: 'from-amber-500 to-orange-600',
  },
];

const LearningJourney = () => (
  <section className="relative overflow-hidden py-16 sm:py-20">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-100/30 to-background" aria-hidden />

    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
          Your Path
        </span>
        <h2 className="section-title mb-4">From Zero to Job-Ready</h2>
        <p className="text-muted-foreground leading-relaxed">
          A proven 4-step journey that turns curiosity into career-ready skills — one milestone at
          a time.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Connector line — desktop */}
        <div
          className="absolute left-0 right-0 top-[3.25rem] hidden h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 via-50% to-amber-500 opacity-20 lg:block"
          aria-hidden
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="journey-card group relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <step.icon className="h-6 w-6" />
              </div>
              <span className="mb-2 block font-mono text-xs font-bold text-primary/50">
                {step.step}
              </span>
              <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

              {/* Step number bubble on connector */}
              <div className="absolute -top-3 left-6 hidden h-6 w-6 items-center justify-center rounded-full bg-card text-[10px] font-bold text-primary shadow-md ring-2 ring-primary/20 lg:flex">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default LearningJourney;

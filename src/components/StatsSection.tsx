import React from 'react';
import { BookOpen, FolderKanban, Users } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: 'Structured Learning Paths',
    description:
      'Clear roadmaps across DOP, AAC, AWS, and Data Science — so you always know what to learn next.',
  },
  {
    icon: FolderKanban,
    title: 'Project-First Curriculum',
    description:
      'Every program includes hands-on labs and capstone builds designed to strengthen your portfolio and interview confidence.',
  },
  {
    icon: Users,
    title: 'Mentor-Led Support',
    description:
      'Get guidance from practitioners through live sessions, reviews, and career-focused feedback throughout your journey.',
  },
];

const StatsSection = () => (
  <section className="relative overflow-hidden py-16 md:py-20" aria-labelledby="learning-approach-heading">
    <div className="brand-gradient-deep absolute inset-0" aria-hidden />
    <div className="cta-grid absolute inset-0 opacity-50" aria-hidden />

    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
          Our Approach
        </span>
        <h2 id="learning-approach-heading" className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Built for Skills That Employers Value
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
          Zyvotrix focuses on practical learning — not passive video watching — so you can build
          proof of work and grow with confidence.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
              <pillar.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-white">{pillar.title}</h3>
            <p className="text-sm leading-relaxed text-white/75">{pillar.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;

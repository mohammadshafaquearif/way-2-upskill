import React from 'react';
import { GraduationCap, Users, FolderKanban, Headphones } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Industry-Ready Curriculum',
    description:
      'Structured paths co-designed around real job roles in Full Stack, DevOps, Cloud, AI, and Data.',
  },
  {
    icon: Users,
    title: 'Expert-Led Learning',
    description:
      'Learn from practitioners who bring real-world experience, not just textbook theory.',
  },
  {
    icon: FolderKanban,
    title: 'Hands-On Projects',
    description:
      'Build portfolio-worthy projects that mirror how teams ship software in modern companies.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Get guidance throughout your journey — from fundamentals to capstone and career prep.',
  },
];

const WhyStandOut = () => (
  <section className="section-padding section-alt" id="why-zyvotrix">
    <div className="container px-4 sm:px-6">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="section-title">Why Our Programs Stand Out</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Zyvotrix combines structured roadmaps, practical implementation, and career-focused
          outcomes — the same pillars that make world-class edtech platforms effective.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              <feature.icon className="h-7 w-7" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyStandOut;

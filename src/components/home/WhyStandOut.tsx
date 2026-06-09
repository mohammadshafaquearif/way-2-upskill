import React from 'react';
import {
  GraduationCap,
  Users,
  FolderKanban,
  Headphones,
  ArrowUpRight,
  BookOpen,
  Hammer,
  Rocket,
  Briefcase,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { RevealStagger } from '@/components/motion/Reveal3D';
import DepthCard from '@/components/motion/DepthCard';

const pillars = [
  { icon: BookOpen, label: 'Learn' },
  { icon: Hammer, label: 'Build' },
  { icon: Rocket, label: 'Ship' },
  { icon: Briefcase, label: 'Hired' },
];

const features = [
  {
    icon: GraduationCap,
    title: 'Industry-Ready Curriculum',
    description:
      'Structured paths co-designed around real job roles in Full Stack, DevOps, Cloud, AI, and Data.',
    featured: true,
  },
  {
    icon: Users,
    title: 'Expert-Led Learning',
    description:
      'Learn from practitioners who bring real-world experience, not just textbook theory.',
    featured: false,
  },
  {
    icon: FolderKanban,
    title: 'Hands-On Projects',
    description:
      'Build portfolio-worthy projects that mirror how teams ship software in modern companies.',
    featured: false,
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Get guidance throughout your journey — from fundamentals to capstone and career prep.',
    featured: false,
  },
];

const WhyStandOut = () => (
  <section className="section-padding relative overflow-hidden" id="why-zyvotrix">
    <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" aria-hidden />

    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Why Zyvotrix
          </span>
          <h2 className="section-title mb-3">Built Different. Built for Results.</h2>
          <p className="leading-relaxed text-muted-foreground">
            Not another course library — a complete system for turning effort into employable skills.
          </p>
        </div>
        <Link
          to="/courses"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Explore all programs
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="space-y-5">
        {features
          .filter((f) => f.featured)
          .map((feature) => (
            <DepthCard
              key={feature.title}
              className="overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/8 via-card to-secondary/5 shadow-sm"
              maxTilt={4}
            >
              <div className="p-8 sm:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-lg">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">{feature.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {['React', 'Docker', 'AWS', 'Python', 'CI/CD'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/15 bg-white/80 px-3 py-1 text-xs font-semibold text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden shrink-0 md:block">
                    <div className="grid grid-cols-2 gap-3">
                      {pillars.map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-white/70 px-5 py-4 backdrop-blur-sm"
                        >
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="text-sm font-bold text-foreground">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DepthCard>
          ))}

        <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {features
            .filter((f) => !f.featured)
            .map((feature, i) => (
              <DepthCard
                key={feature.title}
                className="overflow-hidden rounded-3xl border border-border/80 bg-card"
                maxTilt={6}
              >
                <div className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  <span className="mt-4 block font-mono text-4xl font-black text-primary/[0.06]">
                    {String(i + 2).padStart(2, '0')}
                  </span>
                </div>
              </DepthCard>
            ))}
        </RevealStagger>
      </div>
    </div>
  </section>
);

export default WhyStandOut;

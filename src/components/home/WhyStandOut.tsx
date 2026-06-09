import React from 'react';
import { GraduationCap, Users, FolderKanban, Headphones, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: GraduationCap,
    title: 'Industry-Ready Curriculum',
    description:
      'Structured paths co-designed around real job roles in Full Stack, DevOps, Cloud, AI, and Data.',
    featured: true,
    gradient: 'from-primary/20 via-primary/5 to-secondary/10',
  },
  {
    icon: Users,
    title: 'Expert-Led Learning',
    description:
      'Learn from practitioners who bring real-world experience, not just textbook theory.',
    featured: false,
    gradient: 'from-violet-500/10 to-transparent',
  },
  {
    icon: FolderKanban,
    title: 'Hands-On Projects',
    description:
      'Build portfolio-worthy projects that mirror how teams ship software in modern companies.',
    featured: false,
    gradient: 'from-teal-500/10 to-transparent',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Get guidance throughout your journey — from fundamentals to capstone and career prep.',
    featured: false,
    gradient: 'from-amber-500/10 to-transparent',
  },
];

const WhyStandOut = () => (
  <section className="section-padding relative overflow-hidden" id="why-zyvotrix">
    <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" aria-hidden />
    <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" aria-hidden />

    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Why Zyvotrix
          </span>
          <h2 className="section-title mb-3">Built Different. Built for Results.</h2>
          <p className="text-muted-foreground leading-relaxed">
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
        {/* Featured wide card */}
        {features
          .filter((f) => f.featured)
          .map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-secondary/5 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 sm:p-10"
            >
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-lg">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
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
                    {['📚 Learn', '🔨 Build', '🚀 Ship', '💼 Hired'].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-border/60 bg-white/60 px-5 py-4 text-center text-sm font-bold text-foreground backdrop-blur-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {features.filter((f) => !f.featured).map((feature, i) => (
          <div
            key={feature.title}
            className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/8"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              aria-hidden
            />
            <div className="relative z-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
            <span className="absolute bottom-4 right-4 font-mono text-5xl font-black text-primary/[0.04]">
              {String(i + 2).padStart(2, '0')}
            </span>
          </div>
        ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyStandOut;

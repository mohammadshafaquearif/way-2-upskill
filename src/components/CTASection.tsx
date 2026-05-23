
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Map, Users } from 'lucide-react';

const highlights = [
  { icon: Map, label: 'Structured roadmaps' },
  { icon: Sparkles, label: 'Real-world projects' },
  { icon: Users, label: 'Growing community' },
];

const CTASection = () => {
  return (
    <section className="dark-surface cta-premium relative overflow-hidden py-20 md:py-28 text-white">
      <div className="cta-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-0 h-64 w-64 rounded-full bg-blue-500/25 blur-3xl"
        aria-hidden
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-md md:p-12">
            <div className="text-center">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-200">
                <Sparkles className="h-3.5 w-3.5" />
                Learn. Build. Thrive.
              </span>

              <h2 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Start Building{' '}
                <span className="bg-gradient-to-r from-sky-200 via-white to-teal-200 bg-clip-text text-transparent">
                  Real Tech Skills
                </span>{' '}
                Today
              </h2>

              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Learn modern technologies through practical learning, structured roadmaps, and
                real-world projects — built for confidence, not hype.
              </p>

              <div className="mb-10 flex flex-wrap justify-center gap-3">
                {highlights.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 sm:text-sm"
                  >
                    <Icon className="h-4 w-4 text-teal-300" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  asChild
                  size="lg"
                  className="h-auto w-full border-0 bg-white px-8 py-4 text-base font-bold text-brand-950 shadow-lg shadow-white/10 hover:bg-slate-100 sm:w-auto"
                >
                  <Link to="/courses" className="flex items-center justify-center gap-2">
                    Explore Programs
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto w-full border-2 border-white/25 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm hover:border-teal-300/50 hover:bg-teal-500/15 sm:w-auto"
                >
                  <Link to="/contact">Start Your Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

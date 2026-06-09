import React from 'react';
import { TrendingUp, Star, Award } from 'lucide-react';

const stats = [
  { value: '80%', label: 'Program completion rate', icon: Award },
  { value: '4.8 / 5', label: 'Rated by learners', icon: Star },
  { value: '40%+', label: 'Average skill growth', icon: TrendingUp },
];

const StatsSection = () => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div className="brand-gradient-deep absolute inset-0" aria-hidden />
    <div className="cta-grid absolute inset-0 opacity-60" aria-hidden />
    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" aria-hidden />
    <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl" aria-hidden />

    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
          Proven Results
        </span>
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Join Thousands of Learners Who Trust Zyvotrix
        </h2>
        <p className="mt-4 text-sm text-white/70 sm:text-base">
          Real stories. Incredible journeys. Measurable growth.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-transform group-hover:scale-110">
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">{stat.value}</p>
            <p className="mt-2 text-sm font-medium text-white/75">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;

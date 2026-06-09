import React from 'react';

const stats = [
  { value: '80%', label: 'Program completion rate' },
  { value: '4.8 / 5', label: 'Rated by learners' },
  { value: '40%+', label: 'Average skill growth' },
];

const StatsSection = () => (
  <section className="relative overflow-hidden py-16 md:py-20">
    <div className="brand-gradient-deep absolute inset-0" aria-hidden />
    <div className="cta-grid absolute inset-0 opacity-60" aria-hidden />

    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Join Thousands of Learners Who Trust Zyvotrix
        </h2>
        <p className="mt-4 text-sm text-white/75 sm:text-base">
          Real Stories. Incredible Journeys. Measurable Growth.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-sm"
          >
            <p className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">{stat.value}</p>
            <p className="mt-2 text-sm font-medium text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;


import React from 'react';

const stats = [
  { value: '5+', label: 'Tech Domains' },
  { value: '50+', label: 'Hands-on Projects' },
  { value: '100%', label: 'Practical Focus' },
  { value: '24/7', label: 'Learning Resources' },
];

const StatsSection = () => {
  return (
    <section className="py-12 brand-gradient text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center px-2">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold">{stat.value}</div>
              <div className="text-xs sm:text-sm md:text-base font-medium text-brand-100/90 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

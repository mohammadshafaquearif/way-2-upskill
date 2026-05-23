import React from 'react';
import { GraduationCap, Sprout, Briefcase, RefreshCw, Laptop, TrendingUp } from 'lucide-react';

const audiences = [
  { icon: GraduationCap, label: 'College Students' },
  { icon: Sprout, label: 'Beginners in Tech' },
  { icon: Briefcase, label: 'Working Professionals' },
  { icon: RefreshCw, label: 'Career Switchers' },
  { icon: Laptop, label: 'Freelancers' },
  { icon: TrendingUp, label: 'Developers Upskilling in AI & Cloud' },
];

const WhoCanJoin = () => (
  <section className="section-padding bg-background">
    <div className="container px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="section-title">Who Can Join?</h2>
        <p className="section-subtitle">
          Whether you&apos;re starting out or levelling up — Zyvotrix is built for ambitious learners
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {audiences.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border hover-card min-w-0"
          >
            <div className="feature-icon">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-brand-950 leading-snug break-words">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoCanJoin;

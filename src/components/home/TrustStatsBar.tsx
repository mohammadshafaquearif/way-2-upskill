import React from 'react';
import { CheckCircle2, Users, BookOpen, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Learners upskilling' },
  { icon: BookOpen, value: '50+', label: 'Hands-on projects' },
  { icon: TrendingUp, value: '85%', label: 'Report career growth' },
  { icon: CheckCircle2, value: '4.8/5', label: 'Learner satisfaction' },
];

const TrustStatsBar = () => (
  <section className="border-y border-border bg-card py-8 sm:py-10">
    <div className="container px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
              <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm leading-snug">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStatsBar;

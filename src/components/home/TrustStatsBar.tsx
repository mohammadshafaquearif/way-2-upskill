import React from 'react';
import { BookOpen, GraduationCap, Hammer, Headphones } from 'lucide-react';

const stats = [
  { icon: GraduationCap, value: '4', label: 'Certification programs', accent: 'text-blue-600', bg: 'from-blue-500/10 to-blue-600/5' },
  { icon: BookOpen, value: '50+', label: 'Hands-on projects', accent: 'text-violet-600', bg: 'from-violet-500/10 to-violet-600/5' },
  { icon: Hammer, value: '100%', label: 'Practical learning', accent: 'text-teal-600', bg: 'from-teal-500/10 to-teal-600/5' },
  { icon: Headphones, value: 'Live', label: 'Expert mentorship', accent: 'text-amber-600', bg: 'from-amber-500/10 to-amber-600/5' },
];

const TrustStatsBar = () => (
  <section className="relative -mt-8 z-20 px-4 pb-10 sm:px-6 sm:pb-12 md:pb-14">
    <div className="container">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${stat.bg} p-4 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md sm:p-5`}
          >
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/40 blur-2xl transition-opacity group-hover:opacity-80" aria-hidden />
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ${stat.accent} sm:h-11 sm:w-11`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</p>
            <p className="text-[11px] leading-snug text-muted-foreground sm:text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStatsBar;

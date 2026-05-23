import React from 'react';
import { Sprout, Users, BookOpen } from 'lucide-react';

const GrowthCommunityBanner = () => (
  <section className="py-10 border-y border-brand-300/40 bg-brand-100/50">
    <div className="container px-4 sm:px-6">
      <p className="text-center text-base sm:text-lg text-brand-950 font-medium max-w-3xl mx-auto mb-8">
        Currently building a{' '}
        <span className="text-primary font-bold">growing community</span> of modern tech learners.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
        {[
          { icon: Sprout, label: 'Growing platform', sub: 'Authentic, transparent, early-stage' },
          { icon: BookOpen, label: 'Practical learning', sub: 'Projects over hype' },
          { icon: Users, label: 'Community-first', sub: 'Learn and build together' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center gap-2 p-4">
            <Icon className="h-6 w-6 text-primary" />
            <p className="font-bold text-brand-950 text-sm">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GrowthCommunityBanner;

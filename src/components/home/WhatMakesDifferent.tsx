import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const differentiators = [
  'Industry-oriented curriculum',
  'Real-world project building',
  'Modern tech stack',
  'Beginner-friendly learning paths',
  'Career-focused guidance',
  'Practical implementation over theory',
  'Continuous support ecosystem',
];

const WhatMakesDifferent = () => (
  <section className="section-padding bg-background">
    <div className="container px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-title text-left">What Makes Zyvotrix Different?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">
            We&apos;re not another generic course marketplace. Zyvotrix is a practical learning
            ecosystem focused on skills that matter in modern tech teams.
          </p>
          <p className="text-brand-950 font-medium italic border-l-4 border-primary pl-4">
            Skills That Build Careers.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {differentiators.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
            >
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-brand-950">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default WhatMakesDifferent;

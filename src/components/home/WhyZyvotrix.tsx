import React from 'react';
import { Target } from 'lucide-react';

const WhyZyvotrix = () => (
  <section className="section-padding bg-background">
    <div className="container px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="pill-tag mb-4">Our Mission</span>
        <h2 className="section-title">Why We Built Zyvotrix</h2>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-5 sm:p-8 md:p-12 shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="feature-icon">
            <Target className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            Traditional learning often focuses heavily on theory while the industry demands practical
            skills, real problem-solving ability, and hands-on experience.
          </p>
          <p>
            Zyvotrix was created to bridge that gap. We aim to help learners understand how
            technologies are actually used in real companies through project-based learning, modern
            workflows, and practical implementation.
          </p>
          <p className="text-brand-950 font-semibold text-center pt-2">
            Our mission is simple: help learners build real skills, real confidence, and real career
            opportunities.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyZyvotrix;

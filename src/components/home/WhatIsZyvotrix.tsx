import React from 'react';

const WhatIsZyvotrix = () => (
  <section className="section-padding bg-background" id="about">
    <div className="container px-4 sm:px-6 max-w-3xl mx-auto text-center">
      <h2 className="section-title">What is Zyvotrix?</h2>
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Zyvotrix helps students, freshers, and professionals become industry-ready through structured
        programs in Full Stack, DevOps, Cloud, AI, and Data Analytics — built around real projects
        and modern tools.
      </p>
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10 text-left shadow-sm">
        <h3 className="text-xl font-bold text-brand-950 mb-4">Why We Built Zyvotrix</h3>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Traditional learning often focuses on theory while the industry demands hands-on skills
            and problem-solving.
          </p>
          <p>
            We help learners understand how technologies are used in real companies — through
            project-based learning, modern workflows, and practical implementation.
          </p>
          <p className="font-semibold text-brand-950 pt-2">
            Our mission: help you build real skills, real confidence, and real career opportunities.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhatIsZyvotrix;

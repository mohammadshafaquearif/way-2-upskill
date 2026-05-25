import React from 'react';
import { Link } from 'react-router-dom';

const WhatIsZyvotrix = () => (
  <section className="section-padding section-white" id="about">
    <div className="container px-4 sm:px-6 max-w-3xl mx-auto text-center">
      <h2 className="section-title">What is Zyvotrix?</h2>
      <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
        <p>
          Zyvotrix is a practical tech learning platform built for students, freshers, career
          switchers, and working professionals who want more than theory. Our focus is simple:
          help learners build real skills they can use in projects, interviews, internships, and
          modern technology roles.
        </p>
        <p>
          Instead of overwhelming learners with disconnected tutorials, we organize learning into
          structured paths across Full Stack Development, DevOps, Cloud Computing, AI, and Data
          Analytics. Each path is designed to combine fundamentals with hands-on implementation, so
          you do not just watch concepts, you apply them in realistic workflows.
        </p>
      </div>
      <div className="surface-card-lg p-8 md:p-10 text-left">
        <h3 className="text-xl font-bold text-foreground mb-4">Why We Built Zyvotrix</h3>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Traditional learning often focuses on theory while the industry demands hands-on skills
            and problem-solving.
          </p>
          <p>
            We help learners understand how technologies are used in real companies — through
            project-based learning, modern workflows, and practical implementation.
          </p>
          <p>
            If you are exploring the right path, you can review our{' '}
            <Link to="/courses" className="font-medium text-primary hover:underline">
              programs
            </Link>{' '}
            for detailed roadmaps, browse{' '}
            <Link to="/resources" className="font-medium text-primary hover:underline">
              learning resources
            </Link>{' '}
            for guided material, or read more{' '}
            <Link to="/about" className="font-medium text-primary hover:underline">
              about Zyvotrix
            </Link>{' '}
            to understand our mission and teaching philosophy.
          </p>
          <p className="font-semibold text-foreground pt-2 border-t border-border">
            Our mission: help you build real skills, real confidence, and real career opportunities.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhatIsZyvotrix;

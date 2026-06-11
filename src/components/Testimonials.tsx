import React from 'react';
import { Quote } from 'lucide-react';
import { COURSES } from '@/lib/courses';

const Testimonials = () => (
  <section className="section-padding relative overflow-hidden bg-white" aria-labelledby="experience-heading">
    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          Program Experience
        </span>
        <h2 id="experience-heading" className="section-title mb-3 text-left">
          What Every Zyvotrix Program Delivers
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Each certification path is designed around practical skills, guided projects, and
          career-ready outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {COURSES.map((course) => (
          <article
            key={course.id}
            className="rounded-2xl border border-border bg-card p-6 sm:p-7"
          >
            <Quote className="mb-4 h-5 w-5 text-primary/30" aria-hidden />
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {course.description}
            </p>
            <p className="text-sm font-bold text-foreground">{course.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">Duration: {course.duration}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

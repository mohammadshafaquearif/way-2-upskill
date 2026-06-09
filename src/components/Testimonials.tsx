import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    text: 'The project-based approach helped me finally connect theory with real implementation. My portfolio went from empty slides to deployed apps I could discuss in interviews.',
    author: 'Priya S.',
    role: 'Career Switcher · Full Stack',
    highlight: 'Built 3 portfolio projects',
    rating: 5,
    accent: 'from-blue-500/20 to-violet-500/20',
    avatar: 'PS',
  },
  {
    text: 'What stood out was the structured roadmaps and instructor support. I wasn\'t just watching videos — I was building CI/CD pipelines and cloud deployments step by step.',
    author: 'Rahul M.',
    role: 'Working Professional · DevOps',
    highlight: 'Completed DevOps capstone',
    rating: 5,
    accent: 'from-teal-500/20 to-emerald-500/20',
    avatar: 'RM',
  },
  {
    text: 'Zyvotrix felt more like a learning ecosystem than a course dump. The focus on modern tools and practical workflows matched what I see in job descriptions today.',
    author: 'Ananya K.',
    role: 'College Student · AI & Analytics',
    highlight: 'AI dashboard project',
    rating: 5,
    accent: 'from-amber-500/20 to-orange-500/20',
    avatar: 'AK',
  },
];

const Testimonials = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-brand-100/40 via-background to-background" aria-hidden />

    <div className="container relative z-10 px-4 sm:px-6">
      <div className="mb-12 text-center">
        <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
          Learner Stories
        </span>
        <h2 className="section-title">Real Stories, Incredible Journeys</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Hear from learners who transformed their skills and confidence through structured,
          project-driven programs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <article
            key={t.author}
            className="testimonial-card group relative rounded-3xl border border-border/80 bg-card p-6 sm:p-8"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${t.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              aria-hidden
            />
            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-md">
                  {t.avatar}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <Quote className="mb-3 h-6 w-6 text-primary/25" />
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <span className="mb-5 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {t.highlight}
              </span>
              <div className="border-t border-border pt-4">
                <p className="font-bold text-brand-950">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

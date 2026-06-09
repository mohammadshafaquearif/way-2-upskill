import React from 'react';
import { Quote, Star } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import TiltCard from '@/components/motion/TiltCard';
import { RevealStagger } from '@/components/motion/Reveal3D';

const testimonials = [
  {
    text: 'The project-based approach helped me finally connect theory with real implementation. My portfolio went from empty slides to deployed apps I could discuss in interviews.',
    author: 'Priya S.',
    role: 'Career Switcher · Full Stack',
    highlight: 'Built 3 portfolio projects',
    rating: 5,
    accent: 'from-primary/8 to-primary/4',
    avatar: 'PS',
    photo: IMAGES.programs.webDev,
  },
  {
    text: 'What stood out was the structured roadmaps and instructor support. I wasn\'t just watching videos — I was building CI/CD pipelines and cloud deployments step by step.',
    author: 'Rahul M.',
    role: 'Working Professional · DevOps',
    highlight: 'Completed DevOps capstone',
    rating: 5,
    accent: 'from-primary/8 to-secondary/8',
    avatar: 'RM',
    photo: IMAGES.programs.devops,
  },
  {
    text: 'Zyvotrix felt more like a learning ecosystem than a course dump. The focus on modern tools and practical workflows matched what I see in job descriptions today.',
    author: 'Ananya K.',
    role: 'College Student · AI & Analytics',
    highlight: 'AI dashboard project',
    rating: 5,
    accent: 'from-primary/6 to-primary/3',
    avatar: 'AK',
    photo: IMAGES.programs.analytics,
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

      <RevealStagger className="grid grid-cols-1 gap-6 md:grid-cols-3" staggerMs={90}>
        {testimonials.map((t) => (
          <TiltCard key={t.author} maxTilt={6}>
          <article className="testimonial-card group relative rounded-3xl border border-border/80 bg-card p-6 sm:p-8">
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${t.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              aria-hidden
            />
            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between">
                <div className="h-12 w-12 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-md">
                  <img src={t.photo} alt={t.author} className="h-full w-full object-cover" loading="lazy" />
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
          </TiltCard>
        ))}
      </RevealStagger>
    </div>
  </section>
);

export default Testimonials;

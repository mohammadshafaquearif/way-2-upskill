import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    text: 'The project-based approach helped me finally connect theory with real implementation. My portfolio went from empty slides to deployed apps I could discuss in interviews.',
    author: 'Priya S.',
    role: 'Career Switcher · Full Stack Learner',
    highlight: 'Built 3 portfolio projects',
    rating: 5,
  },
  {
    text: 'What stood out was the structured roadmaps and instructor support. I wasn’t just watching videos — I was building CI/CD pipelines and cloud deployments step by step.',
    author: 'Rahul M.',
    role: 'Working Professional · DevOps Track',
    highlight: 'Completed DevOps capstone',
    rating: 5,
  },
  {
    text: 'Zyvotrix felt more like a learning ecosystem than a course dump. The focus on modern tools and practical workflows matched what I see in job descriptions today.',
    author: 'Ananya K.',
    role: 'College Student · AI & Analytics',
    highlight: 'AI dashboard project',
    rating: 5,
  },
];

const Testimonials = () => (
  <section className="section-padding section-alt">
    <div className="container px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="section-title">Real Stories, Incredible Journeys</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Hear from learners who transformed their skills and confidence through structured,
          project-driven programs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card
            key={t.author}
            className="border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
          >
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <Quote className="h-8 w-8 text-primary/30" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

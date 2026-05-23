
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: 'The project-based approach helped me finally connect theory with real implementation. My portfolio went from empty slides to deployed apps I could discuss in interviews.',
    author: 'Priya S.',
    role: 'Career Switcher · Full Stack Learner',
    highlight: 'Built 3 portfolio projects',
  },
  {
    text: 'What stood out was the structured roadmaps and instructor support. I wasn’t just watching videos — I was building CI/CD pipelines and cloud deployments step by step.',
    author: 'Rahul M.',
    role: 'Working Professional · DevOps Track',
    highlight: 'Completed DevOps capstone',
  },
  {
    text: 'Zyvotrix felt more like a learning ecosystem than a course dump. The focus on modern tools and practical workflows matched what I see in job descriptions today.',
    author: 'Ananya K.',
    role: 'College Student · AI & Analytics',
    highlight: 'AI dashboard project',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Learner Stories</h2>
          <p className="section-subtitle">
            Real feedback from learners focused on skills, projects, and growth — not hype
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.author} className="hover-card border-border">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="mb-4 text-base text-muted-foreground leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <span className="inline-block pill-tag mb-4">{t.highlight}</span>
                <div>
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
};

export default Testimonials;

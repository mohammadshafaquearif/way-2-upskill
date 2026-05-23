import React from 'react';
import { BookOpen, Hammer, Building2, FolderGit2, Map, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: BookOpen,
    title: 'Learn Fundamentals',
    description: 'Strong foundations instead of shortcuts.',
  },
  {
    icon: Hammer,
    title: 'Practical Implementation',
    description: 'Apply concepts through real workflows.',
  },
  {
    icon: Building2,
    title: 'Industry-Oriented Learning',
    description: 'Tools and practices companies use today.',
  },
  {
    icon: FolderGit2,
    title: 'Build Real Projects',
    description: 'Portfolio work you can show employers.',
  },
  {
    icon: Map,
    title: 'Structured Roadmaps',
    description: 'Step-by-step paths for steady progress.',
  },
  {
    icon: TrendingUp,
    title: 'Career-Focused Growth',
    description: 'Confidence for interviews and real roles.',
  },
];

const LearningApproach = () => (
  <section className="section-padding bg-background" id="how-we-teach">
    <div className="container px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="section-title">How We Teach</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="relative bg-card rounded-xl p-6 border border-border"
          >
            <span className="absolute top-4 right-4 text-2xl font-bold text-brand-300/50">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="feature-icon mb-4 w-fit">
              <step.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-950 mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LearningApproach;

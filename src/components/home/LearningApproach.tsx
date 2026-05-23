import React from 'react';
import { BookOpen, Hammer, Building2, FolderGit2, Map, TrendingUp } from 'lucide-react';

const steps = [
  { icon: BookOpen, title: 'Learn Fundamentals', description: 'Strong foundations instead of shortcuts.' },
  { icon: Hammer, title: 'Practical Implementation', description: 'Apply concepts through real workflows.' },
  { icon: Building2, title: 'Industry-Oriented Learning', description: 'Tools and practices companies use today.' },
  { icon: FolderGit2, title: 'Build Real Projects', description: 'Portfolio work you can show employers.' },
  { icon: Map, title: 'Structured Roadmaps', description: 'Step-by-step paths for steady progress.' },
  { icon: TrendingUp, title: 'Career-Focused Growth', description: 'Confidence for interviews and real roles.' },
];

const LearningApproach = () => (
  <section className="section-padding section-white" id="how-we-teach">
    <div className="container px-4 sm:px-6">
      <h2 className="section-title text-center">How We Teach</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
        {steps.map((step, i) => (
          <div key={step.title} className="surface-card p-6 relative">
            <span className="absolute top-4 right-4 text-2xl font-bold text-primary/15">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="feature-icon mb-4">
              <step.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LearningApproach;

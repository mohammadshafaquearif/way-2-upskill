import React from 'react';
import { Link } from 'react-router-dom';
import { Map, FileText, Lightbulb, BookMarked, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resources = [
  {
    icon: Map,
    title: 'Learning Roadmaps',
    description: 'Step-by-step paths for Full Stack, DevOps, AWS, and more.',
    href: '/courses#programs',
  },
  {
    icon: FileText,
    title: 'Tech Blogs',
    description: 'Guides and explainers on modern tools and workflows.',
    href: '/contact',
    note: 'Coming soon',
  },
  {
    icon: BookMarked,
    title: 'Beginner Guides',
    description: 'Clear starting points for learners at every stage.',
    href: '/courses',
  },
  {
    icon: Lightbulb,
    title: 'Career Tips',
    description: 'Portfolio, interviews, and industry-ready thinking.',
    href: '/#faq',
  },
  {
    icon: Wrench,
    title: 'DevOps Content',
    description: 'Docker, Kubernetes, CI/CD, and cloud fundamentals.',
    href: '/courses/devops',
  },
  {
    icon: FileText,
    title: 'Project Ideas',
    description: 'Portfolio-worthy builds inspired by real workflows.',
    href: '/courses',
  },
];

const roadmaps = [
  { name: 'Full Stack Roadmap', href: '/courses/web-development' },
  { name: 'DevOps Roadmap', href: '/courses/devops' },
  { name: 'AWS & Cloud Roadmap', href: '/courses/cloud-computing' },
];

const FreeLearningResources = () => (
  <section className="section-padding bg-background pt-0" id="resources">
    <div className="container px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {resources.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="group rounded-xl border border-border bg-card p-6 hover-card block"
          >
            <item.icon className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-brand-950 mb-2 group-hover:text-primary transition-colors">
              {item.title}
              {item.note && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">({item.note})</span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-primary/20 bg-brand-100/40 p-8 max-w-3xl mx-auto text-center">
        <h3 className="text-lg font-bold text-brand-950 mb-4">Popular Roadmaps</h3>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {roadmaps.map((r) => (
            <Button key={r.name} asChild variant="outline" size="sm" className="border-primary text-primary">
              <Link to={r.href}>{r.name}</Link>
            </Button>
          ))}
        </div>
        <Button asChild className="brand-gradient text-white border-0">
          <Link to="/courses">
            View Programs <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default FreeLearningResources;

import React from 'react';
import { Link } from 'react-router-dom';
import { Map, FileText, Lightbulb, BookMarked, Wrench, ArrowRight, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resources = [
  {
    icon: Map,
    title: 'Learning Roadmaps',
    description: 'Step-by-step paths for DOP, AAC, AWS, and Data Science.',
    href: '/courses#programs',
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
    href: '/faq',
  },
  {
    icon: Wrench,
    title: 'DevOps Content',
    description: 'Docker, Kubernetes, CI/CD, and cloud fundamentals.',
    href: '/courses/dop',
  },
  {
    icon: FileText,
    title: 'Tech Blogs',
    description: 'Guides and explainers on modern tools and workflows.',
    href: '/resources',
  },
  {
    icon: FileText,
    title: 'Project Ideas',
    description: 'Portfolio-worthy builds inspired by real workflows.',
    href: '/courses',
  },
];

interface FreeLearningResourcesProps {
  showBanner?: boolean;
}

const FreeLearningResources = ({ showBanner = true }: FreeLearningResourcesProps) => (
  <section className="section-padding section-white" id="free-resources">
    <div className="container px-4 sm:px-6">
      {showBanner && (
      <div className="mb-12 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-8 text-center sm:p-12">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
          <Gift className="h-7 w-7" />
        </div>
        <h2 className="section-title mb-3">
          Level Up with Free, Industry-Focused Resources
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground leading-relaxed">
          Access roadmaps, guides, and learning material to start your tech journey — no commitment
          required.
        </p>
        <Button asChild size="lg" className="btn-brand h-12 px-8">
          <Link to="/resources">
            Explore Free Resources
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
      )}

      {!showBanner && (
        <div className="mb-10 text-center">
          <h2 className="section-title">Browse Resources</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Curated guides and roadmaps to accelerate your learning.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-1 font-bold text-brand-950 transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FreeLearningResources;

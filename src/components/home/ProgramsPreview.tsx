import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Cloud, BarChart3, Bot, Wrench, Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/lib/images';
import TiltCard from '@/components/motion/TiltCard';

type Category = 'all' | 'ai' | 'cloud' | 'development';

interface Program {
  icon: React.ElementType;
  title: string;
  description: string;
  route: string;
  image: string;
  duration: string;
  level: string;
  category: Category;
}

const programs: Program[] = [
  {
    icon: Code,
    title: 'Full Stack Web Development',
    description: 'React, Node.js, databases, APIs, and deployment — end to end.',
    route: '/courses/web-development',
    image: IMAGES.programs.webDev,
    duration: '16 weeks',
    level: 'Beginner to Advanced',
    category: 'development',
  },
  {
    icon: Wrench,
    title: 'DevOps Engineering',
    description: 'Linux, Docker, Kubernetes, CI/CD, and production workflows.',
    route: '/courses/devops',
    image: IMAGES.programs.devops,
    duration: '12 weeks',
    level: 'Intermediate',
    category: 'cloud',
  },
  {
    icon: Cloud,
    title: 'AWS & Cloud Computing',
    description: 'Cloud architecture, scaling, security, and infrastructure as code.',
    route: '/courses/cloud-computing',
    image: IMAGES.programs.cloud,
    duration: '10 weeks',
    level: 'Beginner to Intermediate',
    category: 'cloud',
  },
  {
    icon: Bot,
    title: 'AI/ML & Generative AI',
    description: 'Machine learning, LLMs, and building intelligent applications.',
    route: '/courses/ai-ml',
    image: IMAGES.programs.ai,
    duration: '14 weeks',
    level: 'Intermediate',
    category: 'ai',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics with AI',
    description: 'Dashboards, automation, and AI-powered data insights.',
    route: '/courses/ai-ml',
    image: IMAGES.programs.analytics,
    duration: '10 weeks',
    level: 'Beginner',
    category: 'ai',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Fundamentals',
    description: 'Network security, ethical hacking basics, and secure practices.',
    route: '/courses/cybersecurity',
    image: IMAGES.programs.security,
    duration: '8 weeks',
    level: 'Beginner',
    category: 'development',
  },
];

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Programs' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'development', label: 'Development' },
];

const ProgramsPreview = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered =
    activeCategory === 'all'
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding relative overflow-hidden section-white" id="programs">
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" aria-hidden />
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
            Top Programs
          </span>
          <h2 className="section-title">
            Pick Your Path.{' '}
            <span className="gradient-text">Build Your Future.</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Industry-oriented bootcamps designed to take you from fundamentals to job-ready skills.
            Each program includes structured modules, hands-on labs, and capstone projects.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((program) => (
            <TiltCard key={program.title} className="h-full" maxTilt={8}>
            <Link to={program.route} className="group block h-full">
              <article className="program-card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-lg bg-card/95 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
                    {program.level}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <program.icon className="h-5 w-5 text-primary" />
                    </span>
                    <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {program.title}
                    </h3>
                  </div>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                      View Program
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
            </TiltCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="btn-brand h-12 px-8">
            <Link to="/courses">
              View All Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsPreview;

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cloud, Wrench, BarChart3, Bot, Shield, Clock, Users } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import TiltCard from '@/components/motion/TiltCard';
import { usePageMeta } from '@/hooks/usePageMeta';

type Category = 'all' | 'development' | 'cloud' | 'ai' | 'security';

const courses = [
  {
    id: 'web-dev',
    title: 'Full Stack Development',
    description: 'Frontend, backend, APIs, databases, and deployment in one path.',
    duration: '16 Weeks',
    projects: '12+',
    level: 'Beginner to Advanced',
    icon: Code,
    image: IMAGES.programs.webDev,
    route: '/courses/web-development',
    category: 'development' as Category,
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Linux, Docker, Kubernetes, CI/CD, and production workflows.',
    duration: '12 Weeks',
    projects: '10+',
    level: 'Intermediate',
    icon: Wrench,
    image: IMAGES.programs.devops,
    route: '/courses/devops',
    category: 'cloud' as Category,
  },
  {
    id: 'cloud',
    title: 'AWS & Cloud Computing',
    description: 'Cloud services, infrastructure, scaling, and architecture.',
    duration: '10 Weeks',
    projects: '10+',
    level: 'Beginner to Intermediate',
    icon: Cloud,
    image: IMAGES.programs.cloud,
    route: '/courses/cloud-computing',
    category: 'cloud' as Category,
  },
  {
    id: 'ai-analytics',
    title: 'Data Analytics with AI',
    description: 'Dashboards, automation, and AI-powered data insights.',
    duration: '10 Weeks',
    projects: '15+',
    level: 'Beginner',
    icon: BarChart3,
    image: IMAGES.programs.analytics,
    route: '/courses/ai-ml',
    category: 'ai' as Category,
  },
  {
    id: 'agentic-ai',
    title: 'AI/ML & Generative AI',
    description: 'AI agents, automation workflows, and intelligent apps.',
    duration: '14 Weeks',
    projects: '12+',
    level: 'Intermediate',
    icon: Bot,
    image: IMAGES.programs.ai,
    route: '/courses/ai-ml',
    category: 'ai' as Category,
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Security fundamentals, ethical hacking, and defensive engineering.',
    duration: '8 Weeks',
    projects: '8+',
    level: 'Beginner',
    icon: Shield,
    image: IMAGES.programs.security,
    route: '/courses/cybersecurity',
    category: 'security' as Category,
  },
];

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Programs' },
  { id: 'development', label: 'Development' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'ai', label: 'AI & Data' },
  { id: 'security', label: 'Security' },
];

const highlights = [
  { icon: Users, label: 'Expert-led paths' },
  { icon: Clock, label: '8–16 week programs' },
  { icon: Code, label: '50+ hands-on projects' },
];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  usePageMeta({
    title: 'Programs & Courses',
    description:
      'Explore Zyvotrix programs in Full Stack Development, DevOps, Cloud, AI/ML, Data Analytics, and Cybersecurity — structured roadmaps with hands-on projects.',
    canonical: '/courses',
  });

  const filtered =
    activeCategory === 'all'
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <PageShell>
      <Navbar />

      <PageHero
        badge="All Programs"
        title={
          <>
            Programs for <span className="gradient-text">Modern Tech Careers</span>
          </>
        }
        subtitle="Structured paths with hands-on projects — pick a domain and view the full curriculum."
        image={IMAGES.hero.courses}
        imageAlt="Developer working on code at Zyvotrix"
        imageCaption={IMAGES.heroCaptions.courses}
      />

      <section className="relative -mt-6 z-10 px-4 sm:px-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border/60 bg-card px-6 py-4 shadow-lg">
            {highlights.map((h) => (
              <span key={h.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <h.icon className="h-4 w-4 text-primary" />
                {h.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-white" id="programs">
        <div className="container px-4 sm:px-6">
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <TiltCard key={course.id} className="h-full" maxTilt={8}>
              <Link to={course.route} className="group block h-full">
                <article className="program-card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-lg bg-card/95 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
                      {course.level}
                    </span>
                    <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 shadow-md">
                      <course.icon className="h-5 w-5 text-primary" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                      {course.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {course.description}
                    </p>
                    <div className="mb-4 flex justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                      <span>{course.projects} projects</span>
                    </div>
                    <span className="flex items-center gap-1 border-t border-border pt-4 text-sm font-semibold text-primary">
                      View program
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        badge="Need guidance?"
        title="Not sure where to start?"
        description="Tell us your goals — we'll help you choose the right program."
        primaryLabel="Get Guidance"
        primaryHref="/contact"
        secondaryLabel="Free Resources"
        secondaryHref="/resources"
      />

      <Footer />
    </PageShell>
  );
};

export default Courses;

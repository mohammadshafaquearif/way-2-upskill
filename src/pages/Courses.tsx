
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cloud, Wrench, BarChart3, Bot, Shield } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const courses = [
  {
    id: 'web-dev',
    title: 'Full Stack Development',
    description: 'Frontend, backend, APIs, databases, and deployment in one path.',
    duration: '10 Weeks',
    projects: '12+',
    icon: Code,
    image: IMAGES.programs.webDev,
    route: '/courses/web-development',
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Linux, Docker, Kubernetes, CI/CD, and production workflows.',
    duration: '8 Weeks',
    projects: '10+',
    icon: Wrench,
    image: IMAGES.programs.devops,
    route: '/courses/devops',
  },
  {
    id: 'cloud',
    title: 'AWS & Cloud Computing',
    description: 'Cloud services, infrastructure, scaling, and architecture.',
    duration: '10 Weeks',
    projects: '10+',
    icon: Cloud,
    image: IMAGES.programs.cloud,
    route: '/courses/cloud-computing',
  },
  {
    id: 'ai-analytics',
    title: 'Data Analytics with AI',
    description: 'Dashboards, automation, and AI-powered data insights.',
    duration: '8 Weeks',
    projects: '15+',
    icon: BarChart3,
    image: IMAGES.programs.analytics,
    route: '/courses/ai-ml',
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    description: 'AI agents, automation workflows, and intelligent apps.',
    duration: '8 Weeks',
    projects: '12+',
    icon: Bot,
    image: IMAGES.programs.agentic,
    route: '/courses/ai-ml',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Security fundamentals, ethical hacking, and defensive engineering.',
    duration: '12 Weeks',
    projects: '8+',
    icon: Shield,
    image: IMAGES.programs.security,
    route: '/courses/cybersecurity',
  },
];

const Courses = () => {
  return (
    <PageShell>
      <Navbar />

      <PageHero
        title={
          <>
            Programs for <span className="gradient-text">Modern Tech Careers</span>
          </>
        }
        subtitle="Structured paths with hands-on projects — pick a domain and view the full curriculum."
        image={IMAGES.hero.courses}
        imageAlt="Developer working on code"
      />

      <section className="section-padding section-white" id="programs">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link key={course.id} to={course.route} className="group block h-full">
                <Card className="h-full overflow-hidden border-border surface-card-interactive flex flex-col p-0">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 shadow-md">
                      <course.icon className="w-5 h-5 text-primary" />
                    </span>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0 pb-6">
                    <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      <span>{course.duration}</span>
                      <span>{course.projects} projects</span>
                    </div>
                    <span className="inline-flex items-center text-sm font-semibold text-primary">
                      View program <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
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

import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Cloud, BarChart3, Bot, Wrench } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IMAGES } from '@/lib/images';

const programs = [
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'Frontend, backend, APIs, databases, and deployment in one path.',
    route: '/courses/web-development',
    image: IMAGES.programs.webDev,
  },
  {
    icon: Wrench,
    title: 'DevOps Engineering',
    description: 'Linux, Docker, Kubernetes, CI/CD, and production workflows.',
    route: '/courses/devops',
    image: IMAGES.programs.devops,
  },
  {
    icon: Cloud,
    title: 'AWS & Cloud Computing',
    description: 'Cloud services, infrastructure, scaling, and architecture basics.',
    route: '/courses/cloud-computing',
    image: IMAGES.programs.cloud,
  },
  {
    icon: BarChart3,
    title: 'Data Analytics with AI',
    description: 'Dashboards, automation, and AI-powered data insights.',
    route: '/courses/ai-ml',
    image: IMAGES.programs.analytics,
  },
  {
    icon: Bot,
    title: 'Agentic AI',
    description: 'AI agents, automation workflows, and intelligent applications.',
    route: '/courses/ai-ml',
    image: IMAGES.programs.agentic,
  },
];

const ProgramsPreview = () => (
  <section className="section-padding section-alt" id="programs">
    <div className="container px-4 sm:px-6">
      <h2 className="section-title text-center">Programs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {programs.map((program) => (
          <Link key={program.title} to={program.route} className="group block h-full">
            <Card className="h-full overflow-hidden border-border p-0 surface-card-interactive">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent" />
                <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-card/95 shadow-md">
                  <program.icon className="h-4 w-4 text-primary" />
                </span>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {program.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">{program.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <p className="text-center mt-8 text-sm text-muted-foreground">
        <Link to="/courses" className="font-semibold text-primary hover:underline">
          View all program details →
        </Link>
      </p>
    </div>
  </section>
);

export default ProgramsPreview;

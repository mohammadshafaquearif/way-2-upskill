import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Cloud, BarChart3, Bot, Wrench } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const programs = [
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'Frontend, backend, APIs, databases, and deployment in one path.',
    route: '/courses/web-development',
    color: 'from-brand-700 to-brand-500',
  },
  {
    icon: Wrench,
    title: 'DevOps Engineering',
    description: 'Linux, Docker, Kubernetes, CI/CD, and production workflows.',
    route: '/courses/devops',
    color: 'from-brand-500 to-brand-300',
  },
  {
    icon: Cloud,
    title: 'AWS & Cloud Computing',
    description: 'Cloud services, infrastructure, scaling, and architecture basics.',
    route: '/courses/cloud-computing',
    color: 'from-brand-950 to-brand-700',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics with AI',
    description: 'Dashboards, automation, and AI-powered data insights.',
    route: '/courses/ai-ml',
    color: 'from-brand-700 to-brand-500',
  },
  {
    icon: Bot,
    title: 'Agentic AI',
    description: 'AI agents, automation workflows, and intelligent applications.',
    route: '/courses/ai-ml',
    color: 'from-brand-500 to-brand-700',
  },
];

const ProgramsPreview = () => (
  <section className="section-padding bg-brand-100/30" id="programs">
    <div className="container px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="section-title">Programs</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {programs.map((program) => (
          <Link key={program.title} to={program.route} className="block group">
            <Card className="h-full hover-card border-border bg-card transition-colors group-hover:border-primary/40">
              <CardHeader className="space-y-3 pb-4">
                <span
                  className={`inline-flex w-11 h-11 rounded-xl bg-gradient-to-br ${program.color} items-center justify-center`}
                >
                  <program.icon className="h-5 w-5 text-white" />
                </span>
                <CardTitle className="text-lg text-brand-950 group-hover:text-primary transition-colors">
                  {program.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {program.description}
                </CardDescription>
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

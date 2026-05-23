import React from 'react';
import { FolderGit2 } from 'lucide-react';

const projects = [
  'Full Stack Web Applications',
  'Authentication Systems',
  'Cloud Deployment Projects',
  'DevOps CI/CD Pipelines',
  'Kubernetes Deployments',
  'AI-Powered Dashboards',
  'Analytics Platforms',
  'API-Based Applications',
  'Automation Workflows',
];

const ProjectShowcase = () => (
  <section className="section-padding bg-brand-100/40" id="projects">
    <div className="container px-4 sm:px-6">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="section-title">Build Projects That Strengthen Your Portfolio</h2>
        <p className="section-subtitle mt-4">
          At Zyvotrix, learning goes beyond watching tutorials. Learners work on practical projects
          inspired by real-world applications and modern industry workflows — including guided builds
          and instructor-led examples as we grow.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {projects.map((name) => (
          <div
            key={name}
            className="flex items-start sm:items-center gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border text-sm font-semibold text-brand-950 hover-card min-w-0"
          >
            <FolderGit2 className="h-5 w-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span className="break-words leading-snug">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectShowcase;

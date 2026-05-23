import React from 'react';

const stacks = [
  {
    category: 'Frontend',
    tools: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    tools: ['Node.js', 'Express.js', 'Java'],
  },
  {
    category: 'DevOps & Cloud',
    tools: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
  },
  {
    category: 'Databases',
    tools: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    category: 'AI & Analytics',
    tools: ['Python', 'Pandas', 'OpenAI APIs'],
  },
];

const TechStackSection = () => (
  <section className="section-padding bg-background">
    <div className="container px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="section-title">Technologies You&apos;ll Work With</h2>
        <p className="section-subtitle">
          Modern tools used in real companies — not outdated tutorials
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {stacks.map((stack) => (
          <div key={stack.category} className="rounded-xl border border-border bg-card p-6 hover-card">
            <h3 className="text-sm font-bold uppercase tracking-wide text-primary mb-4">
              {stack.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {stack.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-full bg-brand-100 text-xs font-semibold text-brand-950 border border-brand-300/50"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackSection;

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import FreeLearningResources from '@/components/home/FreeLearningResources';
import { IMAGES } from '@/lib/images';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ArrowRight, Code, Wrench, Cloud } from 'lucide-react';

const roadmaps = [
  {
    icon: Code,
    title: 'Full Stack Roadmap',
    desc: 'React, Node.js, databases & deployment',
    href: '/courses/web-development',
    color: 'from-blue-500/15 to-blue-600/5',
  },
  {
    icon: Wrench,
    title: 'DevOps Roadmap',
    desc: 'Docker, Kubernetes, CI/CD pipelines',
    href: '/courses/devops',
    color: 'from-violet-500/15 to-violet-600/5',
  },
  {
    icon: Cloud,
    title: 'Cloud Roadmap',
    desc: 'AWS, infrastructure & scaling',
    href: '/courses/cloud-computing',
    color: 'from-teal-500/15 to-teal-600/5',
  },
];

const Resources = () => {
  usePageMeta({
    title: 'Free Learning Resources',
    description:
      'Free roadmaps, beginner guides, career tips, and curated tech learning resources from Zyvotrix.',
    canonical: '/resources',
  });

  return (
    <PageShell>
      <Navbar />
      <PageHero
        badge="100% Free"
        title={
          <>
            Free <span className="gradient-text">Learning Resources</span>
          </>
        }
        subtitle="Roadmaps, guides, and curated content to support your tech journey — at your own pace."
        image={IMAGES.hero.resources}
        imageAlt="Study and learning resources at Zyvotrix"
        imageCaption={IMAGES.heroCaptions.resources}
      />

      <section className="relative -mt-6 z-10 px-4 sm:px-6">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-3">
            {roadmaps.map((r) => (
              <Link
                key={r.title}
                to={r.href}
                className={`group flex items-center gap-4 rounded-2xl border border-border/60 bg-gradient-to-br ${r.color} p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                  <r.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FreeLearningResources showBanner={false} />

      <PageCta
        badge="Ready for more?"
        title="Take the next step"
        description="Free resources are just the start — explore full programs with projects and mentor support."
        primaryLabel="View Programs"
        primaryHref="/courses"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />

      <Footer />
    </PageShell>
  );
};

export default Resources;

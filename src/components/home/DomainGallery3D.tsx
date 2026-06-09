import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TiltCard from '@/components/motion/TiltCard';
import { Reveal3D } from '@/components/motion/Reveal3D';
import { IMAGES } from '@/lib/images';

const domains = [
  {
    title: 'Full Stack',
    desc: 'React, Node.js, APIs & deployment',
    image: IMAGES.programs.webDev,
    route: '/courses/web-development',
    color: 'from-blue-600/80 to-blue-900/80',
  },
  {
    title: 'DevOps',
    desc: 'Docker, K8s, CI/CD pipelines',
    image: IMAGES.programs.devops,
    route: '/courses/devops',
    color: 'from-violet-600/80 to-purple-900/80',
  },
  {
    title: 'Cloud',
    desc: 'AWS, scaling & infrastructure',
    image: IMAGES.programs.cloud,
    route: '/courses/cloud-computing',
    color: 'from-teal-600/80 to-emerald-900/80',
  },
  {
    title: 'AI & ML',
    desc: 'LLMs, agents & intelligent apps',
    image: IMAGES.programs.ai,
    route: '/courses/ai-ml',
    color: 'from-indigo-600/80 to-violet-900/80',
  },
  {
    title: 'Data Analytics',
    desc: 'Dashboards & AI-powered insights',
    image: IMAGES.programs.analytics,
    route: '/courses/ai-ml',
    color: 'from-amber-600/80 to-orange-900/80',
  },
  {
    title: 'Cybersecurity',
    desc: 'Security fundamentals & defense',
    image: IMAGES.programs.security,
    route: '/courses/cybersecurity',
    color: 'from-rose-600/80 to-red-900/80',
  },
];

const DomainGallery3D = () => {
  const [active, setActive] = useState(0);
  const current = domains[active];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-100/40 via-background to-background" aria-hidden />
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            Visual Learning Paths
          </span>
          <h2 className="section-title">
            Every Domain. <span className="gradient-text">One Platform.</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Explore career paths through real imagery — each program is built around industry tools
            and hands-on projects.
          </p>
        </div>

        <Reveal3D className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          {/* 3D featured image */}
          <TiltCard maxTilt={9} className="order-2 lg:order-1">
            <div className="gallery-3d-feature relative overflow-hidden rounded-3xl border border-border shadow-2xl">
              <img
                key={current.title}
                src={current.image}
                alt={`${current.title} program at Zyvotrix`}
                className="aspect-[4/3] w-full object-cover transition-opacity duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${current.color} mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">{current.title}</h3>
                <p className="mt-1 text-sm text-white/80 sm:text-base">{current.desc}</p>
                <Link
                  to={current.route}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
                >
                  View program <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </TiltCard>

          {/* Thumbnail grid */}
          <div className="order-1 grid grid-cols-2 gap-3 sm:gap-4 lg:order-2">
            {domains.map((domain, i) => (
              <button
                key={domain.title}
                type="button"
                onClick={() => setActive(i)}
                className={`gallery-3d-thumb group relative overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 ${
                  active === i
                    ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <img
                  src={domain.image}
                  alt={domain.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" />
                <span className="absolute bottom-2 left-3 text-sm font-bold text-white">{domain.title}</span>
              </button>
            ))}
          </div>
        </Reveal3D>
      </div>
    </section>
  );
};

export default DomainGallery3D;

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/lib/images';

const heroStats = [
  { value: '5+', label: 'Career paths' },
  { value: '50+', label: 'Live projects' },
  { value: '100%', label: 'Practical focus' },
];

const Hero = () => (
  <section className="hero-premium relative overflow-hidden">
    <div className="hero-premium-bg" aria-hidden />
    <div className="container relative z-10 mx-auto px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 md:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Learn. Build. Get Ahead in Tech
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-[1.12] tracking-tight text-brand-950 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Advance Your Career with{' '}
            <span className="gradient-text">Industry-Ready Skills</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            Master Full Stack, DevOps, Cloud, AI, and Data Analytics through structured programs,
            real projects, and expert guidance — built for students, professionals, and career
            switchers.
          </p>

          <div className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild size="lg" className="btn-brand h-12 w-full px-8 text-base sm:w-auto">
              <Link to="/courses" className="inline-flex items-center">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full border-2 border-primary/30 bg-card px-8 text-base font-semibold text-primary hover:bg-primary/5 sm:w-auto"
            >
              <Link to="/resources" className="inline-flex items-center">
                <PlayCircle className="mr-2 h-5 w-5" />
                Free Resources
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-border pt-8 lg:justify-start">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="hero-image-glow" aria-hidden />
          <div className="hero-image-frame shadow-2xl shadow-primary/10">
            <img
              src={IMAGES.hero.home}
              alt="Learners collaborating on tech projects"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/15 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold text-white sm:text-base">
                  Project-based learning for real career growth
                </p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">
                  Structured roadmaps · Hands-on labs · Portfolio projects
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 top-8 hidden rounded-xl border border-border bg-card p-4 shadow-lg lg:block">
            <p className="text-2xl font-bold text-primary">4.8★</p>
            <p className="text-xs font-medium text-muted-foreground">Learner rated</p>
          </div>
          <div className="absolute -right-2 bottom-20 hidden rounded-xl border border-border bg-card p-4 shadow-lg lg:block">
            <p className="text-2xl font-bold text-secondary">50+</p>
            <p className="text-xs font-medium text-muted-foreground">Real projects</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

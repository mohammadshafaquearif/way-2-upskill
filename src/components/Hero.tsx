
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/lib/images';

const Hero = () => {
  return (
    <section className="relative w-full max-w-[100vw] overflow-x-hidden brand-surface pt-20 pb-14 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -top-10 -right-16 h-48 w-48 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute -bottom-10 -left-16 h-40 w-40 rounded-full bg-gradient-to-r from-secondary/15 to-primary/15 blur-3xl sm:h-64 sm:w-64" />
      </div>

      <div className="container mx-auto w-full px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
          <div className="text-center lg:text-left">
            <h1 className="break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-6">
              <span className="text-brand-950">Build Modern Tech Skills</span>
              <br />
              <span className="gradient-text">Through Practical Learning</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Industry-oriented programs in Full Stack, DevOps, Cloud, AI, and Data Analytics — with
              structured paths and hands-on projects.
            </p>

            <Button
              asChild
              size="lg"
              className="h-auto px-8 py-4 text-base font-bold brand-gradient hover:opacity-90 text-white border-0 shadow-lg"
            >
              <Link to="/courses" className="inline-flex items-center justify-center">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="relative max-w-xl mx-auto lg:max-w-none w-full">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl aspect-[4/3]">
              <img
                src={IMAGES.hero.home}
                alt="Students collaborating on tech projects"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-brand-950/10 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white/90">
                Project-based learning for real career growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

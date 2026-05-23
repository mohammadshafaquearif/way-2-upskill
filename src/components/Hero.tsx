
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/lib/images';

const Hero = () => (
  <section className="page-hero">
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-secondary/[0.06]"
      aria-hidden
    />
    <div className="container relative z-10 mx-auto w-full px-4 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="text-center lg:text-left">
          <h1 className="page-hero-title mb-6">
            <span className="text-brand-950">Build Modern Tech Skills</span>
            <br />
            <span className="gradient-text">Through Practical Learning</span>
          </h1>
          <p className="page-hero-subtitle mx-auto mb-8 lg:mx-0">
            Industry-oriented programs in Full Stack, DevOps, Cloud, AI, and Data Analytics — with
            structured paths and hands-on projects.
          </p>
          <Button asChild size="lg" className="btn-brand h-auto px-8 py-4 text-base">
            <Link to="/courses" className="inline-flex items-center justify-center">
              Explore Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="hero-image-glow" aria-hidden />
          <div className="hero-image-frame">
            <img
              src={IMAGES.hero.home}
              alt="Students collaborating on tech projects"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-brand-950/10 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white/95">
              Project-based learning for real career growth
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

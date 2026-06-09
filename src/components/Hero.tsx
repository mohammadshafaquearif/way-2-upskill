import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero3DVisual from '@/components/motion/Hero3DVisual';
import AmbientDepth from '@/components/motion/AmbientDepth';

const SKILLS = ['Full Stack', 'DevOps', 'Cloud', 'AI & ML', 'Data Analytics', 'Cybersecurity'];

const heroStats = [
  { value: '5+', label: 'Career paths' },
  { value: '50+', label: 'Live projects' },
  { value: '100%', label: 'Practical focus' },
];

const Hero = () => {
  const [skillIndex, setSkillIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setSkillIndex((i) => (i + 1) % SKILLS.length);
        setVisible(true);
      }, 280);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-creative relative min-h-[90vh] overflow-x-hidden">
      <div className="hero-orb hero-orb-1 opacity-40" aria-hidden />
      <div className="hero-orb hero-orb-2 opacity-30" aria-hidden />
      <div className="hero-grid-overlay opacity-50" aria-hidden />
      <AmbientDepth />

      <div className="container relative z-10 mx-auto px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          <div className="text-center lg:text-left">
            <div className="hero-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Learn. Build. Get Ahead in Tech
            </div>

            <h1
              className="hero-fade-up mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-brand-950 sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]"
              style={{ animationDelay: '0.1s' }}
            >
              Master{' '}
              <span
                className={`gradient-text inline-block transition-all duration-300 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                }`}
              >
                {SKILLS[skillIndex]}
              </span>
              <br />
              <span className="text-brand-950">Skills That Get You Hired</span>
            </h1>

            <p
              className="hero-fade-up mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
              style={{ animationDelay: '0.2s' }}
            >
              Structured programs, real-world projects, and expert guidance — built for students,
              professionals, and career switchers ready to level up.
            </p>

            <div
              className="hero-fade-up mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={{ animationDelay: '0.3s' }}
            >
              <Button asChild size="lg" className="btn-brand group h-12 w-full px-8 text-base sm:w-auto">
                <Link to="/courses" className="inline-flex items-center">
                  Explore Programs
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full border-border bg-white px-8 text-base font-semibold text-foreground hover:bg-muted sm:w-auto"
              >
                <Link to="/resources" className="inline-flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5 text-primary" />
                  Free Resources
                </Link>
              </Button>
            </div>

            <div
              className="hero-fade-up flex flex-wrap items-center justify-center gap-8 border-t border-border pt-8 lg:justify-start"
              style={{ animationDelay: '0.4s' }}
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-fade-up" style={{ animationDelay: '0.2s' }}>
            <Hero3DVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

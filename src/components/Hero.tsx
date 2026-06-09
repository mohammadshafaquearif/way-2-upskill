import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero3DVisual from '@/components/motion/Hero3DVisual';
import FloatingShapes3D from '@/components/motion/FloatingShapes3D';

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
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-creative relative min-h-[90vh] overflow-x-hidden overflow-y-visible">
      {/* Ambient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />
      <div className="hero-orb hero-orb-3" aria-hidden />
      <div className="hero-grid-overlay" aria-hidden />
      <FloatingShapes3D />

      <div className="container relative z-10 mx-auto px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="hero-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <Sparkles className="h-4 w-4" />
              Learn. Build. Get Ahead in Tech
            </div>

            <h1
              className="hero-fade-up mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-brand-950 sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]"
              style={{ animationDelay: '0.1s' }}
            >
              Master{' '}
              <span
                className={`gradient-text-animated inline-block transition-all duration-300 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
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
              <Button
                asChild
                size="lg"
                className="btn-brand btn-shimmer group h-12 w-full px-8 text-base shadow-lg shadow-primary/25 sm:w-auto"
              >
                <Link to="/courses" className="inline-flex items-center">
                  Explore Programs
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full border-2 border-primary/20 bg-white/70 px-8 text-base font-semibold text-primary backdrop-blur-sm hover:bg-primary/5 sm:w-auto"
              >
                <Link to="/resources" className="inline-flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Free Resources
                </Link>
              </Button>
            </div>

            <div
              className="hero-fade-up flex flex-wrap items-center justify-center gap-8 border-t border-border/60 pt-8 lg:justify-start"
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

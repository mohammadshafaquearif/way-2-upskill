import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, Sparkles, Zap, Code2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/lib/images';

const SKILLS = ['Full Stack', 'DevOps', 'Cloud', 'AI & ML', 'Data Analytics', 'Cybersecurity'];

const heroStats = [
  { value: '5+', label: 'Career paths' },
  { value: '50+', label: 'Live projects' },
  { value: '100%', label: 'Practical focus' },
];

const codeLines = [
  { indent: 0, parts: [{ t: 'const ', c: 'text-sky-400' }, { t: 'learner', c: 'text-white' }, { t: ' = ', c: 'text-slate-400' }, { t: '{', c: 'text-slate-300' }] },
  { indent: 1, parts: [{ t: 'skill', c: 'text-teal-300' }, { t: ': ', c: 'text-slate-400' }, { t: '"Full Stack"', c: 'text-amber-300' }, { t: ',', c: 'text-slate-300' }] },
  { indent: 1, parts: [{ t: 'projects', c: 'text-teal-300' }, { t: ': ', c: 'text-slate-400' }, { t: '12', c: 'text-violet-300' }, { t: ',', c: 'text-slate-300' }] },
  { indent: 1, parts: [{ t: 'jobReady', c: 'text-teal-300' }, { t: ': ', c: 'text-slate-400' }, { t: 'true', c: 'text-violet-300' }] },
  { indent: 0, parts: [{ t: '}', c: 'text-slate-300' }, { t: ';', c: 'text-slate-400' }] },
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
    <section className="hero-creative relative min-h-[90vh] overflow-hidden">
      {/* Ambient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />
      <div className="hero-orb hero-orb-3" aria-hidden />
      <div className="hero-grid-overlay" aria-hidden />

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

          {/* Visual bento */}
          <div className="hero-fade-up relative mx-auto w-full max-w-lg lg:max-w-none" style={{ animationDelay: '0.2s' }}>
            <div className="hero-image-glow scale-110" aria-hidden />

            {/* Main image card */}
            <div className="relative z-10 overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-primary/15">
              <div className="aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={IMAGES.hero.home}
                  alt="Learners collaborating on tech projects"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Rocket className="h-4 w-4 text-teal-300" />
                    Project-based learning
                  </p>
                  <p className="mt-0.5 text-xs text-white/75">Roadmaps · Labs · Portfolio</p>
                </div>
                <div className="flex -space-x-2">
                  {['PS', 'RM', 'AK'].map((initials, i) => (
                    <div
                      key={initials}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30 bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white shadow-lg"
                      style={{ zIndex: 3 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-[10px] font-bold text-white backdrop-blur-sm">
                    +10k
                  </div>
                </div>
              </div>
            </div>

            {/* Floating code card */}
            <div className="animate-float absolute -left-2 top-6 z-20 hidden w-52 rounded-2xl border border-slate-700/50 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-sm sm:block lg:-left-8">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-[10px] text-slate-500">career.ts</span>
              </div>
              <pre className="font-mono text-[10px] leading-relaxed">
                {codeLines.map((line, li) => (
                  <div key={li} style={{ paddingLeft: `${line.indent * 12}px` }}>
                    {line.parts.map((p, pi) => (
                      <span key={pi} className={p.c}>
                        {p.t}
                      </span>
                    ))}
                  </div>
                ))}
              </pre>
            </div>

            {/* Floating rating */}
            <div
              className="animate-float absolute -right-2 top-12 z-20 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-sm lg:-right-6"
              style={{ animationDelay: '1s' }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
                  ⭐
                </div>
                <div>
                  <p className="text-xl font-bold text-brand-950">4.8</p>
                  <p className="text-[10px] font-medium text-muted-foreground">Learner rated</p>
                </div>
              </div>
            </div>

            {/* Floating projects badge */}
            <div
              className="animate-float absolute -bottom-4 -left-4 z-20 rounded-2xl border border-primary/20 bg-white p-4 shadow-xl lg:-left-10"
              style={{ animationDelay: '2s' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-xs font-medium text-muted-foreground">Real projects</p>
                </div>
              </div>
            </div>

            {/* Floating zap badge */}
            <div
              className="animate-float absolute -bottom-2 -right-2 z-20 hidden rounded-2xl border border-secondary/30 bg-secondary px-4 py-3 text-white shadow-xl sm:flex lg:-right-8"
              style={{ animationDelay: '0.5s' }}
            >
              <Zap className="mr-2 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-bold">85% growth</p>
                <p className="text-[10px] text-white/80">Career outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

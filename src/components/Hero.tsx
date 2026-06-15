import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  Check,
  Cloud,
  GitBranch,
  Layers,
  Server,
  Sparkles,
  BarChart3,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSlideVisual, { type HeroAccent } from '@/components/home/HeroSlideVisual';
import { IMAGES } from '@/lib/images';
import { COURSES } from '@/lib/courses';
import { cn } from '@/lib/utils';

const SLIDE_INTERVAL_MS = 6000;

interface HeroSlide {
  id: string;
  headline: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  accents: HeroAccent[];
  bullets?: string[];
}

const slides: HeroSlide[] = [
  {
    id: 'aac',
    headline: (
      <>
        Master Agentic AI
        <br />
        With Industry-Ready Certification
      </>
    ),
    ctaLabel: 'Explore Programs',
    ctaHref: COURSES[1].route,
    image: IMAGES.hero.slideAi,
    imageAlt: 'Learner exploring Agentic AI certification at Zyvotrix',
    accents: [
      { icon: Bot, className: 'hero-accent-1' },
      { icon: Sparkles, className: 'hero-accent-2' },
      { icon: Layers, className: 'hero-accent-3' },
    ],
    bullets: [
      'LLMs, agents & intelligent workflows',
      'Hands-on labs with real use cases',
      'Portfolio-ready AI capstone',
    ],
  },
  {
    id: 'dop',
    headline: (
      <>
        Become an AI-Powered
        <br />
        DevOps Engineer
      </>
    ),
    ctaLabel: 'Explore Programs',
    ctaHref: COURSES[0].route,
    image: IMAGES.hero.slideDev,
    imageAlt: 'Professional upskilling in AI-powered DevOps at Zyvotrix',
    accents: [
      { icon: Wrench, className: 'hero-accent-1' },
      { icon: Server, className: 'hero-accent-2' },
      { icon: GitBranch, className: 'hero-accent-3' },
    ],
  },
  {
    id: 'aws',
    headline: (
      <>
        AWS Solutions Architect
        <br />
        Certification Program
      </>
    ),
    ctaLabel: 'Explore Programs',
    ctaHref: COURSES[2].route,
    image: IMAGES.hero.slideCloud,
    imageAlt: 'Team training for AWS Solutions Architect certification',
    accents: [
      { icon: Cloud, className: 'hero-accent-1' },
      { icon: Server, className: 'hero-accent-2' },
      { icon: Layers, className: 'hero-accent-3' },
    ],
  },
  {
    id: 'data-science',
    headline: (
      <>
        Data Science with Python
        <br />
        Certification Program
      </>
    ),
    ctaLabel: 'Explore Programs',
    ctaHref: COURSES[3].route,
    image: IMAGES.hero.slideAi,
    imageAlt: 'Learner in Data Science with Python certification program',
    accents: [
      { icon: BarChart3, className: 'hero-accent-1' },
      { icon: Layers, className: 'hero-accent-2' },
      { icon: Sparkles, className: 'hero-accent-3' },
    ],
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="hero-slider relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured programs"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-slider-track">
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              aria-hidden={!isActive}
              className={cn('hero-slider-slide', isActive && 'hero-slider-slide--active')}
            >
              <div className="container relative z-10 mx-auto px-4 sm:px-6">
                <div className="hero-slider-layout">
                  <div className="hero-slider-copy">
                    <h1 className="hero-slider-headline">{slide.headline}</h1>
                    {slide.bullets && slide.bullets.length > 0 && (
                      <ul className="hero-slider-bullets">
                        {slide.bullets.map((point) => (
                          <li key={point} className="hero-slider-bullet">
                            <Check className="hero-slider-bullet-icon" aria-hidden />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Button asChild size="lg" className="btn-brand hero-slider-cta group mt-6 h-12 px-8 text-base md:mt-7 lg:mt-8">
                      <Link to={slide.ctaHref}>
                        {slide.ctaLabel}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                  <HeroSlideVisual
                    image={slide.image}
                    imageAlt={slide.imageAlt}
                    accents={slide.accents}
                    wide={slide.id === 'aws'}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hero-slider-dots" role="tablist" aria-label="Choose slide">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Go to slide ${index + 1}`}
            className={cn('hero-slider-dot', index === active && 'hero-slider-dot--active')}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

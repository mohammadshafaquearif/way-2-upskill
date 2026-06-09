import React from 'react';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  centered?: boolean;
}

const PageHero = ({
  title,
  subtitle,
  badge,
  image,
  imageAlt = '',
  children,
  centered = false,
}: PageHeroProps) => (
  <section className="page-hero-creative relative overflow-hidden">
    <div className="hero-orb hero-orb-1 opacity-60" aria-hidden />
    <div className="hero-orb hero-orb-2 opacity-50" aria-hidden />
    <div className="hero-grid-overlay opacity-70" aria-hidden />

    <div className="container relative z-10 px-4 pb-14 pt-20 sm:px-6 sm:pb-16 sm:pt-24 md:pt-28">
      <div
        className={
          image && !centered
            ? 'grid items-center gap-10 lg:grid-cols-2 lg:gap-14'
            : 'mx-auto max-w-3xl text-center'
        }
      >
        <div className={`hero-fade-up ${centered || !image ? 'mx-auto text-center' : ''}`}>
          {badge && (
            <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-sm">
              {badge}
            </span>
          )}
          <h1 className="page-hero-title mb-4 sm:mb-5">{title}</h1>
          {subtitle && (
            <p
              className={`page-hero-subtitle mb-6 sm:mb-8 ${centered || !image ? 'mx-auto' : ''}`}
            >
              {subtitle}
            </p>
          )}
          {children && (
            <div
              className={`flex flex-col gap-3 sm:flex-row ${centered || !image ? 'justify-center' : ''}`}
            >
              {children}
            </div>
          )}
        </div>

        {image && (
          <div
            className={`hero-fade-up relative ${centered ? 'mx-auto mt-10 w-full max-w-2xl' : ''}`}
            style={{ animationDelay: '0.15s' }}
          >
            <div className="hero-image-glow" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-primary/10">
              <div className="aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={image}
                  alt={imageAlt || (typeof title === 'string' ? title : 'Zyvotrix')}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/60 via-brand-950/10 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;

import React from 'react';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  centered?: boolean;
}

const PageHero = ({
  title,
  subtitle,
  image,
  imageAlt = '',
  children,
  centered = false,
}: PageHeroProps) => (
  <section className="page-hero">
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-secondary/[0.06]"
      aria-hidden
    />
    <div className="container relative z-10 px-4 sm:px-6">
      <div
        className={
          image && !centered
            ? 'grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center'
            : 'mx-auto max-w-3xl text-center'
        }
      >
        <div className={centered || !image ? 'mx-auto text-center' : ''}>
          <h1 className="page-hero-title mb-4 sm:mb-5">{title}</h1>
          {subtitle && (
            <p className={`page-hero-subtitle ${centered || !image ? 'mx-auto' : ''} mb-6 sm:mb-8`}>
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
          <div className={`relative ${centered ? 'mx-auto mt-10 w-full max-w-2xl' : ''}`}>
            <div className="hero-image-glow" aria-hidden />
            <div className="hero-image-frame">
              <img
                src={image}
                alt={imageAlt || (typeof title === 'string' ? title : 'Zyvotrix')}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-brand-950/5 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;

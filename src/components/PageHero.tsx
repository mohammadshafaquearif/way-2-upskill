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
  <section className="page-hero brand-surface relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" aria-hidden />
    <div className="container relative z-10 px-4 sm:px-6">
      <div
        className={
          image && !centered
            ? 'grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center'
            : 'max-w-3xl mx-auto text-center'
        }
      >
        <div className={centered || !image ? 'text-center mx-auto' : ''}>
          <h1 className="page-hero-title mb-4 sm:mb-5">{title}</h1>
          {subtitle && (
            <p className={`page-hero-subtitle ${centered || !image ? 'mx-auto' : ''} mb-6 sm:mb-8`}>
              {subtitle}
            </p>
          )}
          {children && (
            <div className={`flex flex-col sm:flex-row gap-3 ${centered || !image ? 'justify-center' : ''}`}>
              {children}
            </div>
          )}
        </div>

        {image && (
          <div className={`relative ${centered ? 'mt-10 max-w-2xl mx-auto w-full' : ''}`}>
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl aspect-[4/3] sm:aspect-[16/10]">
              <img
                src={image}
                alt={imageAlt || (typeof title === 'string' ? title : 'Zyvotrix')}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;

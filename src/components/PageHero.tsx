import React from 'react';
import PageHeroImage from '@/components/motion/PageHeroImage';
import FloatingShapes3D from '@/components/motion/FloatingShapes3D';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  children?: React.ReactNode;
  centered?: boolean;
}

const PageHero = ({
  title,
  subtitle,
  badge,
  image,
  imageAlt = '',
  imageCaption,
  children,
  centered = false,
}: PageHeroProps) => (
  <section className="page-hero-creative relative overflow-hidden">
    <div className="hero-orb hero-orb-1 opacity-60" aria-hidden />
    <div className="hero-orb hero-orb-2 opacity-50" aria-hidden />
    <div className="hero-grid-overlay opacity-70" aria-hidden />
    <FloatingShapes3D />

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
            className={`hero-fade-up ${centered ? 'mx-auto mt-10 w-full max-w-2xl' : ''}`}
            style={{ animationDelay: '0.15s' }}
          >
            <PageHeroImage
              src={image}
              alt={imageAlt || (typeof title === 'string' ? title : 'Zyvotrix')}
              caption={imageCaption}
            />
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;

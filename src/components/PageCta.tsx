import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import EnrollButton from '@/components/EnrollButton';
import { isEnrollHref } from '@/lib/enroll';

interface PageCtaProps {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  badge?: string;
  className?: string;
  programName?: string;
}

const PageCta = ({
  title,
  description,
  primaryLabel = 'Explore Programs',
  primaryHref = '/courses',
  secondaryLabel = 'Contact Us',
  secondaryHref = '/contact',
  badge = 'Take the next step',
  className,
  programName,
}: PageCtaProps) => {
  const primaryIsEnroll = isEnrollHref(primaryHref);
  const secondaryIsEnroll = isEnrollHref(secondaryHref);

  return (
    <section className={`dark-surface cta-premium relative overflow-hidden py-16 md:py-24 text-white${className ? ` ${className}` : ''}`}>
      <div className="cta-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl" aria-hidden />

      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
          <Sparkles className="h-3.5 w-3.5" />
          {badge}
        </span>
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">{title}</h2>
        <p className="mb-10 leading-relaxed text-slate-300">{description}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          {primaryIsEnroll ? (
            <EnrollButton
              programName={programName}
              size="lg"
              className="h-12 border-0 bg-white font-semibold text-brand-950 shadow-lg hover:bg-brand-100"
            >
              {primaryLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </EnrollButton>
          ) : (
            <Button
              asChild
              size="lg"
              className="h-12 border-0 bg-white font-semibold text-brand-950 shadow-lg hover:bg-brand-100"
            >
              <Link to={primaryHref}>
                {primaryLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {secondaryIsEnroll ? (
            <EnrollButton
              programName={programName}
              size="lg"
              variant="outline"
              className="h-12 border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              {secondaryLabel}
            </EnrollButton>
          ) : (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link to={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageCta;

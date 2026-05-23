import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PageCtaProps {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const PageCta = ({
  title,
  description,
  primaryLabel = 'Explore Programs',
  primaryHref = '/courses',
  secondaryLabel = 'Contact Us',
  secondaryHref = '/contact',
}: PageCtaProps) => (
  <section className="dark-surface cta-premium relative overflow-hidden py-16 md:py-20 text-white">
    <div className="cta-grid pointer-events-none absolute inset-0" aria-hidden />
    <div className="container relative z-10 px-4 sm:px-6 text-center max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">{title}</h2>
      <p className="text-slate-300 mb-8 leading-relaxed">{description}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild size="lg" className="bg-white text-brand-950 hover:bg-brand-100 border-0 font-semibold shadow-lg">
          <Link to={primaryHref}>
            {primaryLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          <Link to={secondaryHref}>{secondaryLabel}</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default PageCta;

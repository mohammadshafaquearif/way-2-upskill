import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';

interface SyllabusHeroProps {
  title: string;
  subtitle: string;
  image: string;
  checkoutPath: string;
  badge?: string;
}

const SyllabusHero = ({
  title,
  subtitle,
  image,
  checkoutPath,
  badge = 'Program Syllabus',
}: SyllabusHeroProps) => (
  <PageHero badge={badge} title={title} subtitle={subtitle} image={image} imageAlt={title}>
    <Button asChild size="lg" className="btn-brand btn-shimmer h-12 px-6">
      <Link to={checkoutPath}>
        Start Learning
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
    <Button
      asChild
      size="lg"
      variant="outline"
      className="h-12 border-2 border-primary/20 bg-white/70 px-6 font-semibold text-primary backdrop-blur-sm hover:bg-primary/5"
    >
      <Link to="/courses">All Programs</Link>
    </Button>
  </PageHero>
);

export default SyllabusHero;

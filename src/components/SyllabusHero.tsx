import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/PageHero';

interface SyllabusHeroProps {
  title: string;
  subtitle: string;
  image: string;
  checkoutPath: string;
}

const SyllabusHero = ({ title, subtitle, image, checkoutPath }: SyllabusHeroProps) => (
  <PageHero title={title} subtitle={subtitle} image={image} imageAlt={title}>
    <Button asChild size="lg" className="btn-brand h-auto px-6 py-3">
      <Link to={checkoutPath}>Start Learning</Link>
    </Button>
    <Button asChild size="lg" variant="outline" className="btn-outline-brand h-auto px-6 py-3 bg-card">
      <Link to="/courses">All Programs</Link>
    </Button>
  </PageHero>
);

export default SyllabusHero;

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
    <Button asChild size="lg" className="brand-gradient text-white border-0 shadow-lg">
      <Link to={checkoutPath}>Start Learning</Link>
    </Button>
    <Button
      asChild
      size="lg"
      variant="outline"
      className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
    >
      <Link to="/courses">All Programs</Link>
    </Button>
  </PageHero>
);

export default SyllabusHero;

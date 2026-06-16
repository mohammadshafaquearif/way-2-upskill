import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface HeroAccent {
  icon: LucideIcon;
  className: string;
}

interface HeroSlideVisualProps {
  image: string;
  imageAlt: string;
  accents: HeroAccent[];
  wide?: boolean;
}

const HeroSlideVisual = ({ image, imageAlt, accents, wide }: HeroSlideVisualProps) => (
  <div className="hero-slide-visual">
    <div className="hero-slide-grid" aria-hidden />
    {accents.map(({ icon: Icon, className }, i) => (
      <div key={i} className={`hero-slide-accent ${className}`} aria-hidden>
        <Icon className="h-4 w-4 text-primary/70 sm:h-5 sm:w-5" strokeWidth={1.75} />
      </div>
    ))}
    <div className={`hero-slide-photo-wrap${wide ? ' hero-slide-photo-wrap--wide' : ''}`}>
      <img
        src={image}
        alt={imageAlt}
        className="hero-slide-photo"
        loading="lazy"
        decoding="async"
        width={1200}
        height={800}
      />
    </div>
  </div>
);

export default HeroSlideVisual;

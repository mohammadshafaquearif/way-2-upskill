import React from 'react';
import DepthCard from '@/components/motion/DepthCard';
import { Reveal3D } from '@/components/motion/Reveal3D';
import { cn } from '@/lib/utils';

interface ProgramSectionAsideProps {
  image: string;
  imageAlt: string;
  caption?: string;
  imageFit?: 'cover' | 'contain';
  reverse?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ProgramSectionAside = ({
  image,
  imageAlt,
  caption,
  imageFit = 'cover',
  reverse,
  children,
  className,
}: ProgramSectionAsideProps) => (
  <div
    className={cn(
      'program-section-aside',
      reverse && 'program-section-aside--reverse',
      imageFit === 'contain' && 'program-section-aside--contain',
      className,
    )}
  >
    <Reveal3D className="program-section-aside-media-wrap" delay={reverse ? 80 : 0}>
      <DepthCard className="h-full" maxTilt={5}>
        <div className="program-section-aside-media">
          <img
            src={image}
            alt={imageAlt}
            className="program-section-aside-image"
            loading="lazy"
          />
          {imageFit === 'cover' && <div className="program-section-aside-overlay" aria-hidden />}
          {caption && <p className="program-section-aside-caption">{caption}</p>}
        </div>
      </DepthCard>
    </Reveal3D>
    <div className="program-section-aside-content">{children}</div>
  </div>
);

export default ProgramSectionAside;

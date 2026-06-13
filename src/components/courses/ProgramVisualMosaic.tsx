import React from 'react';
import DepthCard from '@/components/motion/DepthCard';
import { RevealStagger } from '@/components/motion/Reveal3D';

export interface MosaicImage {
  src: string;
  alt: string;
  label: string;
}

interface ProgramVisualMosaicProps {
  images: MosaicImage[];
}

const ProgramVisualMosaic = ({ images }: ProgramVisualMosaicProps) => (
  <RevealStagger className="program-visual-mosaic" staggerMs={90}>
    {images.map(({ src, alt, label }) => (
      <DepthCard key={label} className="program-visual-mosaic-card" maxTilt={6}>
        <div className="program-visual-mosaic-media">
          <img src={src} alt={alt} className="program-visual-mosaic-image" loading="lazy" />
          <div className="program-visual-mosaic-overlay" aria-hidden />
          <span className="program-visual-mosaic-label">{label}</span>
        </div>
      </DepthCard>
    ))}
  </RevealStagger>
);

export default ProgramVisualMosaic;

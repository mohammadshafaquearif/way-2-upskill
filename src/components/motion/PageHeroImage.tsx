import React from 'react';
import { use3DTilt } from '@/hooks/use3DTilt';

interface PageHeroImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const PageHeroImage = ({ src, alt, caption }: PageHeroImageProps) => {
  const { ref, style, onMouseMove, onMouseLeave } = use3DTilt({ maxTilt: 12, scale: 1.03 });

  return (
    <div
      ref={ref}
      className="scene-3d relative"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="hero-image-glow" aria-hidden />
      <div className="scene-3d-stage" style={style}>
        <div className="relative overflow-hidden rounded-3xl border border-white/25 shadow-2xl shadow-primary/15">
          <div className="aspect-[4/3] sm:aspect-[16/11]">
            <img src={src} alt={alt} className="h-full w-full object-cover" loading="eager" decoding="async" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/65 via-brand-950/15 to-transparent" />
          {caption && (
            <p className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-center text-xs font-medium text-white/90 backdrop-blur-sm sm:text-sm">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeroImage;

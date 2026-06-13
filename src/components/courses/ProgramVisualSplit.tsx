import React from 'react';
import DepthCard from '@/components/motion/DepthCard';
import { Reveal3D } from '@/components/motion/Reveal3D';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgramVisualSplitProps {
  image: string;
  imageAlt: string;
  badge?: string;
  title: string;
  description: string;
  bullets?: string[];
  reverse?: boolean;
  className?: string;
}

const ProgramVisualSplit = ({
  image,
  imageAlt,
  badge,
  title,
  description,
  bullets,
  reverse,
  className,
}: ProgramVisualSplitProps) => (
  <Reveal3D className={cn('program-visual-split', reverse && 'program-visual-split--reverse', className)}>
    <div className="program-visual-split-grid">
      <DepthCard className="program-visual-split-media" maxTilt={5}>
        <div className="program-visual-split-image-wrap">
          <img src={image} alt={imageAlt} className="program-visual-split-image" loading="lazy" />
          <div className="program-visual-split-image-overlay" aria-hidden />
        </div>
      </DepthCard>

      <div className="program-visual-split-copy">
        {badge && (
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            {badge}
          </span>
        )}
        <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">{title}</h3>
        <p className="mb-5 leading-relaxed text-muted-foreground">{description}</p>
        {bullets && bullets.length > 0 && (
          <ul className="space-y-2.5">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </Reveal3D>
);

export default ProgramVisualSplit;

import React from 'react';
import { use3DTilt } from '@/hooks/use3DTilt';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: boolean;
}

const TiltCard = ({ children, className, maxTilt = 10, glow = true }: TiltCardProps) => {
  const { ref, style, onMouseMove, onMouseLeave } = use3DTilt({ maxTilt, scale: 1.02 });

  return (
    <div
      ref={ref}
      className={cn('tilt-card-wrapper', className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: '1100px' }}
    >
      <div className="tilt-card-inner" style={style}>
        {glow && <div className="tilt-card-glow" aria-hidden />}
        {children}
      </div>
    </div>
  );
};

export default TiltCard;

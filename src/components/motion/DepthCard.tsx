import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DepthCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  /** Enable mouse-tracking specular highlight */
  highlight?: boolean;
}

/**
 * Refined 3D card — subtle tilt + light catch.
 * Feels physical, not template-generated.
 */
const DepthCard = ({ children, className, maxTilt = 8, highlight = true }: DepthCardProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTransform(`rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`);
      if (highlight) {
        setGlare({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
          opacity: 1,
        });
      }
    },
    [maxTilt, highlight],
  );

  const onLeave = useCallback(() => {
    setTransform('rotateX(0deg) rotateY(0deg)');
    setGlare((g) => ({ ...g, opacity: 0 }));
  }, []);

  return (
    <div
      className={cn('depth-card', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={innerRef}
        className="depth-card-inner"
        style={{ transform }}
      >
        {highlight && (
          <div
            className="depth-card-glare"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.22), transparent 55%)`,
              opacity: glare.opacity,
            }}
            aria-hidden
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default DepthCard;

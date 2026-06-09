import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface Reveal3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Reveal3D = ({ children, className, delay = 0 }: Reveal3DProps) => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn('reveal-3d', visible && 'reveal-3d--in', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface RevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
}

const RevealStagger = ({ children, className, staggerMs = 80 }: RevealStaggerProps) => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn('reveal-stagger', visible && 'reveal-stagger--in', className)}
      style={{ '--stagger': `${staggerMs}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export { Reveal3D, RevealStagger };

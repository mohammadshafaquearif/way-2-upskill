import React from 'react';
import DepthCard from '@/components/motion/DepthCard';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: boolean;
}

/** @deprecated glow prop ignored — use DepthCard shine instead */
const TiltCard = ({ children, className, maxTilt = 8 }: TiltCardProps) => (
  <DepthCard className={cn('h-full', className)} maxTilt={maxTilt}>
    {children}
  </DepthCard>
);

export default TiltCard;

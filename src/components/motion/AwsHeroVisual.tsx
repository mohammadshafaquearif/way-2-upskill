import React from 'react';
import { Award, Cloud, Shield, Zap } from 'lucide-react';
import DepthCard from '@/components/motion/DepthCard';

interface AwsHeroVisualProps {
  image: string;
  imageAlt: string;
}

const AwsHeroVisual = ({ image, imageAlt }: AwsHeroVisualProps) => (
  <div className="devops-hero-visual aws-hero-visual scene-3d relative mx-auto w-full max-w-lg lg:max-w-none">
    <DepthCard className="devops-hero-main-card devops-hero-main-card--photo" maxTilt={4}>
      <img src={image} alt={imageAlt} className="h-full w-full object-cover" loading="eager" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/55 via-transparent to-primary/5" />
      <div className="devops-hero-scan opacity-25" aria-hidden />

      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-2 p-4">
        <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-white sm:text-sm">
            <Award className="h-3.5 w-3.5 text-sky-300" />
            SAA-C03 Ready
          </p>
          <p className="mt-0.5 text-[10px] text-white/75 sm:text-xs">
            Architecture · Security · Cost · Reliability
          </p>
        </div>
        <div className="flex gap-2">
          <div className="devops-hero-stat">
            <Cloud className="h-3.5 w-3.5 text-primary" />
            <span>Cloud</span>
          </div>
          <div className="devops-hero-stat devops-hero-stat--accent">
            <Shield className="h-3.5 w-3.5" />
            <span>Security</span>
          </div>
        </div>
      </div>
    </DepthCard>

    <div className="devops-hero-float-pill devops-hero-float-pill--tl">
      <Zap className="h-4 w-4 text-amber-400" />
      <div>
        <p className="text-sm font-bold leading-none text-brand-950">7+</p>
        <p className="text-[9px] text-muted-foreground">Projects</p>
      </div>
    </div>
  </div>
);

export default AwsHeroVisual;

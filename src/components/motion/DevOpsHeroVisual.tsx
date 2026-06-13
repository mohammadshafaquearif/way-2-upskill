import React from 'react';
import { Bot, GitBranch, Server, Zap } from 'lucide-react';
import DepthCard from '@/components/motion/DepthCard';
import { cn } from '@/lib/utils';

const orbitTools = [
  { label: 'Docker', style: { top: '8%', left: '-4%' } as const, delay: 0 },
  { label: 'Kubernetes', style: { top: '18%', right: '-6%' } as const, delay: 1 },
  { label: 'Terraform', style: { bottom: '28%', left: '-8%' } as const, delay: 2 },
  { label: 'AWS', style: { bottom: '12%', right: '-4%' } as const, delay: 3 },
];

interface DevOpsHeroVisualProps {
  image: string;
  imageAlt: string;
  variant?: 'default' | 'photo';
}

const DevOpsHeroVisual = ({ image, imageAlt, variant = 'default' }: DevOpsHeroVisualProps) => {
  const isPhoto = variant === 'photo';

  return (
    <div className="devops-hero-visual scene-3d relative mx-auto w-full max-w-lg lg:max-w-none">
      {!isPhoto && (
        <>
          <svg className="devops-pipeline-svg" viewBox="0 0 400 320" aria-hidden>
            <defs>
              <linearGradient id="devops-pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="rgb(15 118 110)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(37 99 235)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              className="devops-pipeline-path"
              d="M 40 160 Q 120 80 200 160 T 360 160"
              fill="none"
              stroke="url(#devops-pipe-grad)"
              strokeWidth="2"
            />
            <circle className="devops-pipeline-node" cx="40" cy="160" r="5" />
            <circle className="devops-pipeline-node" cx="200" cy="160" r="5" />
            <circle className="devops-pipeline-node" cx="360" cy="160" r="5" />
          </svg>

          {orbitTools.map(({ label, style, delay }) => (
            <span
              key={label}
              className="devops-orbit-badge"
              style={{ ...style, animationDelay: `${delay * 0.6}s` }}
            >
              {label}
            </span>
          ))}
        </>
      )}

      <DepthCard
        className={cn('devops-hero-main-card', isPhoto && 'devops-hero-main-card--photo')}
        maxTilt={isPhoto ? 4 : 6}
      >
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" loading="eager" />
        <div
          className={
            isPhoto
              ? 'pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/55 via-transparent to-primary/5'
              : 'pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/15 to-primary/5'
          }
        />
        <div className={cn('devops-hero-scan', isPhoto && 'opacity-25')} aria-hidden />

        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-2 p-4">
          <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-white sm:text-sm">
              <GitBranch className="h-3.5 w-3.5 text-teal-300" />
              {isPhoto ? 'CI/CD · Cloud · AIOps' : 'CI/CD · IaC · AIOps'}
            </p>
            <p className="mt-0.5 text-[10px] text-white/75 sm:text-xs">
              {isPhoto ? 'Production-ready pipelines' : 'Production-ready pipelines'}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="devops-hero-stat">
              <Server className="h-3.5 w-3.5 text-primary" />
              <span>Cloud</span>
            </div>
            <div className="devops-hero-stat devops-hero-stat--accent">
              <Bot className="h-3.5 w-3.5" />
              <span>AI Ops</span>
            </div>
          </div>
        </div>
      </DepthCard>

      <div className="devops-hero-float-pill devops-hero-float-pill--tl">
        <Zap className="h-4 w-4 text-amber-400" />
        <div>
          <p className="text-sm font-bold leading-none text-brand-950">12+</p>
          <p className="text-[9px] text-muted-foreground">Projects</p>
        </div>
      </div>
    </div>
  );
};

export default DevOpsHeroVisual;

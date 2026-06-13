import React from 'react';
import { Bot, Brain, Sparkles, Zap } from 'lucide-react';
import DepthCard from '@/components/motion/DepthCard';

const orbitTools = [
  { label: 'LangChain', style: { top: '6%', left: '-2%' } as const, delay: 0 },
  { label: 'RAG', style: { top: '20%', right: '-5%' } as const, delay: 1 },
  { label: 'Agents', style: { bottom: '30%', left: '-6%' } as const, delay: 2 },
  { label: 'LLMs', style: { bottom: '10%', right: '-3%' } as const, delay: 3 },
];

interface AgenticHeroVisualProps {
  image: string;
  imageAlt: string;
  variant?: 'illustration' | 'photo';
}

const AgenticHeroVisual = ({ image, imageAlt, variant = 'illustration' }: AgenticHeroVisualProps) => (
  <div className="agentic-hero-visual scene-3d relative mx-auto w-full max-w-lg lg:max-w-none">
    {variant === 'illustration' && (
      <>
        <svg className="agentic-neural-svg" viewBox="0 0 400 320" aria-hidden>
      <defs>
        <linearGradient id="agentic-neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(139 92 246)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="rgb(37 99 235)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="rgb(15 118 110)" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path
        className="agentic-neural-path"
        d="M 60 160 L 140 80 L 220 160 L 300 80 L 340 160"
        fill="none"
        stroke="url(#agentic-neural-grad)"
        strokeWidth="2"
      />
      <path
        className="agentic-neural-path agentic-neural-path--delay"
        d="M 60 160 L 140 240 L 220 160 L 300 240 L 340 160"
        fill="none"
        stroke="url(#agentic-neural-grad)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      {[60, 140, 220, 300, 340].map((cx, i) => (
        <circle key={cx} className="agentic-neural-node" cx={cx} cy={160} r="5" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
        </svg>

        {orbitTools.map(({ label, style, delay }) => (
          <span
            key={label}
            className="devops-orbit-badge agentic-orbit-badge"
            style={{ ...style, animationDelay: `${delay * 0.6}s` }}
          >
            {label}
          </span>
        ))}
      </>
    )}

    <DepthCard
      className={`agentic-hero-main-card${variant === 'photo' ? ' agentic-hero-main-card--photo' : ''}`}
      maxTilt={variant === 'photo' ? 4 : 6}
    >
      <img src={image} alt={imageAlt} className="h-full w-full object-cover" loading="eager" />
      <div
        className={
          variant === 'photo'
            ? 'pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/55 via-transparent to-primary/5'
            : 'pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/85 via-violet-950/20 to-primary/5'
        }
      />
      <div className="devops-hero-scan opacity-25" aria-hidden />

      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-2 p-4">
        <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-white sm:text-sm">
            <Brain className="h-3.5 w-3.5 text-violet-300" />
            {variant === 'photo' ? 'Human + AI Collaboration' : 'Agents · RAG · LLMs'}
          </p>
          <p className="mt-0.5 text-[10px] text-white/75 sm:text-xs">
            {variant === 'photo' ? 'Build production agent systems' : 'Build intelligent systems'}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="devops-hero-stat">
            <Bot className="h-3.5 w-3.5 text-violet-300" />
            <span>Agents</span>
          </div>
          <div className="devops-hero-stat devops-hero-stat--accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>GenAI</span>
          </div>
        </div>
      </div>
    </DepthCard>

    <div className="devops-hero-float-pill devops-hero-float-pill--tl">
      <Zap className="h-4 w-4 text-violet-500" />
      <div>
        <p className="text-sm font-bold leading-none text-brand-950">9+</p>
        <p className="text-[9px] text-muted-foreground">Projects</p>
      </div>
    </div>
  </div>
);

export default AgenticHeroVisual;

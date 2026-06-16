import React from 'react';
import { Code2, Rocket, Star, Zap } from 'lucide-react';
import DepthCard from '@/components/motion/DepthCard';
import { IMAGES } from '@/lib/images';

const sidePrograms = [
  { src: IMAGES.programs.webDev, alt: 'Full Stack development', label: 'Full Stack', area: 'bento-web' },
  { src: IMAGES.programs.ai, alt: 'AI and machine learning', label: 'AI & ML', area: 'bento-ai' },
  { src: IMAGES.programs.cloud, alt: 'Cloud computing', label: 'Cloud', area: 'bento-cloud' },
  { src: IMAGES.programs.devops, alt: 'DevOps engineering', label: 'DevOps', area: 'bento-devops' },
];

const ProgramThumb = ({
  src,
  alt,
  label,
  area,
}: {
  src: string;
  alt: string;
  label: string;
  area: string;
}) => (
  <DepthCard className={`hero-bento-thumb ${area}`} maxTilt={6}>
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
      width={480}
      height={360}
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/10 to-transparent" />
    <span className="hero-bento-label">{label}</span>
  </DepthCard>
);

const Hero3DVisual = () => (
  <div className="scene-3d relative mx-auto w-full max-w-xl lg:max-w-none">
    <div className="hero-bento-stage">
      {sidePrograms.map((p) => (
        <ProgramThumb key={p.label} {...p} />
      ))}

      <DepthCard className="hero-bento-main" maxTilt={5}>
        <img
          src={IMAGES.hero.home}
          alt="Learners collaborating on tech projects at Zyvotrix"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1400}
          height={933}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-2 p-3 sm:gap-3 sm:p-4">
          <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md sm:rounded-2xl sm:p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-white sm:text-sm">
              <Rocket className="h-3.5 w-3.5 text-teal-300 sm:h-4 sm:w-4" />
              Project-based learning
            </p>
            <p className="mt-0.5 text-[10px] text-white/75 sm:text-xs">Roadmaps · Labs · Portfolio</p>
          </div>
          <div className="flex -space-x-1.5 sm:-space-x-2">
            {[IMAGES.programs.analytics, IMAGES.programs.security, IMAGES.programs.agentic].map(
              (src, i) => (
                <div
                  key={src}
                  className="h-7 w-7 overflow-hidden rounded-full border-2 border-white/40 shadow-lg sm:h-9 sm:w-9"
                  style={{ zIndex: 3 - i }}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={144}
                    height={144}
                  />
                </div>
              ),
            )}
            <div className="flex h-7 w-9 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-[9px] font-bold text-white backdrop-blur-sm sm:h-9 sm:w-9 sm:text-[10px]">
              +10k
            </div>
          </div>
        </div>
      </DepthCard>

      <div className="bento-stats flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <div className="depth-stat-pill">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <div>
            <p className="text-sm font-bold leading-none text-brand-950">4.8</p>
            <p className="text-[9px] text-muted-foreground">Rated</p>
          </div>
        </div>
        <div className="depth-stat-pill">
          <Code2 className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm font-bold leading-none text-primary">50+</p>
            <p className="text-[9px] text-muted-foreground">Projects</p>
          </div>
        </div>
        <div className="depth-stat-pill depth-stat-pill--accent">
          <Zap className="h-4 w-4" />
          <div>
            <p className="text-xs font-bold leading-none">85%</p>
            <p className="text-[9px] opacity-80">Growth</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero3DVisual;

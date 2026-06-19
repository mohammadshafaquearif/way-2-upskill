import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AAC_PROGRAM_ROUTE = '/courses/aac';

const BANNERS = [
  {
    src: '/images/banners/ai-interview-banner-agents.png',
    alt: 'The Future Is AI Agents — Zyvotrix Agentic AI Certification program',
    footClass: 'resource-interview-banner-foot--agents',
  },
  {
    src: '/images/banners/ai-interview-banner-build.png',
    alt: 'Stop Writing Prompts. Start Building AI Agents — Zyvotrix Agentic AI Certification program',
    footClass: 'resource-interview-banner-foot--build',
  },
] as const;

interface AiEngineerInterviewPromoBannerProps {
  variant: 0 | 1;
}

const AiEngineerInterviewPromoBanner = ({ variant }: AiEngineerInterviewPromoBannerProps) => {
  const banner = BANNERS[variant];

  return (
    <aside className="resource-interview-banner-wrap" aria-label="Agentic AI program promotion">
      <div className="resource-interview-banner-stage resource-interview-banner-stage--aac">
        <img
          src={banner.src}
          alt={banner.alt}
          className="resource-interview-banner-img"
          loading="lazy"
          width={1024}
          height={562}
        />
        <div className={`resource-interview-banner-foot ${banner.footClass}`}>
          <Link to={AAC_PROGRAM_ROUTE} className="resource-interview-banner-btn">
            Explore Our Programs
            <ArrowRight className="resource-interview-banner-btn-icon" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AiEngineerInterviewPromoBanner;

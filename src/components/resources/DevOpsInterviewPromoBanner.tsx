import React from 'react';
import { Link } from 'react-router-dom';

const DEVOPS_PROGRAM_ROUTE = '/courses/devops-engineer-program';

const BANNERS = [
  {
    src: '/images/banners/devops-interview-banner-projects.png',
    alt: 'Know the Concepts? Now Build Real Projects — AI-Powered DevOps Engineer program at Zyvotrix',
  },
  {
    src: '/images/banners/devops-interview-banner-salary.png',
    alt: 'Boost Your Salary with our AI-Powered DevOps Engineer Program at Zyvotrix',
  },
] as const;

interface DevOpsInterviewPromoBannerProps {
  variant: 0 | 1;
}

const DevOpsInterviewPromoBanner = ({ variant }: DevOpsInterviewPromoBannerProps) => {
  const banner = BANNERS[variant];

  return (
    <aside className="resource-interview-banner-wrap" aria-label="DevOps program promotion">
      <Link to={DEVOPS_PROGRAM_ROUTE} className="resource-interview-banner-link">
        <img
          src={banner.src}
          alt={banner.alt}
          className="resource-interview-banner-img"
          loading="lazy"
          width={1200}
          height={400}
        />
      </Link>
    </aside>
  );
};

export default DevOpsInterviewPromoBanner;

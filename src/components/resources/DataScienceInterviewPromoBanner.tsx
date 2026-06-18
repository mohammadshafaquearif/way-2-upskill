import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DATA_SCIENCE_PROGRAM_ROUTE = '/courses/data-science';

const BANNERS = [
  {
    src: '/images/banners/ds-interview-banner-journey.png',
    alt: 'Elevate Your Data Science Journey — Zyvotrix Data Science & ML program',
    footClass: 'resource-interview-banner-foot--guide',
  },
  {
    src: '/images/banners/ds-interview-banner-salary.png',
    alt: 'Elevate Your Salary & Career — Zyvotrix Data Science & ML program',
    footClass: 'resource-interview-banner-foot--salary',
  },
] as const;

interface DataScienceInterviewPromoBannerProps {
  variant: 0 | 1;
}

const DataScienceInterviewPromoBanner = ({ variant }: DataScienceInterviewPromoBannerProps) => {
  const banner = BANNERS[variant];

  return (
    <aside className="resource-interview-banner-wrap" aria-label="Data Science program promotion">
      <div className="resource-interview-banner-stage resource-interview-banner-stage--ds">
        <img
          src={banner.src}
          alt={banner.alt}
          className="resource-interview-banner-img"
          loading="lazy"
          width={1024}
          height={562}
        />
        <div className={`resource-interview-banner-foot ${banner.footClass}`}>
          <Link to={DATA_SCIENCE_PROGRAM_ROUTE} className="resource-interview-banner-btn">
            Explore Our Programs
            <ArrowRight className="resource-interview-banner-btn-icon" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DataScienceInterviewPromoBanner;

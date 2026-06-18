import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AWS_PROGRAM_ROUTE = '/courses/aws';

const BANNERS = [
  {
    src: '/images/banners/aws-interview-banner-salary.png',
    alt: 'Boost Your Salary & Career with our AI-Powered AWS Mastery — Zyvotrix AWS Solutions Architect program',
    footClass: 'resource-interview-banner-foot--salary',
  },
  {
    src: '/images/banners/aws-interview-banner-guide.png',
    alt: 'Crack Your AWS Interview with our Top Q&A Guide — Zyvotrix AWS Solutions Architect program',
    footClass: 'resource-interview-banner-foot--guide',
  },
] as const;

interface AwsInterviewPromoBannerProps {
  variant: 0 | 1;
}

const AwsInterviewPromoBanner = ({ variant }: AwsInterviewPromoBannerProps) => {
  const banner = BANNERS[variant];

  return (
    <aside className="resource-interview-banner-wrap" aria-label="AWS program promotion">
      <div className="resource-interview-banner-stage resource-interview-banner-stage--aws">
        <img
          src={banner.src}
          alt={banner.alt}
          className="resource-interview-banner-img"
          loading="lazy"
          width={1024}
          height={562}
        />
        <div className={`resource-interview-banner-foot ${banner.footClass}`}>
          <Link to={AWS_PROGRAM_ROUTE} className="resource-interview-banner-btn">
            Explore Our Programs
            <ArrowRight className="resource-interview-banner-btn-icon" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AwsInterviewPromoBanner;

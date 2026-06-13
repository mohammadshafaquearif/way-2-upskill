import React from 'react';
import { Reveal3D } from '@/components/motion/Reveal3D';

interface GalleryItem {
  src: string;
  alt: string;
  label: string;
  sublabel: string;
}

interface StatItem {
  number: string;
  label: string;
  sublabel?: string;
}

export interface LearningFeatureBlock {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  imageBadge: string;
  reverse?: boolean;
}

interface ProgramLearningExperienceProps {
  features: [LearningFeatureBlock, LearningFeatureBlock];
  stats: StatItem[];
  gallery: GalleryItem[];
  eyebrow?: string;
  headline?: React.ReactNode;
  sub?: string;
  galleryLabel?: string;
  sectionClassName?: string;
}

const defaultHeader = {
  eyebrow: 'How You Learn at Zyvotrix',
  headline: (
    <>
      Built for <span>Builders,</span> Not Viewers
    </>
  ),
  sub: 'Every session, lab, and project is engineered to move you from concept to working code — fast.',
  galleryLabel: 'Inside the Zyvotrix Experience',
};

const CheckIcon = () => (
  <svg className="program-lx-check-icon" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="9" fill="#CCFBF1" />
    <path
      d="M6 10.5l2.5 2.5 5-5"
      stroke="#0F766E"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureBlock = ({ feature }: { feature: LearningFeatureBlock }) => (
  <article
    className={`program-lx-feature${feature.reverse ? ' program-lx-feature--reverse' : ''}`}
  >
    <div className="program-lx-feat-img">
      <img src={feature.image} alt={feature.imageAlt} loading="lazy" decoding="async" />
      <div className="program-lx-img-badge">{feature.imageBadge}</div>
    </div>
    <div className="program-lx-feat-content">
      <p className="program-lx-feat-eyebrow">{feature.eyebrow}</p>
      <h3 className="program-lx-feat-title">{feature.title}</h3>
      <p className="program-lx-feat-desc">{feature.description}</p>
      <ul className="program-lx-checklist">
        {feature.bullets.map((bullet) => (
          <li key={bullet}>
            <CheckIcon />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  </article>
);

const ProgramLearningExperience = ({
  features,
  stats,
  gallery,
  eyebrow = defaultHeader.eyebrow,
  headline = defaultHeader.headline,
  sub = defaultHeader.sub,
  galleryLabel = defaultHeader.galleryLabel,
  sectionClassName = 'program-lx-section',
}: ProgramLearningExperienceProps) => {
  const [firstFeature, secondFeature] = features;

  return (
    <section className={`${sectionClassName} border-b border-border bg-[#F8FAFC]`}>
      <div className="program-page-container">
        <div className="program-page-content program-lx-inner">
          <Reveal3D className="program-lx-header">
            <p className="program-lx-eyebrow">{eyebrow}</p>
            <h2 className="program-lx-headline">{headline}</h2>
            <p className="program-lx-sub">{sub}</p>
          </Reveal3D>

          <Reveal3D delay={80}>
            <FeatureBlock feature={firstFeature} />
          </Reveal3D>

          <Reveal3D delay={120}>
            <div className="program-lx-stats">
              {stats.map((stat) => (
                <div key={`${stat.number}-${stat.label}`} className="program-lx-stat-cell">
                  <div className="program-lx-stat-number">{stat.number}</div>
                  <div className="program-lx-stat-label">
                    {stat.label}
                    {stat.sublabel && (
                      <>
                        <br />
                        {stat.sublabel}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal3D>

          <Reveal3D delay={160}>
            <FeatureBlock feature={secondFeature} />
          </Reveal3D>

          <Reveal3D delay={200}>
            <p className="program-lx-gallery-label">{galleryLabel}</p>
            <div className="program-lx-gallery">
              {gallery.map((item) => (
                <figure key={item.label} className="program-lx-gallery-card">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  <div className="program-lx-gallery-overlay" aria-hidden />
                  <figcaption className="program-lx-gallery-tag">
                    {item.label}
                    <span>{item.sublabel}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal3D>
        </div>
      </div>
    </section>
  );
};

export default ProgramLearningExperience;

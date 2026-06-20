import React from 'react';
import { PROGRAM_FEATURES } from '@/lib/programFeatures';

const standOutSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Why Zyvotrix Programs Stand Out',
  description:
    'Key benefits of Zyvotrix tech upskilling programs: job-aligned curriculum, live expert instruction, hands-on projects, and career mentorship.',
  itemListElement: PROGRAM_FEATURES.map((feature, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Thing',
      name: feature.title,
      description: feature.description,
      image: `https://www.zyvotrix.com${feature.image}`,
    },
  })),
};

const ProgramsStandOut = () => (
  <section
    className="programs-stand-out"
    id="why-programs"
    aria-labelledby="programs-stand-out-heading"
  >
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(standOutSchema) }}
    />

    <div className="container px-4 sm:px-6">
      <header className="programs-stand-out-header">
        <h2 id="programs-stand-out-heading" className="programs-stand-out-heading">
          Why Our Programs Stand Out
        </h2>
        <p className="programs-stand-out-intro">
          Zyvotrix programs combine structured roadmaps, live mentorship, and project-based
          learning — designed to help you build employable skills in today&apos;s tech industry.
        </p>
      </header>

      <div className="programs-stand-out-grid" role="list">
        {PROGRAM_FEATURES.map((feature) => (
          <article
            key={feature.id}
            className="programs-stand-out-card"
            role="listitem"
            aria-labelledby={`feature-${feature.id}-title`}
          >
            <div className="programs-stand-out-card-media">
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="programs-stand-out-card-image"
                loading="lazy"
                width={640}
                height={360}
              />
            </div>
            <div className="programs-stand-out-card-body">
              <h3 id={`feature-${feature.id}-title`} className="programs-stand-out-card-title">
                {feature.title}
              </h3>
              <p className="programs-stand-out-card-desc">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramsStandOut;

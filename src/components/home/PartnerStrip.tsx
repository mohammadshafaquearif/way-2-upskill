import React from 'react';

const partners = [
  'AWS',
  'Docker',
  'Kubernetes',
  'React',
  'Python',
  'GitHub',
  'Terraform',
  'OpenAI',
];

const PartnerStrip = () => (
  <section className="section-padding section-white py-10 sm:py-12">
    <div className="container px-4 sm:px-6">
      <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Built around industry-standard tools &amp; platforms
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {partners.map((name) => (
          <span
            key={name}
            className="text-lg font-bold tracking-tight text-brand-950/40 transition-colors hover:text-primary/70 sm:text-xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerStrip;

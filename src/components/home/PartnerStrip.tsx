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
  'Node.js',
  'TypeScript',
  'MongoDB',
  'Linux',
];

const PartnerStrip = () => (
  <section className="relative overflow-hidden border-y border-border/60 bg-brand-950 py-10 pb-14 sm:py-12 sm:pb-16">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/95 to-brand-950" aria-hidden />
    <p className="relative z-10 mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
      Built with industry-standard tools
    </p>

    {/* Marquee row 1 */}
    <div className="marquee-mask relative z-10 mb-3">
      <div className="marquee-track animate-marquee">
        {[...partners, ...partners].map((name, i) => (
          <span
            key={`a-${name}-${i}`}
            className="mx-6 flex shrink-0 items-center gap-2 text-lg font-bold text-slate-400/60 transition-colors hover:text-slate-300 sm:text-xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            {name}
          </span>
        ))}
      </div>
    </div>

    {/* Marquee row 2 — reverse */}
    <div className="marquee-mask relative z-10">
      <div className="marquee-track animate-marquee-reverse">
        {[...partners].reverse().concat([...partners].reverse()).map((name, i) => (
          <span
            key={`b-${name}-${i}`}
            className="mx-6 flex shrink-0 items-center gap-2 text-base font-semibold text-slate-500/50 sm:text-lg"
          >
            <span className="h-1 w-1 rounded-full bg-secondary/60" />
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerStrip;

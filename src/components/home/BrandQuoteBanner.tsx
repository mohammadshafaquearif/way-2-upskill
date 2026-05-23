import React from 'react';

const BrandQuoteBanner = () => (
  <section className="py-12 md:py-16 brand-gradient">
    <div className="container px-4 sm:px-6 text-center">
      <blockquote className="max-w-4xl mx-auto">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-relaxed italic">
          &ldquo;The future belongs to those who build skills, not excuses.&rdquo;
        </p>
        <footer className="mt-4 text-brand-100/90 text-sm sm:text-base font-medium not-italic">
          — Zyvotrix · Learn. Build. Thrive.
        </footer>
      </blockquote>
    </div>
  </section>
);

export default BrandQuoteBanner;

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Award, Sparkles } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { STATIC_PAGE_SEO } from '@/lib/seo';
import { usePageMeta } from '@/hooks/usePageMeta';

const certifications = [
  {
    title: 'IBM AI/ML Certification',
    desc: 'AI fundamentals and machine learning foundations.',
    image: IMAGES.programs.ai,
    tag: 'AI & ML',
  },
  {
    title: 'DeepLearning.AI',
    desc: 'Specialized deep learning and neural network courses.',
    image: IMAGES.learning,
    tag: 'Deep Learning',
  },
  {
    title: 'AWS Machine Learning',
    desc: 'Cloud-based ML deployment and AWS workflows.',
    image: IMAGES.programs.cloud,
    tag: 'Cloud ML',
  },
];

const extras = [
  'Coursera curated learning access',
  'LinkedIn profile optimization',
  'API integration training',
  'LLM & prompt engineering workshop',
  'Portfolio project guidance',
  'Career preparation resources',
];

const Bonus = () => {
  usePageMeta(STATIC_PAGE_SEO['/bonus']);

  return (
    <PageShell>
      <Navbar />

      <PageHero
        badge="Exclusive Extras"
        title={
          <>
            Program <span className="gradient-text">Bonuses</span>
          </>
        }
        subtitle="Career-focused extras bundled with select programs — certifications, tools, and portfolio support."
        image={IMAGES.hero.bonus}
        imageAlt="AI and machine learning program bonuses"
        imageCaption={IMAGES.heroCaptions.bonus}
      />

      <section className="section-padding section-white">
        <div className="container px-4 md:px-6">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
              <Award className="h-3.5 w-3.5" />
              Certification Pathways
            </span>
            <h2 className="section-title">Industry-Recognized Credentials</h2>
          </div>

          <div className="mx-auto mb-16 grid max-w-5xl gap-6 md:grid-cols-3">
            {certifications.map((cert) => (
              <article
                key={cert.title}
                className="program-card group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary shadow-sm">
                    {cert.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-950">Also Included</h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {extras.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Button asChild size="lg" className="btn-brand">
                <Link to="/contact">Ask About Bonuses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        badge="AI/ML Programs"
        title="Included with AI/ML programs"
        description="Apply to learn which bonuses are available for your chosen path."
        primaryLabel="Apply Now"
        primaryHref="/enroll"
        secondaryLabel="View Programs"
        secondaryHref="/courses"
      />

      <Footer />
    </PageShell>
  );
};

export default Bonus;

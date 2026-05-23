
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const certifications = [
  { title: 'IBM AI/ML Certification', desc: 'AI fundamentals and machine learning foundations.', image: IMAGES.programs.ai },
  { title: 'DeepLearning.AI', desc: 'Specialized deep learning and neural network courses.', image: IMAGES.learning },
  { title: 'AWS Machine Learning', desc: 'Cloud-based ML deployment and AWS workflows.', image: IMAGES.programs.cloud },
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
  return (
    <PageShell>
      <Navbar />

      <PageHero
        title="Program Bonuses"
        subtitle="Career-focused extras bundled with select programs — certifications, tools, and portfolio support."
        image={IMAGES.hero.bonus}
        imageAlt="AI and machine learning learning"
      />

      <section className="section-padding section-white">
        <div className="container px-4 md:px-6">
          <h2 className="section-title text-center mb-10">Certification Pathways</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            {certifications.map((cert) => (
              <Card key={cert.title} className="overflow-hidden surface-card-interactive border-border p-0">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={cert.image} alt={cert.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-brand-100/40 p-8 md:p-10 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-brand-950">Also Included</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {extras.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-center mt-8">
              <Button asChild size="lg" className="brand-gradient text-white border-0">
                <Link to="/contact">Ask About Bonuses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PageCta
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

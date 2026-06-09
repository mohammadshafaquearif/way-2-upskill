import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import FAQList from '@/components/FAQList';
import { usePageMeta } from '@/hooks/usePageMeta';
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from '@/lib/faqs';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory | 'all'>('all');

  usePageMeta({
    title: 'Frequently Asked Questions',
    description:
      'Answers about Zyvotrix programs, enrollment, pricing, learning format, certificates, career support, and technical requirements for Full Stack, DevOps, Cloud, AI, and Data Analytics.',
    canonical: '/faq',
  });

  const filtered =
    activeCategory === 'all' ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  return (
    <PageShell>
      <Navbar />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Clear answers about Zyvotrix programs, enrollment, learning, and career growth — for students, professionals, and career switchers."
      />

      <section className="section-padding section-white">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-muted-foreground hover:text-primary'
              }`}
            >
              All ({FAQS.length})
            </button>
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card text-muted-foreground hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-3xl">
            <FAQList faqs={filtered} includeSchema />
          </div>

          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-primary/15 bg-primary/5 p-8 text-center">
            <MessageCircle className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-xl font-bold">Still have questions?</h2>
            <p className="mb-6 text-muted-foreground">
              Our team is happy to help you choose the right program or answer anything not covered
              here.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="btn-brand">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/30 text-primary">
                <Link to="/courses">Browse Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
};

export default FAQ;

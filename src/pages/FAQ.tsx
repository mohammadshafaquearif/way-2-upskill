import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import FAQList from '@/components/FAQList';
import { usePageMeta } from '@/hooks/usePageMeta';
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from '@/lib/faqs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  usePageMeta({
    title: 'Frequently Asked Questions',
    description:
      'Answers about Zyvotrix programs, enrollment, pricing, learning format, certificates, career support, and technical requirements.',
    canonical: '/faq',
  });

  const categoryFiltered =
    activeCategory === 'all' ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  const filtered = search.trim()
    ? categoryFiltered.filter(
        (f) =>
          f.question.toLowerCase().includes(search.toLowerCase()) ||
          f.answer.toLowerCase().includes(search.toLowerCase()),
      )
    : categoryFiltered;

  return (
    <PageShell>
      <Navbar />
      <PageHero
        badge={`${FAQS.length} Questions Answered`}
        title={
          <>
            Frequently Asked <span className="gradient-text">Questions</span>
          </>
        }
        subtitle="Clear answers about Zyvotrix programs, enrollment, learning, and career growth."
        centered
      />

      <section className="section-padding section-white">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
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
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                    : 'border border-border bg-card text-muted-foreground hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-3xl">
            {filtered.length > 0 ? (
              <FAQList faqs={filtered} includeSchema />
            ) : (
              <p className="py-12 text-center text-muted-foreground">
                No questions match your search.{' '}
                <Link to="/contact" className="font-medium text-primary hover:underline">
                  Contact us
                </Link>{' '}
                for help.
              </p>
            )}
          </div>
        </div>
      </section>

      <PageCta
        badge="Ready to learn?"
        title="Find your perfect program"
        description="Explore DOP, AAC, AWS Solutions Architect, and Data Science with Python programs."
        primaryLabel="View Programs"
        primaryHref="/courses"
        secondaryLabel="Enroll Now"
        secondaryHref="/enroll"
      />

      <Footer />
    </PageShell>
  );
};

export default FAQ;

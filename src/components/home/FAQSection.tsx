import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FAQList from '@/components/FAQList';
import { FAQS, getFaqsByIds, HOMEPAGE_FAQ_IDS } from '@/lib/faqs';

const FAQSection = () => {
  const faqs = getFaqsByIds(HOMEPAGE_FAQ_IDS);

  return (
    <section className="section-padding section-white" id="faq">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Everything you need to know about Zyvotrix programs, enrollment, learning format, and
            career outcomes.
          </p>
        </div>
        <FAQList faqs={faqs} includeSchema />
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="border-primary/30 text-primary">
            <Link to="/faq">
              View all {FAQS.length} FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

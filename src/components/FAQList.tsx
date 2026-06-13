import React, { useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FaqItem } from '@/lib/faqs';

interface FAQListProps {
  faqs: FaqItem[];
  /** Inject FAQPage JSON-LD for SEO / LLM crawlers */
  includeSchema?: boolean;
  /** Use a different FAQ set for schema (e.g. when FAQs are split across columns) */
  schemaFaqs?: FaqItem[];
  className?: string;
}

const FAQList = ({
  faqs,
  includeSchema = false,
  schemaFaqs,
  className = '',
}: FAQListProps) => {
  const schemaSource = schemaFaqs ?? faqs;
  const schema = useMemo(
    () =>
      includeSchema
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: schemaSource.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }
        : null,
    [includeSchema, schemaSource],
  );

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Accordion type="single" collapsible className={`w-full space-y-2 ${className}`}>
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            id={faq.id}
            value={faq.id}
            className="surface-card border-none px-4"
          >
            <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default FAQList;

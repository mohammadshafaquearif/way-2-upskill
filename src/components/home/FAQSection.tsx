import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Are the programs beginner friendly?',
    a: 'Yes. The learning paths are designed for beginners as well as intermediate learners.',
  },
  {
    q: 'Will projects be included?',
    a: 'Yes. Practical implementation and project-building are part of the learning process.',
  },
  {
    q: 'What technologies will I learn?',
    a: 'Technologies vary depending on the program and include Full Stack Development, DevOps, AWS, AI tools, cloud platforms, and more.',
  },
  {
    q: 'Is the learning practical or theory-based?',
    a: 'Our focus is strongly oriented toward practical learning and real-world implementation.',
  },
  {
    q: 'Who can join Zyvotrix programs?',
    a: 'Students, freshers, working professionals, freelancers, and career switchers can all join.',
  },
];

const FAQSection = () => (
  <section className="section-padding bg-brand-100/30" id="faq">
    <div className="container px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="section-title">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-semibold text-brand-950">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;

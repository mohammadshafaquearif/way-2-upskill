import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import { usePageMeta } from '@/hooks/usePageMeta';

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing zyvotrix.com or enrolling in any Zyvotrix program, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.',
  },
  {
    title: 'Services Description',
    body: 'Zyvotrix provides online tech education programs, learning resources, and community access. Program content, duration, and deliverables are described on individual program pages. We reserve the right to update curricula to reflect industry changes.',
  },
  {
    title: 'Enrollment & Payment',
    body: 'Enrollment is confirmed upon successful payment or as agreed in writing. Pricing, payment schedules, and available bonuses are communicated at enrollment. You are responsible for providing accurate registration information.',
  },
  {
    title: 'Refund & Cancellation',
    body: 'Refund eligibility depends on the program, enrollment date, and modules accessed. Contact support@zyvotrix.com before enrolling for current refund terms. Zyvotrix reserves the right to modify refund policies with notice on this page.',
  },
  {
    title: 'Intellectual Property',
    body: 'All course materials, videos, documents, branding, and platform content are owned by Zyvotrix or its licensors. You receive a personal, non-transferable license to access materials for your own learning. Redistribution or resale is prohibited.',
  },
  {
    title: 'Learner Conduct',
    body: 'You agree to use Zyvotrix respectfully — no harassment, spam, cheating, or unauthorized sharing of paid content. We may suspend or terminate access for violations without refund.',
  },
  {
    title: 'Disclaimer',
    body: 'Zyvotrix provides education and skill-building resources. We do not guarantee employment, salary increases, or specific career outcomes. Results depend on individual effort, background, and market conditions.',
  },
  {
    title: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, Zyvotrix is not liable for indirect, incidental, or consequential damages arising from use of our platform or programs. Our total liability is limited to the amount you paid for the relevant program.',
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by applicable laws in India. Disputes shall be resolved through good-faith negotiation first, then through appropriate legal channels in the jurisdiction of Zyvotrix\'s registered operations.',
  },
  {
    title: 'Contact',
    body: 'For questions about these terms, email support@zyvotrix.com or use our contact form.',
  },
];

const Terms = () => {
  usePageMeta({
    title: 'Terms of Service',
    description:
      'Zyvotrix Terms of Service — enrollment, payments, refunds, intellectual property, and usage policies for our edtech platform and programs.',
    canonical: '/terms',
  });

  return (
    <PageShell>
      <Navbar />
      <PageHero
        title="Terms of Service"
        subtitle="Terms governing your use of Zyvotrix programs and platform."
      />
      <section className="section-padding section-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-8 text-sm text-muted-foreground">
            Effective date: June 2026 · Last updated: June 2026
          </p>
          <div className="space-y-8">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="mb-3 text-xl font-bold text-foreground">{section.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 border-t border-border pt-8 text-muted-foreground">
            Read our{' '}
            <Link to="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>{' '}
            or{' '}
            <Link to="/faq" className="font-medium text-primary hover:underline">
              FAQs
            </Link>{' '}
            for more information.
          </p>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
};

export default Terms;

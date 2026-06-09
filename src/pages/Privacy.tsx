import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Shield } from 'lucide-react';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect information you provide when enrolling, creating an account, subscribing to our newsletter, or contacting us — including name, email, phone number, and program interests. We also collect usage data such as pages visited and device information to improve our platform.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use your information to deliver programs, process enrollments, send learning updates, respond to support requests, improve our services, and communicate about Zyvotrix programs and resources. We do not sell your personal data to third parties.',
  },
  {
    title: 'Cookies & Analytics',
    body: 'Zyvotrix uses cookies and analytics tools to understand how visitors use our website, measure performance, and improve user experience. You can control cookies through your browser settings.',
  },
  {
    title: 'Data Security',
    body: 'We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.',
  },
  {
    title: 'Third-Party Services',
    body: 'We may use trusted third-party services for hosting, payment processing, email delivery, and analytics. These providers process data according to their own privacy policies and our agreements with them.',
  },
  {
    title: 'Your Rights',
    body: 'You may request access to, correction of, or deletion of your personal data by contacting support@zyvotrix.com. You can unsubscribe from marketing emails at any time using the link in our messages.',
  },
  {
    title: 'Children\'s Privacy',
    body: 'Zyvotrix services are intended for learners aged 16 and above. We do not knowingly collect personal information from children under 16 without parental consent.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services constitutes acceptance of the revised policy.',
  },
];

const Privacy = () => {
  usePageMeta({
    title: 'Privacy Policy',
    description:
      'Zyvotrix Privacy Policy — how we collect, use, and protect your personal information when you use our edtech platform and programs.',
    canonical: '/privacy',
  });

  return (
    <PageShell>
      <Navbar />
      <PageHero
        badge="Legal"
        title="Privacy Policy"
        subtitle="How Zyvotrix collects, uses, and protects your information."
        centered
      />
      <section className="section-padding section-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 flex items-center gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Shield className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">
              Effective date: June 2026 · Last updated: June 2026
            </p>
          </div>
          <div className="space-y-4">
            {sections.map((section, i) => (
              <article
                key={section.title}
                className="rounded-2xl border border-border/80 bg-card p-6 transition-all hover:border-primary/20 hover:shadow-sm"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 rounded-2xl border border-border bg-brand-100/40 p-6 text-muted-foreground">
            Questions? Contact{' '}
            <a href="mailto:support@zyvotrix.com" className="font-medium text-primary hover:underline">
              support@zyvotrix.com
            </a>{' '}
            or visit our{' '}
            <Link to="/contact" className="font-medium text-primary hover:underline">
              contact page
            </Link>
            . See also our{' '}
            <Link to="/terms" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
};

export default Privacy;

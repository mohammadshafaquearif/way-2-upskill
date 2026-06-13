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
    title: 'Introduction',
    body: 'Zyvotrix respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you access our website, enroll in programs, use learning resources, participate in live sessions, or interact with our community. By using Zyvotrix services, you agree to the practices described in this Privacy Policy.',
  },
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly to us, including your full name, email address, phone number, country or region, program enrollment details, support requests, communications with our team, and newsletter subscription preferences. We may also automatically collect technical information such as your IP address, browser type, device information, website usage data, and cookies or analytics data when you visit or interact with our platform.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use the information we collect to deliver programs and learning resources, process enrollments and payments, provide learner support, send important program updates, improve our platform and services, analyze website performance, and share newsletters or learning content when you have subscribed to receive them. Zyvotrix does not sell personal information to third parties.',
  },
  {
    title: 'Cookies & Analytics',
    body: 'Zyvotrix uses cookies and analytics tools to improve website functionality, understand visitor behavior, measure website performance, and enhance the overall user experience. You may disable or manage cookies through your browser settings, though some features of the platform may not function optimally if certain cookies are disabled.',
  },
  {
    title: 'Learning Analytics',
    body: 'To improve learning outcomes and program quality, we may collect information related to your educational activity on the platform, including course progress, assignment completion, project submissions, attendance records for live sessions, and usage of learning resources. This information is used solely to support your learning experience, provide mentor feedback where applicable, and improve the quality of Zyvotrix programs.',
  },
  {
    title: 'Third-Party Services',
    body: 'We may use trusted third-party providers for payment processing, cloud hosting, analytics, email communication, and community platforms. Examples may include AWS, Google Analytics, Stripe, Razorpay, PayPal, GitHub, Discord, and similar services. These providers process information according to their own privacy policies and our agreements with them. Zyvotrix is not responsible for the privacy practices of third-party services accessed independently by learners.',
  },
  {
    title: 'Data Security',
    body: 'We implement reasonable technical and organizational safeguards designed to protect personal information from unauthorized access, disclosure, alteration, or destruction. However, no online system or method of electronic transmission can guarantee absolute security, and we cannot ensure the complete security of information transmitted to or stored on our platform.',
  },
  {
    title: 'Data Retention',
    body: 'We retain personal information only for as long as necessary to provide our services, support learners throughout their program, maintain business and enrollment records, comply with applicable legal obligations, and resolve disputes. When information is no longer required for these purposes, we take reasonable steps to delete or anonymize it in accordance with our retention practices.',
  },
  {
    title: 'Marketing Communications',
    body: 'You may receive program updates, learning resources, event announcements, community updates, and newsletters from Zyvotrix if you have subscribed or enrolled in our services. You may unsubscribe from marketing communications at any time by using the unsubscribe link in our emails or by contacting support@zyvotrix.com. Transactional and program-related communications necessary for your enrollment may still be sent even if you opt out of marketing messages.',
  },
  {
    title: 'Your Rights',
    body: 'Depending on your location and applicable data protection laws, you may have the right to request access to your personal information, correction of inaccurate information, or deletion of information where applicable. To exercise these rights, please submit a request through support@zyvotrix.com or our contact page. We will respond to valid requests within a reasonable timeframe as required by applicable law.',
  },
  {
    title: 'Children\'s Privacy',
    body: 'Zyvotrix services are intended for individuals aged 13 years and above. We do not knowingly collect personal information from children under 13 without appropriate parental or guardian consent. If you believe we have collected information from a child under 13, please contact us immediately and we will take steps to remove such information.',
  },
  {
    title: 'International Users',
    body: 'Zyvotrix serves learners globally, including working professionals across multiple countries and time zones. By using our services, you consent to the collection, storage, and processing of your information in accordance with this Privacy Policy, which may involve transferring data to servers or service providers located in jurisdictions other than your country of residence.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. Updated versions will be posted on this page with a revised effective date. Continued use of Zyvotrix services after changes are posted constitutes acceptance of the updated Privacy Policy.',
  },
  {
    title: 'Contact Us',
    body: 'For questions regarding this Privacy Policy or your personal information, please contact us at support@zyvotrix.com or visit zyvotrix.com/contact. Our team will respond to privacy-related inquiries within a reasonable timeframe.',
  },
];

const Privacy = () => {
  usePageMeta({
    title: 'Privacy Policy',
    description:
      'Zyvotrix Privacy Policy — how we collect, use, store, and protect personal information for learners, enrollments, live programs, and community access.',
    canonical: '/privacy',
  });

  return (
    <PageShell>
      <Navbar />
      <PageHero
        badge="Legal"
        title="Privacy Policy"
        subtitle="How Zyvotrix collects, uses, stores, and protects your personal information."
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
            </Link>{' '}
            and{' '}
            <Link to="/faq" className="font-medium text-primary hover:underline">
              FAQs
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

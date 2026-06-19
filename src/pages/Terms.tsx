import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import { STATIC_PAGE_SEO } from '@/lib/seo';
import { usePageMeta } from '@/hooks/usePageMeta';
import { FileText } from 'lucide-react';

type TermsSection = {
  title: string;
  body: React.ReactNode;
};

const sections: TermsSection[] = [
  {
    title: 'Acceptance of Terms',
    body: (
      <>
        By accessing the Zyvotrix platform, website, certification programs, learning resources, live
        sessions, or community spaces, you agree to be bound by these{' '}
        <strong className="font-semibold text-foreground">Terms of Service</strong> and our{' '}
        <strong className="font-semibold text-foreground">Privacy Policy</strong>. If you do not
        agree with these terms, please{' '}
        <strong className="font-semibold text-foreground">do not use our services</strong>.
      </>
    ),
  },
  {
    title: 'Services Offered',
    body: (
      <>
        Zyvotrix provides online certification programs, live mentor-led training sessions, learning
        resources, project-based learning experiences, community access, and career guidance resources
        for working professionals worldwide. We{' '}
        <strong className="font-semibold text-foreground">
          reserve the right to update
        </strong>{' '}
        course content, technologies, projects, mentors, and learning materials at any time to reflect
        industry changes and improve learner outcomes.
      </>
    ),
  },
  {
    title: 'Enrollment & Payments',
    body: (
      <>
        Enrollment in a Zyvotrix program is{' '}
        <strong className="font-semibold text-foreground">
          confirmed only after successful payment
        </strong>{' '}
        through our approved payment methods. Learners{' '}
        <strong className="font-semibold text-foreground">
          must provide accurate and complete registration information
        </strong>{' '}
        at the time of enrollment. Access to live classes, recordings, learning resources, and
        community spaces{' '}
        <strong className="font-semibold text-foreground">
          may be restricted, suspended, or revoked
        </strong>{' '}
        if payment obligations are not fulfilled or if enrollment information is found to be
        inaccurate.
      </>
    ),
  },
  {
    title: 'Program Updates',
    body: (
      <>
        Technology evolves rapidly, and Zyvotrix programs are designed to stay industry-relevant. We
        may update curriculum, projects, tools, technologies, mentors, and delivery methods{' '}
        <strong className="font-semibold text-foreground">without prior notice</strong> when such
        changes improve the quality of learning or align programs with current professional
        standards. Continued participation in a program after updates constitutes{' '}
        <strong className="font-semibold text-foreground">
          acceptance of the revised content and structure
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Certification Policy',
    body: (
      <>
        Certificates are awarded{' '}
        <strong className="font-semibold text-foreground">
          only after successful completion
        </strong>{' '}
        of all required program criteria, including mandatory projects, assignments, assessments
        where applicable, and any other completion requirements stated for the program.{' '}
        <strong className="font-semibold text-foreground">
          Enrollment alone does not guarantee certification.
        </strong>{' '}
        Zyvotrix reserves the right to{' '}
        <strong className="font-semibold text-foreground">withhold or revoke certificates</strong>{' '}
        if program requirements are not met or if a learner violates these Terms.
      </>
    ),
  },
  {
    title: 'Intellectual Property',
    body: (
      <>
        All materials provided through Zyvotrix — including course content, videos, slides, notes,
        projects, templates, branding, and website content — remain the{' '}
        <strong className="font-semibold text-foreground">
          intellectual property of Zyvotrix
        </strong>{' '}
        or its licensors. Learners receive a{' '}
        <strong className="font-semibold text-foreground">
          personal, non-transferable license
        </strong>{' '}
        to access materials for their own educational use. Learners{' '}
        <strong className="font-semibold text-foreground">may not</strong> copy, redistribute, sell,
        share, republish, or otherwise distribute any paid content{' '}
        <strong className="font-semibold text-foreground">
          without prior written permission
        </strong>{' '}
        from Zyvotrix.
      </>
    ),
  },
  {
    title: 'Recording & Learning Materials',
    body: (
      <>
        Course recordings, documents, templates, code samples, and other learning resources are
        provided strictly for{' '}
        <strong className="font-semibold text-foreground">personal educational use</strong> by
        enrolled learners. Sharing, distributing, reselling, uploading to public platforms, or
        publishing Zyvotrix learning materials in any form is{' '}
        <strong className="font-semibold text-foreground">prohibited</strong>. Unauthorized use of
        program materials may result in{' '}
        <strong className="font-semibold text-foreground">immediate termination of access</strong>{' '}
        and further action as permitted by law.
      </>
    ),
  },
  {
    title: 'Learner Conduct',
    body: (
      <>
        Learners{' '}
        <strong className="font-semibold text-foreground">
          must maintain professional and respectful behavior
        </strong>{' '}
        in all interactions with mentors, staff, and fellow learners across live sessions, community
        channels, and support communications. Harassment, hate speech, spam, impersonation, cheating,
        plagiarism, and unauthorized sharing of paid content are{' '}
        <strong className="font-semibold text-foreground">strictly prohibited</strong>. Violation of
        these conduct standards may result in{' '}
        <strong className="font-semibold text-foreground">
          suspension or permanent termination of platform access without refund
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Community Guidelines',
    body: (
      <>
        Participation in Zyvotrix community spaces — including forums, group sessions, messaging
        channels, and related platforms —{' '}
        <strong className="font-semibold text-foreground">
          must remain respectful, constructive, and professional
        </strong>{' '}
        at all times. Zyvotrix reserves the right to{' '}
        <strong className="font-semibold text-foreground">
          remove, restrict, or permanently ban
        </strong>{' '}
        members who violate community standards, disrupt learning environments, or engage in behavior
        that harms other learners or the integrity of the platform.
      </>
    ),
  },
  {
    title: 'Career Outcomes Disclaimer',
    body: (
      <>
        Zyvotrix provides education, training, and skill-development programs designed to help
        learners build practical, industry-relevant capabilities. We{' '}
        <strong className="font-semibold text-foreground">do not guarantee</strong> employment, job
        offers, interviews, promotions, salary increases, or success in obtaining third-party
        certifications. Career outcomes depend on individual effort, prior experience, portfolio
        quality, geographic market conditions, and employer requirements beyond the scope of any
        training program.
      </>
    ),
  },
  {
    title: 'Third-Party Tools & Platforms',
    body: (
      <>
        Zyvotrix programs may include the use of third-party services and tools such as AWS, Docker,
        GitHub, OpenAI, Anthropic, Google Cloud, and other technology platforms required for
        hands-on learning. Zyvotrix{' '}
        <strong className="font-semibold text-foreground">is not responsible</strong> for service
        interruptions, pricing changes, account restrictions, policy updates, or availability issues
        caused by third-party providers.{' '}
        <strong className="font-semibold text-foreground">
          Learners are responsible for complying
        </strong>{' '}
        with the terms and policies of any third-party platform they use during a program.
      </>
    ),
  },
  {
    title: 'Limitation of Liability',
    body: (
      <>
        To the maximum extent permitted by applicable law, Zyvotrix{' '}
        <strong className="font-semibold text-foreground">shall not be liable</strong> for any
        indirect, incidental, special, consequential, or punitive damages, including but not limited
        to business interruption, loss of data, loss of income, or loss of opportunity arising from
        the use of our programs, platform, or services. Our{' '}
        <strong className="font-semibold text-foreground">total liability</strong> for any claim
        relating to a specific program shall not exceed the amount paid by the learner for that
        program.
      </>
    ),
  },
  {
    title: 'Termination of Access',
    body: (
      <>
        Zyvotrix may{' '}
        <strong className="font-semibold text-foreground">suspend or terminate</strong> a learner&apos;s
        access to programs, live sessions, recordings, community spaces, and other services if the
        learner violates these Terms, shares paid content without authorization, engages in
        misconduct, misuses the platform, or uses our services unlawfully. Termination may occur{' '}
        <strong className="font-semibold text-foreground">with or without prior notice</strong>{' '}
        depending on the severity of the violation.
      </>
    ),
  },
  {
    title: 'Privacy',
    body: (
      <>
        Personal information collected during enrollment, payment, communication, and platform use is
        handled in accordance with our{' '}
        <strong className="font-semibold text-foreground">Privacy Policy</strong>. We encourage all
        users to review the Privacy Policy before enrolling in a program or using Zyvotrix services.
        By using our platform, you acknowledge that you have read and understood how we collect, use,
        and protect your data.
      </>
    ),
  },
  {
    title: 'Governing Law',
    body: (
      <>
        These Terms of Service shall be governed by and construed in accordance with the{' '}
        <strong className="font-semibold text-foreground">laws of Karnataka, India</strong>. Any
        disputes arising from or relating to these Terms or the use of Zyvotrix services shall first
        be addressed through{' '}
        <strong className="font-semibold text-foreground">good-faith discussions</strong> between
        the parties before either party pursues formal legal remedies.
      </>
    ),
  },
  {
    title: 'Contact Information',
    body: (
      <>
        For questions regarding these Terms of Service, enrollment, payments, or platform use, please
        contact us at{' '}
        <strong className="font-semibold text-foreground">
          <a href="mailto:support@zyvotrix.com" className="text-primary hover:underline">
            support@zyvotrix.com
          </a>
        </strong>{' '}
        or visit{' '}
        <Link to="/contact" className="font-semibold text-primary hover:underline">
          zyvotrix.com/contact
        </Link>
        . Our support team will respond to inquiries within a reasonable timeframe during business
        hours.
      </>
    ),
  },
];

const Terms = () => {
  usePageMeta(STATIC_PAGE_SEO['/terms']);

  return (
    <PageShell>
      <Navbar />
      <PageHero
        badge="Legal"
        title="Terms of Service"
        subtitle="Terms governing your use of Zyvotrix programs, live training, certifications, and community."
        centered
      />
      <section className="section-padding section-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 flex items-center gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <FileText className="h-6 w-6" />
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
            Read our{' '}
            <Link to="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
            , browse our{' '}
            <Link to="/faq" className="font-medium text-primary hover:underline">
              FAQs
            </Link>
            , or{' '}
            <Link to="/contact" className="font-medium text-primary hover:underline">
              contact us
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

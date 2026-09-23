import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Link } from 'react-router-dom';
import ProgramCardBrand from '@/components/home/ProgramCardBrand';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Clock, FolderKanban } from 'lucide-react';
import { COURSES } from '@/lib/courses';
import { STATIC_PAGE_SEO } from '@/lib/seo';
import { usePageMeta } from '@/hooks/usePageMeta';

const photo = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80&crop=faces`;

const trustMetrics = [
  'One mentor for the full program',
  'Same syllabus as the group class',
  'Labs and project reviews',
  'Work you can put on GitHub',
  'Career guidance',
  'Recordings if you miss a session',
];

const requestPath = (courseId: string) => `/contact?mentorship=${courseId}#contact-form`;

const programGoals: Record<string, string> = {
  dop: 'Become a DevOps Engineer',
  aac: 'Build AI Agents & Automation',
  aws: 'Master AWS Cloud Architecture',
  'data-science': 'Become a Data Analyst / Data Scientist',
};

const courseCardDetails: Record<string, { projects: string; focus: string; photo: string; photoAlt: string }> = {
  dop: {
    projects: '12+ Projects',
    focus: 'AI + DevOps',
    photo: photo('photo-1522071820081-009f0129c71c', 1200, 675),
    photoAlt: 'People writing code together around a table',
  },
  aac: {
    projects: '10+ Portfolio Projects',
    focus: 'Multi-Agent Systems',
    photo: photo('photo-1522202176988-66273c2fd55f', 1200, 675),
    photoAlt: 'Three people talking through work on laptops',
  },
  aws: {
    projects: '7 Projects + Capstone',
    focus: 'SAA-C03 Focused',
    photo: photo('photo-1516321497487-e288fb19713f', 1200, 675),
    photoAlt: 'Hands pointing at a laptop during a working session',
  },
  'data-science': {
    projects: '6 Projects + Capstone',
    focus: 'ML + Analytics',
    photo: photo('photo-1516321318423-f06f85e504b3', 1200, 675),
    photoAlt: 'Someone pointing at a laptop screen',
  },
};

const graduateOutcomes = [
  'Professional Certificate',
  'Portfolio Projects',
  'GitHub Repositories',
  'Career Guidance',
  'Industry-Ready Skills',
];

const OneOnOneMentorship = () => {
  usePageMeta(STATIC_PAGE_SEO['/1-1-mentorship']);

  return (
    <PageShell className="courses-page mentorship-page">
      <Navbar />

      <PageHero
        badge="1-on-1 Mentorship"
        title={
          <>
            1{'\u2011'}on{'\u2011'}1 Mentorship for{' '}
            <span className="gradient-text">DevOps, Agentic AI, AWS &amp; Data Science</span>
          </>
        }
        subtitle="Same programs as the group classes. You work with one mentor on the syllabus, labs, and projects. Sessions are set around your week."
        image={photo('photo-1531482615713-2afd69097998', 1400, 960)}
        imageAlt="Two people reviewing code together at a desk"
        imageCaption="Sessions are with one mentor."
      />

      <section className="relative -mt-6 z-10">
        <div className="courses-page-container">
          <div className="courses-trust-panel rounded-2xl border border-border/60 bg-card px-4 py-5 shadow-lg sm:px-8 sm:py-7">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-primary">
              What is included
            </p>
            <div className="courses-trust-grid">
              {trustMetrics.map((label) => (
                <span
                  key={label}
                  className="courses-trust-item flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt" id="which-program">
        <div className="courses-page-container">
          <header className="courses-section-header mx-auto mb-8 max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary">
              Find your path
            </span>
            <h2 className="courses-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Which program fits?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pick the track you want to work on. The syllabus is the group-class syllabus. The format is 1-on-1.
            </p>
          </header>

          <ul className="mentorship-path-list">
            {COURSES.map((course) => (
              <li key={course.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <p className="text-sm text-foreground">{programGoals[course.id]}</p>
                <Link
                  to={course.route}
                  className="mt-1 inline-flex items-center gap-2 font-bold text-primary"
                >
                  {course.shortTitle}
                  <span className="text-xs font-normal text-muted-foreground">Details</span>
                </Link>
                <Button asChild size="sm" className="btn-brand mt-3 h-9 w-full text-xs font-semibold">
                  <Link to={requestPath(course.id)}>
                    Request 1-on-1
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </li>
            ))}
          </ul>

          <div className="mentorship-path-table courses-table-wrap mx-auto max-w-4xl overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="courses-table w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3.5 font-bold text-foreground">Goal</th>
                  <th className="px-5 py-3.5 font-bold text-foreground">Program</th>
                  <th className="px-5 py-3.5 font-bold text-foreground">Request</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((course) => (
                  <tr key={course.id} className="border-b border-border/70 last:border-0">
                    <td className="px-5 py-4 text-foreground">{programGoals[course.id]}</td>
                    <td className="px-5 py-4">
                      <Link
                        to={course.route}
                        className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
                      >
                        {course.code}
                        <span className="text-xs font-normal text-muted-foreground">View details</span>
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <Button asChild size="sm" className="btn-brand h-8 px-4 text-xs font-semibold shadow-sm">
                        <Link to={requestPath(course.id)}>
                          Request 1-on-1
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding section-white" id="programs">
        <div className="courses-page-container">
          <header className="courses-section-header mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary">
              Programs
            </span>
            <h2 className="courses-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Four programs, one mentor
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Duration and projects match the group class. You are not in a batch.
            </p>
          </header>

          <div className="top-programs-grid">
            {COURSES.map((course) => {
              const details = courseCardDetails[course.id];

              return (
                <article key={course.id} className="top-program-card top-program-card--enroll">
                  <div className="top-program-card-media">
                    <img
                      src={details.photo}
                      alt={details.photoAlt}
                      className="top-program-card-image"
                      loading="lazy"
                    />
                    <ProgramCardBrand />
                    <span className="top-program-card-code">{course.code}</span>
                  </div>

                  <div className="top-program-card-body">
                    <h3 className="top-program-card-title">{course.title}</h3>
                    <p className="top-program-card-meta text-muted-foreground">{course.description}</p>

                    <div className="top-program-card-stats">
                      <span className="top-program-card-tag">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                      <span className="top-program-card-tag">
                        <FolderKanban className="h-3.5 w-3.5" />
                        {details.projects}
                      </span>
                      <span className="top-program-card-tag top-program-card-tag--accent">
                        {details.focus}
                      </span>
                    </div>

                    <div className="top-program-card-actions">
                      <Button asChild className="btn-brand top-program-card-btn-enroll">
                        <Link to={requestPath(course.id)}>
                          Request 1-on-1
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="top-program-card-btn-view">
                        <Link to={course.route}>View Program</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt" id="outcomes">
        <div className="courses-page-container">
          <div className="courses-outcomes-panel mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-10">
            <header className="mb-6 text-center">
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary">
                When you finish
              </span>
              <h2 className="courses-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                What you leave with
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                A certificate, and projects you can open in an interview.
              </p>
            </header>

            <ul className="courses-outcomes-list grid gap-3 sm:grid-cols-2">
              {graduateOutcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageCta
        className="courses-page-cta"
        badge="Ask us"
        title="Want a mentor for one of these?"
        description="Tell us the program and what you do today. We will reply with how the 1-on-1 sessions are set up."
        primaryLabel="Talk to us"
        primaryHref="/contact?mentorship=1-on-1#contact-form"
        secondaryLabel="Free Resources"
        secondaryHref="/resources"
      />

      <Footer />
    </PageShell>
  );
};

export default OneOnOneMentorship;

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Link } from 'react-router-dom';
import ProgramCardBrand from '@/components/home/ProgramCardBrand';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Clock, FolderKanban, Sparkles } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { COURSES } from '@/lib/courses';
import { usePageMeta } from '@/hooks/usePageMeta';
import CoursePriceDisplay from '@/components/courses/CoursePriceDisplay';

const trustMetrics = [
  'Live Mentor-Led Training',
  'Real-World Projects',
  'Portfolio Development',
  'Career Guidance',
  'Lifetime Access to Recordings',
  'Built for Working Professionals',
];

const programGoals: Record<string, string> = {
  dop: 'Become a DevOps Engineer',
  aac: 'Build AI Agents & Automation',
  aws: 'Master AWS Cloud Architecture',
  'data-science': 'Become a Data Analyst / Data Scientist',
};

const courseCardDetails: Record<string, { projects: string; focus: string }> = {
  dop: {
    projects: '12+ Projects',
    focus: 'AI + DevOps',
  },
  aac: {
    projects: '10+ Portfolio Projects',
    focus: 'Multi-Agent Systems',
  },
  aws: {
    projects: '7 Projects + Capstone',
    focus: 'SAA-C03 Focused',
  },
  'data-science': {
    projects: '6 Projects + Capstone',
    focus: 'ML + Analytics',
  },
};

const graduateOutcomes = [
  'Professional Certificate',
  'Portfolio Projects',
  'GitHub Repositories',
  'Career Guidance',
  'Industry-Ready Skills',
];

const Courses = () => {
  usePageMeta({
    title: 'DevOps, Agentic AI, AWS & Data Science Certification Programs',
    description:
      'Explore Zyvotrix certification programs: DevOps (DOP), Agentic AI (AAC), AWS Solutions Architect, and Data Science & Machine Learning with Python. Live mentor-led training with hands-on projects.',
    canonical: '/courses',
  });

  return (
    <PageShell className="courses-page">
      <Navbar />

      <PageHero
        badge="All Programs"
        title={
          <>
            Certification Programs for{' '}
            <span className="gradient-text">DevOps, Agentic AI, AWS &amp; Data Science</span>
          </>
        }
        subtitle="Build job-ready skills with industry-focused certification programs. Master DevOps, Agentic AI, AWS cloud architecture, and Data Science through live mentor-led training, hands-on projects, and portfolio-driven learning."
        image={IMAGES.hero.courses}
        imageAlt="Zyvotrix learners collaborating on AI, cloud, and data science certification programs"
        imageCaption={IMAGES.heroCaptions.courses}
      />

      <section className="relative -mt-6 z-10">
        <div className="courses-page-container">
          <div className="courses-trust-panel rounded-2xl border border-border/60 bg-card px-6 py-6 shadow-lg sm:px-8 sm:py-7">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-primary">
              Why Learners Choose Zyvotrix
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
              Find Your Path
            </span>
            <h2 className="courses-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Which Program Is Right For You?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Not sure where to start? Match your career goal to the program built for it.
            </p>
          </header>

          <div className="courses-table-wrap mx-auto max-w-4xl overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="courses-table w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3.5 font-bold text-foreground">Goal</th>
                  <th className="px-5 py-3.5 font-bold text-foreground">Program</th>
                  <th className="px-5 py-3.5 font-bold text-foreground">Enroll</th>
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
                        <span className="text-xs font-normal text-muted-foreground">View details →</span>
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <Button asChild size="sm" className="btn-brand h-8 px-4 text-xs font-semibold shadow-sm">
                        <Link to={course.checkoutPath}>
                          Enroll Now
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
              Certification Programs
            </span>
            <h2 className="courses-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Explore All Programs
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              DevOps certification, Agentic AI course, AWS certification, and Data Science course —
              each with live training and portfolio projects.
            </p>
          </header>

          <div className="top-programs-grid">
            {COURSES.map((course) => {
              const details = courseCardDetails[course.id];

              return (
                <article key={course.id} className="top-program-card top-program-card--enroll">
                  <div className="top-program-card-media">
                    <img
                      src={course.image}
                      alt={course.title}
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

                    <div className="top-program-card-price">
                      <CoursePriceDisplay courseCode={course.code} />
                    </div>

                    <div className="top-program-card-actions">
                      <Button asChild className="btn-brand btn-shimmer top-program-card-btn-enroll">
                        <Link to={course.checkoutPath}>
                          Enroll Now
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

      <section className="section-padding section-alt" id="enroll-today">
        <div className="courses-page-container">
          <header className="courses-section-header mx-auto mb-8 max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Secure Your Seat
            </span>
            <h2 className="courses-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Enroll Today — Start Learning This Week
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pick your program and go straight to checkout. Live mentor-led batches with lifetime
              access to recordings.
            </p>
          </header>

          <div className="courses-enroll-grid">
            {COURSES.map((course) => (
              <Link
                key={course.id}
                to={course.checkoutPath}
                className="courses-enroll-card group"
              >
                <div className="courses-enroll-card-header">
                  <span className="courses-enroll-card-code">{course.code}</span>
                  <ArrowRight className="courses-enroll-card-arrow h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="courses-enroll-card-title">{course.shortTitle}</h3>
                <p className="courses-enroll-card-duration">
                  <Clock className="h-3.5 w-3.5" />
                  {course.duration}
                </p>
                <div className="courses-enroll-card-price">
                  <CoursePriceDisplay courseCode={course.code} />
                </div>
                <span className="courses-enroll-card-cta">
                  Go to Checkout
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-white" id="outcomes">
        <div className="courses-page-container">
          <div className="courses-outcomes-panel mx-auto max-w-3xl rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-sky-500/5 p-8 sm:p-10">
            <header className="mb-6 text-center">
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary">
                Your Outcomes
              </span>
              <h2 className="courses-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                What You&apos;ll Graduate With
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Every program is built to leave you with proof of skills — not just a completion badge.
              </p>
            </header>

            <ul className="courses-outcomes-list grid gap-3 sm:grid-cols-2">
              {graduateOutcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border/80 bg-white/90 px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
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
        badge="Need guidance?"
        title="Not Sure Where to Start?"
        description="Whether you're looking to transition into DevOps, AI, Cloud, or Data Science, our team can help you choose the right learning path based on your experience and career goals."
        primaryLabel="Talk to an Advisor"
        primaryHref="/contact"
        secondaryLabel="Free Resources"
        secondaryHref="/resources"
      />

      <Footer />
    </PageShell>
  );
};

export default Courses;

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import { Link } from 'react-router-dom';
import ProgramCardBrand from '@/components/home/ProgramCardBrand';
import { Button } from '@/components/ui/button';
import { Users, FolderKanban, Clock } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { COURSES } from '@/lib/courses';
import { usePageMeta } from '@/hooks/usePageMeta';

const highlights = [
  { icon: Users, label: 'Expert-led programs' },
  { icon: Clock, label: '2–4 month certifications' },
  { icon: FolderKanban, label: 'Hands-on projects' },
];

const Courses = () => {
  usePageMeta({
    title: 'Programs & Courses',
    description:
      'Explore Zyvotrix certification programs: AI-Powered DevOps (DOP), Agentic AI (AAC), AWS Solutions Architect, and Data Science with Python.',
    canonical: '/courses',
  });

  return (
    <PageShell>
      <Navbar />

      <PageHero
        badge="All Programs"
        title={
          <>
            Certification Programs for <span className="gradient-text">Modern Tech Careers</span>
          </>
        }
        subtitle="Structured certification paths with hands-on projects — view full curriculum for each program."
        image={IMAGES.hero.courses}
        imageAlt="Learner in a Zyvotrix certification program"
        imageCaption={IMAGES.heroCaptions.courses}
      />

      <section className="relative -mt-6 z-10 px-4 sm:px-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border/60 bg-card px-6 py-4 shadow-lg">
            {highlights.map((h) => (
              <span key={h.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <h.icon className="h-4 w-4 text-primary" />
                {h.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-white" id="programs">
        <div className="container px-4 sm:px-6">
          <div className="top-programs-grid">
            {COURSES.map((course) => (
              <article key={course.id} className="top-program-card">
                <div className="top-program-card-media">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="top-program-card-image"
                    loading="lazy"
                  />
                  <ProgramCardBrand />
                </div>

                <div className="top-program-card-body">
                  <h3 className="top-program-card-title">{course.title}</h3>
                  <p className="top-program-card-meta text-muted-foreground">{course.description}</p>
                  <p className="top-program-card-meta">
                    <span>Duration: {course.duration}</span>
                  </p>
                  <Button asChild variant="outline" className="top-program-card-btn">
                    <Link to={course.route}>View Program</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        badge="Need guidance?"
        title="Not sure which program fits you?"
        description="Tell us your goals — we'll help you choose the right certification path."
        primaryLabel="Get Guidance"
        primaryHref="/contact"
        secondaryLabel="Free Resources"
        secondaryHref="/resources"
      />

      <Footer />
    </PageShell>
  );
};

export default Courses;

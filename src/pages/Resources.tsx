import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import FreeLearningResources from '@/components/home/FreeLearningResources';
import { IMAGES } from '@/lib/images';
import { COURSES } from '@/lib/courses';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ArrowRight } from 'lucide-react';

const Resources = () => {
  usePageMeta({
    title: 'Free Learning Resources',
    description:
      'Free roadmaps, beginner guides, career tips, and curated tech learning resources from Zyvotrix.',
    canonical: '/resources',
  });

  return (
    <PageShell>
      <Navbar />

      <PageHero
        badge="Free Resources"
        title={
          <>
            Learn Smarter with <span className="gradient-text">Free Resources</span>
          </>
        }
        subtitle="Roadmaps, guides, and curated content to help you explore Zyvotrix certification paths."
        image={IMAGES.hero.resources}
        imageAlt="Free learning resources at Zyvotrix"
        imageCaption={IMAGES.heroCaptions.resources}
      />

      <section className="section-padding section-alt">
        <div className="container px-4 sm:px-6">
          <h2 className="section-title mb-8">Program Roadmaps</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {COURSES.map((course) => (
              <Link
                key={course.id}
                to={course.route}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/25 hover:shadow-lg"
              >
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    {course.code}
                  </p>
                  <h3 className="font-bold text-foreground group-hover:text-primary">{course.shortTitle}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{course.duration}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FreeLearningResources showBanner={false} />

      <PageCta
        badge="Ready to go deeper?"
        title="Explore certification programs"
        description="View full syllabi for DOP, AAC, AWS, and Data Science with Python."
        primaryLabel="View Programs"
        primaryHref="/courses"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />

      <Footer />
    </PageShell>
  );
};

export default Resources;

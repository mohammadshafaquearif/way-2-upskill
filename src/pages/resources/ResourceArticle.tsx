import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageCta from '@/components/PageCta';
import ResourceEmailCapture from '@/components/resources/ResourceEmailCapture';
import { Button } from '@/components/ui/button';
import {
  CATEGORY_META,
  FEATURED_ROADMAPS,
  getResourceArticle,
} from '@/lib/resourcesContent';
import { usePageMeta } from '@/hooks/usePageMeta';

const ResourceArticle = () => {
  const { slug = '' } = useParams();
  const article = getResourceArticle(slug);

  usePageMeta({
    title: article ? article.title : 'Resource Not Found',
    description: article?.description ?? 'Free learning resource from Zyvotrix.',
    canonical: `/resources/${slug}`,
  });

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const meta = CATEGORY_META[article.category];
  const roadmap = FEATURED_ROADMAPS.find((r) => r.slug === slug);

  return (
    <PageShell className="resources-page">
      <Navbar />

      <article className="section-padding section-white pt-24 sm:pt-28">
        <div className="resources-page-container">
          <Link
            to="/resources"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div className="mx-auto max-w-3xl">
            <span
              className={`resource-category-badge resource-category-badge--${meta.accent} mb-4 inline-block`}
            >
              {meta.label}
            </span>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {article.title}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{article.description}</p>

            <div className="resource-article-body space-y-6">
              {article.sections.map((section, index) => (
                <div key={index}>
                  {section.heading && (
                    <h2 className="mb-2 text-xl font-bold text-foreground">{section.heading}</h2>
                  )}
                  <p className="leading-relaxed text-muted-foreground">{section.body}</p>
                </div>
              ))}
            </div>

            {roadmap && (
              <div className="resource-article-download mt-10 rounded-2xl border border-primary/15 bg-primary/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground">Download {roadmap.downloadLabel}</h3>
                </div>
                <ResourceEmailCapture resourceName={roadmap.downloadLabel} variant="card" />
              </div>
            )}

            {article.courseRoute && (
              <div className="mt-10 rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 font-bold text-foreground">Go deeper with structured training</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Live mentor-led programs with hands-on projects and portfolio review.
                </p>
                <Button asChild className="btn-brand">
                  <Link to={article.courseRoute}>
                    View Certification Program
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </article>

      <PageCta
        badge="Free resources · Paid transformation"
        title="Ready for mentor-led training?"
        description="Move from free guides to live programs with projects, feedback, and career support."
        primaryLabel="Explore Programs"
        primaryHref="/courses"
        secondaryLabel="Talk to an Advisor"
        secondaryHref="/contact"
        className="resources-page-cta"
      />

      <Footer />
    </PageShell>
  );
};

export default ResourceArticle;

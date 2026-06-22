import React, { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import ResourceEmailCapture from '@/components/resources/ResourceEmailCapture';
import AwsInterviewPromoBanner from '@/components/resources/AwsInterviewPromoBanner';
import AiEngineerInterviewPromoBanner from '@/components/resources/AiEngineerInterviewPromoBanner';
import DataScienceInterviewPromoBanner from '@/components/resources/DataScienceInterviewPromoBanner';
import DevOpsInterviewPromoBanner from '@/components/resources/DevOpsInterviewPromoBanner';
import ResourceGuideArticle from '@/components/resources/ResourceGuideArticle';
import { Button } from '@/components/ui/button';
import {
  CATEGORY_META,
  FEATURED_ROADMAPS,
  getResourceArticle,
  type ResourceArticle as ResourceArticleType,
} from '@/lib/resourcesContent';
import { buildResourceArticleSeo, buildResourceNotFoundSeo } from '@/lib/seo';
import { usePageMeta } from '@/hooks/usePageMeta';

type ArticleSection = ResourceArticleType['sections'][number];

const InterviewSectionAnswer = ({ section }: { section: ArticleSection }) => (
  <div className="resource-blog-answer-blocks">
    {section.body && (
      <div className="resource-blog-subsection">
        <h3 className="resource-blog-subheading">Answer</h3>
        <p className="resource-blog-answer whitespace-pre-line">{section.body}</p>
      </div>
    )}
    {section.bullets && section.bullets.length > 0 && (
      <ul className="resource-blog-list">
        {section.bullets.map((item, bulletIndex) => (
          <li key={bulletIndex}>{item}</li>
        ))}
      </ul>
    )}
    {section.remember && (
      <div className="resource-blog-subsection resource-blog-remember">
        <h3 className="resource-blog-subheading">Easy Way to Remember</h3>
        <p className="resource-blog-answer whitespace-pre-line">{section.remember}</p>
      </div>
    )}
    {section.tip && (
      <div className="resource-blog-subsection resource-blog-tip">
        <h3 className="resource-blog-subheading">Interview Tip</h3>
        <p className="resource-blog-answer">{section.tip}</p>
      </div>
    )}
  </div>
);

const SectionAnswer = ({ section }: { section: ArticleSection }) => (
  <>
    {section.body && (
      <p className="resource-blog-answer whitespace-pre-line">{section.body}</p>
    )}
    {section.bullets && section.bullets.length > 0 && (
      <ul className="resource-blog-list">
        {section.bullets.map((item, bulletIndex) => (
          <li key={bulletIndex}>{item}</li>
        ))}
      </ul>
    )}
  </>
);

const sectionAnswerText = (section: ArticleSection) =>
  [section.body, section.remember, section.tip, ...(section.bullets ?? [])].filter(Boolean).join(' ');

const estimateReadMinutes = (sections: ArticleSection[]) => {
  const words = sections
    .flatMap((section) => [
      section.heading,
      section.body,
      section.remember,
      section.tip,
      ...(section.bullets ?? []),
    ])
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
};

const ResourceArticle = () => {
  const { slug = '' } = useParams();
  const article = getResourceArticle(slug);

  const articleSeo = article
    ? buildResourceArticleSeo(article)
    : buildResourceNotFoundSeo(slug);

  usePageMeta(articleSeo);

  const meta = article ? CATEGORY_META[article.category] : null;
  const roadmap = FEATURED_ROADMAPS.find((r) => r.slug === slug);
  const isDevOpsInterview = slug === 'devops-interview-questions';
  const isAwsInterview = slug === 'aws-interview-questions';
  const isDataScienceInterview = slug === 'data-science-interview-questions';
  const isAiEngineerInterview = slug === 'ai-engineer-interview-questions';
  const isInterviewGuide = article?.category === 'interview';
  const isGuideLayout = article?.layout === 'guide';
  const isAwsCareerGuide = slug === 'aws-career-path';
  const isDataScienceCareerGuide = slug === 'data-science-career-roadmap';
  const isPromoInterview =
    isDevOpsInterview || isAwsInterview || isDataScienceInterview || isAiEngineerInterview;
  const promoInterval = isDevOpsInterview ? 6 : 5;

  const qaSections = useMemo(
    () => article?.sections.filter((section) => section.heading) ?? [],
    [article],
  );

  const readMinutes = useMemo(() => estimateReadMinutes(qaSections), [qaSections]);

  const faqSchema = useMemo(() => {
    if (!article || !isInterviewGuide || qaSections.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: qaSections.map((section) => ({
        '@type': 'Question',
        name: section.heading?.replace(/^\d+\.\s*/, '') ?? section.heading,
        acceptedAnswer: {
          '@type': 'Answer',
          text: sectionAnswerText(section),
        },
      })),
    };
  }, [article, isInterviewGuide, qaSections]);

  if (!article || !meta) {
    return <Navigate to="/resources" replace />;
  }

  return (
    <PageShell className="resources-page">
      <Navbar />

      <PageHero badge={meta.label} title={article.title} subtitle={article.description} centered />

      <section className="resource-article-section section-padding">
        <div className="resources-page-container">
          <Link to="/resources" className="resource-article-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div className="resource-article-content">
            {faqSchema && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
              />
            )}

            {isInterviewGuide && qaSections.length > 0 ? (
              <article className="resource-blog">
                <header className="resource-blog-header">
                  <div className="resource-blog-meta">
                    <span
                      className={`resource-category-badge resource-category-badge--${meta.accent}`}
                    >
                      {meta.label}
                    </span>
                    <span className="resource-blog-meta-item">{qaSections.length} Questions</span>
                    <span className="resource-blog-meta-item">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {readMinutes} min read
                    </span>
                  </div>
                  <p className="resource-blog-lead">{article.description}</p>
                </header>

                <div className="resource-blog-prose">
                  {qaSections.map((section, index) => (
                    <React.Fragment key={index}>
                      <section
                        id={`question-${index + 1}`}
                        className="resource-blog-block scroll-mt-28"
                      >
                        <h2 className="resource-blog-question">{section.heading}</h2>
                        <InterviewSectionAnswer section={section} />
                        {(!isPromoInterview || (index + 1) % promoInterval !== 0) &&
                          index < qaSections.length - 1 && (
                            <hr className="resource-blog-divider" aria-hidden />
                          )}
                      </section>

                      {isDevOpsInterview &&
                        (index + 1) % promoInterval === 0 &&
                        index < qaSections.length - 1 && (
                          <DevOpsInterviewPromoBanner
                            variant={(((index + 1) / promoInterval - 1) % 2) as 0 | 1}
                          />
                        )}

                      {isAwsInterview &&
                        (index + 1) % promoInterval === 0 &&
                        index < qaSections.length - 1 && (
                          <AwsInterviewPromoBanner
                            variant={(((index + 1) / promoInterval - 1) % 2) as 0 | 1}
                          />
                        )}

                      {isDataScienceInterview &&
                        (index + 1) % promoInterval === 0 &&
                        index < qaSections.length - 1 && (
                          <DataScienceInterviewPromoBanner
                            variant={(((index + 1) / promoInterval - 1) % 2) as 0 | 1}
                          />
                        )}

                      {isAiEngineerInterview &&
                        (index + 1) % promoInterval === 0 &&
                        index < qaSections.length - 1 && (
                          <AiEngineerInterviewPromoBanner
                            variant={(((index + 1) / promoInterval - 1) % 2) as 0 | 1}
                          />
                        )}
                    </React.Fragment>
                  ))}
                </div>
              </article>
            ) : isGuideLayout ? (
              <ResourceGuideArticle
                article={article}
                categoryLabel={meta.label}
                categoryAccent={meta.accent}
              />
            ) : (
              <div className="resource-article-glass space-y-8">
                {article.sections.map((section, index) => (
                  <div key={index}>
                    {section.heading && (
                      <h2 className="mb-2 text-xl font-bold text-foreground">{section.heading}</h2>
                    )}
                    <SectionAnswer section={section} />
                  </div>
                ))}
              </div>
            )}

            {roadmap && (
              <div className="resource-article-cta mt-10">
                <div className="resource-article-cta-glow" aria-hidden />
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-foreground">Download {roadmap.downloadLabel}</h3>
                  </div>
                  <ResourceEmailCapture
                    resourceName={roadmap.downloadLabel}
                    pdfPath={roadmap.pdfPath}
                    source={`Resource article — ${roadmap.title}`}
                    variant="card"
                  />
                </div>
              </div>
            )}

            {article.courseRoute && (
              <div className="resource-article-cta mt-6">
                <div className="resource-article-cta-glow" aria-hidden />
                <div className="relative">
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
              </div>
            )}
          </div>
        </div>
      </section>

      <PageCta
        badge="Free resources · Paid transformation"
        title="Ready for mentor-led training?"
        description="Move from free guides to live programs with projects, feedback, and career support."
        primaryLabel={isPromoInterview ? 'Explore Program' : 'Explore Programs'}
        primaryHref={
          isDevOpsInterview
            ? '/courses/devops-engineer-program'
            : isAwsInterview || isAwsCareerGuide
              ? '/courses/aws'
              : isDataScienceInterview || isDataScienceCareerGuide
                ? '/courses/data-science'
                : isAiEngineerInterview
                  ? '/courses/aac'
                  : '/courses'
        }
        secondaryLabel="Talk to an Advisor"
        secondaryHref="/contact"
        className="resources-page-cta"
      />

      <Footer />
    </PageShell>
  );
};

export default ResourceArticle;

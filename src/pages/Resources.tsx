import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  ChevronRight,
  Cloud,
  Download,
  FileText,
  Gift,
  GitBranch,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Route,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import PageCta from '@/components/PageCta';
import ResourceEmailCapture from '@/components/resources/ResourceEmailCapture';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/lib/images';
import {
  CAREER_GUIDES,
  CATEGORY_META,
  FEATURED_ROADMAPS,
  FREE_DOWNLOADS,
  INTERVIEW_RESOURCES,
  POPULAR_RESOURCES,
  PROJECT_IDEAS,
} from '@/lib/resourcesContent';
import { usePageMeta } from '@/hooks/usePageMeta';

const trustPoints = [
  { label: 'Free roadmaps & guides', icon: Route },
  { label: 'Interview preparation', icon: Briefcase },
  { label: 'Project ideas for portfolios', icon: Lightbulb },
  { label: 'Career-focused content', icon: TrendingUp },
  { label: 'Built for working professionals', icon: GraduationCap },
  { label: 'Updated for 2026', icon: Sparkles },
];

const resourceStats = [
  { value: '20+', label: 'Guides & Articles', icon: FileText },
  { value: '4', label: '2026 Roadmaps', icon: Route },
  { value: '12+', label: 'Project Ideas', icon: Lightbulb },
  { value: '100%', label: 'Free Access', icon: Gift },
];

const sectionNav = [
  { id: 'featured-roadmaps', label: 'Roadmaps', icon: Route },
  { id: 'popular-resources', label: 'Guides', icon: FileText },
  { id: 'project-ideas', label: 'Projects', icon: Lightbulb },
  { id: 'interview-prep', label: 'Interview', icon: Briefcase },
  { id: 'free-downloads', label: 'Downloads', icon: Download },
  { id: 'career-resources', label: 'Career', icon: BookOpen },
] as const;

const categoryIcons = {
  devops: GitBranch,
  aac: Bot,
  aws: Cloud,
  'data-science': BarChart3,
} as const;

const projectTierMeta = {
  beginner: { label: 'Beginner', icon: Target, accent: 'beginner' },
  intermediate: { label: 'Intermediate', icon: TrendingUp, accent: 'intermediate' },
  advanced: { label: 'Advanced', icon: Sparkles, accent: 'advanced' },
} as const;

const categoryOrder = ['devops', 'aac', 'aws', 'data-science'] as const;

const Resources = () => {
  usePageMeta({
    title: 'Free DevOps, Agentic AI, AWS & Data Science Resources',
    description:
      'Free roadmaps, project ideas, guides, interview preparation, and career resources for DevOps, Agentic AI, AWS certification, and Data Science. Learn. Build. Grow.',
    canonical: '/resources',
  });

  return (
    <PageShell className="resources-page">
      <Navbar />

      <PageHero
        badge="Learn. Build. Grow."
        title={
          <>
            Free Learning Resources for{' '}
            <span className="gradient-text">Modern Tech Professionals</span>
          </>
        }
        subtitle="Free roadmaps, project ideas, guides, interview preparation resources, and career-focused content designed for modern tech professionals."
        image={IMAGES.hero.resources}
        imageAlt="Free DevOps, AI, AWS, and Data Science learning resources at Zyvotrix"
      >
        <Button asChild size="lg" className="btn-brand h-12 px-8">
          <a href="#featured-roadmaps">
            Browse Roadmaps
            <Route className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-12 border-primary/25 px-8">
          <a href="#free-downloads">
            Get Free PDFs
            <Download className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </PageHero>

      <section className="relative -mt-6 z-10">
        <div className="resources-page-container">
          <div className="resources-stats-strip">
            {resourceStats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="resources-stat-chip">
                <div className="resources-stat-icon">
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </div>
                <div>
                  <p className="resources-stat-value">{value}</p>
                  <p className="resources-stat-label">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="resources-trust-panel rounded-2xl border border-border/60 bg-card px-6 py-6 shadow-lg sm:px-8 sm:py-7">
            <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-primary">
              Why Use Zyvotrix Resources
            </p>
            <div className="resources-trust-grid">
              {trustPoints.map(({ label, icon: Icon }) => (
                <span key={label} className="resources-trust-item">
                  <span className="resources-trust-item-icon">
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <nav className="resources-quick-nav" aria-label="Jump to resource sections">
            {sectionNav.map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} className="resources-quick-nav-pill">
                <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section-padding section-alt resources-section" id="featured-roadmaps">
        <div className="resources-page-container">
          <header className="resources-section-header mx-auto mb-10 max-w-2xl text-center">
            <span className="resources-section-badge">
              <Route className="h-3.5 w-3.5" />
              Featured Roadmaps
            </span>
            <h2 className="resources-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              2026 Learning Roadmaps
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Visual paths from beginner to job-ready — aligned to Zyvotrix certification programs.
            </p>
          </header>

          <div className="resources-roadmap-grid">
            {FEATURED_ROADMAPS.map((roadmap) => {
              const meta = CATEGORY_META[roadmap.category];
              const CategoryIcon = categoryIcons[roadmap.category];
              const pathSteps = roadmap.path.split('→').map((step) => step.trim());

              return (
                <article
                  key={roadmap.slug}
                  className={`resources-roadmap-card resources-roadmap-card--${meta.accent}`}
                >
                  <div className="resources-roadmap-card-head">
                    <div className={`resources-roadmap-icon resources-roadmap-icon--${meta.accent}`}>
                      <CategoryIcon className="h-5 w-5" strokeWidth={2.25} />
                    </div>
                    <span className="resources-roadmap-code">{meta.label}</span>
                  </div>

                  <h3 className="resources-roadmap-title">{roadmap.title}</h3>

                  <div className="resources-roadmap-path-track" aria-label={`Learning path: ${roadmap.path}`}>
                    {pathSteps.map((step, index) => (
                      <React.Fragment key={step}>
                        <span className="resources-roadmap-step">{step}</span>
                        {index < pathSteps.length - 1 && (
                          <ChevronRight
                            className="resources-roadmap-step-arrow h-3 w-3 shrink-0"
                            aria-hidden
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="resources-roadmap-actions">
                    <Button asChild variant="outline" size="sm" className="border-primary/25">
                      <Link to={`/resources/${roadmap.slug}`}>Read Guide</Link>
                    </Button>
                    <ResourceEmailCapture
                      resourceName={roadmap.downloadLabel}
                      buttonLabel="Download PDF"
                      className="resources-roadmap-download"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding section-white resources-section" id="popular-resources">
        <div className="resources-page-container">
          <header className="resources-section-header mx-auto mb-10 max-w-2xl text-center">
            <span className="resources-section-badge">
              <FileText className="h-3.5 w-3.5" />
              Popular Learning Resources
            </span>
            <h2 className="resources-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Guides, Explainers &amp; Tutorials
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              SEO-friendly deep dives — each article links to a structured certification path.
            </p>
          </header>

          <div className="resources-category-grid">
            {categoryOrder.map((category) => {
              const meta = CATEGORY_META[category];
              const items = POPULAR_RESOURCES[category];
              const CategoryIcon = categoryIcons[category];

              return (
                <div
                  key={category}
                  className={`resources-category-block resources-category-block--${meta.accent}`}
                >
                  <div className="resources-category-head">
                    <div className="resources-category-head-left">
                      <div className={`resources-category-icon resources-category-icon--${meta.accent}`}>
                        <CategoryIcon className="h-4 w-4" strokeWidth={2.25} />
                      </div>
                      <div>
                        <h3 className="resources-category-title">{meta.label}</h3>
                        <p className="resources-category-count">{items.length} guides</p>
                      </div>
                    </div>
                    <Link
                      to={meta.courseRoute}
                      className="resources-category-program-link"
                    >
                      View program
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <ul className="resources-link-list">
                    {items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={`/resources/${item.slug}`}
                          className="resources-link-item group"
                        >
                          <span className="resources-link-item-text">{item.title}</span>
                          <ArrowRight className="resources-link-item-arrow h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt resources-section" id="project-ideas">
        <div className="resources-page-container">
          <header className="resources-section-header mx-auto mb-10 max-w-2xl text-center">
            <span className="resources-section-badge">
              <Lightbulb className="h-3.5 w-3.5" />
              Free Project Ideas
            </span>
            <h2 className="resources-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Portfolio Projects by Level
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Build real-world projects that showcase your skills — from first portfolio to advanced systems.
            </p>
          </header>

          <div className="resources-projects-grid">
            {(
              [
                { key: 'beginner' as const },
                { key: 'intermediate' as const },
                { key: 'advanced' as const },
              ]
            ).map(({ key }) => {
              const tier = projectTierMeta[key];
              const TierIcon = tier.icon;

              return (
                <div
                  key={key}
                  className={`resources-project-tier resources-project-tier--${tier.accent}`}
                >
                  <div className="resources-project-tier-head">
                    <div className={`resources-project-tier-icon resources-project-tier-icon--${tier.accent}`}>
                      <TierIcon className="h-4 w-4" strokeWidth={2.25} />
                    </div>
                    <h3 className="resources-project-tier-label">{tier.label}</h3>
                  </div>
                  <ul className="resources-project-list">
                    {PROJECT_IDEAS[key].map((project, index) => (
                      <li key={project} className="resources-project-item">
                        <span className="resources-project-number">{index + 1}</span>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding section-white resources-section" id="interview-prep">
        <div className="resources-page-container">
          <header className="resources-section-header mx-auto mb-8 max-w-2xl text-center">
            <span className="resources-section-badge">
              <Briefcase className="h-3.5 w-3.5" />
              Interview Preparation
            </span>
            <h2 className="resources-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Most Popular Interview Guides
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Role-specific question banks and prep strategies to help you land your next offer.
            </p>
          </header>

          <div className="resources-interview-grid">
            {INTERVIEW_RESOURCES.map((item) => (
              <Link
                key={item.slug}
                to={`/resources/${item.slug}`}
                className="resources-interview-card group"
              >
                <div className="resources-interview-card-icon">
                  <Briefcase className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <h3 className="resources-interview-card-title">{item.title}</h3>
                <span className="resources-card-cta">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt resources-section" id="free-downloads">
        <div className="resources-page-container">
          <div className="resources-download-panel">
            <div className="resources-download-panel-glow" aria-hidden />
            <header className="relative mb-8 text-center">
              <span className="resources-section-badge">
                <Download className="h-3.5 w-3.5" />
                Free Downloads
              </span>
              <h2 className="resources-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                Download Free Guides &amp; Roadmaps
              </h2>
              <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
                Enter your email to receive PDF roadmaps and study guides — free, zero spam.
              </p>
            </header>

            <div className="resources-download-grid">
              {FREE_DOWNLOADS.map((item) => (
                <div key={item.slug} className="resources-download-card">
                  <p className="resources-download-card-title">
                    <Download className="h-4 w-4 text-primary" />
                    {item.label}
                  </p>
                  <ResourceEmailCapture
                    resourceName={item.label}
                    buttonLabel="Get PDF"
                    variant="card"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-white resources-section" id="career-resources">
        <div className="resources-page-container">
          <header className="resources-section-header mx-auto mb-8 max-w-2xl text-center">
            <span className="resources-section-badge">
              <BookOpen className="h-3.5 w-3.5" />
              Career Resources
            </span>
            <h2 className="resources-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Career Transition Guides
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Step-by-step playbooks for switching into DevOps, AI, AWS, and Data Science roles.
            </p>
          </header>

          <div className="resources-career-grid">
            {CAREER_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                to={`/resources/${guide.slug}`}
                className="resources-career-card group"
              >
                <div className="resources-career-card-icon">
                  <TrendingUp className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <h3 className="resources-career-card-title">{guide.title}</h3>
                <span className="resources-card-cta">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt resources-section" id="community">
        <div className="resources-page-container">
          <div className="resources-community-panel">
            <div className="resources-community-panel-glow" aria-hidden />
            <div className="relative">
              <div className="resources-community-icon">
                <Users className="h-7 w-7" strokeWidth={2.25} />
              </div>
              <h2 className="resources-section-title mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                Join the Zyvotrix Community
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-muted-foreground leading-relaxed">
                Connect with learners, share projects, ask questions, and grow with a community of
                professionals.
              </p>
              <Button asChild size="lg" className="btn-brand h-12 px-8">
                <Link to="/#community">
                  Join Community
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        className="resources-page-cta"
        badge="From free to job-ready"
        title="Turn learning into certification"
        description="Free resources get you started. Zyvotrix programs get you hired — live training, projects, and mentor feedback."
        primaryLabel="Explore Programs"
        primaryHref="/courses"
        secondaryLabel="Talk to an Advisor"
        secondaryHref="/contact"
      />

      <Footer />
    </PageShell>
  );
};

export default Resources;

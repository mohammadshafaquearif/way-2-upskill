import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Compass,
  FolderKanban,
  Hammer,
  Heart,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Target,
  Users,
  Video,
} from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { usePageMeta } from '@/hooks/usePageMeta';

const { aboutVisuals } = IMAGES;

const differentiators = [
  {
    icon: Hammer,
    title: 'Learn by Building',
    text: 'Every concept is reinforced through projects and implementation.',
  },
  {
    icon: Layers,
    title: 'Industry-Focused Curriculum',
    text: 'Programs are designed around modern tools and workflows used by engineering teams.',
  },
  {
    icon: Briefcase,
    title: 'Portfolio-Driven Learning',
    text: 'Learners graduate with projects they can showcase on GitHub, LinkedIn, and during interviews.',
  },
  {
    icon: BookOpen,
    title: 'Built for Working Professionals',
    text: 'Structured learning paths designed to fit alongside professional commitments.',
  },
];

const coreValues = [
  {
    icon: Target,
    title: 'Practicality',
    desc: 'Learn skills that can be applied immediately.',
  },
  {
    icon: Compass,
    title: 'Curiosity',
    desc: 'Keep exploring and adapting to changing technology.',
  },
  {
    icon: Sparkles,
    title: 'Consistency',
    desc: 'Progress through small, continuous improvements.',
  },
  {
    icon: Heart,
    title: 'Community',
    desc: 'Learn together and support each other.',
  },
];

const learnerHighlights = [
  { icon: Video, label: 'Live Mentor-Led Sessions' },
  { icon: FolderKanban, label: 'Real-World Projects' },
  { icon: Briefcase, label: 'Portfolio-Focused Learning' },
  { icon: Compass, label: 'Career Guidance' },
  { icon: Layers, label: 'Industry-Relevant Curriculum' },
  { icon: Users, label: 'Community Support' },
];

const About = () => {
  usePageMeta({
    title: 'About Zyvotrix — Building Career-Ready Tech Professionals',
    description:
      'Zyvotrix helps learners and working professionals build practical skills in DevOps, Agentic AI, AWS, and Data Science through hands-on projects, mentorship, and portfolio-driven learning.',
    canonical: '/about',
  });

  return (
    <PageShell className="about-page">
      <Navbar />

      <PageHero
        badge="Our Purpose"
        title={
          <>
            Building <span className="gradient-text">Career-Ready</span> Tech Professionals
          </>
        }
        subtitle="At Zyvotrix, we believe learning should lead to real outcomes — practical skills, meaningful projects, and the confidence to solve real-world problems. Our programs are designed for learners and working professionals who want more than theory."
        image={aboutVisuals.hero}
        imageAlt="Diverse professionals learning DevOps, AI, cloud, and data skills in a modern workspace"
        imageCaption={IMAGES.heroCaptions.about}
      >
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          We focus on implementation, portfolio development, and industry-relevant skills across
          DevOps, AI, Cloud, and Data Science.
        </p>
        <Button asChild size="lg" className="btn-brand h-12 px-8">
          <Link to="/courses">Explore Programs</Link>
        </Button>
      </PageHero>

      <section className="section-padding section-alt" id="our-story">
        <div className="about-page-container">
          <div className="about-story-grid">
            <div>
              <span className="about-section-eyebrow mb-3 inline-block">Our Story</span>
              <h2 className="about-section-title mb-5 text-left">Why Zyvotrix Was Created</h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Many learners spend months watching tutorials, collecting certificates, and
                  completing courses without gaining the confidence to build real-world projects.
                </p>
                <p className="font-semibold text-foreground">Zyvotrix was created to solve this problem.</p>
                <p>
                  Our goal is simple: help learners move beyond passive learning and become builders.
                </p>
                <p>
                  Every program is designed around hands-on implementation, portfolio development,
                  and practical problem-solving. Instead of focusing only on theory, we focus on
                  helping learners apply concepts through projects, industry workflows, and guided
                  mentorship.
                </p>
                <p className="text-lg font-semibold text-primary">
                  We believe technology is best learned by building.
                </p>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md md:max-w-none">
              <div className="hero-image-glow" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-xl">
                <img
                  src={aboutVisuals.story}
                  alt="Passive learning versus building real projects — watch tutorials, build projects, get confident"
                  className="about-story-visual"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-white" id="mission">
        <div className="about-page-container">
          <header className="about-section-header mx-auto mb-8 max-w-2xl text-center">
            <span className="about-section-eyebrow mb-3 inline-block">Our Mission</span>
            <h2 className="about-section-title mb-4">Bridging the Gap Between Learning and Industry</h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our mission is to help aspiring professionals and working professionals acquire
              practical, industry-relevant skills that can be applied immediately in real projects
              and real careers.
            </p>
          </header>
          <div className="about-visual-frame">
            <img
              src={aboutVisuals.mission}
              alt="Bridge connecting theory and tutorials to real projects, GitHub, and cloud architecture"
              className="about-visual-16-9"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt" id="different">
        <div className="about-page-container">
          <header className="about-section-header mx-auto mb-10 max-w-2xl text-center">
            <span className="about-section-eyebrow mb-3 inline-block">The Zyvotrix Difference</span>
            <h2 className="about-section-title mb-3">What Makes Zyvotrix Different?</h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Not another certificate factory — a builder-first learning experience.
            </p>
          </header>

          <div className="about-different-grid">
            {differentiators.map(({ icon: Icon, title, text }) => (
              <article key={title} className="about-different-card">
                <div className="about-different-icon">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-white" id="values">
        <div className="about-page-container">
          <header className="about-section-header mx-auto mb-10 max-w-2xl text-center">
            <span className="about-section-eyebrow mb-3 inline-block">Core Values</span>
            <h2 className="about-section-title mb-3">What We Stand For</h2>
          </header>

          <div className="about-values-grid">
            {coreValues.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="about-value-card">
                <div className="about-value-icon">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt" id="founder">
        <div className="about-page-container">
          <header className="about-section-header mx-auto mb-10 max-w-2xl text-center">
            <span className="about-section-eyebrow mb-3 inline-block">Meet the Co-founder</span>
            <h2 className="about-section-title">Co-founder, CEO &amp; Lead Instructor</h2>
          </header>

          <div className="about-founder-panel mx-auto max-w-3xl rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-8 shadow-lg sm:p-10">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <div className="about-founder-photo-wrap shrink-0">
                <img
                  src={aboutVisuals.founder}
                  alt="Mohammad Shafaque Arif — Co-founder, CEO and Lead Instructor at Zyvotrix"
                  className="about-founder-photo"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="pill-tag mb-3 inline-block">Co-founder, CEO &amp; Lead Instructor</span>
                <h3 className="mb-4 text-2xl font-bold text-brand-950 md:text-3xl">
                  Mohammad Shafaque Arif
                </h3>
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                    Mohammad Shafaque Arif is a software developer, trainer, and technology educator
                    with experience across Full Stack Development, DevOps, Cloud Computing, AI, and
                    Data Science.
                  </p>
                  <p>
                    Having worked with thousands of learners worldwide, he understands the challenges
                    people face when transitioning into modern technology careers.
                  </p>
                  <p className="font-medium text-foreground">
                    His focus is simple: help learners build practical skills, create strong
                    portfolios, and gain the confidence needed to succeed in the industry.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm md:justify-start">
                  <a
                    href="mailto:support@zyvotrix.com"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shafaquearif26/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-white" id="highlights">
        <div className="about-page-container">
          <header className="about-section-header mx-auto mb-10 max-w-2xl text-center">
            <span className="about-section-eyebrow mb-3 inline-block">Why Learners Choose Zyvotrix</span>
            <h2 className="about-section-title mb-3">Highlights</h2>
          </header>

          <div className="about-highlights-grid">
            {learnerHighlights.map(({ icon: Icon, label }) => (
              <article key={label} className="about-highlight-card">
                <div className="about-highlight-icon">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-semibold text-foreground">{label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt" id="vision">
        <div className="about-page-container">
          <header className="about-section-header mx-auto mb-8 max-w-2xl text-center">
            <span className="about-section-eyebrow mb-3 inline-block">Our Vision</span>
            <h2 className="about-section-title mb-4">A Trusted Platform for Global Learners</h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              To become a trusted learning platform that helps professionals worldwide build
              practical technology skills and create meaningful career opportunities.
            </p>
          </header>
          <div className="about-visual-frame mx-auto max-w-4xl">
            <img
              src={aboutVisuals.vision}
              alt="Global learners worldwide — trusted platform connecting professionals across 100+ countries"
              className="about-visual-16-9"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-white border-t border-border">
        <div className="about-page-container">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5">
              <MapPin className="h-4 w-4 text-primary" /> Bengaluru, Karnataka
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5">
              <Phone className="h-4 w-4 text-primary" /> +91 8887720741
            </span>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="outline" className="h-12 border-primary/25 px-8">
              <Link to="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="about-page-cta dark-surface cta-premium relative overflow-hidden py-16 md:py-24 text-white">
        <div className="cta-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl" aria-hidden />

        <div className="about-page-container relative z-10">
          <div className="about-cta-grid">
            <div className="about-cta-copy">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Your journey starts here
              </span>
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Start Building Skills That Matter
              </h2>
              <p className="mb-8 max-w-xl leading-relaxed text-slate-300">
                Whether you&apos;re transitioning into a new role, upskilling for growth, or exploring
                a new technology domain, Zyvotrix is here to support your journey.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 border-0 bg-white font-semibold text-brand-950 shadow-lg hover:bg-brand-100"
                >
                  <Link to="/courses">
                    Explore Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/30 bg-transparent text-white hover:bg-white/10"
                >
                  <Link to="/resources">Free Resources</Link>
                </Button>
              </div>
            </div>
            <div className="about-cta-visual mx-auto w-full max-w-[220px] sm:max-w-[260px]">
              <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/30">
                <img
                  src={aboutVisuals.cta}
                  alt="Learning journey from building skills to portfolio and career growth"
                  className="aspect-[9/16] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
};

export default About;

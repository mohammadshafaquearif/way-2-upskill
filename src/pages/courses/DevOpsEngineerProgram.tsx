import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Bot,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Cloud,
  Code2,
  GraduationCap,
  Hammer,
  Settings,
  Sparkles,
  Star,
  Target,
  UserCheck,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageCta from '@/components/PageCta';
import AmbientDepth from '@/components/motion/AmbientDepth';
import DepthCard from '@/components/motion/DepthCard';
import DevOpsHeroVisual from '@/components/motion/DevOpsHeroVisual';
import { Reveal3D, RevealStagger } from '@/components/motion/Reveal3D';
import { Button } from '@/components/ui/button';
import ProgramSectionAside from '@/components/courses/ProgramSectionAside';
import ProgramVisualMosaic from '@/components/courses/ProgramVisualMosaic';
import ProgramVisualSplit from '@/components/courses/ProgramVisualSplit';
import { COURSE_BY_ID } from '@/lib/courses';
import { DEVOPS_TOOLS } from '@/lib/devopsTools';
import { IMAGES } from '@/lib/images';
import { usePageMeta } from '@/hooks/usePageMeta';

const course = COURSE_BY_ID.dop;
const visuals = IMAGES.programVisuals.dop;

const curriculum = [
  {
    phase: 'Phase 1',
    label: 'Foundation',
    subtitle: 'Linux, Git & Cloud Fundamentals + AI Basics',
    topics: [
      'Linux CLI mastery — files, permissions, processes',
      'Shell scripting & Bash automation',
      'Git & GitHub — branching, PRs, GitOps',
      'Cloud concepts — AWS/GCP core services',
      'Intro to AI tools: ChatGPT, Copilot for DevOps',
      'IAM, VPC, EC2, S3 hands-on labs',
      'AI prompt engineering for infrastructure tasks',
    ],
    project: 'Mini Project 1',
  },
  {
    phase: 'Phase 2',
    label: 'Containers & CI/CD',
    subtitle: 'Docker, Kubernetes & Automated Pipelines',
    topics: [
      'Docker — images, containers, compose, registry',
      'Kubernetes — pods, services, deployments, Helm',
      'CI/CD with GitHub Actions & Jenkins',
      'AI-assisted pipeline generation & debugging',
      'Container security best practices',
      'Blue-green & canary deployments',
      'Monitoring containers — Prometheus + Grafana',
    ],
    project: 'Mini Project 2',
  },
  {
    phase: 'Phase 3',
    label: 'IaC & Security',
    subtitle: 'Terraform, Ansible & DevSecOps',
    topics: [
      'Infrastructure as Code with Terraform',
      'Terraform modules, state management, workspaces',
      'Configuration management with Ansible',
      'AI-generated Terraform templates & review',
      'DevSecOps — SAST, DAST, vulnerability scanning',
      'Secrets management — Vault, AWS Secrets Manager',
      'Compliance as Code — Open Policy Agent',
    ],
    project: 'Mini Project 3',
  },
  {
    phase: 'Phase 4',
    label: 'AI Ops & Capstone',
    subtitle: 'AI-Driven Operations & Capstone Project',
    topics: [
      'AIOps — intelligent monitoring & alerting',
      'LLM-powered log analysis & incident response',
      'Auto-remediation pipelines using AI agents',
      'Cost optimization with AI recommendations',
      'SRE principles — SLOs, SLAs, error budgets',
      'Capstone project planning & execution',
      'Final presentation, code review & demo day',
    ],
    project: 'Capstone',
  },
];

const handsOnProjects = [
  {
    num: '01',
    title: 'Automated Cloud Infrastructure',
    description:
      'Set up a multi-region AWS environment using shell scripts and AI-assisted configuration management.',
    tags: ['AWS EC2', 'Bash', 'S3'],
  },
  {
    num: '02',
    title: 'Full CI/CD Pipeline with Containers',
    description:
      'Deploy a microservices app on Kubernetes using a fully automated GitHub Actions pipeline.',
    tags: ['Docker', 'K8s', 'GitHub Actions'],
  },
  {
    num: '03',
    title: 'Secure IaC Deployment',
    description:
      'Provision and secure a production-grade infra using Terraform + Ansible with automated security scans.',
    tags: ['Terraform', 'Ansible', 'Trivy'],
  },
];

const programHighlights = [
  {
    icon: Target,
    title: 'Industry-Aligned',
    desc: 'Curriculum built with DevOps practitioners',
  },
  {
    icon: Bot,
    title: 'AI-First Approach',
    desc: 'LLMs integrated into every DevOps workflow',
  },
  {
    icon: Cloud,
    title: 'Hands-on Cloud Labs',
    desc: 'AWS & GCP real environment access',
  },
  {
    icon: GraduationCap,
    title: 'Certificate + Portfolio',
    desc: 'Projects you can show in interviews',
  },
  {
    icon: Briefcase,
    title: 'Placement Support',
    desc: 'Resume reviews, mock interviews, referrals',
  },
];

const audience = [
  {
    icon: Code2,
    title: 'Software Developers',
    desc: 'You build code but want to own the entire pipeline — CI/CD, deployments, and infrastructure.',
  },
  {
    icon: GraduationCap,
    title: 'CS/IT Graduates',
    desc: 'Freshers who want to stand out with practical cloud & automation skills that jobs demand.',
  },
  {
    icon: Settings,
    title: 'Sysadmins',
    desc: 'Traditional system admins wanting to transition to modern cloud-native DevOps roles.',
  },
  {
    icon: Users,
    title: 'IT Professionals',
    desc: 'Anyone in tech looking to add DevOps + AI automation as a high-value skill set.',
  },
];

const walkAway = [
  {
    icon: Award,
    title: 'Industry Certificate',
    desc: 'Zyvotrix AI-Powered DevOps Engineer Certificate, shareable on LinkedIn.',
  },
  {
    icon: Briefcase,
    title: 'Job-Ready Portfolio',
    desc: '3 mini projects + 1 capstone deployed on real cloud infra — live GitHub portfolio.',
  },
  {
    icon: UserCheck,
    title: 'Placement Assistance',
    desc: 'Resume review, mock interviews with working DevOps engineers, and hiring partner referrals.',
  },
  {
    icon: Bot,
    title: 'AI Automation Skills',
    desc: 'Ability to build AI-powered pipelines that automate 80% of manual DevOps toil.',
  },
  {
    icon: Users,
    title: 'Alumni Network',
    desc: 'Lifetime access to Zyvotrix Discord, study groups, and peer network of DevOps engineers.',
  },
  {
    icon: Video,
    title: 'Lifetime Recording Access',
    desc: 'All session recordings + updated course materials, free, forever.',
  },
];

const TechMarquee = ({ tools, reverse }: { tools: typeof DEVOPS_TOOLS; reverse?: boolean }) => (
  <div className="devops-tech-marquee-wrap">
    <div className={`devops-tech-marquee${reverse ? ' devops-tech-marquee--reverse' : ''}`}>
      {[...tools, ...tools].map((tool, i) => (
        <span key={`${tool.name}-${i}`} className="devops-tech-pill">
          <img src={tool.icon} alt="" width={22} height={22} loading="lazy" decoding="async" />
          {tool.name}
        </span>
      ))}
    </div>
  </div>
);

const DevOpsEngineerProgram = () => {
  usePageMeta({
    title: 'AI-Powered DevOps Engineer Program',
    description:
      '4-month AI-Powered DevOps Engineer certification at Zyvotrix. Weekend sessions, Linux to Kubernetes, Terraform, DevSecOps, AIOps, and a portfolio capstone project.',
    canonical: '/courses/devops-engineer-program',
  });

  const techRowA = DEVOPS_TOOLS.slice(0, 8);
  const techRowB = DEVOPS_TOOLS.slice(8);

  return (
    <PageShell className="devops-program-page">
      <Navbar />

      {/* Hero */}
      <section className="program-landing-hero relative overflow-hidden">
        <AmbientDepth />
        <div className="hero-orb hero-orb-1 opacity-40" aria-hidden />
        <div className="hero-orb hero-orb-2 opacity-30" aria-hidden />
        <div className="hero-orb hero-orb-3 opacity-25" aria-hidden />
        <div className="hero-grid-overlay opacity-40" aria-hidden />

        <div className="container relative z-10 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="hero-fade-up">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {course.code} · Certification Program
              </span>
              <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-brand-950 sm:text-4xl lg:text-[2.75rem]">
                <span className="gradient-text-animated">AI-Powered</span> DevOps Engineer Program
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                From zero to production-ready in {course.duration.toLowerCase()}. Weekend sessions —
                2 hours each day — designed to learn deeply without burning out.
              </p>

              <div className="mb-8 flex flex-wrap gap-3 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  Weekend · 2 hrs/day
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-primary" />
                  {course.projects} projects + capstone
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="btn-brand btn-shimmer h-12 px-8">
                  <Link to={course.checkoutPath}>
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-primary/20 px-8 backdrop-blur-sm">
                  <Link to="/contact">Talk to an Advisor</Link>
                </Button>
              </div>
            </div>

            <div className="hero-fade-up" style={{ animationDelay: '0.15s' }}>
              <DevOpsHeroVisual image={course.image} imageAlt="AI-Powered DevOps Engineer Program at Zyvotrix" />
            </div>
          </div>
        </div>
      </section>

      {/* Program highlights */}
      <section className="border-b border-border bg-white py-12 sm:py-14">
        <div className="container px-4 sm:px-6">
          <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" staggerMs={70}>
            {programHighlights.map(({ icon: Icon, title, desc }) => (
              <DepthCard key={title} className="h-full" maxTilt={7}>
                <div className="program-highlight-card flex h-full flex-col items-center rounded-2xl border border-border bg-card p-5 text-center sm:p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-foreground">{title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{desc}</p>
                </div>
              </DepthCard>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Human + tech imagery */}
      <section className="program-visual-section">
        <div className="container px-4 sm:px-6">
          <ProgramVisualSplit
            image={visuals.learner}
            imageAlt="DevOps learner working on cloud infrastructure at Zyvotrix"
            badge="Learning Experience"
            title="Learn by Building Production Pipelines"
            description="Weekend live sessions with real labs — you provision cloud infra, containerize apps, and automate CI/CD every phase."
            bullets={[
              'Live mentor-led sessions every weekend',
              'Hands-on labs on Docker, K8s, Terraform & AWS',
              'Portfolio projects deployed on real cloud environments',
            ]}
          />
          <ProgramVisualSplit
            image={visuals.mentor}
            imageAlt="DevOps practitioner mentoring a Zyvotrix learner"
            badge="Expert Guidance"
            title="Mentorship from Working DevOps Engineers"
            description="Get pipeline reviews, infra feedback, and career guidance from practitioners who ship to production daily."
            bullets={[
              'Code and pipeline reviews on your projects',
              'Architecture feedback before your capstone demo',
              'Resume and interview coaching included',
            ]}
            reverse
          />
          <ProgramVisualMosaic
            images={[
              {
                src: visuals.learner,
                alt: 'DevOps learner at Zyvotrix',
                label: 'Cloud & DevOps Labs',
              },
              {
                src: visuals.classroom,
                alt: 'Collaborative learning environment',
                label: 'Live Sessions',
              },
              {
                src: visuals.projects,
                alt: 'Hands-on infrastructure project',
                label: 'Build Projects',
              },
              {
                src: course.image,
                alt: 'DevOps tools and technologies',
                label: 'Industry Tool Stack',
              },
            ]}
          />
        </div>
      </section>

      {/* Curriculum */}
      <section className="section-padding section-alt devops-section-glow" id="curriculum">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Curriculum
            </span>
            <h2 className="section-title mb-4">
              From Zero to <span className="gradient-text-animated">Production-Ready</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Weekend sessions — 2 hours each day. Designed to learn deeply without burning out.
              Each phase builds on the last.
            </p>
          </Reveal3D>

          <div className="devops-curriculum-timeline mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {curriculum.map((phase, i) => (
              <Reveal3D key={phase.phase} delay={i * 90} className="devops-phase-card">
                <DepthCard className="h-full" maxTilt={5}>
                  <article className="program-month-card h-full rounded-2xl border border-border bg-card p-6 sm:p-7">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-primary">
                          {phase.phase} · {phase.label}
                        </span>
                        <h3 className="text-lg font-bold text-foreground">{phase.subtitle}</h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        <Hammer className="h-3.5 w-3.5" />
                        {phase.project}
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {phase.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </DepthCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* Hands-On Projects */}
      <section className="section-padding section-white">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mb-12 max-w-2xl">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Portfolio
            </span>
            <h2 className="section-title mb-3 text-left">Hands-On Projects</h2>
            <p className="leading-relaxed text-muted-foreground">
              Three progressive mini projects plus a capstone — every build is designed for your
              GitHub portfolio and interview discussions.
            </p>
          </Reveal3D>

          <RevealStagger className="mb-8 grid gap-5 md:grid-cols-3" staggerMs={100}>
            {handsOnProjects.map((project) => (
              <DepthCard key={project.num} className="h-full" maxTilt={8}>
                <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="mb-3 block font-mono text-3xl font-black text-primary/15">
                    {project.num}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{project.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </DepthCard>
            ))}
          </RevealStagger>

          <Reveal3D delay={120}>
            <article className="program-capstone-card relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/8 via-card to-secondary/5 p-8 sm:p-10">
              <div className="devops-hero-scan opacity-30" aria-hidden />
              <div className="relative z-10">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Capstone
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Portfolio Showpiece
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                  AI-Powered DevOps Platform
                </h3>
                <p className="mb-6 max-w-3xl leading-relaxed text-muted-foreground">
                  Build a fully AI-integrated DevOps system: auto-scaling infra, intelligent
                  monitoring, LLM-based incident response, and a live dashboard. This is your portfolio
                  showpiece.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['AWS/GCP', 'Terraform', 'K8s', 'LLM', 'Grafana'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs font-bold text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Sparkles
                className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 text-primary/5"
                aria-hidden
              />
            </article>
          </Reveal3D>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding border-y border-border bg-brand-100/30 devops-section-glow">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Tech Stack
            </span>
            <h2 className="section-title mb-3">
              Tools You&apos;ll <span className="gradient-text-animated">Master</span>
            </h2>
            <p className="mb-10 text-muted-foreground">
              Industry-standard tools that appear in every top DevOps job description today.
            </p>
          </Reveal3D>

          <RevealStagger className="devops-tools-grid" staggerMs={50}>
            {DEVOPS_TOOLS.map((tool) => (
              <div key={tool.name} className="devops-tool-card">
                <div className="devops-tool-card-icon">
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="devops-tool-card-name">{tool.name}</span>
              </div>
            ))}
          </RevealStagger>

          <Reveal3D delay={80}>
            <TechMarquee tools={techRowA} />
            <TechMarquee tools={techRowB} reverse />
          </Reveal3D>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="section-padding section-white" id="who-should-join">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Who Should Join
            </span>
            <h2 className="section-title mb-4">Is This Program For You?</h2>
            <p className="leading-relaxed text-muted-foreground">
              This program is designed for people who want to break into or level-up in modern cloud
              &amp; DevOps roles.
            </p>
          </Reveal3D>

          <ProgramSectionAside
            image={visuals.classroom}
            imageAlt="Learners in a Zyvotrix DevOps training session"
            caption="For developers, sysadmins, and IT professionals"
            className="mx-auto max-w-5xl"
          >
            <RevealStagger className="grid gap-5 sm:grid-cols-2" staggerMs={90}>
              {audience.map(({ icon: Icon, title, desc }) => (
                <DepthCard key={title} className="h-full" maxTilt={6}>
                  <article className="program-audience-card flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    </div>
                  </article>
                </DepthCard>
              ))}
            </RevealStagger>
          </ProgramSectionAside>

          <Reveal3D delay={100}>
            <div className="devops-glow-card mx-auto max-w-md">
              <div className="devops-glow-card-inner p-8 text-center shadow-lg">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                  Enrollment
                </p>
                <p className="mb-2 text-2xl font-bold text-foreground">Now Open</p>
                <p className="mb-2 text-sm text-muted-foreground">
                  Weekend sessions · 2 hours/day · {course.duration}
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  Limited seats · Live mentorship · Demo day included
                </p>
                <Button asChild className="btn-brand btn-shimmer h-11 w-full">
                  <Link to={course.checkoutPath}>Reserve Your Seat</Link>
                </Button>
              </div>
            </div>
          </Reveal3D>
        </div>
      </section>

      {/* After Completing */}
      <section className="section-padding section-alt devops-section-glow" id="outcomes">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              After Completing
            </span>
            <h2 className="section-title mb-4">What You&apos;ll Walk Away With</h2>
            <p className="leading-relaxed text-muted-foreground">
              More than a certificate — real skills, real projects, and career support to help you
              land your next DevOps role.
            </p>
          </Reveal3D>

          <ProgramSectionAside
            image={visuals.career}
            imageAlt="Zyvotrix graduate prepared for DevOps engineering roles"
            caption="Portfolio projects, certificate, and career support"
            reverse
            className="mx-auto max-w-5xl"
          >
            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2" staggerMs={75}>
              {walkAway.map(({ icon: Icon, title, desc }) => (
                <DepthCard key={title} className="h-full" maxTilt={5}>
                  <article className="program-walkaway-card h-full rounded-2xl border border-border bg-card p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </article>
                </DepthCard>
              ))}
            </RevealStagger>
          </ProgramSectionAside>
        </div>
      </section>

      <PageCta
        badge="Start your DevOps journey"
        title="Ready to become an AI-Powered DevOps Engineer?"
        description="From Linux basics to an AI-integrated capstone you can demo in interviews."
        primaryLabel="Enroll Now"
        primaryHref={course.checkoutPath}
        secondaryLabel="View All Programs"
        secondaryHref="/courses"
      />

      <Footer />
    </PageShell>
  );
};

export default DevOpsEngineerProgram;

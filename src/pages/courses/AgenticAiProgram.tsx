import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Bot,
  Brain,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Code2,
  GraduationCap,
  Hammer,
  Layers,
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
import AgenticHeroVisual from '@/components/motion/AgenticHeroVisual';
import DepthCard from '@/components/motion/DepthCard';
import { Reveal3D, RevealStagger } from '@/components/motion/Reveal3D';
import { Button } from '@/components/ui/button';
import { AGENTIC_TOOLS } from '@/lib/agenticTools';
import { COURSE_BY_ID } from '@/lib/courses';
import { usePageMeta } from '@/hooks/usePageMeta';

const course = COURSE_BY_ID.aac;

const curriculum = [
  {
    phase: 'Phase 1',
    label: 'LLM Foundations',
    subtitle: 'Python, Prompt Engineering & LLM APIs',
    topics: [
      'Python for AI development & API fundamentals',
      'LLM basics — tokens, context windows, model selection',
      'Prompt engineering & chain-of-thought techniques',
      'OpenAI & Anthropic APIs with function calling',
      'Building your first LLM-powered application',
      'Output evaluation, safety & guardrails',
      'Git workflows for AI projects',
    ],
    project: 'Mini Project 1',
  },
  {
    phase: 'Phase 2',
    label: 'RAG & Agents',
    subtitle: 'Retrieval, LangChain & Tool-Using Agents',
    topics: [
      'Embeddings, chunking & vector search strategies',
      'RAG pipelines — LangChain + FAISS / Pinecone',
      'LangChain chains, tools, memory & callbacks',
      'ReAct agents & tool-use design patterns',
      'Hugging Face Transformers & model hub',
      'Document ingestion — PDF, web & API sources',
      'Gradio & Streamlit for AI app prototyping',
    ],
    project: 'Mini Project 2',
  },
  {
    phase: 'Phase 3',
    label: 'Multi-Agent & Capstone',
    subtitle: 'Orchestration, Deployment & Portfolio',
    topics: [
      'LangGraph & multi-agent orchestration',
      'CrewAI & autonomous workflow automation',
      'Fine-tuning basics — LoRA & PEFT overview',
      'Production deployment — FastAPI, Docker & AWS',
      'Agent monitoring, logging & reliability patterns',
      'Capstone project planning & execution',
      'Final demo day, code review & portfolio presentation',
    ],
    project: 'Capstone',
  },
];

const handsOnProjects = [
  {
    num: '01',
    title: 'RAG Knowledge Assistant',
    description:
      'Build a retrieval-augmented assistant with LangChain, vector search, and document ingestion for real Q&A.',
    tags: ['LangChain', 'RAG', 'Pinecone'],
  },
  {
    num: '02',
    title: 'Tool-Using AI Agent',
    description:
      'Create an agent that calls APIs, uses memory, and completes multi-step tasks autonomously.',
    tags: ['OpenAI', 'Agents', 'FastAPI'],
  },
  {
    num: '03',
    title: 'Multi-Agent Workflow',
    description:
      'Orchestrate multiple specialized agents to automate a complex business workflow end-to-end.',
    tags: ['LangGraph', 'CrewAI', 'Python'],
  },
];

const programHighlights = [
  {
    icon: Target,
    title: 'Agentic-First Curriculum',
    desc: 'Built around LLMs, RAG, and autonomous agents — not outdated ML theory',
  },
  {
    icon: Brain,
    title: 'Hands-On GenAI',
    desc: 'Ship real agents and RAG apps every phase, not slide-deck exercises',
  },
  {
    icon: Layers,
    title: 'Production Mindset',
    desc: 'Deploy, monitor, and harden AI systems for real users',
  },
  {
    icon: GraduationCap,
    title: 'Certificate + Portfolio',
    desc: 'Capstone project you can demo in AI engineer interviews',
  },
  {
    icon: Briefcase,
    title: 'Placement Support',
    desc: 'Resume reviews, mock interviews, and hiring referrals',
  },
];

const audience = [
  {
    icon: Code2,
    title: 'Software Developers',
    desc: 'You want to add LLM apps, RAG systems, and agent workflows to your skill set.',
  },
  {
    icon: GraduationCap,
    title: 'CS/IT Graduates',
    desc: 'Stand out with agentic AI projects that go beyond basic chatbot tutorials.',
  },
  {
    icon: Bot,
    title: 'AI Enthusiasts',
    desc: 'Move from prompting ChatGPT to building production-grade intelligent agents.',
  },
  {
    icon: Users,
    title: 'Tech Professionals',
    desc: 'Upskill into one of the fastest-growing roles — Agentic AI engineer.',
  },
];

const walkAway = [
  {
    icon: Award,
    title: 'Industry Certificate',
    desc: 'Zyvotrix Agentic AI Certification, shareable on LinkedIn.',
  },
  {
    icon: Briefcase,
    title: 'Job-Ready Portfolio',
    desc: '3 mini projects + 1 capstone — live demos and GitHub repos.',
  },
  {
    icon: UserCheck,
    title: 'Placement Assistance',
    desc: 'Resume review, mock interviews with AI practitioners, and hiring partner referrals.',
  },
  {
    icon: Bot,
    title: 'Agent Building Skills',
    desc: 'Design RAG pipelines, tool-using agents, and multi-agent systems from scratch.',
  },
  {
    icon: Users,
    title: 'Alumni Network',
    desc: 'Lifetime access to Zyvotrix Discord, study groups, and peer network.',
  },
  {
    icon: Video,
    title: 'Lifetime Recording Access',
    desc: 'All session recordings + updated materials, free, forever.',
  },
];

const TechMarquee = ({ tools, reverse }: { tools: typeof AGENTIC_TOOLS; reverse?: boolean }) => (
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

const AgenticAiProgram = () => {
  usePageMeta({
    title: 'Agentic AI Certification Training (AAC)',
    description:
      '3-month Agentic AI certification at Zyvotrix. Master LLMs, RAG, LangChain, multi-agent systems, and deploy portfolio-ready AI applications.',
    canonical: '/courses/aac',
  });

  const techRowA = AGENTIC_TOOLS.slice(0, 8);
  const techRowB = AGENTIC_TOOLS.slice(8);

  return (
    <PageShell className="devops-program-page aac-program-page">
      <Navbar />

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
                <span className="gradient-text-animated">Agentic AI</span> Certification Training
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Master intelligent agents, LLM workflows, and production AI automation in{' '}
                {course.duration.toLowerCase()}. Weekend sessions — 2 hours each day — paced for deep
                learning without burnout.
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
              <AgenticHeroVisual
                image={course.image}
                imageAlt="Agentic AI Certification Training at Zyvotrix"
              />
            </div>
          </div>
        </div>
      </section>

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

      <section className="section-padding section-alt devops-section-glow" id="curriculum">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Curriculum
            </span>
            <h2 className="section-title mb-4">
              Zero to <span className="gradient-text-animated">Agentic AI Engineer</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              A focused {course.duration.toLowerCase()} roadmap — from LLM basics to multi-agent
              systems and a portfolio capstone. Each phase builds on the last.
            </p>
          </Reveal3D>

          <div className="devops-curriculum-timeline mx-auto grid max-w-6xl gap-6 lg:grid-cols-1">
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

      <section className="section-padding section-white">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mb-12 max-w-2xl">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Portfolio
            </span>
            <h2 className="section-title mb-3 text-left">Hands-On Projects</h2>
            <p className="leading-relaxed text-muted-foreground">
              Three progressive builds plus a capstone — every project is designed for your GitHub
              portfolio and AI engineer interviews.
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
            <article className="program-capstone-card relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-violet-500/10 via-card to-primary/5 p-8 sm:p-10">
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
                  Enterprise Agentic AI Platform
                </h3>
                <p className="mb-6 max-w-3xl leading-relaxed text-muted-foreground">
                  Build an end-to-end agentic system: RAG knowledge base, multi-agent orchestration,
                  tool integrations, and a deployed web interface. Your flagship portfolio project.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['LangChain', 'RAG', 'Agents', 'FastAPI', 'AWS'].map((tag) => (
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
              The frameworks and platforms powering modern agentic AI products.
            </p>
          </Reveal3D>

          <RevealStagger className="devops-tools-grid" staggerMs={50}>
            {AGENTIC_TOOLS.map((tool) => (
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

      <section className="section-padding section-white" id="who-should-join">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Who Should Join
            </span>
            <h2 className="section-title mb-4">Is This Program For You?</h2>
            <p className="leading-relaxed text-muted-foreground">
              Designed for anyone who wants to build real agentic AI systems — not just use chatbots.
            </p>
          </Reveal3D>

          <RevealStagger className="mx-auto mb-12 grid max-w-5xl gap-5 sm:grid-cols-2" staggerMs={90}>
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

      <section className="section-padding section-alt devops-section-glow" id="outcomes">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              After Completing
            </span>
            <h2 className="section-title mb-4">What You&apos;ll Walk Away With</h2>
            <p className="leading-relaxed text-muted-foreground">
              More than a certificate — deployable agentic AI skills and a capstone you can demo live.
            </p>
          </Reveal3D>

          <RevealStagger className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerMs={75}>
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
        </div>
      </section>

      <PageCta
        badge="Start your Agentic AI journey"
        title="Ready to build intelligent AI agents?"
        description="From LLM fundamentals to a deployed multi-agent capstone — in 3 months."
        primaryLabel="Enroll Now"
        primaryHref={course.checkoutPath}
        secondaryLabel="View All Programs"
        secondaryHref="/courses"
      />

      <Footer />
    </PageShell>
  );
};

export default AgenticAiProgram;

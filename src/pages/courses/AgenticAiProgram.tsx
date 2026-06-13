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
  Compass,
  Database,
  GraduationCap,
  Hammer,
  Radio,
  Search,
  Sparkles,
  Users,
  Wrench,
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
import ProgramAdvantageSection from '@/components/courses/ProgramAdvantageSection';
import ProgramCurriculumAccordion from '@/components/courses/ProgramCurriculumAccordion';
import ProgramCurriculumStickySidebar from '@/components/courses/ProgramCurriculumStickySidebar';
import ProgramInquirySidebar from '@/components/courses/ProgramInquirySidebar';
import ProgramIndustryProjects from '@/components/courses/ProgramIndustryProjects';
import ProgramLearningExperience, {
  type LearningFeatureBlock,
} from '@/components/courses/ProgramLearningExperience';
import ProgramSectionAside from '@/components/courses/ProgramSectionAside';
import { AGENTIC_TOOLS } from '@/lib/agenticTools';
import { COURSE_BY_ID } from '@/lib/courses';
import { IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { usePageMeta } from '@/hooks/usePageMeta';

const course = COURSE_BY_ID.aac;
const visuals = IMAGES.programVisuals.aac;

const curriculum = [
  {
    phase: 'Phase 1',
    label: 'LLM Foundations',
    meta: 'Modules 1–3',
    modules: [
      {
        id: 1,
        title: 'How LLMs Work',
        topics: [
          'Tokens & embeddings',
          'Transformers & context windows',
          'Temperature, Top-P & Top-K sampling',
        ],
        project: {
          title: 'Build a Prompt Playground',
          description: 'Experiment with model parameters and see how outputs change in real time.',
        },
      },
      {
        id: 2,
        title: 'Prompt Engineering',
        topics: [
          'Zero-shot & few-shot prompting',
          'Chain-of-thought reasoning',
          'System prompts & reusable templates',
        ],
        project: {
          title: 'AI Content Assistant',
          description: 'Build a template-driven assistant that generates structured content on demand.',
        },
      },
      {
        id: 3,
        title: 'Function Calling & Open Source LLMs',
        topics: [
          'Function calling & structured outputs',
          'Pydantic schemas for LLM responses',
          'Ollama, Llama 3 & Mistral locally',
        ],
        project: {
          title: 'Local AI Assistant',
          description: 'Run an open-source LLM locally with tool use and validated JSON outputs.',
        },
      },
    ],
    industryProject: {
      title: 'Industry Project 1 — Personal AI Assistant',
      description:
        'Combine prompting, function calling, and local LLMs into a portfolio-ready personal assistant you can demo in interviews.',
    },
  },
  {
    phase: 'Phase 2',
    label: 'Agent Engineering',
    meta: 'Modules 4–8',
    modules: [
      {
        id: 4,
        title: 'LangChain Core',
        topics: ['LCEL pipelines', 'Chains & output parsers', 'Runnable sequences & composition'],
        project: {
          title: 'Coding Assistant',
          description: 'Build a LangChain-powered assistant that helps write and explain code.',
        },
      },
      {
        id: 5,
        title: 'AI Agents',
        topics: ['ReAct agent loop', 'Planning & reflection patterns', 'Tool use & web search'],
        project: {
          title: 'Web Research Agent',
          description: 'Create an agent that searches the web, synthesizes findings, and cites sources.',
        },
      },
      {
        id: 6,
        title: 'RAG Systems',
        topics: [
          'ChromaDB & Pinecone vector stores',
          'Chunking & embedding strategies',
          'Hybrid search for better retrieval',
        ],
        project: {
          title: 'Document Chatbot',
          description: 'Ground an LLM on your own PDFs and documents with a production RAG pipeline.',
        },
      },
      {
        id: 7,
        title: 'Memory Systems',
        topics: ['Buffer memory for short context', 'Vector memory for long-term recall', 'Persistent session storage'],
        project: {
          title: 'Personal Memory Agent',
          description: 'Build an agent that remembers past conversations and user preferences over time.',
        },
      },
      {
        id: 8,
        title: 'LangGraph',
        topics: [
          'State machines & cyclic workflows',
          'Human-in-the-loop checkpoints',
          'State persistence & recovery',
        ],
        project: {
          title: 'Workflow Intelligence Agent',
          description:
            'Orchestrate a multi-step research and analysis workflow with LangGraph — human-in-the-loop checkpoints, state persistence, and autonomous reasoning.',
        },
      },
    ],
    industryProject: {
      title: 'Industry Project 3 — Enterprise Knowledge Assistant',
      description:
        'Deliver a RAG-powered knowledge assistant with memory and workflow orchestration — ready for internal document and knowledge-base use cases.',
    },
  },
  {
    phase: 'Phase 3',
    label: 'Multi-Agent & Production',
    modules: [
      {
        id: 9,
        title: 'Multi-Agent Systems',
        topics: ['CrewAI role-based teams', 'AutoGen agent collaboration', 'Supervisor delegation pattern'],
        project: {
          title: 'AI Startup Team',
          description: 'Simulate a startup with specialized agents — researcher, writer, and reviewer.',
        },
      },
      {
        id: 10,
        title: 'Observability & Evaluation',
        topics: ['LangSmith tracing & debugging', 'LangFuse & AgentOps monitoring', 'Agent evaluation metrics'],
        project: {
          title: 'AI Operations Dashboard',
          description: 'Track agent runs, latency, token costs, and quality scores with full observability tooling.',
        },
      },
      {
        id: 11,
        title: 'Deployment',
        topics: ['FastAPI agent endpoints', 'Docker & Docker Compose', 'Streaming responses to clients'],
        project: {
          title: 'Deploy AI Agent API',
          description: 'Containerize and serve your agent as a production-ready REST API with streaming.',
        },
      },
      {
        id: 12,
        title: 'Cloud AI',
        topics: [
          'AWS Bedrock & Azure OpenAI overview',
          'Cost optimization strategies',
          'Security & access control for agents',
        ],
        project: {
          title: 'Cloud AI Agent Deployment',
          description:
            'Deploy your agent to AWS Bedrock or Azure OpenAI with security controls, monitoring, and cost optimization.',
        },
      },
    ],
  },
];

const heroTrustStats = [
  { value: '12', label: 'Modules' },
  { value: '9+', label: 'Portfolio Builds' },
  { value: 'Live', label: 'Mentorship' },
];

const whyAgenticAi = [
  {
    icon: Compass,
    title: 'Autonomous Reasoning',
    desc: 'Agents that break complex goals into sub-tasks, reason step-by-step, and self-correct without human prompting.',
  },
  {
    icon: Wrench,
    title: 'Tool Use & APIs',
    desc: 'LLMs that call real APIs, write and execute code, search the web, and interact with databases autonomously.',
  },
  {
    icon: Users,
    title: 'Multi-Agent Collaboration',
    desc: 'Orchestrating multiple specialized agents that delegate, communicate, and solve problems as a team.',
  },
  {
    icon: Database,
    title: 'Memory & Context',
    desc: 'Long-term memory using vector databases and episodic memory patterns so agents learn from past interactions.',
  },
  {
    icon: Search,
    title: 'RAG Pipelines',
    desc: 'Retrieval-Augmented Generation to ground agents in real, up-to-date knowledge from your own documents and data.',
  },
  {
    icon: Cloud,
    title: 'Production Systems',
    desc: 'Containerizing, monitoring, and deploying agent systems that work reliably at scale in real products.',
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

const graduateCapabilities = [
  {
    icon: Hammer,
    title: 'Build Production Agents',
    desc: 'Design, build, and deploy complete agentic AI systems that handle real-world tasks autonomously.',
  },
  {
    icon: Users,
    title: 'Orchestrate Multi-Agent Teams',
    desc: 'Architect systems where multiple specialized agents collaborate to solve complex, multi-step problems.',
  },
  {
    icon: Search,
    title: 'Build RAG Systems',
    desc: 'Create knowledge-grounded agents over custom document sets with production-grade retrieval pipelines.',
  },
  {
    icon: Radio,
    title: 'Deploy & Monitor Agents',
    desc: 'Serve agent APIs at scale with full observability, tracing, and evaluation pipelines.',
  },
  {
    icon: Briefcase,
    title: 'Portfolio-Ready Projects',
    desc: '7 industry projects, a capstone, and a bonus cloud build — all deployed, documented, and GitHub-ready.',
  },
  {
    icon: Award,
    title: 'Industry Certificate',
    desc: 'Zyvotrix Certified Agentic AI Engineer — recognized by hiring partners and shareable on LinkedIn.',
  },
];

const certificatePerks = [
  'LinkedIn-ready',
  'PDF + digital badge',
  'Recognized by hiring partners',
];

const learningExperienceFeatures: [
  LearningFeatureBlock,
  LearningFeatureBlock,
] = [
  {
    eyebrow: 'Learning Experience',
    title: 'Learn by Building Real Agent Systems',
    description:
      'Weekend live sessions paired with hands-on labs — you write agent code, wire up RAG pipelines, and ship projects every phase.',
    bullets: [
      'Live mentor-led sessions every weekend',
      'Labs on LangChain, vector DBs, and multi-agent tools',
      'Portfolio projects you can demo in interviews',
    ],
    image: visuals.learning,
    imageAlt: 'Mentor and learner collaborating on hands-on agent projects at Zyvotrix',
    imageBadge: 'Live Sessions · Every Weekend',
  },
  {
    eyebrow: 'Expert Guidance',
    title: 'Mentorship from Working AI Practitioners',
    description:
      'Get code reviews, architecture feedback, and career guidance from people who build with LLMs and agents in production.',
    bullets: [
      'Code reviews on agent and RAG implementations',
      'Architecture feedback before your capstone demo',
      'Resume and portfolio coaching included',
    ],
    image: visuals.mentor,
    imageAlt: 'Working AI practitioner providing mentorship and architecture feedback at Zyvotrix',
    imageBadge: 'Working AI Practitioners',
    reverse: true,
  },
];

const learningExperienceStats = [
  { number: '12', label: 'Weekend Live', sublabel: 'Sessions' },
  { number: '10+', label: 'Hands-on Labs', sublabel: '& Projects' },
  { number: '100%', label: 'Code-First', sublabel: 'Curriculum' },
];

const learningExperienceGallery = [
  {
    src: visuals.labs,
    alt: 'Hands-on agent coding in Zyvotrix AI labs',
    label: 'Agentic AI Labs',
    sublabel: 'Hands-on agent coding',
  },
  {
    src: visuals.liveSessions,
    alt: 'Live mentor-led weekend session at Zyvotrix',
    label: 'Live Sessions',
    sublabel: 'Every weekend, instructor-led',
  },
  {
    src: visuals.buildProjects,
    alt: 'Building and shipping AI portfolio projects at Zyvotrix',
    label: 'Build Projects',
    sublabel: 'Ship real portfolio work',
  },
  {
    src: visuals.aiStack,
    alt: 'Modern AI stack and agentic technologies at Zyvotrix',
    label: 'Modern AI Stack',
    sublabel: 'LangChain · CrewAI · RAG',
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

  const techRowA = AGENTIC_TOOLS.slice(0, 11);
  const techRowB = AGENTIC_TOOLS.slice(11);

  return (
    <PageShell className="devops-program-page aac-program-page">
      <Navbar />

      <section className="program-landing-hero relative overflow-hidden">
        <AmbientDepth />
        <div className="hero-orb hero-orb-1 opacity-40" aria-hidden />
        <div className="hero-orb hero-orb-2 opacity-30" aria-hidden />
        <div className="hero-orb hero-orb-3 opacity-25" aria-hidden />
        <div className="hero-grid-overlay opacity-40" aria-hidden />

        <div className="program-page-container relative z-10 pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="program-page-content aac-hero-grid grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="hero-fade-up aac-hero-copy">
              <span className="aac-hero-badge mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {course.code} · Certification Program
              </span>
              <h1 className="aac-hero-title mb-4 text-3xl font-bold leading-[1.08] tracking-tight text-brand-950 sm:text-4xl lg:text-[2.85rem]">
                <span className="gradient-text-animated">Agentic AI</span>
                <span className="block text-brand-950">Certification Training</span>
              </h1>

              <div className="program-hero-tagline aac-hero-tagline mb-6 max-w-xl rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white/90 to-violet-500/5 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  Most AI courses teach you how to <span className="text-muted-foreground">use</span> AI.
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-primary sm:text-base">
                  Zyvotrix teaches you how to <span className="gradient-text-animated">build</span> AI.
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-secondary">
                  Learn · Build · Grow
                </p>
              </div>

              <p className="aac-hero-lead mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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

              <div className="aac-hero-trust mt-8 grid max-w-xl grid-cols-3 gap-3">
                {heroTrustStats.map((stat) => (
                  <div key={stat.label} className="aac-hero-trust-item rounded-xl border border-border/70 bg-white/80 px-3 py-3 text-center shadow-sm backdrop-blur-sm">
                    <p className="font-display text-xl font-extrabold leading-none text-primary sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-fade-up aac-hero-visual-col" style={{ animationDelay: '0.15s' }}>
              <AgenticHeroVisual
                image={visuals.hero}
                imageAlt="Human and AI collaboration — Agentic AI certification at Zyvotrix"
                variant="photo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Agentic AI — 2nd fold */}
      <section className="aac-why-section border-b border-border bg-white py-14 sm:py-16" id="why-agentic-ai">
        <div className="program-page-container">
          <Reveal3D className="program-page-header aac-section-header">
            <span className="aac-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Why Agentic AI
            </span>
            <h2 className="aac-section-title section-title mb-4">
              Beyond Chatbots — <span className="gradient-text-animated">Real AI Systems</span>
            </h2>
            <p className="aac-section-lead leading-relaxed text-muted-foreground">
              Agentic AI is the shift from prompting a chatbot to building autonomous systems that
              plan, use tools, and complete long-horizon tasks. This is where the industry is going.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content aac-highlight-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerMs={70}>
            {whyAgenticAi.map(({ icon: Icon, title, desc }, index) => (
              <DepthCard key={title} className={cn('h-full', index === 0 && 'sm:col-span-2 lg:col-span-2')} maxTilt={6}>
                <article
                  className={cn(
                    'aac-highlight-card program-highlight-card relative flex h-full gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6',
                    `aac-highlight-card--${index}`,
                    index === 0 && 'aac-highlight-card--featured',
                  )}
                >
                  <span className="aac-highlight-card-number" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={cn('aac-highlight-card-icon flex shrink-0 items-center justify-center rounded-xl', `aac-highlight-card-icon--${index}`)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="relative z-[1] text-left">
                    <h3 className="mb-2 font-display text-sm font-bold text-foreground sm:text-base">{title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{desc}</p>
                  </div>
                </article>
              </DepthCard>
            ))}
          </RevealStagger>
        </div>
      </section>

      <ProgramAdvantageSection />

      <section
        className="section-padding section-alt program-curriculum-section"
        id="curriculum"
      >
        <div className="program-page-container">
          <Reveal3D className="program-page-header aac-section-header">
            <span className="aac-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Curriculum
            </span>
            <h2 className="aac-section-title section-title mb-4">
              Zero to <span className="gradient-text-animated">Agentic AI Engineer</span>
            </h2>
            <p className="aac-section-lead leading-relaxed text-muted-foreground">
              12 modules across 3 phases — from LLM foundations to cloud-deployed multi-agent systems.
            </p>
          </Reveal3D>

          <div className="program-page-content program-curriculum-layout">
            <div className="program-curriculum-main min-w-0">
              <Reveal3D>
                <h3 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">Learning Path</h3>
                <ProgramCurriculumAccordion phases={curriculum} variant="premium" />
              </Reveal3D>
            </div>

            <ProgramCurriculumStickySidebar>
              <ProgramInquirySidebar programName={course.title} programCode={course.code} />
            </ProgramCurriculumStickySidebar>
          </div>
        </div>
      </section>

      <ProgramLearningExperience
        features={learningExperienceFeatures}
        stats={learningExperienceStats}
        gallery={learningExperienceGallery}
        sectionClassName="program-lx-section program-lx-section--aac"
      />

      <ProgramIndustryProjects />

      <section className="section-padding border-y border-border bg-brand-100/30 devops-section-glow">
        <div className="program-page-container">
          <Reveal3D className="program-page-header aac-section-header !mb-10 text-center">
            <span className="aac-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Tech Stack
            </span>
            <h2 className="aac-section-title section-title mb-3">
              Tools You&apos;ll <span className="gradient-text-animated">Learn</span>
            </h2>
            <p className="aac-section-lead mb-10 text-muted-foreground">
              Every tool maps directly to a module — from local LLMs and LangChain to Docker and AWS
              deployment.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content devops-tools-grid aac-tools-grid" staggerMs={40}>
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

          <Reveal3D delay={80} className="program-page-content">
            <TechMarquee tools={techRowA} />
            <TechMarquee tools={techRowB} reverse />
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-white" id="who-should-join">
        <div className="program-page-container">
          <Reveal3D className="program-page-header aac-section-header">
            <span className="aac-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Who Should Join
            </span>
            <h2 className="aac-section-title section-title mb-4">Is This Program For You?</h2>
            <p className="aac-section-lead leading-relaxed text-muted-foreground">
              Designed for anyone who wants to build real agentic AI systems — not just use chatbots.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content">
            <figure className="aac-audience-banner">
              <img
                src={visuals.audience}
                alt="Developer building agentic AI systems at a professional workstation"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="aac-audience-banner-caption">
                Built for developers, graduates, and AI enthusiasts
              </figcaption>
            </figure>
          </Reveal3D>

          <RevealStagger className="program-page-content mt-6 grid gap-4 sm:grid-cols-2" staggerMs={90}>
            {audience.map(({ icon: Icon, title, desc }, index) => (
              <DepthCard key={title} className="h-full" maxTilt={6}>
                <article className={cn('aac-audience-card program-audience-card flex h-full gap-4 rounded-2xl border border-border bg-card p-6', `aac-audience-card--${index}`)}>
                  <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', `aac-audience-card-icon--${index}`)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-display font-bold text-foreground">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </article>
              </DepthCard>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section-padding section-alt devops-section-glow" id="outcomes">
        <div className="program-page-container">
          <Reveal3D className="program-page-header aac-section-header">
            <span className="aac-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              After You Graduate
            </span>
            <h2 className="aac-section-title section-title mb-4">What You&apos;ll Be Capable Of</h2>
            <p className="aac-section-lead leading-relaxed text-muted-foreground">
              Build in-demand AI engineering skills and a portfolio that gets you hired.
            </p>
          </Reveal3D>

          <ProgramSectionAside
            image={visuals.career}
            imageAlt="Career-ready skills and portfolio projects — production agents, multi-agent systems, RAG, deployment, and cloud"
            imageFit="contain"
            reverse
            className="program-section-aside--career program-page-content mb-14"
          >
            <RevealStagger className="grid gap-5 sm:grid-cols-2" staggerMs={75}>
              {graduateCapabilities.map(({ icon: Icon, title, desc }) => (
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

          <Reveal3D delay={100}>
            <div className="devops-glow-card program-page-content">
              <div className="devops-glow-card-inner p-8 sm:p-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div>
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                      On Completion
                    </span>
                    <h3 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">What You Earn</h3>
                    <p className="mb-4 text-lg font-semibold text-primary">
                      Zyvotrix Certified Agentic AI Engineer
                    </p>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Upon completing all modules, projects, and the capstone, you receive a digital
                      certificate you can share on LinkedIn and add to your portfolio.
                    </p>
                    <p className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      Certificate Includes
                    </p>
                    <ul className="space-y-2.5">
                      {certificatePerks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                          <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figure className="program-certificate-preview">
                    <img
                      src={visuals.certificate}
                      alt="Zyvotrix Agentic AI Certification Training certificate of completion — sample"
                      className="program-certificate-preview-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </Reveal3D>
        </div>
      </section>

      <div className="program-footer-bridge" aria-hidden />

      <PageCta
        badge="Start your Agentic AI journey"
        title="Ready to build intelligent AI agents?"
        description="From LLM fundamentals to a deployed multi-agent capstone — in 3 months."
        primaryLabel="Enroll Now"
        primaryHref={course.checkoutPath}
        secondaryLabel="View All Programs"
        secondaryHref="/courses"
        className="program-page-cta"
      />

      <Footer />
    </PageShell>
  );
};

export default AgenticAiProgram;

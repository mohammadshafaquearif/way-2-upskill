import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Reveal3D } from '@/components/motion/Reveal3D';
import { cn } from '@/lib/utils';

export interface IndustryProject {
  id: number;
  label: string;
  title: string;
  description: string;
  skills: string[];
  isCapstone?: boolean;
  isBonus?: boolean;
}

export const INDUSTRY_PROJECTS: IndustryProject[] = [
  {
    id: 1,
    label: 'Project 1',
    title: 'Personal AI Assistant',
    description:
      'Build a personal AI assistant capable of answering questions, executing tool calls, generating structured outputs, and running locally using open-source LLMs. Implement prompt engineering, function calling, and local model deployment.',
    skills: [
      'Prompt Engineering',
      'Function Calling',
      'Structured Outputs',
      'Pydantic',
      'Ollama',
      'Llama 3',
      'Open Source LLMs',
    ],
  },
  {
    id: 2,
    label: 'Project 2',
    title: 'Advanced AI Research Agent',
    description:
      'Build on your web research foundations with a production-grade research agent — multi-source web search, autonomous reasoning, structured report generation, and citation support across a full research workflow.',
    skills: [
      'Multi-Source Web Search',
      'LangChain',
      'ReAct Framework',
      'Report Generation',
      'Citation Support',
      'Research Workflows',
      'Agent Reasoning',
    ],
  },
  {
    id: 3,
    label: 'Project 3',
    title: 'Enterprise Knowledge Assistant',
    description:
      'Build a RAG system that lets users upload documents and ask contextual questions. Retrieve relevant information from knowledge bases and generate source-grounded responses.',
    skills: [
      'RAG Architecture',
      'Document Processing',
      'Embeddings',
      'Vector Databases',
      'ChromaDB',
      'Pinecone',
      'Semantic Search',
    ],
  },
  {
    id: 4,
    label: 'Project 4',
    title: 'Memory-Powered AI Companion',
    description:
      'Design an AI companion that remembers user preferences, previous interactions, and contextual information across conversations with long-term and short-term memory.',
    skills: [
      'Conversational Memory',
      'Vector Memory',
      'Episodic Memory',
      'Context Retention',
      'Personalization',
      'Long-Term Memory',
    ],
  },
  {
    id: 5,
    label: 'Project 5',
    title: 'Workflow Intelligence Agent',
    description:
      'Design a LangGraph-powered agent that orchestrates multi-step workflows — planning, tool use, human-in-the-loop approval, and stateful execution across complex research and analysis tasks.',
    skills: [
      'LangGraph',
      'State Machines',
      'Agent Workflows',
      'Human-in-the-Loop',
      'Workflow Orchestration',
      'Multi-Step Reasoning',
    ],
  },
  {
    id: 6,
    label: 'Project 6',
    title: 'Multi-Agent Startup Team',
    description:
      'Build a collaborative multi-agent system where specialized AI agents validate startup ideas, conduct market research, create product plans, and generate go-to-market strategies.',
    skills: [
      'Multi-Agent Systems',
      'CrewAI',
      'AutoGen',
      'Agent Collaboration',
      'Supervisor Pattern',
      'Workflow Orchestration',
    ],
  },
  {
    id: 7,
    label: 'Project 7',
    title: 'AI Operations Dashboard',
    description:
      'Implement an observability platform for AI applications that tracks latency, token consumption, costs, agent performance, and workflow execution.',
    skills: [
      'LangSmith',
      'LangFuse',
      'AgentOps',
      'Tracing',
      'Evaluation',
      'AI Monitoring',
      'Performance Analytics',
    ],
  },
  {
    id: 8,
    label: 'Capstone Project',
    title: 'Production-Grade Multi-Agent Business Platform',
    description:
      'Build and deploy a production-ready AI platform combining multi-agent collaboration, RAG, memory, observability, and cloud deployment for business research and strategic planning.',
    skills: [
      'CrewAI',
      'LangGraph',
      'RAG Systems',
      'Multi-Agent Architecture',
      'FastAPI',
      'Docker',
      'AWS Deployment',
      'LangSmith',
      'Production AI Engineering',
    ],
    isCapstone: true,
  },
  {
    id: 9,
    label: 'Bonus Portfolio Project',
    title: 'Cloud AI Agent Deployment',
    description:
      'Deploy an AI agent using AWS Bedrock or Azure OpenAI with production monitoring, security controls, and cost optimization — a cloud-native portfolio piece that proves deployment readiness.',
    skills: [
      'AWS Bedrock',
      'Azure OpenAI',
      'Cloud Deployment',
      'Security Controls',
      'Cost Optimization',
      'Production Monitoring',
    ],
    isBonus: true,
  },
];

const AUTOPLAY_MS = 5000;

interface ProgramIndustryProjectsProps {
  projects?: IndustryProject[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

const ProgramIndustryProjects = ({
  projects = INDUSTRY_PROJECTS,
  eyebrow = 'Portfolio',
  title = 'Industry Projects',
  description = 'Seven progressive industry projects, a production capstone, and a bonus cloud deployment build — every project is designed for your GitHub portfolio and AI engineer interviews.',
}: ProgramIndustryProjectsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(projects.length);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || isPaused) return;
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [api, isPaused]);

  const progress = snapCount > 1 ? ((activeIndex + 1) / snapCount) * 100 : 100;

  return (
    <section className="section-padding section-white border-b border-border" id="industry-projects">
      <div className="program-page-container">
        <Reveal3D className="program-page-content mb-10">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
          <h2 className="section-title mb-3 text-left">{title}</h2>
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        </Reveal3D>

        <Reveal3D delay={80}>
          <div
            className="program-page-content program-projects-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <Carousel
              setApi={setApi}
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-5">
                {projects.map((project) => (
                  <CarouselItem
                    key={project.id}
                    className="basis-full pl-4 sm:basis-1/2 md:pl-5 lg:basis-1/3"
                  >
                    <article
                      className={cn(
                        'program-project-card h-full',
                        project.isCapstone && 'program-project-card--capstone',
                        project.isBonus && 'program-project-card--bonus',
                      )}
                    >
                      <div className="program-project-card-head">
                        <p className="program-project-label">
                          {project.isCapstone && (
                            <Star className="mr-1 inline h-3 w-3 fill-current" aria-hidden />
                          )}
                          {project.isBonus && (
                            <Star className="mr-1 inline h-3 w-3 fill-current text-violet-500" aria-hidden />
                          )}
                          {project.label}
                        </p>
                        <h3 className="program-project-title">{project.title}</h3>
                      </div>
                      <div className="program-project-card-body">
                        <p className="program-project-desc">{project.description}</p>
                        <div className="program-project-skills">
                          <p className="program-project-skills-label">Skills Covered</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.skills.map((skill) => (
                              <span key={skill} className="program-project-skill">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="program-projects-nav">
              <button
                type="button"
                className="program-projects-nav-btn"
                onClick={() => api?.scrollPrev()}
                aria-label="Previous project"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="program-projects-progress" aria-hidden>
                <div className="program-projects-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <button
                type="button"
                className="program-projects-nav-btn program-projects-nav-btn--active"
                onClick={() => api?.scrollNext()}
                aria-label="Next project"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal3D>

        <Reveal3D delay={140} className="program-page-content mt-12">
          <div className="program-portfolio-outcome rounded-2xl border border-border bg-[#F8FAFC] p-6 sm:p-8">
            <h3 className="mb-5 text-lg font-bold text-foreground sm:text-xl">Portfolio Outcome</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              By the end of the program, learners will have built:
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.id} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={2.5} />
                  <span>{project.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal3D>
      </div>
    </section>
  );
};

export default ProgramIndustryProjects;

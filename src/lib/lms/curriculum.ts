import type { LMSPhase, ProgramId } from './types';
import { getDopPhaseProject } from './dopProjects';

const AAC_CURRICULUM: LMSPhase[] = [
  {
    id: 'p1',
    phase: 'Phase 1',
    label: 'LLM Foundations',
    meta: 'Modules 1–3',
    modules: [
      { id: 1, title: 'How LLMs Work', phaseId: 'p1', topics: ['Tokens & embeddings', 'Transformers', 'Sampling parameters'], hasQuiz: true, hasAssignment: true, lessonCount: 4 },
      { id: 2, title: 'Prompt Engineering', phaseId: 'p1', topics: ['Zero-shot prompting', 'Chain-of-thought', 'System prompts'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 3, title: 'Function Calling & Open Source LLMs', phaseId: 'p1', topics: ['Structured outputs', 'Ollama & Llama 3', 'Local inference'], hasQuiz: true, hasAssignment: true, lessonCount: 4 },
    ],
  },
  {
    id: 'p2',
    phase: 'Phase 2',
    label: 'Agent Engineering',
    meta: 'Modules 4–8',
    modules: [
      { id: 4, title: 'LangChain Core', phaseId: 'p2', topics: ['LCEL pipelines', 'Chains & parsers', 'Runnable sequences'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 5, title: 'AI Agents', phaseId: 'p2', topics: ['ReAct loop', 'Tool use', 'Web search agents'], hasQuiz: true, hasAssignment: true, lessonCount: 6 },
      { id: 6, title: 'RAG Systems', phaseId: 'p2', topics: ['Vector stores', 'Chunking strategies', 'Hybrid search'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 7, title: 'Memory Systems', phaseId: 'p2', topics: ['Buffer memory', 'Vector memory', 'Session storage'], hasQuiz: true, hasAssignment: false, lessonCount: 4 },
      { id: 8, title: 'LangGraph & Multi-Agent', phaseId: 'p2', topics: ['State graphs', 'CrewAI', 'Agent orchestration'], hasQuiz: true, hasAssignment: true, lessonCount: 6 },
    ],
  },
  {
    id: 'p3',
    phase: 'Phase 3',
    label: 'Production & Capstone',
    meta: 'Modules 9–10',
    modules: [
      { id: 9, title: 'Production Agent Deployment', phaseId: 'p3', topics: ['FastAPI serving', 'Observability', 'Cost optimization'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 10, title: 'Capstone Project', phaseId: 'p3', topics: ['End-to-end agent', 'Portfolio presentation', 'Mentor review'], hasQuiz: false, hasAssignment: true, lessonCount: 3 },
    ],
  },
];

const DOP_CURRICULUM: LMSPhase[] = [
  {
    id: 'p1',
    phase: 'Phase 1',
    label: 'DevOps Foundations & Cloud Operations',
    meta: 'Module 1 · 5 Topics · → Project 1',
    project: getDopPhaseProject('p1'),
    modules: [
      {
        id: 1,
        title: 'Linux, Git, Cloud & AI-Assisted DevOps',
        phaseId: 'p1',
        topics: [
          'Linux Administration, Files, Permissions & Processes',
          'Shell Scripting & Automation',
          'Git & GitHub Workflows, Branching & Pull Requests',
          'Cloud Fundamentals — AWS IAM, EC2, S3, VPC',
          'AI Tools — GitHub Copilot, Prompt Engineering for Infra',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 5,
      },
    ],
  },
  {
    id: 'p2',
    phase: 'Phase 2',
    label: 'Containerization, Kubernetes & CI/CD',
    meta: 'Module 2 · 5 Topics · → Project 2',
    project: getDopPhaseProject('p2'),
    modules: [
      {
        id: 2,
        title: 'Docker, Kubernetes & CI/CD Pipelines',
        phaseId: 'p2',
        topics: ['Docker & Containerization', 'Kubernetes — Architecture, Pods, Services, Deployments, ConfigMaps, Secrets, Helm', 'CI/CD — GitHub Actions, Jenkins', 'Blue-Green & Canary Deployments', 'AI-Assisted Pipeline Generation'],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 5,
      },
    ],
  },
  {
    id: 'p3',
    phase: 'Phase 3',
    label: 'Infrastructure Automation & DevSecOps',
    meta: 'Module 3 · 5 Topics · → Project 3',
    project: getDopPhaseProject('p3'),
    modules: [
      {
        id: 3,
        title: 'Terraform, Ansible & DevSecOps',
        phaseId: 'p3',
        topics: [
          'Terraform — Modules, State, Workspaces, IaC',
          'Ansible — Configuration Management, Provisioning',
          'DevSecOps — Vulnerability Scanning, Secrets Management',
          'Vault, AWS Secrets Manager, Security Automation',
          'AI-Assisted Infrastructure Generation',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 5,
      },
    ],
  },
  {
    id: 'p4',
    phase: 'Phase 4',
    label: 'AI Operations, Observability & Reliability Engineering',
    meta: 'Module 4 · 6 Topics · → Capstone',
    project: getDopPhaseProject('p4'),
    modules: [
      {
        id: 4,
        title: 'Monitoring, Observability & SRE',
        phaseId: 'p4',
        topics: ['Prometheus, Grafana', 'Metrics, Logs, Traces', 'Incident Response, AIOps', 'AI-Powered Log Analysis', 'SRE — SLIs, SLOs, Error Budgets', 'Cost Optimization, Production Readiness Reviews'],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 6,
      },
    ],
  },
];

const AWS_CURRICULUM: LMSPhase[] = [
  {
    id: 'p1',
    phase: 'Phase 1',
    label: 'Cloud Foundations',
    meta: 'Modules 1–3',
    modules: [
      { id: 1, title: 'AWS Core & IAM', phaseId: 'p1', topics: ['Shared responsibility', 'IAM policies', 'Organizations'], hasQuiz: true, hasAssignment: true, lessonCount: 4 },
      { id: 2, title: 'Compute & Networking', phaseId: 'p1', topics: ['EC2', 'VPC design', 'Load balancers'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 3, title: 'Storage & Databases', phaseId: 'p1', topics: ['S3', 'RDS', 'DynamoDB'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
    ],
  },
  {
    id: 'p2',
    phase: 'Phase 2',
    label: 'Architecting & Certification',
    meta: 'Modules 4–6',
    modules: [
      { id: 4, title: 'Serverless & Lambda', phaseId: 'p2', topics: ['Lambda patterns', 'API Gateway', 'EventBridge'], hasQuiz: true, hasAssignment: true, lessonCount: 4 },
      { id: 5, title: 'High Availability & DR', phaseId: 'p2', topics: ['Multi-AZ', 'Route 53', 'Backup strategies'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 6, title: 'SAA-C03 Exam Prep', phaseId: 'p2', topics: ['Exam domains', 'Practice tests', 'Review sessions'], hasQuiz: true, hasAssignment: true, lessonCount: 4 },
    ],
  },
];

const DSP_CURRICULUM: LMSPhase[] = [
  {
    id: 'p1',
    phase: 'Phase 1',
    label: 'Analytics Foundations',
    meta: 'Modules 1–3',
    modules: [
      { id: 1, title: 'Python for Data Science', phaseId: 'p1', topics: ['NumPy', 'Pandas', 'Data cleaning'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 2, title: 'SQL & Data Warehousing', phaseId: 'p1', topics: ['Joins & aggregations', 'Window functions', 'Query optimization'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 3, title: 'Statistics & EDA', phaseId: 'p1', topics: ['Distributions', 'Hypothesis testing', 'Visualization'], hasQuiz: true, hasAssignment: true, lessonCount: 4 },
    ],
  },
  {
    id: 'p2',
    phase: 'Phase 2',
    label: 'Machine Learning',
    meta: 'Modules 4–6',
    modules: [
      { id: 4, title: 'Supervised Learning', phaseId: 'p2', topics: ['Regression', 'Classification', 'Model evaluation'], hasQuiz: true, hasAssignment: true, lessonCount: 6 },
      { id: 5, title: 'Unsupervised & Feature Engineering', phaseId: 'p2', topics: ['Clustering', 'PCA', 'Feature selection'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 6, title: 'ML Portfolio Capstone', phaseId: 'p2', topics: ['End-to-end pipeline', 'Model deployment', 'Stakeholder presentation'], hasQuiz: false, hasAssignment: true, lessonCount: 4 },
    ],
  },
];

export const PROGRAM_CURRICULUM: Record<ProgramId, LMSPhase[]> = {
  aac: AAC_CURRICULUM,
  dop: DOP_CURRICULUM,
  aws: AWS_CURRICULUM,
  'data-science': DSP_CURRICULUM,
};

export function getAllModules(programId: ProgramId) {
  return PROGRAM_CURRICULUM[programId].flatMap((phase) => phase.modules);
}

export function getModuleById(programId: ProgramId, moduleId: number) {
  return getAllModules(programId).find((m) => m.id === moduleId) ?? null;
}

export function getPhaseForModule(programId: ProgramId, moduleId: number) {
  return PROGRAM_CURRICULUM[programId].find((phase) =>
    phase.modules.some((m) => m.id === moduleId),
  );
}

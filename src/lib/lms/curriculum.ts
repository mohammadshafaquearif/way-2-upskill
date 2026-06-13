import type { LMSPhase, ProgramId } from './types';

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
    label: 'DevOps Foundations',
    meta: 'Modules 1–3',
    modules: [
      { id: 1, title: 'Linux & Git', phaseId: 'p1', topics: ['Shell scripting', 'Git workflows', 'SSH & permissions'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 2, title: 'Docker Fundamentals', phaseId: 'p1', topics: ['Images & containers', 'Docker Compose', 'Multi-stage builds'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 3, title: 'CI/CD Pipelines', phaseId: 'p1', topics: ['GitHub Actions', 'Build stages', 'Artifact management'], hasQuiz: true, hasAssignment: true, lessonCount: 4 },
    ],
  },
  {
    id: 'p2',
    phase: 'Phase 2',
    label: 'Cloud & Kubernetes',
    meta: 'Modules 4–7',
    modules: [
      { id: 4, title: 'Kubernetes Core', phaseId: 'p2', topics: ['Pods & services', 'Deployments', 'Helm charts'], hasQuiz: true, hasAssignment: true, lessonCount: 6 },
      { id: 5, title: 'Terraform & IaC', phaseId: 'p2', topics: ['HCL basics', 'State management', 'Modules'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
      { id: 6, title: 'Monitoring & Observability', phaseId: 'p2', topics: ['Prometheus', 'Grafana', 'Alerting'], hasQuiz: true, hasAssignment: false, lessonCount: 4 },
      { id: 7, title: 'DevSecOps', phaseId: 'p2', topics: ['SAST/DAST', 'Secrets management', 'Policy as code'], hasQuiz: true, hasAssignment: true, lessonCount: 5 },
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

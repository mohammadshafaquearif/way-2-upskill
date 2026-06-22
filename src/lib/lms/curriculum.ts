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
    label: 'AWS Foundations',
    meta: 'Weeks 1–4 · Modules 1–4',
    modules: [
      {
        id: 1,
        title: 'Cloud Computing Fundamentals',
        phaseId: 'p1',
        topics: [
          'What is cloud computing?',
          'IaaS, PaaS & SaaS service models',
          'Public, private & hybrid cloud',
          'AWS global infrastructure',
          'Regions & Availability Zones',
          'AWS Shared Responsibility Model',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 6,
      },
      {
        id: 2,
        title: 'IAM & Security',
        phaseId: 'p1',
        topics: [
          'IAM users, groups & roles',
          'IAM policies & permission boundaries',
          'MFA & credential security',
          'AWS Organizations basics',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 4,
      },
      {
        id: 3,
        title: 'Compute Services',
        phaseId: 'p1',
        topics: [
          'Amazon EC2 instance types & AMIs',
          'EBS volumes & snapshots',
          'Placement groups',
          'Launch templates',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 4,
      },
      {
        id: 4,
        title: 'Storage Services',
        phaseId: 'p1',
        topics: [
          'Amazon S3 & storage classes',
          'EBS vs EFS',
          'Lifecycle policies & versioning',
          'Encryption at rest & in transit',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 4,
      },
    ],
  },
  {
    id: 'p2',
    phase: 'Phase 2',
    label: 'Core Architecture',
    meta: 'Weeks 5–8 · Modules 5–8',
    modules: [
      {
        id: 5,
        title: 'Networking & VPC',
        phaseId: 'p2',
        topics: [
          'VPCs, subnets & route tables',
          'Internet Gateway & NAT Gateway',
          'Security groups vs NACLs',
          'Public & private tier design',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 4,
      },
      {
        id: 6,
        title: 'Load Balancing & Auto Scaling',
        phaseId: 'p2',
        topics: [
          'Application Load Balancer (ALB)',
          'Network Load Balancer (NLB)',
          'Target groups & health checks',
          'Auto Scaling groups & policies',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 4,
      },
      {
        id: 7,
        title: 'Databases',
        phaseId: 'p2',
        topics: [
          'Amazon RDS & Multi-AZ',
          'DynamoDB fundamentals',
          'ElastiCache for performance',
          'Amazon Aurora overview',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 4,
      },
      {
        id: 8,
        title: 'DNS & CDN',
        phaseId: 'p2',
        topics: [
          'Route 53 routing policies',
          'CloudFront CDN delivery',
          'AWS Certificate Manager (ACM)',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 3,
      },
    ],
  },
  {
    id: 'p3',
    phase: 'Phase 3',
    label: 'Production Architecture',
    meta: 'Weeks 9–12 · Modules 9–12',
    modules: [
      {
        id: 9,
        title: 'Serverless AWS',
        phaseId: 'p3',
        topics: [
          'AWS Lambda & execution models',
          'API Gateway REST APIs',
          'SNS & SQS messaging',
          'EventBridge event routing',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 4,
      },
      {
        id: 10,
        title: 'Monitoring & Cost Optimization',
        phaseId: 'p3',
        topics: [
          'CloudWatch metrics, logs & alarms',
          'CloudTrail auditing',
          'AWS Config compliance',
          'Budgets, Cost Explorer & Trusted Advisor',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 4,
      },
      {
        id: 11,
        title: 'Infrastructure as Code',
        phaseId: 'p3',
        topics: [
          'CloudFormation templates & stacks',
          'Terraform on AWS',
          'State management & modules',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 3,
      },
      {
        id: 12,
        title: 'HA, DR & SAA-C03 Exam Preparation',
        phaseId: 'p3',
        topics: [
          'Multi-AZ & multi-region patterns',
          'Backup, restore & DR planning (RTO/RPO)',
          'AWS Well-Architected Framework',
          'SAA-C03 exam domains & scenario questions',
          'Architecture trade-offs: security, cost, reliability',
        ],
        hasQuiz: true,
        hasAssignment: true,
        lessonCount: 5,
      },
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

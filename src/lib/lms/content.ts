import type {
  LMSAssignment,
  LMSProject,
  LMSResource,
  LMSSession,
  ProgramId,
} from './types';

export const PROGRAM_RESOURCES: Record<ProgramId, LMSResource[]> = {
  aac: [
    { id: 'r1', title: 'LangChain Cheat Sheet', type: 'cheatsheet' },
    { id: 'r2', title: 'Prompt Engineering Guide', type: 'guide' },
    { id: 'r3', title: 'RAG Implementation Guide', type: 'guide' },
    { id: 'r4', title: 'Agentic AI Roadmap 2026', type: 'pdf' },
  ],
  dop: [
    { id: 'r1', title: 'Kubernetes Cheat Sheet', type: 'cheatsheet' },
    { id: 'r2', title: 'Terraform Notes', type: 'guide' },
    { id: 'r3', title: 'CI/CD Best Practices', type: 'guide' },
    { id: 'r4', title: 'DevOps Roadmap 2026', type: 'pdf' },
  ],
  aws: [
    { id: 'r1', title: 'SAA-C03 Study Notes', type: 'guide' },
    { id: 'r2', title: 'AWS Services Cheat Sheet', type: 'cheatsheet' },
    { id: 'r3', title: 'VPC Design Patterns', type: 'guide' },
    { id: 'r4', title: 'AWS Solutions Architect Roadmap', type: 'pdf' },
  ],
  'data-science': [
    { id: 'r1', title: 'SQL Cheat Sheet', type: 'cheatsheet' },
    { id: 'r2', title: 'Pandas Quick Reference', type: 'cheatsheet' },
    { id: 'r3', title: 'ML Algorithm Guide', type: 'guide' },
    { id: 'r4', title: 'Data Science Career Guide', type: 'pdf' },
  ],
};

export function getAssignments(programId: ProgramId): LMSAssignment[] {
  const base: Record<ProgramId, LMSAssignment[]> = {
    aac: [
      { id: 'a1', title: 'Prompt Playground Lab', description: 'Build a prompt playground with temperature controls.', dueDate: '2026-06-20', status: 'submitted', moduleId: 1 },
      { id: 'a2', title: 'RAG Pipeline Assignment', description: 'Index documents and answer queries with citations.', dueDate: '2026-07-05', status: 'pending', moduleId: 6 },
      { id: 'a3', title: 'Agent Tool-Use Challenge', description: 'Build a ReAct agent with at least 3 tools.', dueDate: '2026-07-15', status: 'pending', moduleId: 5 },
    ],
    dop: [
      { id: 'a1', title: 'Docker Compose Stack', description: 'Containerize a 3-tier app with Docker Compose.', dueDate: '2026-06-22', status: 'submitted', moduleId: 2 },
      { id: 'a2', title: 'CI/CD Pipeline Build', description: 'Create a GitHub Actions pipeline with staging deploy.', dueDate: '2026-07-01', status: 'pending', moduleId: 3 },
    ],
    aws: [
      { id: 'a1', title: 'VPC Architecture Design', description: 'Design a multi-AZ VPC with public/private subnets.', dueDate: '2026-06-25', status: 'submitted', moduleId: 2 },
      { id: 'a2', title: 'Serverless API Project', description: 'Build a Lambda + API Gateway REST API.', dueDate: '2026-07-10', status: 'pending', moduleId: 4 },
    ],
    'data-science': [
      { id: 'a1', title: 'EDA Report', description: 'Perform EDA on a real dataset with visualizations.', dueDate: '2026-06-18', status: 'submitted', moduleId: 3 },
      { id: 'a2', title: 'SQL Analytics Challenge', description: 'Write 10 complex SQL queries on a sales database.', dueDate: '2026-07-02', status: 'pending', moduleId: 2 },
    ],
  };
  return base[programId];
}

export function getProjects(programId: ProgramId): LMSProject[] {
  const base: Record<ProgramId, LMSProject[]> = {
    aac: [
      {
        id: 'p1',
        title: 'Personal AI Assistant',
        description: 'Combine prompting, function calling, and local LLMs into a portfolio-ready assistant.',
        status: 'in_progress',
        githubUrl: 'https://github.com/example/ai-assistant',
      },
      {
        id: 'p2',
        title: 'Document Chatbot (RAG)',
        description: 'Production RAG pipeline with hybrid search and citations.',
        status: 'not_started',
      },
    ],
    dop: [
      { id: 'p1', title: 'CI/CD Pipeline Project', description: 'End-to-end pipeline with automated testing and deploy.', status: 'in_progress' },
      { id: 'p2', title: 'Kubernetes Microservices', description: 'Deploy a microservices app on K8s with Helm.', status: 'not_started' },
    ],
    aws: [
      { id: 'p1', title: 'Multi-Tier AWS Architecture', description: 'Design and deploy a scalable 3-tier architecture.', status: 'in_progress' },
      { id: 'p2', title: 'Serverless Data Pipeline', description: 'Lambda + S3 + DynamoDB event-driven pipeline.', status: 'not_started' },
    ],
    'data-science': [
      { id: 'p1', title: 'Sales Analytics Dashboard', description: 'Interactive dashboard with Streamlit and SQL backend.', status: 'submitted', githubUrl: 'https://github.com/example/sales-dash', feedback: ['Good visualizations', 'Add error handling for missing data'] },
      { id: 'p2', title: 'ML Classification Model', description: 'End-to-end supervised learning pipeline.', status: 'not_started' },
    ],
  };
  return base[programId];
}

export function getSessions(programId: ProgramId): LMSSession[] {
  const mentor = 'Mohd. Shafaque Arif';
  const common: LMSSession[] = [
    {
      id: 's-upcoming',
      title: programId === 'aac' ? 'LangGraph Deep Dive' : programId === 'dop' ? 'Kubernetes Workshop' : programId === 'aws' ? 'VPC & Networking Lab' : 'ML Model Evaluation',
      sessionDate: '2026-06-12',
      sessionTime: '8:00 PM IST',
      mentorName: mentor,
      meetLink: 'https://meet.google.com/placeholder',
      isUpcoming: true,
    },
    {
      id: 's-past-1',
      title: programId === 'aac' ? 'RAG Systems' : programId === 'dop' ? 'Docker Fundamentals' : programId === 'aws' ? 'EC2 & Auto Scaling' : 'Statistics for ML',
      sessionDate: '2026-06-05',
      sessionTime: '8:00 PM IST',
      mentorName: mentor,
      isUpcoming: false,
      recordingUrl: '#',
      slidesUrl: '#',
      notesUrl: '#',
    },
    {
      id: 's-past-2',
      title: programId === 'aac' ? 'Prompt Engineering Masterclass' : programId === 'dop' ? 'Git & Linux Essentials' : programId === 'aws' ? 'IAM & Security' : 'Python for Analytics',
      sessionDate: '2026-05-29',
      sessionTime: '8:00 PM IST',
      mentorName: mentor,
      isUpcoming: false,
      recordingUrl: '#',
      slidesUrl: '#',
    },
  ];
  return common;
}

export const ACHIEVEMENT_BADGES = [
  { id: 'b1', title: 'Completed Python Module', unlocked: true },
  { id: 'b2', title: 'Built First Project', unlocked: true },
  { id: 'b3', title: 'Finished Capstone', unlocked: false },
  { id: 'b4', title: '7-Day Learning Streak', unlocked: true },
];

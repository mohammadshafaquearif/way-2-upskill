export type ResourceCategory = 'devops' | 'aac' | 'aws' | 'data-science' | 'career' | 'interview';

export interface ResourceArticle {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  courseRoute?: string;
  sections: { heading?: string; body: string }[];
}

export interface FeaturedRoadmap {
  slug: string;
  title: string;
  path: string;
  category: ResourceCategory;
  downloadLabel: string;
}

export const FEATURED_ROADMAPS: FeaturedRoadmap[] = [
  {
    slug: 'devops-roadmap-2026',
    title: 'AI-Powered DevOps Roadmap 2026',
    path: 'Linux → Docker → Kubernetes → Terraform → DevSecOps → AIOps',
    category: 'devops',
    downloadLabel: 'DevOps Roadmap PDF',
  },
  {
    slug: 'agentic-ai-engineer-roadmap-2026',
    title: 'Agentic AI Engineer Roadmap 2026',
    path: 'LLMs → RAG → LangChain → LangGraph → CrewAI → Production Agents',
    category: 'aac',
    downloadLabel: 'Agentic AI Roadmap PDF',
  },
  {
    slug: 'aws-solutions-architect-roadmap-2026',
    title: 'AWS Solutions Architect Roadmap 2026',
    path: 'Cloud → IAM → EC2 → VPC → S3 → Lambda → SAA-C03',
    category: 'aws',
    downloadLabel: 'AWS Roadmap PDF',
  },
  {
    slug: 'data-science-roadmap-2026',
    title: 'Data Science & ML Roadmap 2026',
    path: 'Python → SQL → Pandas → Statistics → ML → Portfolio',
    category: 'data-science',
    downloadLabel: 'Data Science Career Guide',
  },
];

export const POPULAR_RESOURCES: Record<
  Exclude<ResourceCategory, 'career' | 'interview'>,
  { title: string; slug: string }[]
> = {
  devops: [
    { title: 'Docker vs Kubernetes', slug: 'docker-vs-kubernetes' },
    { title: 'What is Terraform?', slug: 'what-is-terraform' },
    { title: 'CI/CD Explained', slug: 'cicd-explained' },
    { title: 'DevOps Roadmap 2026', slug: 'devops-roadmap-2026' },
    { title: 'Kubernetes Interview Questions', slug: 'kubernetes-interview-questions' },
  ],
  aac: [
    { title: 'What is Agentic AI?', slug: 'what-is-agentic-ai' },
    { title: 'LangChain vs LangGraph', slug: 'langchain-vs-langgraph' },
    { title: 'RAG Explained', slug: 'rag-explained' },
    { title: 'CrewAI Tutorial', slug: 'crewai-tutorial' },
    { title: 'AI Agent Project Ideas', slug: 'ai-agent-project-ideas' },
  ],
  aws: [
    { title: 'AWS Beginner Guide', slug: 'aws-beginner-guide' },
    { title: 'EC2 vs Lambda', slug: 'ec2-vs-lambda' },
    { title: 'AWS IAM Explained', slug: 'aws-iam-explained' },
    { title: 'SAA-C03 Preparation Guide', slug: 'saa-c03-preparation-guide' },
    { title: 'AWS Project Ideas', slug: 'aws-project-ideas' },
  ],
  'data-science': [
    { title: 'Python for Data Science', slug: 'python-for-data-science' },
    { title: 'SQL Roadmap', slug: 'sql-roadmap' },
    { title: 'EDA Guide', slug: 'eda-guide' },
    { title: 'Machine Learning Roadmap', slug: 'machine-learning-roadmap' },
    { title: 'Data Analyst Portfolio Projects', slug: 'data-analyst-portfolio-projects' },
  ],
};

export const PROJECT_IDEAS = {
  beginner: ['Personal Portfolio Website', 'Expense Tracker', 'Data Dashboard'],
  intermediate: [
    'Kubernetes Deployment Platform',
    'AI Research Agent',
    'AWS Monitoring System',
  ],
  advanced: [
    'Multi-Agent Business Platform',
    'AI-Powered DevOps Command Center',
    'Customer Churn Prediction System',
  ],
};

export const INTERVIEW_RESOURCES = [
  { title: 'DevOps Interview Questions', slug: 'devops-interview-questions' },
  { title: 'AWS Interview Questions', slug: 'aws-interview-questions' },
  { title: 'Data Science Interview Questions', slug: 'data-science-interview-questions' },
  { title: 'AI Engineer Interview Questions', slug: 'ai-engineer-interview-questions' },
];

export const FREE_DOWNLOADS = [
  { label: 'DevOps Roadmap PDF', slug: 'devops-roadmap-2026' },
  { label: 'Agentic AI Roadmap PDF', slug: 'agentic-ai-engineer-roadmap-2026' },
  { label: 'AWS SAA-C03 Study Guide', slug: 'saa-c03-preparation-guide' },
  { label: 'Data Science Career Guide', slug: 'data-science-roadmap-2026' },
];

export const CAREER_GUIDES = [
  { title: 'How to Transition into DevOps', slug: 'how-to-transition-into-devops' },
  { title: 'How to Become an AI Engineer', slug: 'how-to-become-an-ai-engineer' },
  { title: 'AWS Career Path', slug: 'aws-career-path' },
  { title: 'Data Science Career Roadmap', slug: 'data-science-career-roadmap' },
];

export const CATEGORY_META: Record<
  ResourceCategory,
  { label: string; courseRoute: string; accent: string }
> = {
  devops: { label: 'DevOps', courseRoute: '/courses/devops-engineer-program', accent: 'devops' },
  aac: { label: 'Agentic AI', courseRoute: '/courses/aac', accent: 'aac' },
  aws: { label: 'AWS', courseRoute: '/courses/aws', accent: 'aws' },
  'data-science': { label: 'Data Science', courseRoute: '/courses/data-science', accent: 'ds' },
  career: { label: 'Career', courseRoute: '/courses', accent: 'career' },
  interview: { label: 'Interview Prep', courseRoute: '/courses', accent: 'interview' },
};

const courseCta = (route: string, label: string) =>
  `Ready to go deeper? Explore the full ${label} certification program at Zyvotrix with live mentor-led training and portfolio projects.`;

function article(
  slug: string,
  title: string,
  description: string,
  category: ResourceCategory,
  sections: { heading?: string; body: string }[],
  courseRoute?: string,
): ResourceArticle {
  return { slug, title, description, category, sections, courseRoute: courseRoute ?? CATEGORY_META[category].courseRoute };
}

export const RESOURCE_ARTICLES: Record<string, ResourceArticle> = {
  'devops-roadmap-2026': article(
    'devops-roadmap-2026',
    'DevOps Roadmap 2026',
    'A step-by-step DevOps learning path from Linux fundamentals to AI-powered DevOps (AIOps) for working professionals.',
    'devops',
    [
      {
        body: 'The 2026 DevOps roadmap starts with Linux and networking basics, then moves to Git, Docker, and Kubernetes for container orchestration. Infrastructure as Code with Terraform and CI/CD pipelines form the core of modern delivery.',
      },
      {
        heading: 'Recommended learning order',
        body: 'Linux → Git → Docker → Kubernetes → Terraform → CI/CD → Monitoring → DevSecOps → AIOps. Each phase should include hands-on labs and at least one portfolio project.',
      },
      {
        body: courseCta('/courses/devops-engineer-program', 'AI-Powered DevOps Engineer'),
      },
    ],
  ),
  'agentic-ai-engineer-roadmap-2026': article(
    'agentic-ai-engineer-roadmap-2026',
    'Agentic AI Engineer Roadmap 2026',
    'Learn how to become an Agentic AI engineer — from LLM fundamentals to production multi-agent systems.',
    'aac',
    [
      {
        body: 'Agentic AI engineers build systems where LLMs plan, use tools, and execute workflows autonomously. Start with prompt engineering and LLM APIs, then learn RAG, LangChain, LangGraph, and CrewAI for multi-agent orchestration.',
      },
      {
        heading: 'Production skills',
        body: 'Deploy agents with observability, guardrails, and evaluation. Portfolio projects should demonstrate real tool use — not just chatbot demos.',
      },
      {
        body: courseCta('/courses/aac', 'Agentic AI Certification'),
      },
    ],
  ),
  'aws-solutions-architect-roadmap-2026': article(
    'aws-solutions-architect-roadmap-2026',
    'AWS Solutions Architect Roadmap 2026',
    'Complete AWS Solutions Architect learning path aligned to SAA-C03 certification and cloud architecture roles.',
    'aws',
    [
      {
        body: 'Begin with cloud fundamentals and IAM, then master EC2, S3, VPC networking, RDS, Lambda, and Route 53. Architecture design — not console clicking — is what separates architects from administrators.',
      },
      {
        heading: 'SAA-C03 alignment',
        body: 'Focus on scenario-based design: high availability, security, cost optimization, and disaster recovery. Build 5–7 portfolio projects before attempting the AWS Certified Solutions Architect Associate exam.',
      },
      {
        body: courseCta('/courses/aws', 'AWS Solutions Architect'),
      },
    ],
  ),
  'data-science-roadmap-2026': article(
    'data-science-roadmap-2026',
    'Data Science & Machine Learning Roadmap 2026',
    'Python, SQL, statistics, and ML — a practical roadmap for data analyst and junior data scientist roles.',
    'data-science',
    [
      {
        body: 'Start with Python and SQL for data extraction and cleaning. Learn Pandas for manipulation, statistics for decision-making, and Matplotlib/Seaborn for visualization. Capstone with Scikit-learn and Streamlit deployment.',
      },
      {
        heading: 'Portfolio focus',
        body: 'Employers hire proof — EDA notebooks, SQL reports, ML models on GitHub, and a deployed Streamlit app beat certificates alone.',
      },
      {
        body: courseCta('/courses/data-science', 'Data Science & ML with Python'),
      },
    ],
  ),
  'docker-vs-kubernetes': article(
    'docker-vs-kubernetes',
    'Docker vs Kubernetes',
    'Understand when to use Docker containers vs Kubernetes orchestration in production DevOps workflows.',
    'devops',
    [
      { body: 'Docker packages applications into portable containers. Kubernetes orchestrates those containers at scale — scheduling, scaling, self-healing, and service discovery across clusters.' },
      { heading: 'When to use what', body: 'Use Docker for local development and single-host deployments. Use Kubernetes when you need multi-node scaling, rolling updates, and production-grade reliability.' },
    ],
  ),
  'what-is-terraform': article(
    'what-is-terraform',
    'What is Terraform?',
    'Introduction to Terraform Infrastructure as Code for repeatable cloud and DevOps deployments.',
    'devops',
    [
      { body: 'Terraform lets you define infrastructure in HCL files and provision AWS, Azure, GCP, and more with a consistent workflow. State management and modules enable team-scale IaC.' },
    ],
  ),
  'cicd-explained': article(
    'cicd-explained',
    'CI/CD Explained',
    'Continuous Integration and Continuous Delivery — how modern teams ship code safely and fast.',
    'devops',
    [
      { body: 'CI automates building and testing on every commit. CD extends that to automated staging and production deployments. Tools include GitHub Actions, Jenkins, ArgoCD, and GitLab CI.' },
    ],
  ),
  'kubernetes-interview-questions': article(
    'kubernetes-interview-questions',
    'Kubernetes Interview Questions',
    'Top Kubernetes interview questions for DevOps and platform engineering roles.',
    'interview',
    [
      { body: 'Expect questions on Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, RBAC, Helm, and troubleshooting CrashLoopBackOff. Hands-on cluster experience matters more than definitions.' },
    ],
    '/courses/devops-engineer-program',
  ),
  'what-is-agentic-ai': article(
    'what-is-agentic-ai',
    'What is Agentic AI?',
    'Agentic AI systems use LLMs to plan, reason, and act with tools — beyond simple chatbots.',
    'aac',
    [
      { body: 'An AI agent perceives goals, breaks them into steps, calls APIs or tools, and iterates until the task completes. Frameworks like LangGraph and CrewAI coordinate multi-agent workflows.' },
    ],
  ),
  'langchain-vs-langgraph': article(
    'langchain-vs-langgraph',
    'LangChain vs LangGraph',
    'Compare LangChain chains with LangGraph stateful agent workflows for production AI systems.',
    'aac',
    [
      { body: 'LangChain excels at composable LLM pipelines and RAG. LangGraph adds cyclic graphs, state persistence, and human-in-the-loop — better for complex agents that need memory and branching logic.' },
    ],
  ),
  'rag-explained': article(
    'rag-explained',
    'RAG Explained',
    'Retrieval-Augmented Generation — how to ground LLMs on your own data for accurate answers.',
    'aac',
    [
      { body: 'RAG retrieves relevant documents from a vector store, injects them into the prompt, and generates answers grounded in your knowledge base. Essential for enterprise AI that cannot hallucinate on proprietary data.' },
    ],
  ),
  'crewai-tutorial': article(
    'crewai-tutorial',
    'CrewAI Tutorial',
    'Getting started with CrewAI multi-agent teams for collaborative AI task execution.',
    'aac',
    [
      { body: 'CrewAI assigns roles to specialized agents — researcher, writer, reviewer — that collaborate on complex tasks. Define agents, tasks, and tools, then orchestrate crews for business workflows.' },
    ],
  ),
  'ai-agent-project-ideas': article(
    'ai-agent-project-ideas',
    'AI Agent Project Ideas',
    'Portfolio-worthy Agentic AI project ideas for interviews and job applications.',
    'aac',
    [
      { body: 'Build a research agent with web search, a customer support agent with RAG on docs, a code review agent, or a multi-agent sales pipeline. Deploy with observability and evaluation metrics.' },
    ],
  ),
  'aws-beginner-guide': article(
    'aws-beginner-guide',
    'AWS Beginner Guide',
    'Start your AWS cloud journey — core services, free tier, and first architecture patterns.',
    'aws',
    [
      { body: 'Learn IAM first, then EC2 for compute, S3 for storage, and VPC for networking. Use the AWS Free Tier for labs and follow the Well-Architected Framework from day one.' },
    ],
  ),
  'ec2-vs-lambda': article(
    'ec2-vs-lambda',
    'EC2 vs Lambda',
    'When to choose Amazon EC2 vs AWS Lambda for your cloud architecture.',
    'aws',
    [
      { body: 'EC2 gives full control for long-running, stateful, or custom runtime workloads. Lambda is serverless — pay per invocation, auto-scales, ideal for event-driven APIs and short tasks.' },
    ],
  ),
  'aws-iam-explained': article(
    'aws-iam-explained',
    'AWS IAM Explained',
    'Identity and Access Management — users, roles, policies, and least-privilege security on AWS.',
    'aws',
    [
      { body: 'IAM controls who can access which AWS resources. Use roles for services, MFA for humans, and policy boundaries. Every Solutions Architect exam heavily tests IAM scenarios.' },
    ],
  ),
  'saa-c03-preparation-guide': article(
    'saa-c03-preparation-guide',
    'SAA-C03 Preparation Guide',
    'How to prepare for the AWS Certified Solutions Architect Associate (SAA-C03) exam.',
    'aws',
    [
      { body: 'Cover all domains: design secure architectures, resilient systems, high-performance solutions, and cost-optimized designs. Practice scenario questions and build real VPC + multi-tier projects.' },
      { heading: 'Study plan', body: '8–12 weeks of structured learning with hands-on labs beats exam dumps. Zyvotrix AWS program maps directly to SAA-C03 domains.' },
    ],
  ),
  'aws-project-ideas': article(
    'aws-project-ideas',
    'AWS Project Ideas',
    'Portfolio AWS projects for cloud engineer and Solutions Architect interviews.',
    'aws',
    [
      { body: 'Build a static site on S3 + CloudFront, a serverless API with Lambda, a 3-tier VPC app, Terraform modules, and a capstone like an OTT or e-commerce architecture with HA and monitoring.' },
    ],
  ),
  'python-for-data-science': article(
    'python-for-data-science',
    'Python for Data Science',
    'Essential Python skills for data analysis, ML, and analytics careers.',
    'data-science',
    [
      { body: 'Master variables, functions, lists, dicts, file I/O, then NumPy and Pandas. Jupyter notebooks are the standard workflow for exploratory analysis and model development.' },
    ],
  ),
  'sql-roadmap': article(
    'sql-roadmap',
    'SQL Roadmap',
    'Learn SQL for data analysis — queries, joins, aggregations, and business reporting.',
    'data-science',
    [
      { body: 'Start with SELECT, WHERE, GROUP BY, then JOINs and subqueries. Practice on real business datasets. SQL is required for data analyst roles and complements Python workflows.' },
    ],
  ),
  'eda-guide': article(
    'eda-guide',
    'EDA Guide',
    'Exploratory Data Analysis — how to understand datasets before modeling.',
    'data-science',
    [
      { body: 'EDA covers data profiling, missing values, distributions, correlations, and visualizations. Document insights in a notebook stakeholders can follow — this is often the first deliverable in analytics projects.' },
    ],
  ),
  'machine-learning-roadmap': article(
    'machine-learning-roadmap',
    'Machine Learning Roadmap',
    'Structured path from statistics to supervised and unsupervised ML with Scikit-learn.',
    'data-science',
    [
      { body: 'After statistics and visualization, learn regression, classification, train/test splits, cross-validation, and clustering. Deploy models with Streamlit and document on GitHub.' },
    ],
  ),
  'data-analyst-portfolio-projects': article(
    'data-analyst-portfolio-projects',
    'Data Analyst Portfolio Projects',
    'Project ideas that prove data analyst skills to international employers.',
    'data-science',
    [
      { body: 'Retail sales dashboard, HR attrition analysis, SQL BI reports, customer segmentation, and churn prediction. Each project should tell a business story with clean code on GitHub.' },
    ],
  ),
  'devops-interview-questions': article(
    'devops-interview-questions',
    'DevOps Interview Questions',
    'Common DevOps interview questions — CI/CD, Docker, Kubernetes, Terraform, and SRE.',
    'interview',
    [
      { body: 'Prepare stories about pipelines you built, incidents you resolved, and IaC modules you wrote. Expect deep dives on Git workflows, container security, and monitoring stack design.' },
    ],
    '/courses/devops-engineer-program',
  ),
  'aws-interview-questions': article(
    'aws-interview-questions',
    'AWS Interview Questions',
    'AWS Solutions Architect and cloud engineer interview preparation.',
    'interview',
    [
      { body: 'Scenario questions dominate: design a scalable web app, secure an S3 bucket, troubleshoot VPC connectivity, optimize costs. Whiteboard architectures and explain trade-offs.' },
    ],
    '/courses/aws',
  ),
  'data-science-interview-questions': article(
    'data-science-interview-questions',
    'Data Science Interview Questions',
    'SQL, Python, statistics, and ML questions for data analyst and scientist roles.',
    'interview',
    [
      { body: 'Expect coding exercises in Pandas, SQL joins, hypothesis testing explanations, and walkthroughs of past projects. Portfolio demos often matter more than trivia.' },
    ],
    '/courses/data-science',
  ),
  'ai-engineer-interview-questions': article(
    'ai-engineer-interview-questions',
    'AI Engineer Interview Questions',
    'LLM, RAG, agents, and MLOps questions for AI engineering roles.',
    'interview',
    [
      { body: 'Topics include prompt design, RAG architecture, vector databases, agent frameworks, evaluation metrics, and deploying models safely in production.' },
    ],
    '/courses/aac',
  ),
  'how-to-transition-into-devops': article(
    'how-to-transition-into-devops',
    'How to Transition into DevOps',
    'Career guide for moving into DevOps from development, support, or other IT roles.',
    'career',
    [
      { body: 'Build Linux, Git, Docker, and CI/CD skills through labs. Contribute to open source, document homelab projects, and target junior DevOps or platform engineer roles after 3–6 months of focused learning.' },
    ],
    '/courses/devops-engineer-program',
  ),
  'how-to-become-an-ai-engineer': article(
    'how-to-become-an-ai-engineer',
    'How to Become an AI Engineer',
    'Path from Python developer to AI/Agentic AI engineer in 2026.',
    'career',
    [
      { body: 'Learn LLM APIs, RAG, fine-tuning basics, and agent frameworks. Ship portfolio agents with tool use and deployment. Agentic AI is the fastest-growing niche in AI hiring.' },
    ],
    '/courses/aac',
  ),
  'aws-career-path': article(
    'aws-career-path',
    'AWS Career Path',
    'Cloud engineer, Solutions Architect, and DevOps roles on AWS.',
    'career',
    [
      { body: 'Start with Cloud Practitioner concepts, then Solutions Architect Associate (SAA-C03). Progress to specialty certs and solutions architect professional roles with portfolio architectures.' },
    ],
    '/courses/aws',
  ),
  'data-science-career-roadmap': article(
    'data-science-career-roadmap',
    'Data Science Career Roadmap',
    'From beginner to data analyst and junior data scientist — skills and timeline.',
    'career',
    [
      { body: 'Month 1–2: Python + SQL. Month 2–3: statistics + visualization. Month 3+: ML and capstone. Target data analyst first, then junior data scientist with a strong GitHub portfolio.' },
    ],
    '/courses/data-science',
  ),
};

export function getResourceArticle(slug: string): ResourceArticle | undefined {
  return RESOURCE_ARTICLES[slug];
}

export function getAllResourceSlugs(): string[] {
  return Object.keys(RESOURCE_ARTICLES);
}

export type ResourceCategory = 'devops' | 'aac' | 'aws' | 'data-science' | 'career' | 'interview';

export interface ResourceArticle {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  courseRoute?: string;
  sections: { heading?: string; body?: string; bullets?: string[]; remember?: string; tip?: string }[];
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
  sections: { heading?: string; body?: string; bullets?: string[]; remember?: string; tip?: string }[],
  courseRoute?: string,
): ResourceArticle {
  return {
    slug,
    title,
    description,
    category,
    sections,
    courseRoute: courseRoute ?? CATEGORY_META[category].courseRoute,
  };
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
    'Top 30 Most Asked DevOps Interview Questions and Answers',
    'Prepare for DevOps interviews with answers to the 30 most common questions on CI/CD, Docker, Kubernetes, Terraform, AWS, monitoring, and DevSecOps.',
    'interview',
    [
      {
        heading: '1. What is DevOps?',
        body: 'DevOps is a culture and set of practices that brings Development and Operations teams together to build, test, deploy, and manage software efficiently. Its goal is to improve collaboration, automate repetitive tasks, and deliver software faster with fewer failures.',
        remember: 'DevOps = Development + Operations + Automation',
        tip: 'Mention collaboration, automation, and CI/CD while answering.',
      },
      {
        heading: '2. What are the main benefits of DevOps?',
        body: 'DevOps helps organizations release software faster, reduce deployment failures, improve team collaboration, and automate repetitive tasks. It also improves application reliability and scalability.',
        remember: 'Faster Delivery + Better Quality + More Automation',
        tip: 'Always mention speed, automation, and reliability.',
      },
      {
        heading: '3. What is CI/CD?',
        body: 'CI/CD is a software delivery practice where code changes are automatically built, tested, and deployed. It helps teams release software frequently and with confidence.',
        remember: 'CI = Build & Test\nCD = Release & Deploy',
        tip: 'Explain both Continuous Integration and Continuous Delivery.',
      },
      {
        heading: '4. What is the difference between Continuous Delivery and Continuous Deployment?',
        body: 'In Continuous Delivery, deployments require manual approval before reaching production. In Continuous Deployment, every successful change is automatically deployed to production.',
        remember: 'Delivery = Manual Approval\nDeployment = Fully Automatic',
        tip: 'Many candidates confuse these two, so answer carefully.',
      },
      {
        heading: '5. What is Infrastructure as Code (IaC)?',
        body: 'Infrastructure as Code is the practice of creating and managing infrastructure using code instead of manual configuration. It makes infrastructure repeatable, version-controlled, and automated.',
        remember: 'Servers using Code instead of Clicks',
        tip: 'Mention Terraform as the most common IaC tool.',
      },
      {
        heading: '6. What is Docker?',
        body: 'Docker is a containerization platform that packages an application and its dependencies into containers so that it runs consistently across different environments.',
        remember: 'Image = Blueprint\nContainer = Running Application',
        tip: 'Mention that Docker solves the "It works on my machine" problem.',
      },
      {
        heading: '7. What is the difference between Docker Image and Docker Container?',
        body: 'A Docker Image is a template used to create containers. A Docker Container is the running instance of that image.',
        remember: 'Image = Recipe\nContainer = Prepared Food',
        tip: 'Remember that containers are created from images.',
      },
      {
        heading: '8. What is Kubernetes?',
        body: 'Kubernetes is a container orchestration platform that automates deployment, scaling, networking, and management of containerized applications.',
        remember: 'Docker runs containers.\nKubernetes manages containers.',
        tip: 'Mention auto-scaling and self-healing.',
      },
      {
        heading: '9. What is a Pod in Kubernetes?',
        body: 'A Pod is the smallest deployable unit in Kubernetes. It contains one or more containers that share networking and storage resources.',
        remember: 'Pod = Home for Containers',
        tip: 'Most Pods contain a single container.',
      },
      {
        heading: '10. What is the difference between Deployment and StatefulSet?',
        body: 'Deployments are used for stateless applications, while StatefulSets are used for stateful applications such as databases where each Pod needs a unique identity.',
        remember: 'Deployment = Stateless\nStatefulSet = Stateful',
        tip: 'Mention databases when talking about StatefulSets.',
      },
      {
        heading: '11. What is a Kubernetes Service?',
        body: 'A Service provides a stable network endpoint for accessing Pods. It allows applications to communicate reliably even if Pods are recreated.',
        remember: 'Service = Permanent Address for Pods',
        tip: 'Mention ClusterIP and LoadBalancer.',
      },
      {
        heading: '12. What is Terraform?',
        body: 'Terraform is an Infrastructure as Code tool that provisions and manages cloud resources using configuration files.',
        remember: 'Terraform = Infrastructure using Code',
        tip: 'Mention AWS, Azure, and GCP support.',
      },
      {
        heading: '13. What is Terraform State?',
        body: 'Terraform State is a file that stores information about infrastructure resources managed by Terraform. It helps Terraform track changes and existing resources.',
        remember: "State = Terraform's Memory",
        tip: 'Mention terraform.tfstate.',
      },
      {
        heading: '14. What are Terraform Modules?',
        body: 'Terraform Modules are reusable collections of resources and configurations that help reduce duplication and standardize infrastructure.',
        remember: 'Module = Reusable Terraform Code',
        tip: 'Mention code reusability.',
      },
      {
        heading: '15. What is Ansible?',
        body: 'Ansible is an automation and configuration management tool used for server provisioning, software installation, and infrastructure management.',
        remember: 'Ansible = Server Automation',
        tip: 'Mention configuration management.',
      },
      {
        heading: '16. Why is Ansible called Agentless?',
        body: 'Ansible does not require any software agent on managed servers. It uses SSH for Linux and WinRM for Windows systems.',
        remember: 'No Agent = Less Management',
        tip: 'Mention SSH communication.',
      },
      {
        heading: '17. What is Git?',
        body: 'Git is a distributed version control system used to track source code changes and collaborate with teams.',
        remember: 'Git = Code History',
        tip: 'Mention version control and collaboration.',
      },
      {
        heading: '18. What is the difference between Git Merge and Git Rebase?',
        body: 'Merge combines branches while preserving history. Rebase moves commits to create a cleaner and more linear history.',
        remember: 'Merge = Combine\nRebase = Rewrite',
        tip: 'Mention cleaner history for rebase.',
      },
      {
        heading: '19. What is a Pull Request?',
        body: 'A Pull Request is a request to merge code changes from one branch into another after review and approval.',
        remember: 'PR = Request to Merge',
        tip: 'Mention code review process.',
      },
      {
        heading: '20. What is Jenkins?',
        body: 'Jenkins is an open-source automation server used to build, test, and deploy applications automatically.',
        remember: 'Jenkins = CI/CD Automation',
        tip: 'Mention pipelines.',
      },
      {
        heading: '21. What is Monitoring in DevOps?',
        body: 'Monitoring is the process of collecting and analyzing metrics, logs, and traces to understand system health and performance.',
        remember: 'Monitor = Observe Everything',
        tip: 'Mention Prometheus and Grafana.',
      },
      {
        heading: '22. What is Prometheus?',
        body: 'Prometheus is an open-source monitoring tool that collects and stores time-series metrics from applications and infrastructure.',
        remember: 'Prometheus = Metrics Collector',
        tip: 'Mention alerting capability.',
      },
      {
        heading: '23. What is Grafana?',
        body: 'Grafana is a visualization platform used to create dashboards and analyze monitoring data.',
        remember: 'Grafana = Data Visualization',
        tip: 'Mention dashboards and alerts.',
      },
      {
        heading: '24. What is Blue-Green Deployment?',
        body: 'Blue-Green Deployment uses two identical environments. One serves production traffic while the other hosts the new version. Traffic is switched after testing.',
        remember: 'Blue = Current\nGreen = New',
        tip: 'Mention quick rollback.',
      },
      {
        heading: '25. What is Canary Deployment?',
        body: 'Canary Deployment releases a new version to a small percentage of users first before gradually rolling it out to everyone.',
        remember: 'Small Users → More Users → Everyone',
        tip: 'Mention risk reduction.',
      },
      {
        heading: '26. What is a VPC in AWS?',
        body: 'A Virtual Private Cloud (VPC) is a logically isolated network where AWS resources are launched securely.',
        remember: 'VPC = Private Network in AWS',
        tip: 'Mention subnets and route tables.',
      },
      {
        heading: '27. What is the difference between Security Groups and NACLs?',
        body: 'Security Groups work at the instance level and are stateful. NACLs work at the subnet level and are stateless.',
        remember: 'Security Group = Instance\nNACL = Subnet',
        tip: 'Always mention Stateful vs Stateless.',
      },
      {
        heading: '28. What is AWS IAM?',
        body: 'AWS IAM is a service used to manage authentication and authorization for AWS resources through users, groups, roles, and policies.',
        remember: 'IAM = Access Management',
        tip: 'Mention least privilege principle.',
      },
      {
        heading: '29. What is DevSecOps?',
        body: 'DevSecOps integrates security into every stage of the software development lifecycle instead of treating it as a separate phase.',
        remember: 'Dev + Sec + Ops',
        tip: 'Mention Shift Left Security.',
      },
      {
        heading: '30. What is AIOps?',
        body: 'AIOps uses Artificial Intelligence and Machine Learning to improve monitoring, incident detection, log analysis, and operational efficiency.',
        remember: 'AI + IT Operations = AIOps',
        tip: 'Mention anomaly detection and automated remediation.',
      },
    ],
    '/courses/devops-engineer-program',
  ),
  'aws-interview-questions': article(
    'aws-interview-questions',
    'Top 30 Most Asked AWS Interview Questions and Answers',
    'Prepare for AWS Solutions Architect and cloud engineer interviews with answers to the 30 most common questions on EC2, S3, VPC, IAM, Lambda, RDS, and more.',
    'interview',
    [
      {
        heading: '1. What is AWS?',
        body: 'Amazon Web Services (AWS) is a cloud computing platform that provides on-demand services such as servers, storage, databases, networking, security, and AI tools. Instead of buying physical infrastructure, organizations can rent resources and pay only for what they use.',
        remember: 'AWS = Rent IT Infrastructure Online',
        tip: 'Mention scalability, reliability, and pay-as-you-go pricing.',
      },
      {
        heading: '2. What are the benefits of AWS?',
        body: 'AWS helps organizations reduce infrastructure costs, scale applications quickly, improve availability, and deploy services globally without managing physical hardware.',
        remember: 'Scale Fast + Pay Less + Go Global',
        tip: 'Mention High Availability and Elasticity.',
      },
      {
        heading: '3. What is EC2?',
        body: 'Amazon EC2 (Elastic Compute Cloud) is a service that provides virtual servers in the cloud. It allows users to launch, manage, and scale compute resources as needed.',
        remember: 'EC2 = Virtual Machine in AWS',
        tip: 'Mention that EC2 is one of the most commonly used AWS services.',
      },
      {
        heading: '4. What is an AMI?',
        body: 'An Amazon Machine Image (AMI) is a template used to launch EC2 instances. It contains the operating system, software, and configurations required for a server.',
        remember: 'AMI = Template for EC2',
        tip: 'Mention that AMIs help create identical servers quickly.',
      },
      {
        heading: '5. What is Auto Scaling?',
        body: 'Auto Scaling automatically increases or decreases the number of EC2 instances based on traffic or resource usage. This helps maintain performance while optimizing costs.',
        remember: 'More Traffic → More Servers\nLess Traffic → Fewer Servers',
        tip: 'Mention cost optimization and high availability.',
      },
      {
        heading: '6. What is Elastic Load Balancer (ELB)?',
        body: 'Elastic Load Balancer distributes incoming traffic across multiple servers to improve availability and reliability.',
        remember: 'ELB = Traffic Manager',
        tip: 'Mention fault tolerance.',
      },
      {
        heading: '7. What is an Elastic IP?',
        body: 'An Elastic IP is a static public IPv4 address that can be attached to an EC2 instance and reassigned if needed.',
        remember: 'Elastic IP = Permanent Public IP',
        tip: 'Mention disaster recovery use cases.',
      },
      {
        heading: '8. What is Amazon S3?',
        body: 'Amazon S3 (Simple Storage Service) is an object storage service used to store files, images, backups, videos, and application data.',
        remember: 'S3 = Cloud Storage',
        tip: 'Mention unlimited scalability and durability.',
      },
      {
        heading: '9. What are S3 Storage Classes?',
        body: 'Storage classes allow users to optimize costs based on access patterns. Examples include Standard, Intelligent-Tiering, Standard-IA, Glacier, and Deep Archive.',
        remember: 'Frequently Used = Standard\nRarely Used = Glacier',
        tip: 'Mention cost optimization.',
      },
      {
        heading: '10. What is Versioning in S3?',
        body: 'Versioning allows multiple versions of the same object to be stored, helping recover deleted or modified files.',
        remember: 'Versioning = File History',
        tip: 'Mention accidental deletion recovery.',
      },
      {
        heading: '11. What is a Lifecycle Policy in S3?',
        body: 'Lifecycle policies automatically move or delete objects based on predefined rules to reduce storage costs.',
        remember: 'Lifecycle = Automatic File Management',
        tip: 'Mention Glacier transitions.',
      },
      {
        heading: '12. What is EBS?',
        body: 'Amazon EBS (Elastic Block Store) provides persistent block storage for EC2 instances.',
        remember: 'EBS = Hard Disk for EC2',
        tip: 'Mention persistent storage.',
      },
      {
        heading: '13. What is the difference between EBS and S3?',
        body: 'EBS provides block storage for EC2 instances, while S3 provides object storage for files and data.',
        remember: 'EBS = Disk\nS3 = Storage Bucket',
        tip: 'Mention block vs object storage.',
      },
      {
        heading: '14. What is a VPC?',
        body: 'A Virtual Private Cloud (VPC) is a logically isolated network where AWS resources are launched securely.',
        remember: 'VPC = Private Network in AWS',
        tip: 'Mention subnets and route tables.',
      },
      {
        heading: '15. What are Public and Private Subnets?',
        body: 'Public subnets can access the internet directly, while private subnets cannot access the internet directly.',
        remember: 'Public = Internet Access\nPrivate = Internal Access',
        tip: 'Mention security best practices.',
      },
      {
        heading: '16. What is an Internet Gateway?',
        body: 'An Internet Gateway allows resources inside a VPC to communicate with the internet.',
        remember: 'Internet Gateway = Door to the Internet',
        tip: 'Mention public subnet connectivity.',
      },
      {
        heading: '17. What is a NAT Gateway?',
        body: 'A NAT Gateway allows private subnet resources to access the internet without exposing them to inbound internet traffic.',
        remember: 'Private Servers → Internet Access',
        tip: 'Mention software updates use case.',
      },
      {
        heading: '18. What is a Route Table?',
        body: 'A Route Table determines where network traffic should be directed inside a VPC.',
        remember: 'Route Table = GPS for Network Traffic',
        tip: 'Mention destination and target.',
      },
      {
        heading: '19. What are Security Groups?',
        body: 'Security Groups act as virtual firewalls for EC2 instances and control inbound and outbound traffic.',
        remember: 'Security Group = EC2 Firewall',
        tip: 'Mention stateful behavior.',
      },
      {
        heading: '20. What are NACLs?',
        body: 'Network Access Control Lists (NACLs) control traffic at the subnet level.',
        remember: 'NACL = Subnet Firewall',
        tip: 'Mention stateless behavior.',
      },
      {
        heading: '21. What is the difference between Security Groups and NACLs?',
        body: 'Security Groups work at the instance level and are stateful, while NACLs work at the subnet level and are stateless.',
        remember: 'Security Group = Instance\nNACL = Subnet',
        tip: 'Always mention Stateful vs Stateless.',
      },
      {
        heading: '22. What is IAM?',
        body: 'AWS Identity and Access Management (IAM) is used to securely manage access to AWS resources.',
        remember: 'IAM = Access Management',
        tip: 'Mention authentication and authorization.',
      },
      {
        heading: '23. What are IAM Users, Groups, Roles, and Policies?',
        body: 'Users represent individuals, Groups organize users, Roles provide temporary permissions, and Policies define permissions.',
        remember: 'User → Group → Role → Policy',
        tip: 'Mention least privilege access.',
      },
      {
        heading: '24. What is the Principle of Least Privilege?',
        body: 'It means giving users only the permissions required to perform their tasks and nothing more.',
        remember: 'Minimum Access Required',
        tip: 'Mention security best practices.',
      },
      {
        heading: '25. What is MFA?',
        body: 'Multi-Factor Authentication (MFA) adds an extra layer of security by requiring an additional verification method besides a password.',
        remember: 'Password + One More Check',
        tip: 'Mention Google Authenticator.',
      },
      {
        heading: '26. What is AWS Lambda?',
        body: 'AWS Lambda is a serverless compute service that runs code without managing servers.',
        remember: 'Write Code, AWS Runs It',
        tip: 'Mention pay-per-execution.',
      },
      {
        heading: '27. What is Amazon RDS?',
        body: 'Amazon RDS is a managed relational database service that simplifies database setup, maintenance, backups, and scaling.',
        remember: 'Managed SQL Database',
        tip: 'Mention MySQL, PostgreSQL, and SQL Server support.',
      },
      {
        heading: '28. What is the difference between RDS and DynamoDB?',
        body: 'RDS is a relational database, while DynamoDB is a NoSQL database designed for high scalability and low latency.',
        remember: 'RDS = SQL\nDynamoDB = NoSQL',
        tip: 'Mention structured vs flexible data.',
      },
      {
        heading: '29. What is CloudWatch?',
        body: 'Amazon CloudWatch is a monitoring service that collects metrics, logs, and events from AWS resources.',
        remember: 'CloudWatch = Monitoring for AWS',
        tip: 'Mention alarms and dashboards.',
      },
      {
        heading: '30. What is the AWS Well-Architected Framework?',
        body: 'The AWS Well-Architected Framework provides best practices for designing secure, reliable, efficient, sustainable, and cost-optimized cloud architectures.',
        remember: 'Secure + Reliable + Efficient + Cost Optimized',
        tip: 'Mention the six pillars of the framework.',
      },
    ],
    '/courses/aws',
  ),
  'data-science-interview-questions': article(
    'data-science-interview-questions',
    'Top 30 Most Asked Data Science Interview Questions and Answers',
    'Prepare for Data Science and ML interviews with answers to the 30 most common questions on Python, Pandas, EDA, machine learning, and MLOps.',
    'interview',
    [
      {
        heading: '1. What is Data Science?',
        body: 'Data Science is the process of collecting, cleaning, analyzing, and interpreting data to extract meaningful insights and support decision-making. It combines statistics, programming, and machine learning.',
        remember: 'Data + Insights + Decisions',
        tip: 'Mention statistics, Python, and machine learning.',
      },
      {
        heading: '2. Why is Data Science important?',
        body: 'Data Science helps organizations make data-driven decisions, predict future trends, improve customer experiences, and optimize business processes.',
        remember: 'Data → Insights → Business Value',
        tip: 'Use real-world examples like Netflix or Amazon recommendations.',
      },
      {
        heading: '3. What is the Data Science Lifecycle?',
        body: 'The Data Science Lifecycle includes data collection, data cleaning, exploratory analysis, model building, evaluation, deployment, and monitoring.',
        remember: 'Collect → Clean → Analyze → Build → Deploy',
        tip: 'Mention that data cleaning often takes the most time.',
      },
      {
        heading: '4. What is Python and why is it popular in Data Science?',
        body: 'Python is a programming language widely used in Data Science because of its simplicity and powerful libraries like NumPy, Pandas, Matplotlib, and Scikit-Learn.',
        remember: 'Python = Data Science Language',
        tip: 'Mention ecosystem and community support.',
      },
      {
        heading: '5. What is NumPy?',
        body: 'NumPy is a Python library used for numerical computing and working with arrays efficiently.',
        remember: 'NumPy = Fast Mathematical Operations',
        tip: 'Mention multidimensional arrays.',
      },
      {
        heading: '6. What is Pandas?',
        body: 'Pandas is a Python library used for data manipulation and analysis using DataFrames and Series.',
        remember: 'Pandas = Excel for Python',
        tip: 'Mention DataFrames.',
      },
      {
        heading: '7. What is a DataFrame?',
        body: 'A DataFrame is a two-dimensional table-like data structure in Pandas with rows and columns.',
        remember: 'DataFrame = Spreadsheet in Python',
        tip: 'Mention structured data handling.',
      },
      {
        heading: '8. What is Data Cleaning?',
        body: 'Data Cleaning is the process of removing errors, duplicates, missing values, and inconsistencies from a dataset.',
        remember: 'Garbage In = Garbage Out',
        tip: 'Mention missing values and duplicates.',
      },
      {
        heading: '9. What are Missing Values?',
        body: 'Missing values are data points that are unavailable or empty in a dataset and need to be handled before analysis.',
        remember: 'Missing Data = Incomplete Information',
        tip: 'Mention mean, median, and mode imputation.',
      },
      {
        heading: '10. What is Exploratory Data Analysis (EDA)?',
        body: 'EDA is the process of analyzing and visualizing data to understand patterns, trends, and relationships before building models.',
        remember: 'EDA = Understand Before Building',
        tip: 'Mention visualizations and summary statistics.',
      },
      {
        heading: '11. What is Data Visualization?',
        body: 'Data Visualization is the graphical representation of data using charts and graphs to communicate insights effectively.',
        remember: 'Visual Data = Easier Understanding',
        tip: 'Mention Matplotlib and Seaborn.',
      },
      {
        heading: '12. What is Matplotlib?',
        body: 'Matplotlib is a Python library used for creating charts, graphs, and visualizations.',
        remember: 'Matplotlib = Basic Visualization Tool',
        tip: 'Mention line charts and bar charts.',
      },
      {
        heading: '13. What is Seaborn?',
        body: 'Seaborn is a Python visualization library built on top of Matplotlib that provides attractive statistical visualizations.',
        remember: 'Seaborn = Advanced Visualization',
        tip: 'Mention heatmaps and pair plots.',
      },
      {
        heading: '14. What is Machine Learning?',
        body: 'Machine Learning is a branch of AI that enables computers to learn patterns from data and make predictions without explicit programming.',
        remember: 'Learn From Data',
        tip: 'Mention prediction and automation.',
      },
      {
        heading: '15. What are the main types of Machine Learning?',
        body: 'The three main types are Supervised Learning, Unsupervised Learning, and Reinforcement Learning.',
        remember: 'Supervised, Unsupervised, Reinforcement',
        tip: 'Give one example of each.',
      },
      {
        heading: '16. What is Supervised Learning?',
        body: 'Supervised Learning uses labeled data to train models that predict outputs for new inputs.',
        remember: 'Input + Correct Answer Available',
        tip: 'Mention Regression and Classification.',
      },
      {
        heading: '17. What is Unsupervised Learning?',
        body: 'Unsupervised Learning finds patterns and relationships in unlabeled data.',
        remember: 'No Labels, Find Patterns',
        tip: 'Mention clustering.',
      },
      {
        heading: '18. What is Regression?',
        body: 'Regression is a supervised learning technique used to predict continuous numerical values.',
        remember: 'Predict Numbers',
        tip: 'Mention house price prediction.',
      },
      {
        heading: '19. What is Classification?',
        body: 'Classification is a supervised learning technique used to predict categories or labels.',
        remember: 'Predict Categories',
        tip: 'Mention spam email detection.',
      },
      {
        heading: '20. What is Clustering?',
        body: 'Clustering is an unsupervised learning technique that groups similar data points together.',
        remember: 'Group Similar Data',
        tip: 'Mention customer segmentation.',
      },
      {
        heading: '21. What is Overfitting?',
        body: 'Overfitting occurs when a model learns the training data too well and performs poorly on new data.',
        remember: 'Memorized, Not Learned',
        tip: 'Mention poor generalization.',
      },
      {
        heading: '22. What is Underfitting?',
        body: 'Underfitting occurs when a model fails to learn important patterns from the training data.',
        remember: 'Too Simple to Learn',
        tip: 'Mention low accuracy on both training and testing data.',
      },
      {
        heading: '23. What is Train-Test Split?',
        body: 'Train-Test Split divides data into training and testing datasets to evaluate model performance.',
        remember: 'Learn First, Test Later',
        tip: 'Mention 80-20 split.',
      },
      {
        heading: '24. What is Accuracy?',
        body: 'Accuracy measures the percentage of correct predictions made by a model.',
        remember: 'Correct Predictions Percentage',
        tip: 'Mention classification models.',
      },
      {
        heading: '25. What is Precision?',
        body: 'Precision measures how many predicted positive results are actually positive.',
        remember: 'Precision = Correct Positive Predictions',
        tip: 'Mention fraud detection.',
      },
      {
        heading: '26. What is Recall?',
        body: 'Recall measures how many actual positive cases were correctly identified.',
        remember: 'Recall = Find All Positives',
        tip: 'Mention disease detection.',
      },
      {
        heading: '27. What is a Confusion Matrix?',
        body: 'A Confusion Matrix is a table used to evaluate classification models by comparing predicted and actual values.',
        remember: 'Prediction Report Card',
        tip: 'Mention TP, TN, FP, and FN.',
      },
      {
        heading: '28. What is Feature Engineering?',
        body: 'Feature Engineering is the process of creating or transforming variables to improve model performance.',
        remember: 'Better Features = Better Model',
        tip: 'Mention domain knowledge.',
      },
      {
        heading: '29. What is Model Deployment?',
        body: 'Model Deployment is the process of making a trained machine learning model available for real-world use.',
        remember: 'From Notebook to Production',
        tip: 'Mention APIs and cloud deployment.',
      },
      {
        heading: '30. What is MLOps?',
        body: 'MLOps combines Machine Learning and DevOps practices to automate model deployment, monitoring, versioning, and maintenance.',
        remember: 'MLOps = DevOps for ML',
        tip: 'Mention MLflow, Docker, and CI/CD.',
      },
    ],
    '/courses/data-science',
  ),
  'ai-engineer-interview-questions': article(
    'ai-engineer-interview-questions',
    'Top 30 Most Asked AI Engineer Interview Questions and Answers',
    'Prepare for Agentic AI and AI engineering interviews with answers to the 30 most common questions on LLMs, RAG, agents, LangChain, and production deployment.',
    'interview',
    [
      {
        heading: '1. What is Agentic AI?',
        body: 'Agentic AI refers to AI systems that can independently plan, reason, make decisions, use tools, and complete tasks with minimal human intervention. Unlike traditional chatbots that only generate responses, AI agents can take actions to achieve specific goals.',
        remember: 'Agentic AI = AI That Can Act',
        tip: 'Mention reasoning, planning, memory, and tool usage.',
      },
      {
        heading: '2. What is an AI Agent?',
        body: 'An AI Agent is a system powered by an LLM that can understand goals, make decisions, use tools, access information, and perform actions to complete tasks autonomously.',
        remember: 'LLM + Tools + Actions = AI Agent',
        tip: 'Explain that an agent does more than generate text.',
      },
      {
        heading: '3. What is the difference between a Chatbot and an AI Agent?',
        body: 'A chatbot primarily answers questions, while an AI agent can perform tasks, make decisions, use tools, and interact with external systems.',
        remember: 'Chatbot Talks\nAgent Acts',
        tip: 'Give examples like booking meetings or querying databases.',
      },
      {
        heading: '4. What is an LLM?',
        body: 'A Large Language Model (LLM) is an AI model trained on massive amounts of text data to understand and generate human-like language.',
        remember: 'LLM = Brain of the Agent',
        tip: 'Mention GPT, Claude, Gemini, and Llama.',
      },
      {
        heading: '5. What are Tokens in LLMs?',
        body: 'Tokens are small units of text processed by language models. A token can be a word, part of a word, punctuation mark, or symbol.',
        remember: 'Tokens = Building Blocks of AI Conversations',
        tip: 'Mention context window limitations.',
      },
      {
        heading: '6. What are Embeddings?',
        body: 'Embeddings are numerical representations of text that capture semantic meaning and enable similarity search.',
        remember: 'Embeddings = Meaning Converted Into Numbers',
        tip: 'Mention semantic search and vector databases.',
      },
      {
        heading: '7. What is a Vector Database?',
        body: 'A vector database stores embeddings and enables fast similarity search for AI applications.',
        remember: 'Vector Database = Memory for AI',
        tip: 'Mention Pinecone, ChromaDB, and Weaviate.',
      },
      {
        heading: '8. What is RAG?',
        body: 'Retrieval-Augmented Generation (RAG) combines information retrieval with LLM generation to provide more accurate and context-aware responses.',
        remember: 'RAG = Search First, Answer Later',
        tip: 'Mention reducing hallucinations.',
      },
      {
        heading: '9. Why is RAG important?',
        body: 'RAG allows AI systems to use up-to-date and domain-specific information instead of relying only on training data.',
        remember: 'RAG Gives AI Fresh Knowledge',
        tip: 'Mention enterprise knowledge assistants.',
      },
      {
        heading: '10. What is Prompt Engineering?',
        body: 'Prompt Engineering is the practice of designing instructions that guide AI models toward desired outputs.',
        remember: 'Better Prompt = Better Response',
        tip: 'Mention clarity and context.',
      },
      {
        heading: '11. What is Zero-Shot Prompting?',
        body: 'Zero-shot prompting means asking a model to perform a task without providing examples.',
        remember: 'No Examples Needed',
        tip: 'Mention general-purpose tasks.',
      },
      {
        heading: '12. What is Few-Shot Prompting?',
        body: 'Few-shot prompting provides a few examples before asking the model to perform a task.',
        remember: 'Learn From Examples',
        tip: 'Mention improved consistency.',
      },
      {
        heading: '13. What is Chain-of-Thought Prompting?',
        body: 'Chain-of-Thought prompting encourages the model to reason through a problem step by step.',
        remember: 'Think Before Answering',
        tip: 'Mention reasoning tasks.',
      },
      {
        heading: '14. What is a System Prompt?',
        body: 'A system prompt defines the behavior, role, and rules that an AI model should follow.',
        remember: 'System Prompt = AI\'s Instructions',
        tip: 'Mention consistency and control.',
      },
      {
        heading: '15. What is Function Calling?',
        body: 'Function Calling allows an LLM to invoke external tools, APIs, or functions instead of only generating text.',
        remember: 'Function Calling = AI Uses Tools',
        tip: 'Mention weather APIs or database queries.',
      },
      {
        heading: '16. What are Structured Outputs?',
        body: 'Structured outputs force AI models to return responses in predefined formats such as JSON.',
        remember: 'AI Output With Rules',
        tip: 'Mention API integrations.',
      },
      {
        heading: '17. What is LangChain?',
        body: 'LangChain is a framework used to build AI applications by connecting LLMs, prompts, memory, tools, and external data sources.',
        remember: 'LangChain = Toolkit for AI Apps',
        tip: 'Mention chains, memory, and agents.',
      },
      {
        heading: '18. What is LangGraph?',
        body: 'LangGraph is a framework for building stateful AI agent workflows with complex decision-making and multi-step execution.',
        remember: 'LangGraph = Workflow Engine for Agents',
        tip: 'Mention state management.',
      },
      {
        heading: '19. What is CrewAI?',
        body: 'CrewAI is a framework that allows multiple AI agents to collaborate and complete tasks together.',
        remember: 'CrewAI = Team of AI Agents',
        tip: 'Mention agent collaboration.',
      },
      {
        heading: '20. What is Multi-Agent Architecture?',
        body: 'Multi-Agent Architecture involves multiple specialized agents working together to solve complex problems.',
        remember: 'Many Agents, One Goal',
        tip: 'Mention task delegation.',
      },
      {
        heading: '21. What is Agent Memory?',
        body: 'Agent memory allows AI systems to remember previous interactions and use that information in future tasks.',
        remember: 'Memory = Context Retention',
        tip: 'Mention short-term and long-term memory.',
      },
      {
        heading: '22. What is Context Window?',
        body: 'A context window is the amount of information an LLM can process in a single interaction.',
        remember: 'Context Window = AI\'s Working Memory',
        tip: 'Mention token limits.',
      },
      {
        heading: '23. What is Hallucination in AI?',
        body: 'Hallucination occurs when an AI model generates incorrect information that appears convincing.',
        remember: 'Confidently Wrong Answers',
        tip: 'Mention RAG as a mitigation strategy.',
      },
      {
        heading: '24. What is Agent Observability?',
        body: 'Agent observability involves monitoring, tracing, and analyzing agent behavior during execution.',
        remember: 'Observe What the Agent Is Doing',
        tip: 'Mention LangSmith.',
      },
      {
        heading: '25. What is AI Agent Evaluation?',
        body: 'Agent evaluation measures how effectively an AI agent performs tasks and achieves expected outcomes.',
        remember: 'Testing Agent Performance',
        tip: 'Mention accuracy and reliability.',
      },
      {
        heading: '26. What is Prompt Injection?',
        body: 'Prompt Injection is a security attack where malicious instructions manipulate an AI system\'s behavior.',
        remember: 'Hacking Through Prompts',
        tip: 'Mention security risks.',
      },
      {
        heading: '27. What is an AI Workflow?',
        body: 'An AI workflow is a sequence of steps that combines reasoning, retrieval, tool usage, and execution to complete a task.',
        remember: 'AI Workflow = Automated Process',
        tip: 'Mention LangGraph workflows.',
      },
      {
        heading: '28. What is Local Inference?',
        body: 'Local inference refers to running an AI model on local hardware instead of using cloud APIs.',
        remember: 'Run AI On Your Own Machine',
        tip: 'Mention Ollama and Llama 3.',
      },
      {
        heading: '29. What is Ollama?',
        body: 'Ollama is a tool that enables developers to run and manage open-source LLMs locally.',
        remember: 'Ollama = Local LLM Runner',
        tip: 'Mention privacy and offline usage.',
      },
      {
        heading: '30. What is the role of an Agentic AI Engineer?',
        body: 'An Agentic AI Engineer designs, develops, deploys, and monitors AI agents that can reason, retrieve information, use tools, automate workflows, and solve real-world business problems.',
        remember: 'Build AI Systems That Think and Act',
        tip: 'Mention LLMs, RAG, LangChain, LangGraph, CrewAI, APIs, and production deployment.',
      },
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

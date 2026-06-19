import type { PageSeo } from '@/lib/seo';

type ResourceSeoEntry = Pick<PageSeo, 'title' | 'description'>;

export const RESOURCE_PAGE_SEO: Record<string, ResourceSeoEntry> = {
  'devops-roadmap-2026': {
    title: 'DevOps Roadmap 2026 — Zyvotrix Free Learning Guide',
    description:
      'Free 2026 DevOps roadmap from Zyvotrix: Linux, Docker, Kubernetes, Terraform, CI/CD, and AIOps. Step-by-step path for working professionals in Bengaluru and online.',
  },
  'agentic-ai-engineer-roadmap-2026': {
    title: 'Agentic AI Engineer Roadmap 2026 — Zyvotrix',
    description:
      'Free Agentic AI engineer roadmap by Zyvotrix: LLMs, RAG, LangChain, LangGraph, CrewAI, and production agents. Learn AI engineering step by step.',
  },
  'aws-solutions-architect-roadmap-2026': {
    title: 'AWS Solutions Architect Roadmap 2026 — Zyvotrix',
    description:
      'Free AWS Solutions Architect roadmap from Zyvotrix aligned to SAA-C03. EC2, S3, VPC, IAM, Lambda, and cloud architecture for certification success.',
  },
  'data-science-roadmap-2026': {
    title: 'Data Science & ML Roadmap 2026 — Zyvotrix',
    description:
      'Free Data Science and Machine Learning roadmap by Zyvotrix: Python, SQL, Pandas, statistics, and ML projects for analyst and data scientist roles.',
  },
  'docker-vs-kubernetes': {
    title: 'Docker vs Kubernetes — Zyvotrix DevOps Guide',
    description:
      'Learn when to use Docker vs Kubernetes in production DevOps. Free Zyvotrix guide comparing containers, orchestration, and real-world deployment workflows.',
  },
  'what-is-terraform': {
    title: 'What is Terraform? — Zyvotrix DevOps Guide',
    description:
      'What is Terraform and why DevOps teams use Infrastructure as Code? Free Zyvotrix guide to repeatable cloud and DevOps deployments with Terraform.',
  },
  'cicd-explained': {
    title: 'CI/CD Explained — Zyvotrix DevOps Guide',
    description:
      'CI/CD explained for beginners and professionals. Free Zyvotrix guide to Continuous Integration and Delivery — ship code safely and faster.',
  },
  'kubernetes-interview-questions': {
    title: 'Kubernetes Interview Questions — Zyvotrix DevOps Prep',
    description:
      'Top Kubernetes interview questions for DevOps and platform engineering roles. Free prep guide from Zyvotrix with concepts recruiters ask most.',
  },
  'what-is-agentic-ai': {
    title: 'What is Agentic AI? — Zyvotrix Agentic AI Guide',
    description:
      'What is Agentic AI? Free Zyvotrix guide: how LLM agents plan, reason, use tools, and go beyond chatbots for real-world automation.',
  },
  'langchain-vs-langgraph': {
    title: 'LangChain vs LangGraph — Zyvotrix AI Guide',
    description:
      'LangChain vs LangGraph compared for production AI systems. Free Zyvotrix guide to chains, stateful agents, and workflow design.',
  },
  'rag-explained': {
    title: 'RAG Explained — Zyvotrix Agentic AI Guide',
    description:
      'RAG (Retrieval-Augmented Generation) explained simply. Free Zyvotrix guide to grounding LLMs on your data for accurate, reliable answers.',
  },
  'crewai-tutorial': {
    title: 'CrewAI Tutorial — Zyvotrix Multi-Agent AI Guide',
    description:
      'CrewAI tutorial for building multi-agent AI teams. Free Zyvotrix guide to collaborative task execution with modern Agentic AI tools.',
  },
  'ai-agent-project-ideas': {
    title: 'AI Agent Project Ideas — Zyvotrix Portfolio Guide',
    description:
      'Portfolio-worthy AI agent project ideas from Zyvotrix. Build Agentic AI projects that stand out in interviews and job applications.',
  },
  'aws-beginner-guide': {
    title: 'AWS Beginner Guide — Zyvotrix Cloud Training',
    description:
      'AWS beginner guide from Zyvotrix: core cloud services, free tier, IAM, EC2, S3, and your first architecture patterns explained clearly.',
  },
  'ec2-vs-lambda': {
    title: 'EC2 vs Lambda — Zyvotrix AWS Architecture Guide',
    description:
      'EC2 vs AWS Lambda — when to use each? Free Zyvotrix guide for cloud architects comparing compute options, cost, and scalability.',
  },
  'aws-iam-explained': {
    title: 'AWS IAM Explained — Zyvotrix Cloud Security Guide',
    description:
      'AWS IAM explained: users, roles, policies, and least-privilege security. Free Zyvotrix guide for Solutions Architect and cloud engineer roles.',
  },
  'saa-c03-preparation-guide': {
    title: 'AWS SAA-C03 Preparation Guide — Zyvotrix',
    description:
      'How to prepare for AWS Certified Solutions Architect Associate (SAA-C03). Free Zyvotrix study guide with topics, projects, and exam strategy.',
  },
  'aws-project-ideas': {
    title: 'AWS Project Ideas — Zyvotrix Cloud Portfolio Guide',
    description:
      'AWS project ideas for cloud engineer and Solutions Architect interviews. Free Zyvotrix guide to portfolio projects recruiters want to see.',
  },
  'python-for-data-science': {
    title: 'Python for Data Science — Zyvotrix Free Guide',
    description:
      'Python for Data Science essentials from Zyvotrix: data analysis, ML foundations, and analytics skills for career-ready portfolios.',
  },
  'sql-roadmap': {
    title: 'SQL Roadmap for Data Analysis — Zyvotrix',
    description:
      'SQL roadmap for data analysts and scientists. Free Zyvotrix guide: queries, joins, aggregations, and business reporting skills.',
  },
  'eda-guide': {
    title: 'EDA Guide — Zyvotrix Data Science Resource',
    description:
      'Exploratory Data Analysis (EDA) guide from Zyvotrix. Learn how to understand datasets, find insights, and prepare data for modeling.',
  },
  'machine-learning-roadmap': {
    title: 'Machine Learning Roadmap — Zyvotrix Data Science',
    description:
      'Machine Learning roadmap by Zyvotrix: statistics to supervised and unsupervised ML with Scikit-learn. Free structured learning path.',
  },
  'data-analyst-portfolio-projects': {
    title: 'Data Analyst Portfolio Projects — Zyvotrix',
    description:
      'Data analyst portfolio project ideas from Zyvotrix. Prove your SQL, Python, and visualization skills to international employers.',
  },
  'devops-interview-questions': {
    title: 'Top 30 DevOps Interview Questions & Answers — Zyvotrix',
    description:
      'Top 30 DevOps interview questions with answers from Zyvotrix. CI/CD, Docker, Kubernetes, Terraform, AWS, monitoring, and DevSecOps prep.',
  },
  'aws-interview-questions': {
    title: 'Top 30 AWS Interview Questions & Answers — Zyvotrix',
    description:
      'Top 30 AWS interview questions with answers from Zyvotrix. EC2, S3, VPC, IAM, Lambda, RDS, and Solutions Architect interview prep.',
  },
  'data-science-interview-questions': {
    title: 'Top 30 Data Science Interview Questions — Zyvotrix',
    description:
      'Top 30 Data Science interview questions with answers from Zyvotrix. Python, Pandas, EDA, machine learning, and MLOps interview prep.',
  },
  'ai-engineer-interview-questions': {
    title: 'Top 30 AI Engineer Interview Questions — Zyvotrix',
    description:
      'Top 30 AI Engineer interview questions with answers from Zyvotrix. LLMs, RAG, agents, LangChain, and production AI deployment prep.',
  },
  'how-to-transition-into-devops': {
    title: 'How to Transition into DevOps — Zyvotrix Career Guide',
    description:
      'How to transition into DevOps from development, support, or IT. Free Zyvotrix career guide with skills, timeline, and portfolio tips.',
  },
  'how-to-become-an-ai-engineer': {
    title: 'How to Become an AI Engineer — Zyvotrix Career Guide',
    description:
      'How to become an AI or Agentic AI engineer in 2026. Free Zyvotrix career path from Python developer to production AI systems.',
  },
  'aws-career-path': {
    title: 'AWS Career Path — Zyvotrix Cloud Career Guide',
    description:
      'AWS career path guide from Zyvotrix: cloud engineer, Solutions Architect, and DevOps roles — skills, certifications, and salary outlook.',
  },
  'data-science-career-roadmap': {
    title: 'Data Science Career Roadmap — Zyvotrix',
    description:
      'Data Science career roadmap by Zyvotrix: from beginner to data analyst and junior data scientist — skills, projects, and timeline.',
  },
};

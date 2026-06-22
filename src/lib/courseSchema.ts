import type { Course } from '@/lib/courses';
import { PROGRAM_PRICES } from '@/lib/coursePricing';
import { BASE_URL, ZYVOTRIX_ORGANIZATION } from '@/lib/seo';

const LEAD_INSTRUCTOR = 'Mohammad Shafaque Arif';

const COURSE_SCHEMA_META: Record<
  Course['code'],
  { courseCode: string; priceInr: string; courseWorkload: string }
> = {
  DOP: { courseCode: 'ZYV-DOP-01', priceInr: '24179', courseWorkload: 'PT64H' },
  AAC: { courseCode: 'ZYV-AAC-01', priceInr: '23689', courseWorkload: 'PT48H' },
  AWS: { courseCode: 'ZYV-AWS-01', priceInr: '19569', courseWorkload: 'PT48H' },
  DSP: { courseCode: 'ZYV-DSP-01', priceInr: '22569', courseWorkload: 'PT48H' },
};

interface DetailedCourseSchemaFields {
  urlPath: string;
  imagePath: string;
  longDescription: string;
  educationalLevel: string;
  educationalCredentialAwarded: string;
  teaches: string[];
  syllabusSections: string[];
  timeRequired: string;
  coursePrerequisites: string;
  audienceTypes: string[];
  keywords: string;
  instructorDescription: string;
}

const DETAILED_COURSE_SCHEMA: Partial<Record<Course['code'], DetailedCourseSchemaFields>> = {
  DOP: {
    urlPath: '/courses/devops-engineer-program',
    imagePath: '/images/programs/dop-hero.png',
    longDescription:
      '4-month AI-powered DevOps Engineer certification with live mentor-led sessions, 12+ hands-on labs, 4 portfolio projects, CI/CD pipelines, Docker, Kubernetes, Terraform, DevSecOps, and AIOps. Includes career support, professional certificate, and lifetime access to session recordings.',
    educationalLevel: 'Professional Certification',
    educationalCredentialAwarded: 'AI-Powered DevOps Engineer Certificate (DOP)',
    teaches: [
      'Linux Administration & Shell Automation',
      'Cloud Infrastructure on AWS',
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipeline Automation',
      'Infrastructure as Code with Terraform & Ansible',
      'DevSecOps & Security Automation',
      'Monitoring, Observability & SRE',
      'AI-Powered DevOps & AIOps',
      'Production Deployments & Reliability Engineering',
    ],
    syllabusSections: [
      'DevOps Foundations & Cloud Operations',
      'Containerization, Kubernetes & CI/CD',
      'Infrastructure Automation & DevSecOps',
      'AI Operations, Observability & Reliability Engineering',
    ],
    timeRequired: 'PT100H',
    coursePrerequisites:
      'Basic computer skills; no prior DevOps experience required. Familiarity with programming is helpful but not mandatory. Suitable for developers, IT professionals, sysadmins, and career switchers.',
    audienceTypes: [
      'Software Developers',
      'Cloud & IT Professionals',
      'System Administrators',
      'QA & Support Engineers',
      'DevOps Engineers',
      'Cloud Engineers',
      'Platform Engineers',
      'Site Reliability Engineers',
    ],
    keywords:
      'DevOps certification, DevOps training, AI-powered DevOps, Kubernetes course, CI/CD training, Terraform course, DevOps engineer program, cloud DevOps certification, DevOps course online 2026',
    instructorDescription: 'Industry practitioners with production DevOps and cloud infrastructure expertise',
  },
  AAC: {
    urlPath: '/courses/aac',
    imagePath: '/images/programs/aac-hero.png',
    longDescription:
      '3-month Agentic AI certification with live mentor-led sessions, 12 modules, 9+ portfolio builds, and production AI agent deployment. Covers LLMs, prompt engineering, LangChain, LangGraph, RAG, multi-agent systems, CrewAI, AutoGen, FastAPI, Docker, and AI observability. Includes career support and verifiable certificate.',
    educationalLevel: 'Professional Certification',
    educationalCredentialAwarded: 'Zyvotrix Certified Agentic AI Engineer (AAC)',
    teaches: [
      'Large Language Models & Prompt Engineering',
      'Function Calling & Structured AI Outputs',
      'LangChain Pipelines & AI Agents',
      'RAG Systems & Vector Databases',
      'AI Memory & Context Management',
      'LangGraph Workflow Orchestration',
      'Multi-Agent Systems with CrewAI & AutoGen',
      'AI Observability, Tracing & Evaluation',
      'Agent Deployment with FastAPI & Docker',
      'Cloud AI on AWS Bedrock & Azure OpenAI',
    ],
    syllabusSections: [
      'LLM Foundations',
      'Agent Engineering',
      'Multi-Agent & Production',
    ],
    timeRequired: 'PT80H',
    coursePrerequisites:
      'No prior AI or machine learning experience required. The program starts with LLM foundations and progresses to advanced agent architectures. Suitable for software developers, CS/IT graduates, AI enthusiasts, and tech professionals.',
    audienceTypes: [
      'Software Developers',
      'CS & IT Graduates',
      'AI Enthusiasts',
      'Tech Professionals',
      'Agentic AI Engineers',
      'LLM Engineers',
      'Generative AI Engineers',
      'AI Application Developers',
    ],
    keywords:
      'Agentic AI certification, Agentic AI training, LLM course, LangChain course, LangGraph training, RAG course, multi-agent AI, AI agent development, generative AI engineer program, AI automation course 2026',
    instructorDescription: 'Practitioners who build LLM applications, agents, and production AI systems',
  },
  AWS: {
    urlPath: '/courses/aws',
    imagePath: '/images/programs/aws-hero.png',
    longDescription:
      '3-month AWS Solutions Architect certification program with SAA-C03 exam preparation, live mentor-led sessions, and 7+ hands-on cloud architecture projects. Covers EC2, S3, VPC, IAM, RDS, Lambda, CloudWatch, Terraform, and the AWS Well-Architected Framework. Includes career support and professional certificate.',
    educationalLevel: 'Professional Certification',
    educationalCredentialAwarded: 'Zyvotrix Certified AWS Solutions Architect (SAA-C03 Track)',
    teaches: [
      'Cloud Computing & AWS Global Infrastructure',
      'IAM, Security & Compliance',
      'EC2, S3 & Core AWS Compute & Storage',
      'VPC Networking & Multi-Tier Architecture',
      'Load Balancing, Auto Scaling & High Availability',
      'RDS, DynamoDB & Managed Databases',
      'Route 53, CloudFront & Global Delivery',
      'Serverless with Lambda & API Gateway',
      'Monitoring, Cost Optimization & CloudWatch',
      'Infrastructure as Code with Terraform & CloudFormation',
      'AWS Well-Architected Framework & SAA-C03 Exam Prep',
    ],
    syllabusSections: [
      'AWS Foundations',
      'Core Architecture',
      'Production Architecture',
    ],
    timeRequired: 'PT80H',
    coursePrerequisites:
      'Basic computer skills with no prior AWS experience required. Familiarity with programming or scripting is helpful but not mandatory. Suitable for beginners, developers, IT professionals, and SAA-C03 certification aspirants.',
    audienceTypes: [
      'Beginners & Career Switchers',
      'Developers & DevOps Engineers',
      'IT Professionals',
      'Certification Aspirants',
      'AWS Solutions Architects',
      'Cloud Engineers',
      'Cloud Administrators',
      'Infrastructure Engineers',
    ],
    keywords:
      'AWS Solutions Architect certification, SAA-C03 training, AWS certification course, cloud architect program, AWS training online, Terraform AWS course, AWS exam preparation, cloud computing certification 2026',
    instructorDescription: 'AWS-certified mentors with production cloud architecture and SAA-C03 exam expertise',
  },
  DSP: {
    urlPath: '/courses/data-science',
    imagePath: '/images/programs/ds-hero.png',
    longDescription:
      '3-month Data Science & Machine Learning with Python certification for working professionals. Live mentor-led sessions, Python, SQL, statistics, visualization, business analytics, and ML modelling with 6+ portfolio projects. Includes Streamlit deployment, GitHub portfolio development, career support, and professional certificate.',
    educationalLevel: 'Professional Certification',
    educationalCredentialAwarded: 'Data Science & Machine Learning with Python Certificate (DSP)',
    teaches: [
      'Python for Data Science',
      'NumPy, Pandas & Data Wrangling',
      'Data Cleaning & Exploratory Data Analysis',
      'SQL for Business Analytics',
      'Statistics & Hypothesis Testing',
      'Data Visualization with Matplotlib & Seaborn',
      'Business Analytics & Dashboard Development',
      'Machine Learning Workflow & Feature Engineering',
      'Regression, Classification & Clustering',
      'Model Deployment with Streamlit',
      'GitHub Portfolio & Interview Preparation',
    ],
    syllabusSections: [
      'Python, SQL & Data Analysis Foundations',
      'Statistics, Visualization & Business Analytics',
      'Machine Learning & Portfolio Development',
    ],
    timeRequired: 'PT80H',
    coursePrerequisites:
      'No prior programming experience required — the program starts from Python basics. Designed for international working professionals with weekend live sessions. Basic math familiarity helps but is not mandatory.',
    audienceTypes: [
      'International Working Professionals',
      'Career Switchers',
      'Business & Analytics Professionals',
      'Beginners with No CS Background',
      'Data Analysts',
      'Junior Data Scientists',
      'Business Analysts',
      'Analytics Engineers',
    ],
    keywords:
      'Data Science certification, Machine Learning course Python, Data Analyst training, SQL for data analysis, business analytics course, ML with Python certification, data science course online, data analyst program 2026',
    instructorDescription: 'Data science mentors with industry experience in analytics, ML, and business intelligence',
  },
};

export function buildCourseSchema(course: Course) {
  const meta = COURSE_SCHEMA_META[course.code];
  if (!meta) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: ZYVOTRIX_ORGANIZATION,
    courseCode: meta.courseCode,
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: meta.courseWorkload,
        instructor: [
          {
            '@type': 'Person',
            name: LEAD_INSTRUCTOR,
          },
        ],
      },
    ],
    offers: [
      {
        '@type': 'Offer',
        price: meta.priceInr,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        category: 'Paid',
      },
    ],
  };
}

export function buildDetailedCourseSchema(course: Course) {
  const meta = COURSE_SCHEMA_META[course.code];
  const detailed = DETAILED_COURSE_SCHEMA[course.code];
  if (!meta || !detailed) return buildCourseSchema(course);

  const url = `${BASE_URL}${detailed.urlPath}`;
  const image = `${BASE_URL}${detailed.imagePath}`;
  const prices = PROGRAM_PRICES[course.code];

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: detailed.longDescription,
    url,
    image,
    provider: ZYVOTRIX_ORGANIZATION,
    courseCode: meta.courseCode,
    educationalLevel: detailed.educationalLevel,
    educationalCredentialAwarded: detailed.educationalCredentialAwarded,
    teaches: detailed.teaches,
    syllabusSections: detailed.syllabusSections,
    timeRequired: detailed.timeRequired,
    coursePrerequisites: detailed.coursePrerequisites,
    inLanguage: 'en',
    availableLanguage: 'English',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: meta.courseWorkload,
      instructor: {
        '@type': 'Person',
        name: LEAD_INSTRUCTOR,
        description: detailed.instructorDescription,
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'India — Full Program',
          price: meta.priceInr,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url,
        },
        ...(prices
          ? [
              {
                '@type': 'Offer',
                name: 'International — Full Program',
                price: String(prices.usdInternational),
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url,
              },
            ]
          : []),
      ],
    },
    audience: {
      '@type': 'Audience',
      audienceType: detailed.audienceTypes,
    },
    isAccessibleForFree: false,
    keywords: detailed.keywords,
  };
}

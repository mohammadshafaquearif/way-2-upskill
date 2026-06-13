import React from 'react';
import { Link } from 'react-router-dom';
import EnrollButton from '@/components/EnrollButton';
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Hammer,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageCta from '@/components/PageCta';
import AmbientDepth from '@/components/motion/AmbientDepth';
import AwsHeroVisual from '@/components/motion/AwsHeroVisual';
import DepthCard from '@/components/motion/DepthCard';
import { Reveal3D, RevealStagger } from '@/components/motion/Reveal3D';
import { Button } from '@/components/ui/button';
import ProgramAdvantageSection, {
  type ProgramAdvantageContent,
} from '@/components/courses/ProgramAdvantageSection';
import ProgramCurriculumAccordion, {
  type CurriculumCapstone,
} from '@/components/courses/ProgramCurriculumAccordion';
import ProgramCurriculumStickySidebar from '@/components/courses/ProgramCurriculumStickySidebar';
import ProgramInquirySidebar from '@/components/courses/ProgramInquirySidebar';
import ProgramIndustryProjects, {
  type IndustryProject,
} from '@/components/courses/ProgramIndustryProjects';
import ProgramLearningExperience, {
  type LearningFeatureBlock,
} from '@/components/courses/ProgramLearningExperience';
import ProgramSectionAside from '@/components/courses/ProgramSectionAside';
import FAQList from '@/components/FAQList';
import { AWS_TOOLS } from '@/lib/awsTools';
import { COURSE_BY_ID } from '@/lib/courses';
import type { FaqItem } from '@/lib/faqs';
import { IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { usePageMeta } from '@/hooks/usePageMeta';

const course = COURSE_BY_ID.aws;
const visuals = IMAGES.programVisuals.aws;

const curriculum = [
  {
    phase: 'Phase 1',
    label: 'AWS Foundations',
    meta: 'Weeks 1–4 · Modules 1–4',
    outcome:
      'Secure AWS account, core compute & storage services — ready to design your first cloud workloads.',
    modules: [
      {
        id: 1,
        title: 'Cloud Computing Fundamentals',
        topics: [
          'What is cloud computing?',
          'IaaS, PaaS & SaaS service models',
          'Public, private & hybrid cloud',
          'AWS global infrastructure',
          'Regions & Availability Zones',
          'AWS Shared Responsibility Model',
        ],
        project: {
          label: 'Lab',
          title: 'AWS Account Setup',
          description: 'Create your AWS account, enable MFA, and configure billing alerts for a secure learning environment.',
        },
      },
      {
        id: 2,
        title: 'IAM & Security',
        topics: [
          'IAM users, groups & roles',
          'IAM policies & permission boundaries',
          'MFA & credential security',
          'AWS Organizations basics',
        ],
        project: {
          label: 'Lab',
          title: 'Secure AWS Account Setup',
          description: 'Apply least-privilege IAM policies, MFA, and organizational guardrails for a production-style baseline.',
        },
      },
      {
        id: 3,
        title: 'Compute Services',
        topics: [
          'Amazon EC2 instance types & AMIs',
          'EBS volumes & snapshots',
          'Placement groups',
          'Launch templates',
        ],
        project: {
          label: 'Lab',
          title: 'Deploy Linux Web Server',
          description: 'Launch and harden an EC2 instance, attach EBS storage, and serve a web application.',
        },
      },
      {
        id: 4,
        title: 'Storage Services',
        topics: [
          'Amazon S3 & storage classes',
          'EBS vs EFS',
          'Lifecycle policies & versioning',
          'Encryption at rest & in transit',
        ],
        project: {
          label: 'Lab',
          title: 'Static Website Hosting using S3',
          description: 'Host a static site on S3 with secure access controls, lifecycle rules, and encryption.',
        },
      },
    ],
  },
  {
    phase: 'Phase 2',
    label: 'Core Architecture',
    meta: 'Weeks 5–8 · Modules 5–8',
    outcome:
      'Design VPC-based, highly available architectures with managed databases and global delivery.',
    modules: [
      {
        id: 5,
        title: 'Networking & VPC',
        topics: [
          'VPCs, subnets & route tables',
          'Internet Gateway & NAT Gateway',
          'Security groups vs NACLs',
          'Public & private tier design',
        ],
        project: {
          label: 'Lab',
          title: 'Custom Production VPC',
          description: 'Architect a multi-tier VPC with controlled internet access and secure inter-tier routing.',
        },
      },
      {
        id: 6,
        title: 'Load Balancing & Auto Scaling',
        topics: [
          'Application Load Balancer (ALB)',
          'Network Load Balancer (NLB)',
          'Target groups & health checks',
          'Auto Scaling groups & policies',
        ],
        project: {
          label: 'Lab',
          title: 'Highly Available Web Application',
          description: 'Deploy a load-balanced, auto-scaling web tier that survives instance failures.',
        },
      },
      {
        id: 7,
        title: 'Databases',
        topics: [
          'Amazon RDS & Multi-AZ',
          'DynamoDB fundamentals',
          'ElastiCache for performance',
          'Amazon Aurora overview',
        ],
        project: {
          label: 'Lab',
          title: '3-Tier Architecture Deployment',
          description: 'Connect web, application, and database tiers inside a VPC with managed RDS storage.',
        },
      },
      {
        id: 8,
        title: 'DNS & CDN',
        topics: [
          'Route 53 routing policies',
          'CloudFront CDN delivery',
          'AWS Certificate Manager (ACM)',
        ],
        project: {
          label: 'Lab',
          title: 'Global Content Delivery Setup',
          description: 'Route traffic through Route 53 and CloudFront with HTTPS via ACM.',
        },
      },
    ],
  },
  {
    phase: 'Phase 3',
    label: 'Production Architecture',
    meta: 'Weeks 9–12 · Modules 9–12',
    outcome:
      'Ship serverless APIs, monitor workloads, automate with Terraform, and prepare for the AWS Certified Solutions Architect Associate (SAA-C03) exam.',
    modules: [
      {
        id: 9,
        title: 'Serverless AWS',
        topics: [
          'AWS Lambda & execution models',
          'API Gateway REST APIs',
          'SNS & SQS messaging',
          'EventBridge event routing',
        ],
        project: {
          label: 'Lab',
          title: 'Serverless REST API',
          description: 'Build an event-driven API with Lambda, API Gateway, and managed data storage.',
        },
      },
      {
        id: 10,
        title: 'Monitoring & Cost Optimization',
        topics: [
          'CloudWatch metrics, logs & alarms',
          'CloudTrail auditing',
          'AWS Config compliance',
          'Budgets, Cost Explorer & Trusted Advisor',
        ],
        project: {
          label: 'Lab',
          title: 'Cloud Operations Dashboard',
          description: 'Set up monitoring, alerting, audit trails, and cost visibility for a live AWS workload.',
        },
      },
      {
        id: 11,
        title: 'Infrastructure as Code',
        topics: [
          'CloudFormation templates & stacks',
          'Terraform on AWS',
          'State management & modules',
        ],
        project: {
          label: 'Lab',
          title: 'Provision Infrastructure using Terraform',
          description: 'Define and deploy a repeatable AWS environment with version-controlled Terraform modules.',
        },
      },
      {
        id: 12,
        title: 'HA, DR & SAA-C03 Exam Preparation',
        topics: [
          'Multi-AZ & multi-region patterns',
          'Backup, restore & DR planning (RTO/RPO)',
          'AWS Well-Architected Framework',
          'SAA-C03 exam domains & scenario questions',
          'Architecture trade-offs: security, cost, reliability',
        ],
        project: {
          label: 'Lab',
          title: 'Enterprise HA Architecture + Exam Review',
          description:
            'Design a fault-tolerant architecture and complete scenario-based reviews aligned to the AWS Certified Solutions Architect Associate (SAA-C03) exam.',
        },
      },
    ],
  },
];

const curriculumCapstone: CurriculumCapstone = {
  title: 'Netflix-Style OTT Platform Architecture',
  description:
    'Design and deploy a production-grade streaming platform architecture — the capstone that ties together everything you learn across 12 weeks and proves SAA-C03-ready solution design.',
  builds: [
    'VPC & multi-tier networking',
    'EC2 with Auto Scaling',
    'Application Load Balancer',
    'Route 53 & CloudFront',
    'RDS & S3 storage',
    'Lambda integrations',
    'CloudWatch monitoring',
    'Terraform provisioning',
  ],
  demonstrates: [
    'Architecture diagram',
    'Terraform code',
    'AWS deployment',
    'Cost estimation',
    'Security review',
    'Disaster recovery plan',
  ],
  skills: [
    'VPC',
    'EC2',
    'Auto Scaling',
    'ALB',
    'Route 53',
    'CloudFront',
    'RDS',
    'S3',
    'Lambda',
    'CloudWatch',
    'Terraform',
    'Well-Architected Framework',
  ],
};

const curriculumPhaseOverview = [
  {
    phase: 'Phase 1',
    title: 'AWS Foundations',
    weeks: 'Weeks 1–4',
    modules: [
      'Cloud Computing Fundamentals',
      'AWS Global Infrastructure',
      'IAM & Security',
      'EC2 & Compute Services',
      'S3 & Storage Services',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Core Architecture',
    weeks: 'Weeks 5–8',
    modules: [
      'VPC Networking',
      'Load Balancing & Auto Scaling',
      'RDS & DynamoDB',
      'Route 53 & CloudFront',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Production Architecture',
    weeks: 'Weeks 9–12',
    modules: [
      'Lambda & Serverless',
      'Monitoring & CloudWatch',
      'Cost Optimization',
      'Terraform & CloudFormation',
      'SAA-C03 Exam Preparation',
    ],
  },
];

const programCommitment = [
  { label: 'Live Sessions', value: '4 Hours / Week' },
  { label: 'Hands-On Practice', value: '3–5 Hours / Week' },
  { label: 'Duration', value: '12 Weeks' },
  { label: 'Total Learning', value: '80+ Hours' },
];

const skillsMaster = [
  'AWS',
  'EC2',
  'S3',
  'IAM',
  'VPC',
  'Route 53',
  'CloudFront',
  'RDS',
  'DynamoDB',
  'Lambda',
  'API Gateway',
  'CloudWatch',
  'CloudTrail',
  'Terraform',
  'Linux',
  'Git',
  'Docker',
];

const careerPaths = [
  'AWS Solutions Architect',
  'Cloud Engineer',
  'Cloud Administrator',
  'AWS Engineer',
  'Cloud Consultant',
  'Infrastructure Engineer',
  'DevOps Engineer (AWS Focus)',
];

const portfolioGraduationItems = [
  '7 Industry Projects',
  '1 Enterprise Capstone',
  '1 Terraform Infrastructure Project',
  'AWS Architecture Portfolio',
  'Architecture Diagrams',
  'GitHub Repositories',
  'Interview-Ready Documentation',
];

const prerequisites = [
  'Basic computer skills — no prior AWS experience required',
  'Helpful but not mandatory: familiarity with any programming or scripting language',
  'Suitable for beginners, developers, IT professionals, and certification aspirants',
  'Designed for working professionals — weekend live AWS training program',
];

const programFaqs: FaqItem[] = [
  {
    id: 'aws-what-is',
    category: 'programs',
    question: 'What is AWS Solutions Architect?',
    answer:
      'An AWS Solutions Architect designs scalable, secure, and cost-effective cloud solutions on Amazon Web Services. This role combines architecture design, networking, security, and operational best practices — and is one of the most in-demand cloud career paths globally.',
  },
  {
    id: 'aws-beginners',
    category: 'programs',
    question: 'Is AWS good for beginners?',
    answer:
      'Yes. This AWS certification course starts from cloud computing fundamentals and builds step-by-step through IAM, EC2, S3, VPC, and production architecture. No prior cloud experience is required.',
  },
  {
    id: 'aws-saa-included',
    category: 'programs',
    question: 'Is SAA-C03 exam preparation included?',
    answer:
      'Yes. The program includes dedicated SAA-C03 exam preparation covering all exam domains, scenario-based architecture reviews, and trade-off analysis for the AWS Certified Solutions Architect Associate certification.',
  },
  {
    id: 'aws-projects',
    category: 'programs',
    question: 'What projects will I build?',
    answer:
      'You will build 7 industry projects including a Secure AWS Landing Zone, Static Website Platform, Serverless API, Multi-Tier Application, HA E-Commerce Platform, Cloud Operations Center, and Terraform Infrastructure — plus a Netflix-style OTT capstone.',
  },
  {
    id: 'aws-recordings',
    category: 'learning',
    question: 'Will I get session recordings?',
    answer:
      'Yes. All live sessions are recorded and available for review so you can revisit concepts, labs, and architecture walkthroughs at your own pace.',
  },
  {
    id: 'aws-live',
    category: 'learning',
    question: 'Is this AWS training program live?',
    answer:
      'Yes. This is a live, instructor-led AWS architect training program with weekend sessions (2 hours per day), hands-on labs, and mentor feedback on your architectures.',
  },
  {
    id: 'aws-coding',
    category: 'technical',
    question: 'Do I need coding experience?',
    answer:
      'No advanced coding is required. Basic scripting familiarity helps for Terraform and automation labs, but the program is architecture-focused — not a software development bootcamp.',
  },
  {
    id: 'aws-jobs',
    category: 'career',
    question: 'What jobs can I apply for after this program?',
    answer:
      'Graduates pursue roles such as AWS Solutions Architect, Cloud Engineer, Cloud Administrator, AWS Engineer, Cloud Consultant, Infrastructure Engineer, and DevOps Engineer (AWS focus).',
  },
  {
    id: 'aws-duration',
    category: 'programs',
    question: 'What is the duration of this AWS certification course?',
    answer:
      'The program runs for 3 months (12 weeks) with weekend live classes and hands-on practice — designed to be realistically completable while working full-time.',
  },
  {
    id: 'aws-cert-included',
    category: 'programs',
    question: 'Is AWS certification included in the course fee?',
    answer:
      'The program includes SAA-C03 exam preparation, architecture coaching, and the Zyvotrix Certified AWS Solutions Architect certificate. The official AWS exam voucher is purchased separately through AWS.',
  },
  {
    id: 'aws-vs-simplilearn',
    category: 'programs',
    question: 'How is this different from Simplilearn or Edureka AWS courses?',
    answer:
      'Zyvotrix focuses on AWS-only essentials — no Azure or GCP filler — with 7 portfolio projects, a production capstone, Terraform labs, and SAA-C03 alignment in a focused 3-month AWS cloud certification program.',
  },
  {
    id: 'aws-working-pros',
    category: 'learning',
    question: 'Is this suitable for working professionals?',
    answer:
      'Yes. The AWS training program is built for working professionals with 4 hours/week of live sessions and 3–5 hours/week of hands-on AWS labs — approximately 7–9 hours total per week.',
  },
  {
    id: 'aws-tools',
    category: 'technical',
    question: 'What AWS services and tools are covered?',
    answer:
      'EC2, VPC, S3, IAM, RDS, DynamoDB, Route 53, CloudFront, Lambda, API Gateway, SNS, SQS, CloudWatch, CloudTrail, Auto Scaling, ELB, CloudFormation, Terraform, Git, Linux, and Docker basics.',
  },
  {
    id: 'aws-portfolio',
    category: 'career',
    question: 'Will I have a portfolio after completing the program?',
    answer:
      'Yes. You graduate with 7 industry projects, an enterprise capstone, Terraform infrastructure, architecture diagrams, GitHub repositories, and interview-ready documentation.',
  },
  {
    id: 'aws-career-2026',
    category: 'career',
    question: 'Is AWS still a good career choice in 2026 and beyond?',
    answer:
      'Yes. AWS remains the leading cloud platform globally. Organizations continue hiring cloud architects, cloud engineers, and AWS-certified professionals for migration, modernization, and production operations.',
  },
  {
    id: 'aws-associate',
    category: 'programs',
    question: 'Does this prepare me for AWS Solutions Architect Associate?',
    answer:
      'Yes. The curriculum maps directly to the AWS Certified Solutions Architect Associate (SAA-C03) exam domains with hands-on labs, architecture design exercises, and scenario-based reviews.',
  },
  {
    id: 'aws-missed-session',
    category: 'learning',
    question: 'What happens if I miss a live session?',
    answer:
      'Recorded sessions are available so you can catch up on lectures, demos, and lab walkthroughs without falling behind the cohort.',
  },
  {
    id: 'aws-zyvotrix-cert',
    category: 'programs',
    question: 'Do I receive a Zyvotrix certificate?',
    answer:
      'Yes. Upon completing all modules, projects, and the capstone review, you receive the Zyvotrix Certified AWS Solutions Architect certificate — shareable on LinkedIn with a digital badge.',
  },
];

const awsFaqColLeft = programFaqs.slice(0, 9);
const awsFaqColRight = programFaqs.slice(9);

const whyAws = [
  {
    icon: Cloud,
    title: 'Cloud-First Careers',
    desc: 'AWS powers the majority of modern startups and enterprises — Solutions Architect skills are in constant demand.',
  },
  {
    icon: Layers,
    title: 'Architecture Thinking',
    desc: 'Learn to design scalable, secure systems — not just click through the AWS console.',
  },
  {
    icon: Shield,
    title: 'Security by Design',
    desc: 'IAM, encryption, network isolation, and compliance patterns built into every module and project.',
  },
  {
    icon: Network,
    title: 'Networking Mastery',
    desc: 'VPCs, subnets, load balancers, and DNS — the backbone of every production AWS deployment.',
  },
  {
    icon: Database,
    title: 'Data & Storage',
    desc: 'S3, RDS, DynamoDB, and caching strategies for real-world application workloads.',
  },
  {
    icon: Server,
    title: 'Production Patterns',
    desc: 'High availability, auto scaling, monitoring, and cost optimization for systems that run at scale.',
  },
];

const audience = [
  {
    icon: GraduationCap,
    title: 'Beginners & Career Switchers',
    desc: 'Start from cloud fundamentals and build toward AWS Solutions Architect certification readiness.',
  },
  {
    icon: Code2,
    title: 'Developers & DevOps Engineers',
    desc: 'Add formal architecture skills and AWS service depth to your deployment and automation experience.',
  },
  {
    icon: Briefcase,
    title: 'IT Professionals',
    desc: 'Upskill from on-prem infrastructure into cloud-native architecture and AWS operations.',
  },
  {
    icon: Users,
    title: 'Certification Aspirants',
    desc: 'Structured SAA-C03 preparation with hands-on labs — not just exam dumps and slide decks.',
  },
];

const graduateCapabilities = [
  {
    icon: Hammer,
    title: 'Design Scalable Architectures',
    desc: 'Architect multi-tier, highly available AWS solutions using the Well-Architected Framework.',
  },
  {
    icon: Shield,
    title: 'Implement Secure Cloud Systems',
    desc: 'Apply IAM, encryption, network segmentation, and auditing across production workloads.',
  },
  {
    icon: Network,
    title: 'Build Production VPCs',
    desc: 'Design custom VPCs with public/private tiers, load balancing, DNS, and controlled access.',
  },
  {
    icon: Search,
    title: 'Optimize Cost & Performance',
    desc: 'Right-size resources, set budgets, and tune architectures for reliability and efficiency.',
  },
  {
    icon: Briefcase,
    title: 'Portfolio-Ready Projects',
    desc: '7 industry projects plus a Netflix-style capstone — documented and interview-ready.',
  },
  {
    icon: Award,
    title: 'Industry Certificate',
    desc: 'Zyvotrix Certified AWS Solutions Architect — shareable on LinkedIn with hiring partner recognition.',
  },
];

const certificatePerks = [
  'LinkedIn-ready digital certificate',
  'PDF + shareable badge',
  'AWS Certified Solutions Architect Associate (SAA-C03) exam preparation',
  'Architecture portfolio review included',
];

const awsAdvantageContent: ProgramAdvantageContent = {
  eyebrow: 'The Zyvotrix Difference',
  headline: (
    <>
      Why Learners <span>Choose Zyvotrix</span>
    </>
  ),
  sub: 'A focused AWS certification course from cloud fundamentals to SAA-C03-ready architecture — AWS-only, portfolio-driven, completable in 3 months.',
  rows: [
    {
      need: 'Strong Cloud Foundations',
      zyvotrix: 'Cloud models, AWS global infrastructure & Well-Architected principles from day one',
      typical: 'Service lists without architecture context',
    },
    {
      need: 'Architecture Design Skills',
      zyvotrix: 'Multi-tier VPC, HA, DR & decoupling patterns with real design exercises',
      typical: 'Console walkthroughs without design thinking',
    },
    {
      need: 'Hands-On AWS Labs',
      zyvotrix: 'Live AWS environment practice on EC2, S3, VPC, RDS, Lambda & more',
      typical: 'Simulators or read-only demos only',
    },
    {
      need: 'Security & IAM Mastery',
      zyvotrix: 'IAM policies, least privilege, encryption & audit trails in every phase',
      typical: 'Security mentioned briefly at the end',
    },
    {
      need: 'Networking Depth',
      zyvotrix: 'Custom VPCs, subnets, ALB, Route 53 & CloudFront in production patterns',
      typical: 'Default VPC tutorials with no real network design',
    },
    {
      need: 'Cost Optimization',
      zyvotrix: 'Cost Explorer, budgets, right-sizing & architectural cost trade-offs',
      typical: 'No billing or FinOps exposure',
    },
    {
      need: 'Infrastructure as Code',
      zyvotrix: 'CloudFormation & Terraform modules for repeatable AWS deployments',
      typical: 'Manual console-only setups',
    },
    {
      need: 'Exam Readiness',
      zyvotrix: 'SAA-C03 domain coverage with scenario-based architecture reviews',
      typical: 'Exam dumps without hands-on understanding',
    },
    {
      need: 'Portfolio Projects',
      zyvotrix: '7 focused AWS builds plus a production capstone — no Azure/GCP distraction',
      typical: 'Bloated multi-cloud catalogs that never finish in 3 months',
    },
    {
      need: 'Career-Oriented Learning',
      zyvotrix: 'Structured roadmap from beginner to AWS Solutions Architect',
      typical: 'Unstructured video playlists without a clear path',
    },
  ],
  traditionalVs: [
    { left: 'Watch Videos', right: 'Build Architectures' },
    { left: 'Memorize Services', right: 'Design Solutions' },
    { left: 'Console Clicks', right: 'Production Patterns' },
    { left: 'Theory Focused', right: 'Hands-On Labs' },
    { left: 'Generic Quizzes', right: 'Industry Projects' },
    { left: 'Certification Only', right: 'Portfolio + Skills' },
  ],
  othersVs: [
    { left: 'Service Lists', right: 'Architecture Design' },
    { left: 'Console Tours', right: 'Real Deployments' },
    { left: 'Exam Dumps', right: 'Problem Solving' },
    { left: 'Theory', right: 'Production Patterns' },
  ],
};

const AWS_INDUSTRY_PROJECTS: IndustryProject[] = [
  {
    id: 1,
    label: 'Project 1',
    title: 'Secure AWS Landing Zone',
    description:
      'Build a hardened AWS account foundation with IAM, MFA, billing controls, and a documented security baseline.',
    skills: ['IAM', 'MFA', 'Billing Alerts', 'Security Baseline', 'Governance', 'Least Privilege'],
  },
  {
    id: 2,
    label: 'Project 2',
    title: 'Static Website Hosting Platform',
    description:
      'Deploy a global static site using S3, CloudFront, and Route 53 with HTTPS and lifecycle management.',
    skills: ['Amazon S3', 'CloudFront', 'Route 53', 'ACM', 'Static Hosting', 'CDN'],
  },
  {
    id: 3,
    label: 'Project 3',
    title: 'Serverless Event Booking API',
    description:
      'Build a serverless REST API with Lambda, API Gateway, and DynamoDB for event registration workflows.',
    skills: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Serverless', 'IAM Roles', 'Event-Driven Design'],
  },
  {
    id: 4,
    label: 'Project 4',
    title: 'Production Multi-Tier Application',
    description:
      'Deploy a three-tier application inside a custom VPC with ALB, EC2, and managed RDS storage.',
    skills: ['VPC', 'EC2', 'ALB', 'RDS', 'Security Groups', 'Multi-Tier Architecture'],
  },
  {
    id: 5,
    label: 'Project 5',
    title: 'Highly Available E-Commerce Platform',
    description:
      'Implement auto scaling, load balancing, and Multi-AZ patterns for a fault-tolerant e-commerce workload.',
    skills: ['Auto Scaling', 'ALB', 'Multi-AZ', 'High Availability', 'EC2', 'Route 53'],
  },
  {
    id: 6,
    label: 'Project 6',
    title: 'Cloud Operations Center',
    description:
      'Set up CloudWatch dashboards, CloudTrail auditing, and SNS alerts for production operations visibility.',
    skills: ['CloudWatch', 'CloudTrail', 'SNS', 'Alarms', 'Operational Excellence', 'Cost Visibility'],
  },
  {
    id: 7,
    label: 'Project 7',
    title: 'Terraform AWS Infrastructure',
    description:
      'Provision a complete AWS environment using Terraform modules — version-controlled and production-repeatable.',
    skills: ['Terraform', 'IaC', 'Modules', 'State Management', 'CloudFormation', 'Environment Automation'],
  },
  {
    id: 8,
    label: 'Capstone Project',
    title: 'Netflix-Style OTT Platform Architecture',
    description:
      'Design and deploy an enterprise-grade streaming platform using VPC, EC2, Auto Scaling, ALB, Route 53, CloudFront, RDS, S3, Lambda, CloudWatch, and Terraform.',
    skills: [
      'VPC',
      'EC2',
      'Auto Scaling',
      'ALB',
      'Route 53',
      'CloudFront',
      'RDS',
      'S3',
      'Lambda',
      'CloudWatch',
      'Terraform',
      'Well-Architected Framework',
    ],
    isCapstone: true,
  },
];

const learningExperienceFeatures: [LearningFeatureBlock, LearningFeatureBlock] = [
  {
    eyebrow: 'Learning Experience',
    title: 'Learn by Designing Real AWS Architectures',
    description:
      'Weekend live sessions paired with hands-on AWS labs — you design VPCs, deploy services, and ship cloud projects every phase.',
    bullets: [
      'Live mentor-led sessions every weekend',
      'Labs on EC2, S3, VPC, RDS, Lambda & more',
      'Architecture projects you can demo in interviews',
    ],
    image: visuals.learning,
    imageAlt: 'Professional learning AWS cloud architecture with laptop and cloud computing at Zyvotrix',
    imageBadge: 'Live Sessions · Every Weekend',
  },
  {
    eyebrow: 'Expert Guidance',
    title: 'Mentorship from Cloud Practitioners',
    description:
      'Get architecture reviews, security feedback, and career guidance from practitioners who design and operate AWS workloads in production.',
    bullets: [
      'Architecture reviews on VPC and HA designs',
      'Security feedback before your capstone presentation',
      'Resume and certification coaching included',
    ],
    image: visuals.mentor,
    imageAlt: 'Cloud practitioner reviewing AWS architecture and security on tablet at Zyvotrix',
    imageBadge: 'Working Cloud Practitioners',
    reverse: true,
  },
];

const learningExperienceStats = [
  { number: '12', label: 'Weeks', sublabel: '3 Months' },
  { number: '12+', label: 'Hands-on Labs', sublabel: '& Modules' },
  { number: '7+', label: 'Portfolio Projects', sublabel: '+ Capstone' },
];

const learningExperienceGallery = [
  {
    src: visuals.labs,
    alt: 'Hands-on AWS labs — architect designing cloud infrastructure with AWS services',
    label: 'AWS Cloud Labs',
    sublabel: 'Hands-on service practice',
  },
  {
    src: visuals.liveSessions,
    alt: 'Live mentor-led AWS session with architecture whiteboard and diagram review',
    label: 'Live Sessions',
    sublabel: 'Every weekend, instructor-led',
  },
  {
    src: visuals.buildProjects,
    alt: 'Building AWS VPC architecture and portfolio projects on production monitors',
    label: 'Build Projects',
    sublabel: 'Ship real cloud architectures',
  },
  {
    src: visuals.cloudStack,
    alt: 'Cloud-native AWS stack — remote architecture and connected cloud services',
    label: 'AWS Service Stack',
    sublabel: 'EC2 · S3 · VPC · RDS',
  },
];

const heroTrustStats = [
  { value: '12', label: 'Modules' },
  { value: '7+', label: 'Portfolio Builds' },
  { value: 'Live', label: 'Mentorship' },
];

const TechMarquee = ({ tools, reverse }: { tools: typeof AWS_TOOLS; reverse?: boolean }) => (
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

const AwsSolutionsArchitectProgram = () => {
  usePageMeta({
    title: 'AWS Solutions Architect Certification Program | SAA-C03 Training',
    description:
      'AWS Solutions Architect training & certification course at Zyvotrix. Master EC2, S3, VPC, IAM, Lambda, Terraform, build 7+ projects, and prepare for AWS Certified Solutions Architect Associate (SAA-C03) in 3 months.',
    canonical: '/courses/aws',
  });

  const techRowA = AWS_TOOLS.slice(0, 10);
  const techRowB = AWS_TOOLS.slice(10);

  return (
    <PageShell className="devops-program-page aws-program-page program-page-polish">
      <Navbar />

      <section className="program-landing-hero relative overflow-hidden">
        <AmbientDepth />
        <div className="hero-orb hero-orb-1 opacity-40" aria-hidden />
        <div className="hero-orb hero-orb-2 opacity-30" aria-hidden />
        <div className="hero-orb hero-orb-3 opacity-25" aria-hidden />
        <div className="hero-grid-overlay opacity-40" aria-hidden />

        <div className="program-page-container relative z-10 pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="program-page-content program-hero-grid grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="hero-fade-up program-hero-copy">
              <span className="program-hero-badge mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                AWS SAA-C03 · Certification Training
              </span>
              <h1 className="program-hero-title mb-4 text-3xl font-bold leading-[1.08] tracking-tight text-brand-950 sm:text-4xl lg:text-[2.85rem]">
                <span className="gradient-text-animated">AWS Solutions Architect</span>
                <span className="block text-brand-950">Certification Program</span>
              </h1>

              <div className="program-hero-tagline mb-6 max-w-xl rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white/90 to-sky-500/5 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  AWS architect training built for{' '}
                  <span className="text-primary">SAA-C03</span> — not multi-cloud overwhelm.
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-primary sm:text-base">
                  Learn · Build · Certify on AWS
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-secondary">
                  AWS Cloud Certification · 3 Months
                </p>
              </div>

              <p className="program-hero-lead mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Learn AWS Solutions Architecture from scratch. Build production-grade cloud infrastructure,
                master core AWS services, complete real-world projects, and prepare for the{' '}
                <strong className="font-semibold text-foreground">
                  AWS Certified Solutions Architect Associate (SAA-C03)
                </strong>{' '}
                exam in just 3 months.
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
                <EnrollButton programName={course.title} size="lg" className="btn-brand btn-shimmer h-12 px-8">
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </EnrollButton>
                <Button asChild size="lg" variant="outline" className="h-12 border-primary/20 px-8 backdrop-blur-sm">
                  <Link to="/contact">Talk to an Advisor</Link>
                </Button>
              </div>

              <div className="program-hero-trust mt-8 grid max-w-xl grid-cols-3 gap-3">
                {heroTrustStats.map((stat) => (
                  <div key={stat.label} className="program-hero-trust-item rounded-xl border border-border/70 bg-white/80 px-3 py-3 text-center shadow-sm backdrop-blur-sm">
                    <p className="font-display text-xl font-extrabold leading-none text-primary sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-fade-up program-hero-visual-col" style={{ animationDelay: '0.15s' }}>
              <AwsHeroVisual
                image={visuals.hero}
                imageAlt="AWS Solutions Architect at workstation with cloud architecture diagram — SAA-C03 certification training at Zyvotrix"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-10 sm:py-12" id="program-commitment">
        <div className="program-page-container">
          <Reveal3D className="program-page-content">
            <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-sky-500/5 p-6 sm:p-8">
              <div className="mb-6 text-center">
                <span className="program-section-eyebrow mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                  Program Commitment
                </span>
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                  3-Month AWS Training Program — Realistic for Working Professionals
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Weekend live AWS architect training with hands-on cloud architecture labs every week.
                </p>
              </div>
              <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerMs={60}>
                {programCommitment.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border/80 bg-white/90 px-4 py-4 text-center shadow-sm"
                  >
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">{label}</p>
                    <p className="font-display text-base font-bold text-foreground sm:text-lg">{value}</p>
                  </div>
                ))}
              </RevealStagger>
            </div>
          </Reveal3D>
        </div>
      </section>

      <section className="program-why-section border-b border-border bg-white py-14 sm:py-16" id="why-aws">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Why AWS
            </span>
            <h2 className="program-section-title section-title mb-4">
              Beyond Console Clicks — <span className="gradient-text-animated">Real Cloud Architecture</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              AWS Solutions Architect Associate skills power cloud-first careers — design systems that scale,
              stay secure, and run reliably in production. Prepare for SAA-C03 while building a real portfolio.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content program-highlight-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerMs={70}>
            {whyAws.map(({ icon: Icon, title, desc }, index) => (
              <DepthCard key={title} className={cn('h-full', index === 0 && 'sm:col-span-2 lg:col-span-2')} maxTilt={6}>
                <article
                  className={cn(
                    'program-highlight-card-accent program-highlight-card relative flex h-full gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6',
                    `program-highlight-card-accent--${index}`,
                    index === 0 && 'program-highlight-card-accent--featured',
                  )}
                >
                  <span className="program-highlight-card-accent-number" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={cn('program-highlight-card-accent-icon flex shrink-0 items-center justify-center rounded-xl', `program-highlight-card-accent-icon--${index}`)}>
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

      <ProgramAdvantageSection content={awsAdvantageContent} />

      <section className="section-padding section-alt program-curriculum-section" id="curriculum">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Curriculum
            </span>
            <h2 className="program-section-title section-title mb-4">
              Zero to <span className="gradient-text-animated">AWS Solutions Architect Associate</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              12 modules across 3 phases — focused AWS cloud architecture course for SAA-C03, cloud engineer,
              and solutions architect roles. No Azure. No GCP. Completable in 3 months.
            </p>
          </Reveal3D>

          <div className="program-page-content program-curriculum-layout">
            <div className="program-curriculum-main min-w-0">
              <RevealStagger className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" staggerMs={70}>
                {curriculumPhaseOverview.map((phase) => (
                  <div
                    key={phase.phase}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
                  >
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">{phase.phase}</p>
                    <h3 className="mb-1 font-display text-lg font-bold text-foreground">{phase.title}</h3>
                    <p className="mb-4 text-xs font-semibold text-muted-foreground">{phase.weeks}</p>
                    <ul className="space-y-2">
                      {phase.modules.map((mod) => (
                        <li key={mod} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </RevealStagger>

              <Reveal3D>
                <h3 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">Learning Path</h3>
                <ProgramCurriculumAccordion
                  phases={curriculum}
                  variant="premium"
                  capstone={curriculumCapstone}
                />
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
        eyebrow="How You Learn at Zyvotrix"
        headline={
          <>
            Built for <span>Architects,</span> Not Console Tourists
          </>
        }
        sub="Every session, lab, and project moves you from AWS service knowledge to production architecture design."
        galleryLabel="Inside the AWS Program Experience"
        sectionClassName="program-lx-section program-lx-section--compact"
      />

      <ProgramIndustryProjects
        projects={AWS_INDUSTRY_PROJECTS}
        eyebrow="Portfolio"
        title="Portfolio You'll Graduate With"
        description="Seven progressive AWS cloud architecture projects and a Netflix-style capstone — built for SAA-C03 interviews, cloud engineer roles, and AWS Solutions Architect Associate career paths."
        portfolioOutcomeTitle="By Graduation You'll Have"
        portfolioOutcomeItems={portfolioGraduationItems}
      />

      <section className="section-padding border-y border-border bg-brand-100/30 devops-section-glow">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header !mb-10 text-center">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Tech Stack
            </span>
            <h2 className="program-section-title section-title mb-3">
              AWS Services You&apos;ll <span className="gradient-text-animated">Master</span>
            </h2>
            <p className="program-section-lead mb-10 text-muted-foreground">
              Every service maps directly to a module — AWS-only stack for SAA-C03, cloud engineer, and architect roles.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content devops-tools-grid aac-tools-grid" staggerMs={40}>
            {AWS_TOOLS.map((tool) => (
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
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Who Should Join
            </span>
            <h2 className="program-section-title section-title mb-4">Is This Program For You?</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Designed for anyone who wants to design real AWS architectures — not just pass a theory exam.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content">
            <ProgramSectionAside
              image={visuals.audience}
              imageAlt="IT professional and AWS certification aspirant in a modern tech workplace at Zyvotrix"
              caption="For beginners, developers, IT professionals, and SAA-C03 aspirants"
              className="program-section-aside--audience"
            >
              <RevealStagger className="grid gap-4 sm:grid-cols-2" staggerMs={90}>
                {audience.map(({ icon: Icon, title, desc }, index) => (
                  <DepthCard key={title} className="h-full" maxTilt={6}>
                    <article
                      className={cn(
                        'program-audience-card flex h-full gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6',
                        `program-audience-card--${index}`,
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                          `program-audience-card-icon--${index}`,
                        )}
                      >
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
            </ProgramSectionAside>
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-alt devops-section-glow" id="outcomes">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              After You Graduate
            </span>
            <h2 className="program-section-title section-title mb-4">What You&apos;ll Be Capable Of</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Build in-demand cloud architecture skills and a portfolio that gets you hired.
            </p>
          </Reveal3D>

          <ProgramSectionAside
            image={visuals.career}
            imageAlt="Cloud architects collaborating on AWS VPC, Route 53, EC2, S3, and RDS architecture design"
            caption="Design scalable, secure AWS architectures — portfolio-ready skills"
            imageFit="cover"
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

          <Reveal3D delay={60} className="program-page-content mb-14">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="mb-6 text-center sm:text-left">
                <span className="program-section-eyebrow mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                  Career Paths
                </span>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">Career Opportunities After This Program</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Roles this AWS cloud certification course prepares you for across India and global markets.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                {careerPaths.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-primary" />
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </Reveal3D>

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
                      Zyvotrix Certified AWS Solutions Architect
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Upon completing all modules, projects, and the capstone, you receive the Zyvotrix Certified
                      AWS Solutions Architect certificate — plus structured preparation for the AWS Certified
                      Solutions Architect Associate (SAA-C03) exam.
                    </p>
                    <p className="mb-4 mt-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
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
                      alt="Zyvotrix AWS Solutions Architect Program certificate of completion — sample"
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

      <section className="section-padding section-white border-t border-border" id="skills-master">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Learning Outcomes
            </span>
            <h2 className="program-section-title section-title mb-4">
              Skills You&apos;ll <span className="gradient-text-animated">Master</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Core AWS services and tools covered in this cloud architecture course — aligned to SAA-C03 and
              production cloud engineering roles.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content flex flex-wrap justify-center gap-2.5 sm:justify-start" staggerMs={30}>
            {skillsMaster.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-foreground"
              >
                {skill}
              </span>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section-padding section-alt border-t border-border" id="prerequisites">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Before You Enroll
            </span>
            <h2 className="program-section-title section-title mb-4">Prerequisites</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              No prior AWS experience required — this AWS Solutions Architect training program is built for
              motivated beginners and working professionals.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content">
            <ul className="mx-auto max-w-2xl space-y-3 rounded-2xl border border-border bg-card p-6 sm:p-8">
              {prerequisites.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground sm:text-base">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-white border-t border-border" id="faq">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              FAQ
            </span>
            <h2 className="program-section-title section-title mb-4">AWS Solutions Architect Program FAQs</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Answers about this AWS certification course, SAA-C03 preparation, projects, and career outcomes.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content grid gap-6 lg:grid-cols-2 lg:gap-8">
            <FAQList faqs={awsFaqColLeft} />
            <FAQList faqs={awsFaqColRight} includeSchema schemaFaqs={programFaqs} />
          </Reveal3D>
        </div>
      </section>

      <div className="program-footer-bridge" aria-hidden />

      <PageCta
        badge="Start your AWS certification journey"
        title="Ready to Become an AWS Solutions Architect?"
        description="Join the AWS Solutions Architect certification program — SAA-C03 prep, 7+ portfolio projects, and production cloud architecture skills in 3 months."
        primaryLabel="Enroll Now"
        primaryHref={course.checkoutPath}
        programName={course.title}
        secondaryLabel="View All Programs"
        secondaryHref="/courses"
        className="program-page-cta"
      />

      <Footer />
    </PageShell>
  );
};

export default AwsSolutionsArchitectProgram;

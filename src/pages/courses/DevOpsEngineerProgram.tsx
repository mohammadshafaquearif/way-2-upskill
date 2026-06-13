import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Bot,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Cloud,
  Code2,
  GraduationCap,
  Hammer,
  Settings,
  Sparkles,
  Target,
  UserCheck,
  Video,
  Wrench,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import PageCta from '@/components/PageCta';
import AmbientDepth from '@/components/motion/AmbientDepth';
import DevOpsHeroVisual from '@/components/motion/DevOpsHeroVisual';
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
import { COURSE_BY_ID } from '@/lib/courses';
import type { FaqItem } from '@/lib/faqs';
import { DEVOPS_TOOLS } from '@/lib/devopsTools';
import { IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { usePageMeta } from '@/hooks/usePageMeta';

const course = COURSE_BY_ID.dop;
const visuals = IMAGES.programVisuals.dop;

const curriculum = [
  {
    phase: 'Phase 1',
    label: 'DevOps Foundations & Cloud Operations',
    meta: 'Build Strong Infrastructure Fundamentals',
    modules: [
      {
        id: 1,
        title: 'Linux, Git, Cloud & AI-Assisted DevOps',
        topics: [
          'Linux Administration',
          'Files, Permissions & Processes',
          'Shell Scripting & Automation',
          'Git & GitHub Workflows',
          'Branching & Pull Requests',
          'Cloud Computing Fundamentals',
          'AWS IAM',
          'AWS EC2',
          'AWS S3',
          'AWS VPC',
          'AI Tools for DevOps Engineers',
          'GitHub Copilot for DevOps',
          'Prompt Engineering for Infrastructure Tasks',
        ],
        project: {
          label: 'Project 1',
          title: 'Cloud Infrastructure Automation Platform',
          description:
            'Learners will design and implement a cloud environment consisting of IAM users, VPC networking, EC2 instances, and storage services while automating repetitive administrative tasks using Bash scripting.',
          skills: ['Linux', 'Bash', 'Git', 'AWS IAM', 'EC2', 'S3', 'VPC', 'Infrastructure Automation'],
        },
      },
    ],
  },
  {
    phase: 'Phase 2',
    label: 'Containerization, Kubernetes & CI/CD',
    meta: 'Deploy Applications at Scale',
    modules: [
      {
        id: 2,
        title: 'Docker, Kubernetes & CI/CD Pipelines',
        topics: [
          'Docker Fundamentals',
          'Images & Containers',
          'Docker Compose',
          'Container Registries',
          'Kubernetes Architecture',
          'Pods & Services',
          'Deployments & Scaling',
          'ConfigMaps & Secrets',
          'Helm',
          'GitHub Actions',
          'Jenkins',
          'CI/CD Fundamentals',
          'Blue-Green Deployments',
          'Canary Deployments',
          'AI-Assisted Pipeline Generation',
        ],
        project: {
          label: 'Project 2',
          title: 'Production Application Delivery Platform',
          description:
            'Learners will containerize an application, deploy it on Kubernetes, and create an automated CI/CD pipeline capable of testing, building, and deploying updates to production environments.',
          skills: ['Docker', 'Kubernetes', 'Helm', 'Jenkins', 'GitHub Actions', 'CI/CD', 'Deployment Automation'],
        },
      },
    ],
  },
  {
    phase: 'Phase 3',
    label: 'Infrastructure Automation & DevSecOps',
    meta: 'Provision, Secure & Scale Infrastructure',
    modules: [
      {
        id: 3,
        title: 'Terraform, Ansible & DevSecOps',
        topics: [
          'Terraform Fundamentals',
          'Terraform Modules',
          'State Management',
          'Workspaces',
          'Infrastructure as Code',
          'Ansible Fundamentals',
          'Configuration Management',
          'Automated Provisioning',
          'DevSecOps Fundamentals',
          'Vulnerability Scanning',
          'Secrets Management',
          'Vault',
          'AWS Secrets Manager',
          'Security Automation',
          'AI-Assisted Infrastructure Generation',
        ],
        project: {
          label: 'Project 3',
          title: 'Enterprise Infrastructure Automation Platform',
          description:
            'Learners will provision a complete multi-environment infrastructure using Terraform and Ansible while implementing security controls, secrets management, and automated compliance checks.',
          skills: ['Terraform', 'Ansible', 'Infrastructure as Code', 'DevSecOps', 'Vault', 'Security Automation'],
        },
      },
    ],
  },
  {
    phase: 'Phase 4',
    label: 'AI Operations, Observability & Reliability Engineering',
    meta: 'Operate Modern Systems with AI',
    modules: [
      {
        id: 4,
        title: 'Monitoring, Observability & SRE',
        topics: [
          'Monitoring Fundamentals',
          'Prometheus',
          'Grafana',
          'Metrics, Logs & Traces',
          'Observability Principles',
          'Incident Response',
          'AIOps Fundamentals',
          'AI-Powered Log Analysis',
          'Operational Automation',
          'SRE Fundamentals',
          'SLIs, SLOs & Error Budgets',
          'Cost Optimization Fundamentals',
          'Production Readiness Reviews',
        ],
      },
    ],
  },
];

const curriculumCapstone: CurriculumCapstone = {
  title: 'AI-Powered DevOps Command Center',
  description:
    'Architect and deploy a production-grade DevOps platform that proves end-to-end ownership — infrastructure automation, Kubernetes orchestration, CI/CD pipelines, observability, security controls, and AI-assisted operations ready for recruiter review.',
  builds: [
    'Kubernetes Production Cluster',
    'CI/CD Deployment Pipeline',
    'Infrastructure as Code Platform',
    'Monitoring & Alerting Stack',
    'AI-Powered Incident Assistant',
    'Security & Compliance Controls',
  ],
  skills: [
    'AWS',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Ansible',
    'Jenkins',
    'GitHub Actions',
    'Prometheus',
    'Grafana',
    'DevSecOps',
    'AIOps',
    'SRE',
  ],
};

const whyDevOps = [
  {
    icon: Target,
    title: 'Industry-Aligned',
    desc: 'Curriculum built with DevOps practitioners who ship to production every week.',
  },
  {
    icon: Bot,
    title: 'AI-First Approach',
    desc: 'LLMs integrated into every DevOps workflow — from IaC generation to incident response.',
  },
  {
    icon: Cloud,
    title: 'Hands-on Cloud Labs',
    desc: 'AWS & GCP real environment access with labs that mirror production scenarios.',
  },
  {
    icon: GraduationCap,
    title: 'Professional Certificate',
    desc: 'Earn the Zyvotrix AI-Powered DevOps Engineer Certificate — shareable on LinkedIn, portfolio, and professional profiles.',
  },
  {
    icon: Briefcase,
    title: 'Career Support',
    desc: 'Resume reviews, LinkedIn optimization, GitHub portfolio reviews, mock interviews, and job search strategy.',
  },
  {
    icon: Hammer,
    title: 'Production Capstone',
    desc: 'End-to-end AI-integrated DevOps platform — your portfolio showpiece.',
  },
];

const audience = [
  {
    icon: Code2,
    title: 'Software Developers',
    desc: 'You build code but want to own the entire pipeline — CI/CD, deployments, and infrastructure.',
  },
  {
    icon: Cloud,
    title: 'Cloud & IT Professionals',
    desc: 'Professionals looking to modernize their infrastructure, automation, and deployment skills for cloud-native environments.',
  },
  {
    icon: Settings,
    title: 'Sysadmins',
    desc: 'Traditional system admins transitioning to modern cloud-native DevOps roles.',
  },
  {
    icon: UserCheck,
    title: 'QA / Support Engineers',
    desc: 'Transition into Cloud & DevOps roles with automation-first workflows.',
  },
];

const graduateCapabilities = [
  {
    icon: Hammer,
    title: 'Build Production Pipelines',
    desc: 'Design CI/CD workflows with Docker, Kubernetes, GitHub Actions, and Jenkins.',
  },
  {
    icon: Cloud,
    title: 'Deploy Cloud Infrastructure',
    desc: 'Provision and manage AWS/GCP environments with Terraform, Ansible, and security controls.',
  },
  {
    icon: Bot,
    title: 'Automate with AI',
    desc: 'Integrate LLMs into monitoring, incident response, and infrastructure automation.',
  },
  {
    icon: Wrench,
    title: 'DevSecOps Practices',
    desc: 'Scan, secure, and harden pipelines with Vault, Trivy, and policy-as-code.',
  },
  {
    icon: Briefcase,
    title: 'Portfolio-Ready Projects',
    desc: '3 phase-aligned builds plus a capstone — all learner-built, deployed, and GitHub-ready.',
  },
  {
    icon: Award,
    title: 'Professional Certificate',
    desc: 'Zyvotrix AI-Powered DevOps Engineer Certificate — earned upon completing all projects and the capstone.',
  },
];

const certificatePerks = [
  'LinkedIn',
  'Personal Portfolio',
  'Professional Profiles',
];

const programCommitment = [
  { label: 'Live Sessions', value: '4 Hours / Week' },
  { label: 'Hands-On Practice', value: '3–5 Hours / Week' },
  { label: 'Duration', value: '16 Weeks' },
  { label: 'Total Learning Commitment', value: '100+ Hours' },
];

const whyAiPoweredDevOps = [
  'Generate Infrastructure as Code faster',
  'Debug CI/CD pipelines with AI',
  'Analyze logs using LLMs',
  'Automate operational tasks',
  'Accelerate incident response',
];

const careerPaths = [
  'DevOps Engineer',
  'Cloud Engineer',
  'Platform Engineer',
  'Site Reliability Engineer (SRE)',
  'Infrastructure Engineer',
  'Cloud Operations Engineer',
];

const skillsDemonstrate = [
  'Linux Administration',
  'Cloud Infrastructure',
  'Docker & Kubernetes',
  'CI/CD Automation',
  'Infrastructure as Code',
  'DevSecOps',
  'Monitoring & Observability',
  'AI-Powered Operations',
  'Production Deployments',
];

const prerequisites = [
  'Basic computer skills',
  'No prior DevOps experience required',
  'Familiarity with programming is helpful but not mandatory',
  'Suitable for developers, IT professionals, sysadmins, and career switchers',
];

const programFaqs: FaqItem[] = [
  {
    id: 'dop-experience',
    category: 'programs',
    question: 'Do I need prior DevOps experience?',
    answer:
      'No. The program starts with Linux, Git, cloud fundamentals, and gradually progresses to Kubernetes, Infrastructure as Code, DevSecOps, and AI-powered operations.',
  },
  {
    id: 'dop-why-enroll',
    category: 'programs',
    question: 'Why should I enroll in the AI-Powered DevOps Engineer Program?',
    answer:
      'Most DevOps courses focus only on tools. This program combines cloud infrastructure, automation, Kubernetes, security, observability, and AI-assisted DevOps workflows to help you build real-world projects and job-ready skills.',
  },
  {
    id: 'dop-different',
    category: 'programs',
    question: 'What makes this program different from traditional DevOps courses?',
    answer:
      "You'll learn how AI is used in modern DevOps teams for infrastructure generation, CI/CD troubleshooting, log analysis, incident response, and operational automation — alongside core technologies like Docker, Kubernetes, Terraform, Jenkins, and AWS.",
  },
  {
    id: 'dop-skills',
    category: 'programs',
    question: 'What skills will I acquire during this program?',
    answer:
      "You'll gain practical experience with Linux administration, cloud infrastructure, Docker & Kubernetes, CI/CD pipelines, Terraform & Ansible, DevSecOps, monitoring & observability, AI-powered operations, and Site Reliability Engineering (SRE).",
  },
  {
    id: 'dop-real-projects',
    category: 'programs',
    question: 'Will I build real projects?',
    answer:
      'Yes. Every learner builds the Cloud Infrastructure Automation Platform, Production Application Delivery Platform, Enterprise Infrastructure Automation Platform, and AI-Powered DevOps Command Center (Capstone). These projects strengthen your GitHub portfolio and interview readiness.',
  },
  {
    id: 'dop-ai-devops',
    category: 'programs',
    question: 'What is AI-Powered DevOps?',
    answer:
      'AI-Powered DevOps combines traditional DevOps practices with AI tools that assist engineers in infrastructure automation, monitoring, troubleshooting, deployment optimization, and operational decision-making.',
  },
  {
    id: 'dop-working-professionals',
    category: 'learning',
    question: 'Is this program suitable for working professionals?',
    answer:
      'Yes. The program is specifically designed for working professionals with 4 hours/week of live classes and 3–5 hours/week of hands-on practice — allowing you to learn without leaving your current job.',
  },
  {
    id: 'dop-missed-session',
    category: 'learning',
    question: 'What happens if I miss a live session?',
    answer:
      'All live sessions are recorded and made available for review, allowing you to learn at your own pace whenever needed.',
  },
  {
    id: 'dop-certificate',
    category: 'programs',
    question: 'Do I receive a certificate?',
    answer:
      'Yes. Learners who successfully complete all projects and the capstone receive the Zyvotrix AI-Powered DevOps Engineer Certificate.',
  },
  {
    id: 'dop-career-support',
    category: 'career',
    question: 'What career support is included?',
    answer:
      'Learners receive resume reviews, LinkedIn optimization, GitHub portfolio reviews, mock interviews, and career guidance sessions.',
  },
  {
    id: 'dop-career-opportunities',
    category: 'career',
    question: 'What career opportunities can this program support?',
    answer:
      'This program is designed for professionals pursuing roles such as DevOps Engineer, Cloud Engineer, Platform Engineer, Site Reliability Engineer (SRE), Infrastructure Engineer, and Cloud Operations Engineer.',
  },
  {
    id: 'dop-tools',
    category: 'technical',
    question: 'What tools and technologies are covered?',
    answer:
      'The program includes Linux, Git, AWS, Docker, Kubernetes, Helm, Jenkins, GitHub Actions, Terraform, Ansible, Vault, Trivy, Prometheus, Grafana, GitHub Copilot, ChatGPT, DevSecOps, AIOps, and SRE practices.',
  },
  {
    id: 'dop-career-2026',
    category: 'career',
    question: 'Is DevOps still a good career choice in 2026 and beyond?',
    answer:
      'Yes. Organizations continue to invest heavily in cloud infrastructure, automation, platform engineering, and AI-assisted operations, creating strong demand for skilled DevOps professionals worldwide.',
  },
  {
    id: 'dop-ai-future',
    category: 'programs',
    question: 'What is the future of AI in DevOps?',
    answer:
      'AI is increasingly used to automate repetitive tasks, improve monitoring, accelerate troubleshooting, optimize cloud costs, and assist engineers in managing complex systems at scale.',
  },
  {
    id: 'dop-industries',
    category: 'career',
    question: 'What industries hire DevOps professionals?',
    answer:
      'DevOps professionals are hired across technology, FinTech, healthcare, e-commerce, telecommunications, SaaS companies, cloud service providers, and enterprise IT organizations.',
  },
  {
    id: 'dop-vs-platform',
    category: 'programs',
    question: 'What is the difference between DevOps and Platform Engineering?',
    answer:
      'DevOps focuses on collaboration, automation, and software delivery. Platform Engineering focuses on building internal developer platforms and reusable infrastructure that improve developer productivity and operational efficiency. Modern organizations often combine both disciplines.',
  },
  {
    id: 'dop-time',
    category: 'learning',
    question: 'How much time should I dedicate each week?',
    answer:
      'Recommended commitment: 4 hours of live training plus 3–5 hours of hands-on practice — approximately 7–9 hours per week in total.',
  },
  {
    id: 'dop-portfolio',
    category: 'career',
    question: 'Will I have a portfolio after completing the program?',
    answer:
      'Yes. You will graduate with multiple production-oriented projects, a capstone project, GitHub-ready repositories, and practical experience that can be showcased during interviews and job applications.',
  },
];

const dopAdvantageContent: ProgramAdvantageContent = {
  eyebrow: 'The Zyvotrix Difference',
  headline: (
    <>
      Why Learners <span>Choose Zyvotrix</span>
    </>
  ),
  sub: 'A structured path from Linux fundamentals to AI-powered production DevOps — built for careers, not just tool tutorials.',
  rows: [
    {
      need: 'Strong Foundations',
      zyvotrix: 'Linux, Git, cloud basics & shell automation from day one',
      typical: 'Tool-specific tutorials without fundamentals',
    },
    {
      need: 'AI-Powered DevOps',
      zyvotrix: 'LLMs for IaC generation, pipeline debugging & incident response',
      typical: 'Traditional DevOps with no AI integration',
    },
    {
      need: 'Hands-On Cloud Labs',
      zyvotrix: 'Real AWS/GCP environments — EC2, S3, VPC, K8s & more',
      typical: 'Simulated labs or local-only setups',
    },
    {
      need: 'Container Mastery',
      zyvotrix: 'Docker, Kubernetes, Helm & production deployment patterns',
      typical: 'Docker basics without orchestration depth',
    },
    {
      need: 'CI/CD Depth',
      zyvotrix: 'GitHub Actions, Jenkins, blue-green & canary deployments',
      typical: 'Hello-world pipeline tutorials only',
    },
    {
      need: 'Infrastructure as Code',
      zyvotrix: 'Terraform modules, Ansible playbooks & state management',
      typical: 'Manual console-only infrastructure',
    },
    {
      need: 'DevSecOps',
      zyvotrix: 'Trivy, Vault, SAST/DAST & compliance-as-code in every phase',
      typical: 'Security bolted on at the end',
    },
    {
      need: 'Portfolio Projects',
      zyvotrix: '3 phase projects + capstone — learner-built, interview-ready portfolio work',
      typical: 'Generic assignments with limited portfolio value',
    },
    {
      need: 'Career Support',
      zyvotrix: 'Resume reviews, LinkedIn optimization, GitHub portfolio reviews, mock interviews & hiring guidance',
      typical: 'Certificate only — no career guidance',
    },
    {
      need: 'Career-Oriented Learning',
      zyvotrix: 'Structured roadmap from beginner to AI-Powered DevOps Engineer',
      typical: 'Unstructured video playlists without a clear path',
    },
  ],
  traditionalVs: [
    { left: 'Watch Videos', right: 'Build Pipelines' },
    { left: 'Memorize Tools', right: 'Ship to Production' },
    { left: 'Console Clicks', right: 'Infrastructure as Code' },
    { left: 'Theory Focused', right: 'Hands-On Labs' },
    { left: 'Generic Labs', right: 'Industry Projects' },
    { left: 'Certification Only', right: 'Portfolio + Placement' },
  ],
  othersVs: [
    { left: 'Tool Lists', right: 'Production Systems' },
    { left: 'Manual Ops', right: 'AI Automation' },
    { left: 'Tutorial DevOps', right: 'Real Deployments' },
    { left: 'Theory', right: 'Career Outcomes' },
  ],
};

const DOP_INDUSTRY_PROJECTS: IndustryProject[] = [
  {
    id: 1,
    label: 'Project 1',
    title: 'Cloud Infrastructure Automation Platform',
    description:
      'Design and implement a cloud environment with IAM users, VPC networking, EC2 instances, and storage services — automating administrative tasks using Bash scripting.',
    skills: ['Linux', 'Bash', 'Git', 'AWS IAM', 'EC2', 'S3', 'VPC', 'Infrastructure Automation'],
  },
  {
    id: 2,
    label: 'Project 2',
    title: 'Production Application Delivery Platform',
    description:
      'Containerize an application, deploy it on Kubernetes, and build an automated CI/CD pipeline that tests, builds, and deploys updates to production environments.',
    skills: ['Docker', 'Kubernetes', 'Helm', 'Jenkins', 'GitHub Actions', 'CI/CD', 'Deployment Automation'],
  },
  {
    id: 3,
    label: 'Project 3',
    title: 'Enterprise Infrastructure Automation Platform',
    description:
      'Provision multi-environment infrastructure using Terraform and Ansible with security controls, secrets management, and automated compliance checks.',
    skills: ['Terraform', 'Ansible', 'Infrastructure as Code', 'DevSecOps', 'Vault', 'Security Automation'],
  },
  {
    id: 4,
    label: 'Capstone',
    title: 'AI-Powered DevOps Command Center',
    description:
      'Architect and deploy a production-grade DevOps platform — Kubernetes cluster, CI/CD pipeline, IaC platform, monitoring stack, AI incident assistant, and security controls ready for recruiter review.',
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'Jenkins',
      'GitHub Actions',
      'Prometheus',
      'Grafana',
      'DevSecOps',
      'AIOps',
      'SRE',
    ],
    isCapstone: true,
  },
];

const heroTrustStats = [
  { value: '12+', label: 'Hands-On Labs' },
  { value: '4', label: 'Portfolio Projects' },
  { value: 'Live', label: 'Instructor-Led' },
];

const trustSignals = [
  { icon: Video, label: 'Live Mentor-Led Training' },
  { icon: Cloud, label: 'Real Cloud Labs' },
  { icon: Bot, label: 'AI-Integrated Learning' },
  { icon: Hammer, label: 'Portfolio Projects' },
  { icon: Clock, label: 'Lifetime Access' },
  { icon: Briefcase, label: 'Career Support' },
];

const learningOutcomes = [
  {
    week: 'Phase 1',
    outcome: 'Cloud Infrastructure Automation Platform',
  },
  {
    week: 'Phase 2',
    outcome: 'Production Application Delivery Platform',
  },
  {
    week: 'Phase 3',
    outcome: 'Enterprise Infrastructure Automation Platform',
  },
  {
    week: 'Capstone',
    outcome: 'AI-Powered DevOps Command Center',
  },
];

const techStackCategories = [
  {
    category: 'Phase 1 · Foundations',
    tools: 'Linux, Git, AWS IAM, EC2, S3, VPC, Bash, GitHub Copilot',
  },
  {
    category: 'Phase 2 · Containers & CI/CD',
    tools: 'Docker, Kubernetes, Helm, GitHub Actions, Jenkins',
  },
  {
    category: 'Phase 3 · IaC & DevSecOps',
    tools: 'Terraform, Ansible, Vault, Trivy, Secrets Management',
  },
  {
    category: 'Phase 4 · Observability & AI',
    tools: 'Prometheus, Grafana, SRE, AIOps, ChatGPT',
  },
  {
    category: 'Capstone',
    tools: 'Full stack integration across all phases + AI automation',
  },
  {
    category: 'Live Demos & Labs',
    tools: 'Instructor-led demos, guided labs & hands-on exercises every week',
  },
];

const learningExperienceFeatures: [LearningFeatureBlock, LearningFeatureBlock] = [
  {
    eyebrow: 'Learning Experience',
    title: 'Learn by Building Production Pipelines',
    description:
      'Built for working professionals — 4 hours of live mentor-led sessions per week. You build every project yourself, phase by phase.',
    bullets: [
      '4 hours/week live classes — fits around your job',
      '12+ hands-on labs, live demos & guided exercises',
      '4 portfolio projects you build across phases',
      'Mentor reviews on infrastructure, pipelines & capstone',
    ],
    image: visuals.learning,
    imageAlt: 'DevOps professional learning hands-on with live mentor-led sessions at Zyvotrix',
    imageBadge: 'Live Sessions · Every Weekend',
  },
  {
    eyebrow: 'Expert Guidance',
    title: 'Mentorship from Working DevOps Engineers',
    description:
      'Get pipeline reviews, infra feedback, and career guidance from practitioners who ship to production daily.',
    bullets: [
      'Code and pipeline reviews on your projects',
      'Architecture feedback before your capstone demo',
      'Resume and interview coaching included',
    ],
    image: visuals.mentor,
    imageAlt: 'Working DevOps engineer mentor providing expert guidance at Zyvotrix',
    imageBadge: 'Working DevOps Practitioners',
    reverse: true,
  },
];

const learningExperienceStats = [
  { number: '12+', label: 'Hands-On Labs', sublabel: '& Demos' },
  { number: '4', label: 'Portfolio Projects', sublabel: 'You Build' },
  { number: 'Live', label: 'Instructor-Led', sublabel: 'Sessions' },
];

const learningExperienceGallery = [
  {
    src: visuals.labs,
    alt: 'DevOps lifecycle — plan, build, test, deploy, operate, monitor, and release',
    label: 'Cloud & DevOps Labs',
    sublabel: 'Hands-on infra practice',
  },
  {
    src: visuals.liveSessions,
    alt: 'CI/CD pipeline workflow — code, build, test, deploy, and monitor',
    label: 'Live Sessions',
    sublabel: 'Every weekend, instructor-led',
  },
  {
    src: visuals.buildProjects,
    alt: 'Cloud-native DevOps — CI/CD, Kubernetes, containers, and security',
    label: 'Build Projects',
    sublabel: 'Ship real pipelines',
  },
  {
    src: visuals.devopsStack,
    alt: 'DevOps culture — collaboration, automation, continuous delivery, and monitoring',
    label: 'Industry Tool Stack',
    sublabel: 'Docker · K8s · Terraform',
  },
];

const TechMarquee = ({ tools, reverse }: { tools: typeof DEVOPS_TOOLS; reverse?: boolean }) => (
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

const DevOpsEngineerProgram = () => {
  usePageMeta({
    title: 'Become an AI-Powered DevOps Engineer | Zyvotrix',
    description:
      '4-month project-oriented DevOps certification for working professionals. 12+ hands-on labs + 4 portfolio projects — job-ready AI-Powered DevOps Engineer.',
    canonical: '/courses/devops-engineer-program',
  });

  const techRowA = DEVOPS_TOOLS.slice(0, 8);
  const techRowB = DEVOPS_TOOLS.slice(8);
  const dopFaqMidpoint = Math.ceil(programFaqs.length / 2);
  const dopFaqColLeft = programFaqs.slice(0, dopFaqMidpoint);
  const dopFaqColRight = programFaqs.slice(dopFaqMidpoint);

  return (
    <PageShell className="devops-program-page dop-program-page program-page-polish">
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
                {course.code} · Certification Program
              </span>
              <h1 className="program-hero-title mb-4 text-3xl font-bold leading-[1.08] tracking-tight text-brand-950 sm:text-4xl lg:text-[2.85rem]">
                <span className="gradient-text-animated">Become an AI-Powered</span>
                <span className="block text-brand-950">DevOps Engineer</span>
              </h1>

              <div className="program-hero-tagline mb-6 max-w-xl rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white/90 to-teal-500/5 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  Build production-ready cloud infrastructure, automate deployments, and leverage AI across
                  modern DevOps workflows.
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-secondary">
                  Learn · Build · Grow
                </p>
              </div>

              <p className="program-hero-lead mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A 4-month, project-oriented path for working professionals. Graduate with a portfolio that
                proves you can ship infrastructure, pipelines, and AI-powered operations in production.
              </p>

              <div className="mb-8 flex flex-wrap gap-3 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  4 hrs/week · Live
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-primary" />
                  12+ Hands-On Labs + 4 Portfolio Projects
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="btn-brand btn-shimmer h-12 px-8">
                  <Link to={course.checkoutPath}>
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
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
              <DevOpsHeroVisual
                image={visuals.hero}
                imageAlt="DevOps engineer workspace with CI/CD pipeline holographic display and collaborative team environment"
                variant="photo"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-10 sm:py-12" id="program-commitment">
        <div className="program-page-container">
          <Reveal3D className="program-page-content">
            <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-teal-500/5 p-6 sm:p-8">
              <div className="mb-6 text-center">
                <span className="program-section-eyebrow mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                  Program Commitment
                </span>
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                  Expected Weekly Commitment
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Designed for working professionals who need a clear, realistic time investment.
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

      <section className="border-b border-border bg-white py-8 sm:py-10" id="why-zyvotrix">
        <div className="program-page-container">
          <Reveal3D className="program-page-content">
            <div className="program-trust-signals rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-teal-500/5 p-6 sm:p-8">
              <div className="mb-6 text-center">
                <span className="program-section-eyebrow mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                  Why Zyvotrix?
                </span>
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                  Everything you need to go from learner to job-ready DevOps engineer
                </h2>
              </div>
              <RevealStagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" staggerMs={50}>
                {trustSignals.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-border/80 bg-white/90 px-4 py-3 shadow-sm"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{label}</span>
                    <Check className="ml-auto h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  </div>
                ))}
              </RevealStagger>
            </div>
          </Reveal3D>
        </div>
      </section>

      <section className="program-why-section border-b border-border bg-white py-14 sm:py-16" id="why-devops">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Why DevOps
            </span>
            <h2 className="program-section-title section-title mb-4">
              Beyond Tutorials — <span className="gradient-text-animated">Production DevOps</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Modern DevOps is AI-assisted automation, cloud-native infrastructure, and pipelines that ship reliably.
              This is what teams hire for.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content program-highlight-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerMs={70}>
            {whyDevOps.map(({ icon: Icon, title, desc }, index) => (
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

      <ProgramAdvantageSection content={dopAdvantageContent} />

      <section className="section-padding section-white border-b border-border" id="why-ai-devops">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Why AI-Powered DevOps?
            </span>
            <h2 className="program-section-title section-title mb-4">
              Modern DevOps Teams Use <span className="gradient-text-animated">AI Every Day</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              This isn&apos;t a traditional DevOps course with AI bolted on. You&apos;ll learn how practitioners
              actually use AI to move faster in production environments.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="mb-5 text-sm font-semibold text-foreground sm:text-base">Learn how to:</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {whyAiPoweredDevOps.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-alt program-curriculum-section" id="curriculum">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Curriculum
            </span>
            <h2 className="program-section-title section-title mb-4">
              <span className="gradient-text-animated">AI-Powered DevOps Engineer</span> Program
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              A project-oriented curriculum for working professionals — 4 months, 4 live hours per week.
              Each phase ends with a portfolio build you design and implement yourself. No tool encyclopedia —
              just the skills and projects that make you job-ready.
            </p>
          </Reveal3D>

          <div className="program-page-content program-curriculum-layout">
            <div className="program-curriculum-main min-w-0">
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
            Built for <span>Builders,</span> Not Viewers
          </>
        }
        sub="Live demos, guided labs, and phase projects — 12+ hands-on sessions designed for working professionals at 4 hours per week."
        galleryLabel="Inside the DevOps Program Experience"
        sectionClassName="program-lx-section program-lx-section--compact"
      />

      <section className="border-b border-border bg-white py-10 sm:py-12">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header !mb-8">
            <h3 className="text-lg font-bold text-foreground sm:text-xl">Portfolio Build Timeline</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Four portfolio builds plus live demos and guided labs throughout the program.
            </p>
          </Reveal3D>
          <RevealStagger className="program-page-content grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerMs={80}>
            {learningOutcomes.map(({ week, outcome }) => (
              <div
                key={week}
                className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-teal-500/5 p-5 text-center sm:p-6"
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">{week}</p>
                <p className="text-sm font-semibold leading-relaxed text-foreground sm:text-base">{outcome}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <ProgramIndustryProjects
        projects={DOP_INDUSTRY_PROJECTS}
        eyebrow="Portfolio"
        title="Portfolio You'll Graduate With"
        description="Three phase-aligned projects and one capstone — every build is designed and implemented by you, ready for GitHub, LinkedIn, and engineering interviews."
        portfolioOutcomeTitle="Program Deliverables"
        portfolioOutcomeDescription="Upon successful completion, you will have built:"
      />

      <section className="section-padding border-y border-border bg-brand-100/30 devops-section-glow">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header !mb-10 text-center">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Tech Stack
            </span>
            <h2 className="program-section-title section-title mb-3">
              <span className="gradient-text-animated">Industry Tool Stack</span>
            </h2>
            <p className="program-section-lead mb-10 text-muted-foreground">
              Mapped phase-by-phase to live demos, guided labs, and portfolio projects — the exact stack
              you&apos;ll practice across 12+ hands-on sessions.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content program-tech-categories mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerMs={60}>
            {techStackCategories.map(({ category, tools }) => (
              <div
                key={category}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">{category}</p>
                <p className="font-display text-sm font-bold text-foreground sm:text-base">{tools}</p>
              </div>
            ))}
          </RevealStagger>

          <Reveal3D className="program-page-header program-section-header !mb-10 text-center">
            <p className="text-sm font-semibold text-muted-foreground">
              16 core tools — used across demos, labs &amp; projects
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content devops-tools-grid" staggerMs={50}>
            {DEVOPS_TOOLS.map((tool) => (
              <div key={tool.name} className="devops-tool-card">
                <div className="devops-tool-card-icon">
                  <img src={tool.icon} alt={tool.name} width={44} height={44} loading="lazy" decoding="async" />
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
              Designed for people who want to break into or level-up in modern cloud &amp; DevOps roles.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content">
            <ProgramSectionAside
              image={visuals.audience}
              imageAlt="Learners in a Zyvotrix DevOps training session"
              caption="For developers, sysadmins, QA engineers, and IT professionals"
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
            <h2 className="program-section-title section-title mb-4">What You&apos;ll Walk Away With</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              More than a certificate — real skills, real projects, and career support to land your next DevOps role.
            </p>
          </Reveal3D>

          <ProgramSectionAside
            image={visuals.career}
            imageAlt="DevOps engineer workspace with CI/CD pipeline, observability dashboard, and AI-Powered DevOps Command Center"
            caption="Build. Automate. Deploy. Operate with AI — your portfolio, your future"
            reverse
            className="program-page-content mb-14"
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
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">Career Opportunities</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Roles graduates are prepared to pursue across global markets.
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
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Career outcomes vary based on prior experience, location, and market demand.
              </p>
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
                    <h3 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">Professional Certificate</h3>
                    <p className="mb-4 text-lg font-semibold text-primary">
                      Zyvotrix AI-Powered DevOps Engineer
                    </p>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Earn the Zyvotrix AI-Powered DevOps Engineer Certificate upon successful completion of
                      all projects and the capstone.
                    </p>
                    <p className="mb-6 rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm font-medium text-foreground">
                      Issued after successful completion of all projects and capstone review.
                    </p>
                    <p className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      Shareable on
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
                      alt="Zyvotrix AI-Powered DevOps Engineer Program certificate of completion — sample"
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

      <section className="section-padding section-white border-t border-border" id="skills-demonstrate">
        <div className="program-page-container">
          <Reveal3D className="program-page-header program-section-header">
            <span className="program-section-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Outcomes
            </span>
            <h2 className="program-section-title section-title mb-4">
              Skills You&apos;ll <span className="gradient-text-animated">Demonstrate</span>
            </h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Concrete capabilities you can prove in interviews, on GitHub, and in production environments.
            </p>
          </Reveal3D>

          <RevealStagger className="program-page-content grid gap-3 sm:grid-cols-2 lg:grid-cols-3" staggerMs={50}>
            {skillsDemonstrate.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                <span className="text-sm font-semibold text-foreground">{skill}</span>
              </div>
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
              No prior DevOps experience required — built for motivated professionals ready to learn by building.
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
            <h2 className="program-section-title section-title mb-4">DevOps Program FAQs</h2>
            <p className="program-section-lead leading-relaxed text-muted-foreground">
              Answers for working professionals considering the AI-Powered DevOps Engineer Program.
            </p>
          </Reveal3D>

          <Reveal3D className="program-page-content grid gap-6 lg:grid-cols-2 lg:gap-8">
            <FAQList faqs={dopFaqColLeft} />
            <FAQList
              faqs={dopFaqColRight}
              includeSchema
              schemaFaqs={programFaqs}
            />
          </Reveal3D>
        </div>
      </section>

      <div className="program-footer-bridge" aria-hidden />

      <PageCta
        badge="Start your DevOps journey"
        title="Ready to Transition into Modern DevOps & Cloud Engineering?"
        description="Build production-ready systems, deploy real infrastructure, and graduate with a portfolio that proves your skills."
        primaryLabel="Enroll Now"
        primaryHref={course.checkoutPath}
        secondaryLabel="View All Programs"
        secondaryHref="/courses"
        className="program-page-cta"
      />

      <Footer />
    </PageShell>
  );
};

export default DevOpsEngineerProgram;

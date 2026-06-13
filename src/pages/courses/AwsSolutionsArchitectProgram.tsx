import React from 'react';
import { Link } from 'react-router-dom';
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
import AgenticHeroVisual from '@/components/motion/AgenticHeroVisual';
import DepthCard from '@/components/motion/DepthCard';
import { Reveal3D, RevealStagger } from '@/components/motion/Reveal3D';
import { Button } from '@/components/ui/button';
import ProgramAdvantageSection, {
  type ProgramAdvantageContent,
} from '@/components/courses/ProgramAdvantageSection';
import ProgramCurriculumAccordion from '@/components/courses/ProgramCurriculumAccordion';
import ProgramCurriculumStickySidebar from '@/components/courses/ProgramCurriculumStickySidebar';
import ProgramInquirySidebar from '@/components/courses/ProgramInquirySidebar';
import ProgramIndustryProjects, {
  type IndustryProject,
} from '@/components/courses/ProgramIndustryProjects';
import ProgramLearningExperience, {
  type LearningFeatureBlock,
} from '@/components/courses/ProgramLearningExperience';
import ProgramSectionAside from '@/components/courses/ProgramSectionAside';
import { AWS_TOOLS } from '@/lib/awsTools';
import { COURSE_BY_ID } from '@/lib/courses';
import { IMAGES } from '@/lib/images';
import { usePageMeta } from '@/hooks/usePageMeta';

const course = COURSE_BY_ID.aws;
const visuals = IMAGES.programVisuals.aws;

const curriculum = [
  {
    phase: 'Phase 1',
    label: 'Cloud Foundations',
    meta: 'Modules 1–3',
    modules: [
      {
        id: 1,
        title: 'Cloud Computing Fundamentals',
        topics: [
          'IaaS, PaaS & SaaS service models',
          'Public, private & hybrid cloud strategies',
          'Cloud economics & shared responsibility model',
        ],
        project: {
          title: 'Cloud Strategy Assessment',
          description: 'Evaluate a business case and recommend the right cloud deployment model with cost analysis.',
        },
      },
      {
        id: 2,
        title: 'AWS Global Infrastructure',
        topics: [
          'Regions, Availability Zones & edge locations',
          'AWS account structure & billing basics',
          'Well-Architected Framework overview',
        ],
        project: {
          title: 'Multi-Region Architecture Map',
          description: 'Design a fault-tolerant layout across AWS regions and availability zones for a sample app.',
        },
      },
      {
        id: 3,
        title: 'IAM & Security Foundations',
        topics: [
          'IAM users, roles, groups & policies',
          'Least-privilege access & MFA',
          'AWS Organizations & SCP basics',
        ],
        project: {
          title: 'Secure AWS Foundation',
          description: 'Configure IAM roles, policies, and MFA for a production-ready AWS account baseline.',
        },
      },
    ],
    industryProject: {
      title: 'Industry Project 1 — Secure AWS Foundation',
      description:
        'Stand up a hardened AWS account with IAM best practices, billing alerts, and a documented security baseline.',
    },
  },
  {
    phase: 'Phase 2',
    label: 'Core AWS Services',
    meta: 'Modules 4–8',
    modules: [
      {
        id: 4,
        title: 'Compute Services',
        topics: ['EC2 instance types & launch templates', 'Auto Scaling groups', 'AWS Lambda & serverless compute'],
        project: {
          title: 'Auto-Scaling Web Tier',
          description: 'Deploy a scalable compute layer with launch templates and Auto Scaling policies.',
        },
      },
      {
        id: 5,
        title: 'Storage & Databases',
        topics: ['S3 storage classes & lifecycle rules', 'EBS volumes & snapshots', 'RDS & DynamoDB fundamentals'],
        project: {
          title: 'S3 Data Lake Setup',
          description: 'Build a secure S3 data lake with versioning, encryption, and lifecycle management.',
        },
      },
      {
        id: 6,
        title: 'Networking & VPC',
        topics: [
          'VPCs, subnets, route tables & gateways',
          'Security groups vs NACLs',
          'NAT Gateway & VPC peering',
        ],
        project: {
          title: 'Custom VPC Design',
          description: 'Architect public and private subnets with controlled internet access and inter-tier routing.',
        },
      },
      {
        id: 7,
        title: 'Load Balancing & CDN',
        topics: ['Application Load Balancer patterns', 'Route 53 DNS & routing policies', 'CloudFront CDN delivery'],
        project: {
          title: 'Global Traffic Distribution',
          description: 'Route user traffic through Route 53 and CloudFront to a highly available application endpoint.',
        },
      },
      {
        id: 8,
        title: 'Architecture Patterns',
        topics: [
          'Multi-tier & microservices patterns',
          'Decoupling with SQS & SNS',
          'Caching strategies with ElastiCache',
        ],
        project: {
          title: 'Resilient Application Design',
          description: 'Design a decoupled, fault-tolerant architecture using messaging and caching patterns.',
        },
      },
    ],
    industryProject: {
      title: 'Industry Project 3 — Multi-Tier VPC Application',
      description:
        'Deploy a production-style three-tier web application inside a custom VPC with load balancing and managed databases.',
    },
  },
  {
    phase: 'Phase 3',
    label: 'Production & Certification',
    modules: [
      {
        id: 9,
        title: 'High Availability & DR',
        topics: ['Multi-AZ deployments', 'Backup & restore strategies', 'RTO/RPO planning & failover design'],
        project: {
          title: 'HA Database Architecture',
          description: 'Implement multi-AZ RDS with automated backups and a documented disaster recovery plan.',
        },
      },
      {
        id: 10,
        title: 'Monitoring & Cost Optimization',
        topics: ['CloudWatch metrics, logs & alarms', 'CloudTrail auditing', 'Cost Explorer & budget alerts'],
        project: {
          title: 'Cloud Operations Dashboard',
          description: 'Set up monitoring, alerting, and cost visibility for a live AWS workload.',
        },
      },
      {
        id: 11,
        title: 'Infrastructure as Code',
        topics: ['CloudFormation templates & stacks', 'Terraform on AWS', 'CI/CD for infrastructure deployments'],
        project: {
          title: 'IaC Environment Provisioning',
          description: 'Provision a full AWS environment using CloudFormation or Terraform with version-controlled templates.',
        },
      },
      {
        id: 12,
        title: 'Exam Prep & Architecture Review',
        topics: [
          'SAA-C03 exam domains & question patterns',
          'Architecture review & trade-off analysis',
          'Security, cost & performance optimization',
        ],
        project: {
          title: 'Architecture Review Board',
          description: 'Present and defend a complete AWS architecture against Well-Architected criteria.',
        },
      },
    ],
  },
];

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
    desc: '7 industry projects, a capstone, and a bonus IaC build — documented and interview-ready.',
  },
  {
    icon: Award,
    title: 'Industry Certificate',
    desc: 'Zyvotrix Certified AWS Solutions Architect — shareable on LinkedIn with hiring partner recognition.',
  },
];

const certificatePerks = [
  'LinkedIn-ready',
  'PDF + digital badge',
  'SAA-C03 exam preparation included',
];

const awsAdvantageContent: ProgramAdvantageContent = {
  eyebrow: 'The Zyvotrix Difference',
  headline: (
    <>
      Why Learners <span>Choose Zyvotrix</span>
    </>
  ),
  sub: 'A structured path from cloud fundamentals to production AWS architecture — built for careers, not just certification slides.',
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
      zyvotrix: '7 industry-grade AWS builds plus capstone & bonus IaC project',
      typical: 'Generic quizzes with limited portfolio value',
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
    title: 'Secure AWS Foundation',
    description:
      'Configure a production-ready AWS account with IAM roles, MFA, billing alerts, encryption defaults, and a documented security baseline.',
    skills: ['IAM', 'MFA', 'AWS Organizations', 'Security Policies', 'Billing Alerts', 'Least Privilege'],
  },
  {
    id: 2,
    label: 'Project 2',
    title: 'Serverless API Platform',
    description:
      'Build a serverless REST API using Lambda, API Gateway, and DynamoDB with authentication, logging, and auto-scaling built in.',
    skills: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'CloudWatch', 'Serverless', 'IAM Roles'],
  },
  {
    id: 3,
    label: 'Project 3',
    title: 'Multi-Tier VPC Web Application',
    description:
      'Deploy a three-tier application inside a custom VPC with public load balancers, private app servers, and a managed RDS database.',
    skills: ['VPC Design', 'EC2', 'ALB', 'RDS', 'Security Groups', 'Multi-Tier Architecture'],
  },
  {
    id: 4,
    label: 'Project 4',
    title: 'S3 Data Lake & Analytics',
    description:
      'Create a secure S3 data lake with lifecycle policies, encryption, and analytics-ready storage for structured and unstructured data.',
    skills: ['Amazon S3', 'Lifecycle Policies', 'Encryption', 'Data Lake', 'Athena', 'Glue Basics'],
  },
  {
    id: 5,
    label: 'Project 5',
    title: 'Highly Available Database System',
    description:
      'Design a multi-AZ RDS deployment with automated backups, read replicas, and a documented disaster recovery strategy.',
    skills: ['RDS Multi-AZ', 'Backups', 'Read Replicas', 'Disaster Recovery', 'RTO/RPO', 'Failover'],
  },
  {
    id: 6,
    label: 'Project 6',
    title: 'Auto-Scaling Production Workload',
    description:
      'Implement an auto-scaling compute tier with launch templates, target tracking policies, and load-balanced traffic distribution.',
    skills: ['Auto Scaling', 'EC2', 'ALB', 'CloudWatch Alarms', 'Launch Templates', 'High Availability'],
  },
  {
    id: 7,
    label: 'Project 7',
    title: 'Cloud Operations Dashboard',
    description:
      'Set up CloudWatch monitoring, CloudTrail auditing, SNS alerting, and Cost Explorer dashboards for a live AWS environment.',
    skills: ['CloudWatch', 'CloudTrail', 'SNS', 'Cost Explorer', 'Budgets', 'Operational Excellence'],
  },
  {
    id: 8,
    label: 'Capstone Project',
    title: 'Enterprise-Grade AWS Architecture',
    description:
      'Design and deploy a production-ready AWS platform combining VPC networking, HA databases, serverless components, monitoring, and cost controls.',
    skills: [
      'VPC',
      'EC2',
      'RDS',
      'Lambda',
      'CloudFront',
      'Route 53',
      'CloudWatch',
      'Well-Architected Framework',
      'Production Architecture',
    ],
    isCapstone: true,
  },
  {
    id: 9,
    label: 'Bonus Portfolio Project',
    title: 'Terraform AWS Infrastructure',
    description:
      'Provision a complete AWS environment using Terraform modules — version-controlled, repeatable, and production-ready infrastructure as code.',
    skills: ['Terraform', 'IaC', 'AWS Modules', 'State Management', 'CI/CD', 'Environment Automation'],
    isBonus: true,
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
    imageAlt: 'Learners designing AWS cloud architectures at Zyvotrix',
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
    imageAlt: 'Cloud practitioner providing AWS architecture mentorship at Zyvotrix',
    imageBadge: 'Working Cloud Practitioners',
    reverse: true,
  },
];

const learningExperienceStats = [
  { number: '12', label: 'Weekend Live', sublabel: 'Sessions' },
  { number: '10+', label: 'Hands-on Labs', sublabel: '& Projects' },
  { number: '100%', label: 'Architecture-First', sublabel: 'Curriculum' },
];

const learningExperienceGallery = [
  {
    src: visuals.labs,
    alt: 'Hands-on AWS labs at Zyvotrix',
    label: 'AWS Cloud Labs',
    sublabel: 'Hands-on service practice',
  },
  {
    src: visuals.liveSessions,
    alt: 'Live mentor-led AWS session at Zyvotrix',
    label: 'Live Sessions',
    sublabel: 'Every weekend, instructor-led',
  },
  {
    src: visuals.buildProjects,
    alt: 'Building AWS portfolio projects at Zyvotrix',
    label: 'Build Projects',
    sublabel: 'Ship real cloud architectures',
  },
  {
    src: visuals.cloudStack,
    alt: 'AWS services and cloud stack at Zyvotrix',
    label: 'AWS Service Stack',
    sublabel: 'EC2 · S3 · VPC · RDS',
  },
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
    title: 'AWS Solutions Architect Program (AWS)',
    description:
      '3-month AWS Solutions Architect certification at Zyvotrix. Master EC2, S3, VPC, IAM, RDS, Lambda, and design portfolio-ready cloud architectures.',
    canonical: '/courses/aws',
  });

  const techRowA = AWS_TOOLS.slice(0, 11);
  const techRowB = AWS_TOOLS.slice(11);

  return (
    <PageShell className="devops-program-page aws-program-page">
      <Navbar />

      <section className="program-landing-hero relative overflow-hidden">
        <AmbientDepth />
        <div className="hero-orb hero-orb-1 opacity-40" aria-hidden />
        <div className="hero-orb hero-orb-2 opacity-30" aria-hidden />
        <div className="hero-orb hero-orb-3 opacity-25" aria-hidden />
        <div className="hero-grid-overlay opacity-40" aria-hidden />

        <div className="container relative z-10 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="hero-fade-up">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {course.code} · Certification Program
              </span>
              <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-brand-950 sm:text-4xl lg:text-[2.75rem]">
                <span className="gradient-text-animated">AWS Solutions Architect</span> Program
              </h1>

              <div className="program-hero-tagline mb-6 max-w-xl rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white/90 to-violet-500/5 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  Most cloud courses teach you how to <span className="text-muted-foreground">memorize</span> services.
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-primary sm:text-base">
                  Zyvotrix teaches you how to <span className="gradient-text-animated">architect</span> on AWS.
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-secondary">
                  Learn · Build · Grow
                </p>
              </div>

              <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Design scalable, secure cloud architectures on AWS in {course.duration.toLowerCase()}. Weekend
                sessions — 2 hours each day — paced for deep learning and SAA-C03 exam readiness.
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
            </div>

            <div className="hero-fade-up" style={{ animationDelay: '0.15s' }}>
              <AgenticHeroVisual
                image={visuals.hero}
                imageAlt="Team training for AWS Solutions Architect certification at Zyvotrix"
                variant="photo"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-14 sm:py-16" id="why-aws">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Why AWS
            </span>
            <h2 className="section-title mb-4">
              Beyond Console Clicks — <span className="gradient-text-animated">Real Cloud Architecture</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              AWS Solutions Architecture is the skill of designing systems that scale, stay secure, and run
              reliably in production. This is what cloud teams hire for.
            </p>
          </Reveal3D>

          <RevealStagger className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerMs={70}>
            {whyAws.map(({ icon: Icon, title, desc }) => (
              <DepthCard key={title} className="h-full" maxTilt={6}>
                <article className="program-highlight-card flex h-full gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="mb-2 text-sm font-bold text-foreground sm:text-base">{title}</h3>
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
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Curriculum
            </span>
            <h2 className="section-title mb-4">
              Zero to <span className="gradient-text-animated">AWS Solutions Architect</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              12 modules across 3 phases — from cloud fundamentals to production architecture and SAA-C03 exam prep.
            </p>
          </Reveal3D>

          <div className="program-curriculum-layout mx-auto max-w-6xl">
            <div className="program-curriculum-main min-w-0">
              <Reveal3D>
                <h3 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">Learning Path</h3>
                <ProgramCurriculumAccordion phases={curriculum} />
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
      />

      <ProgramIndustryProjects
        projects={AWS_INDUSTRY_PROJECTS}
        eyebrow="Portfolio"
        title="Industry Projects"
        description="Seven progressive AWS builds, a production capstone, and a bonus Terraform project — every architecture is designed for your portfolio and cloud interviews."
      />

      <section className="section-padding border-y border-border bg-brand-100/30 devops-section-glow">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Tech Stack
            </span>
            <h2 className="section-title mb-3">
              AWS Services You&apos;ll <span className="gradient-text-animated">Master</span>
            </h2>
            <p className="mb-10 text-muted-foreground">
              Every service maps directly to a module — from EC2 and S3 to CloudWatch, CloudFormation, and Terraform.
            </p>
          </Reveal3D>

          <RevealStagger className="devops-tools-grid aac-tools-grid" staggerMs={40}>
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

          <Reveal3D delay={80}>
            <TechMarquee tools={techRowA} />
            <TechMarquee tools={techRowB} reverse />
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-white" id="who-should-join">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Who Should Join
            </span>
            <h2 className="section-title mb-4">Is This Program For You?</h2>
            <p className="leading-relaxed text-muted-foreground">
              Designed for anyone who wants to design real AWS architectures — not just pass a theory exam.
            </p>
          </Reveal3D>

          <ProgramSectionAside
            image={visuals.audience}
            imageAlt="Cloud professionals learning AWS architecture at Zyvotrix"
            caption="Built for beginners, developers, and certification aspirants"
            className="mx-auto max-w-5xl"
          >
            <RevealStagger className="grid gap-5 sm:grid-cols-2" staggerMs={90}>
              {audience.map(({ icon: Icon, title, desc }) => (
                <DepthCard key={title} className="h-full" maxTilt={6}>
                  <article className="program-audience-card flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    </div>
                  </article>
                </DepthCard>
              ))}
            </RevealStagger>
          </ProgramSectionAside>

          <Reveal3D delay={100}>
            <div className="devops-glow-card mx-auto max-w-md">
              <div className="devops-glow-card-inner p-8 text-center shadow-lg">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                  Enrollment
                </p>
                <p className="mb-2 text-2xl font-bold text-foreground">Now Open</p>
                <p className="mb-2 text-sm text-muted-foreground">
                  Weekend sessions · 2 hours/day · {course.duration}
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  Limited seats · Live mentorship · Architecture review day included
                </p>
                <Button asChild className="btn-brand btn-shimmer h-11 w-full">
                  <Link to={course.checkoutPath}>Reserve Your Seat</Link>
                </Button>
              </div>
            </div>
          </Reveal3D>
        </div>
      </section>

      <section className="section-padding section-alt devops-section-glow" id="outcomes">
        <div className="container px-4 sm:px-6">
          <Reveal3D className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              After You Graduate
            </span>
            <h2 className="section-title mb-4">What You&apos;ll Be Capable Of</h2>
            <p className="leading-relaxed text-muted-foreground">
              Build in-demand cloud architecture skills and a portfolio that gets you hired.
            </p>
          </Reveal3D>

          <ProgramSectionAside
            image={visuals.career}
            imageAlt="Career-ready AWS architecture skills and portfolio projects"
            caption="Career-ready cloud skills and portfolio projects"
            reverse
            className="mx-auto mb-14 max-w-5xl"
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

          <Reveal3D delay={100}>
            <div className="devops-glow-card mx-auto max-w-3xl">
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
                      Upon completing all modules, projects, and the capstone, you receive a digital
                      certificate you can share on LinkedIn and add to your portfolio.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-violet-500/10 p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      Certificate Includes
                    </p>
                    <ul className="space-y-2.5 text-left">
                      {certificatePerks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                          <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal3D>
        </div>
      </section>

      <PageCta
        badge="Start your AWS journey"
        title="Ready to design production cloud architectures?"
        description="From cloud fundamentals to an enterprise-grade AWS capstone — in 3 months."
        primaryLabel="Enroll Now"
        primaryHref={course.checkoutPath}
        secondaryLabel="View All Programs"
        secondaryHref="/courses"
      />

      <Footer />
    </PageShell>
  );
};

export default AwsSolutionsArchitectProgram;

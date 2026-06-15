import type { LucideIcon } from 'lucide-react';
import { Bot, Cloud, BarChart3, Wrench } from 'lucide-react';
import { IMAGES } from '@/lib/images';

export interface Course {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  route: string;
  checkoutPath: string;
  image: string;
  icon: LucideIcon;
  level: string;
  projects: string;
  /** Short bullets shown on checkout */
  checkoutIncludes: string[];
}

export const COURSES: Course[] = [
  {
    id: 'dop',
    code: 'DOP',
    title: 'AI-Powered DevOps Engineer Program (DOP)',
    shortTitle: 'AI-Powered DevOps (DOP)',
    description:
      'DevOps fundamentals with AI-assisted automation, CI/CD, containers, and production-ready cloud deployments.',
    duration: '4 Months',
    route: '/courses/devops-engineer-program',
    checkoutPath: '/checkout/devops-engineer-program',
    image: IMAGES.programs.dop,
    icon: Wrench,
    level: 'Intermediate',
    projects: '12+',
    checkoutIncludes: [
      'Live mentor-led sessions with industry practitioners',
      'Hands-on CI/CD, Docker, Kubernetes & Terraform labs',
      '12+ deployment projects for your portfolio',
      'Full LMS access with recordings & assignments',
      'Certificate on successful program completion',
    ],
  },
  {
    id: 'aac',
    code: 'AAC',
    title: 'Agentic AI Certification Training (AAC)',
    shortTitle: 'Agentic AI (AAC)',
    description:
      'Build intelligent agents, LLM workflows, and automation systems using modern AI tools and frameworks.',
    duration: '3 Months',
    route: '/courses/aac',
    checkoutPath: '/checkout/aac',
    image: IMAGES.programs.aac,
    icon: Bot,
    level: 'Intermediate',
    projects: '10+',
    checkoutIncludes: [
      'Live sessions on LLMs, RAG, agents & LangGraph',
      'Build production-ready AI agents in guided labs',
      '10+ portfolio projects recruiters actually review',
      'Learning OS with curriculum, sessions & mentor support',
      'Zyvotrix certificate with verifiable credential ID',
    ],
  },
  {
    id: 'aws',
    code: 'AWS',
    title: 'AWS Solutions Architect Certification Program',
    shortTitle: 'AWS Solutions Architect',
    description:
      'AWS Solutions Architect training & SAA-C03 certification course — EC2, S3, VPC, IAM, Lambda, Terraform, and portfolio-ready cloud architecture in 3 months.',
    duration: '3 Months',
    route: '/courses/aws',
    checkoutPath: '/checkout/aws',
    image: IMAGES.programs.aws,
    icon: Cloud,
    level: 'Beginner to Intermediate',
    projects: '7+',
    checkoutIncludes: [
      'SAA-C03 focused syllabus with exam-ready prep',
      'Hands-on EC2, VPC, S3, IAM & Lambda labs',
      '7+ cloud architecture projects for your resume',
      'Live mentor Q&A and session recordings',
      'Certificate aligned to AWS Solutions Architect track',
    ],
  },
  {
    id: 'data-science',
    code: 'DSP',
    title: 'Data Science & Machine Learning with Python Certification Program',
    shortTitle: 'Data Science & ML (Python)',
    description:
      'Data Science & Machine Learning with Python — SQL, analytics, visualization, statistics, and ML with 6+ portfolio projects. Built for international working professionals in 3 months.',
    duration: '3 Months',
    route: '/courses/data-science',
    checkoutPath: '/checkout/data-science',
    image: IMAGES.programs.dataScience,
    icon: BarChart3,
    level: 'Beginner to Intermediate',
    projects: '6+',
    checkoutIncludes: [
      'Python, SQL, statistics & ML — start to deployment',
      'Real datasets with Pandas, visualization & modelling',
      '6+ analytics & ML projects for your portfolio',
      'Live mentor support built for working professionals',
      'Certificate on completing the full program track',
    ],
  },
];

export const COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c])) as Record<
  string,
  Course
>;

export function getCourseByCheckoutId(checkoutId: string): Course | undefined {
  return COURSES.find(
    (c) => c.id === checkoutId || c.checkoutPath === `/checkout/${checkoutId}`,
  );
}

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
  cohortStarts: string;
  level: string;
  projects: string;
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
    route: '/courses/dop',
    checkoutPath: '/checkout/dop',
    image: IMAGES.programs.dop,
    icon: Wrench,
    cohortStarts: 'Jul 7',
    level: 'Intermediate',
    projects: '12+',
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
    cohortStarts: 'Jul 14',
    level: 'Intermediate',
    projects: '10+',
  },
  {
    id: 'aws',
    code: 'AWS',
    title: 'AWS Solutions Architect Program (AWS)',
    shortTitle: 'AWS Solutions Architect',
    description:
      'Design scalable cloud architectures on AWS — compute, storage, networking, security, and cost optimization.',
    duration: '3 Months',
    route: '/courses/aws',
    checkoutPath: '/checkout/aws',
    image: IMAGES.programs.aws,
    icon: Cloud,
    cohortStarts: 'Jun 23',
    level: 'Beginner to Intermediate',
    projects: '10+',
  },
  {
    id: 'data-science',
    code: 'DSP',
    title: 'Data Science with Python Certification Program',
    shortTitle: 'Data Science with Python',
    description:
      'Python for data analysis, visualization, statistics, and machine learning — with portfolio-ready projects.',
    duration: '2 Months',
    route: '/courses/data-science',
    checkoutPath: '/checkout/data-science',
    image: IMAGES.programs.dataScience,
    icon: BarChart3,
    cohortStarts: 'Jun 30',
    level: 'Beginner',
    projects: '8+',
  },
];

export const COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c])) as Record<
  string,
  Course
>;

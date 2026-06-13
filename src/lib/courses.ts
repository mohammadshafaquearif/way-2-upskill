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

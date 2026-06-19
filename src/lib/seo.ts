import { getCourseByCheckoutId } from '@/lib/courses';
import { CATEGORY_META, type ResourceArticle } from '@/lib/resourcesContent';
import { RESOURCE_PAGE_SEO } from '@/lib/resourcePageSeo';

export const SITE_NAME = 'Zyvotrix';
export const BASE_URL = 'https://www.zyvotrix.com';
export const ZYVOTRIX_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Zyvotrix/@12.9079567,77.640957,17z';

export const ZYVOTRIX_ORGANIZATION = {
  '@type': 'Organization' as const,
  name: SITE_NAME,
  url: BASE_URL,
  telephone: '+918887720741',
  sameAs: [
    BASE_URL,
    'https://twitter.com/zyvotrix_',
    'https://www.linkedin.com/company/zyvotrix',
    'https://www.instagram.com/zyvotrix__/',
    ZYVOTRIX_GOOGLE_MAPS_URL,
  ],
  hasMap: ZYVOTRIX_GOOGLE_MAPS_URL,
};

export interface PageSeo {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
}

export const STATIC_PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Zyvotrix — DevOps, Agentic AI, AWS & Data Science Training in Bengaluru',
    description:
      'Zyvotrix is a Bengaluru-based edtech platform for working professionals. Live mentor-led certification programs in DevOps, Agentic AI, AWS Solutions Architect, and Data Science — plus free guides.',
    canonical: '/',
  },
  '/courses': {
    title: 'Zyvotrix Certification Programs — DevOps, AI, AWS & Data Science',
    description:
      'Explore Zyvotrix certification programs in Bengaluru and online: DevOps Engineer (DOP), Agentic AI (AAC), AWS Solutions Architect (SAA-C03), and Data Science & ML with live mentorship.',
    canonical: '/courses',
  },
  '/courses/devops-engineer-program': {
    title: 'Zyvotrix DevOps Engineer Program — AI-Powered DevOps Certification',
    description:
      'Zyvotrix 4-month DevOps Engineer certification: Docker, Kubernetes, Terraform, CI/CD, and AIOps. 12+ labs, 4 portfolio projects, live mentor-led training in Bengaluru and online.',
    canonical: '/courses/devops-engineer-program',
  },
  '/courses/aac': {
    title: 'Zyvotrix Agentic AI Certification (AAC) — Build AI Agents & LLM Apps',
    description:
      'Zyvotrix Agentic AI certification: LLMs, RAG, LangChain, LangGraph, CrewAI, and multi-agent systems. 10+ AI projects and live training in Bengaluru and online.',
    canonical: '/courses/aac',
  },
  '/courses/aws': {
    title: 'Zyvotrix AWS Solutions Architect Program — SAA-C03 Certification',
    description:
      'Zyvotrix AWS Solutions Architect training for SAA-C03: EC2, S3, VPC, IAM, Lambda, Terraform, and 7+ cloud projects. Live exam-focused mentorship in Bengaluru and online.',
    canonical: '/courses/aws',
  },
  '/courses/data-science': {
    title: 'Zyvotrix Data Science & Machine Learning Certification with Python',
    description:
      'Zyvotrix Data Science certification: Python, SQL, statistics, visualization, and ML. Build 6+ portfolio projects in 3 months with live mentor support in Bengaluru and online.',
    canonical: '/courses/data-science',
  },
  '/resources': {
    title: 'Zyvotrix Free Resources — Roadmaps, Guides & Interview Prep',
    description:
      'Free Zyvotrix learning resources: DevOps, Agentic AI, AWS, and Data Science roadmaps, interview question guides, project ideas, and career paths for tech professionals.',
    canonical: '/resources',
  },
  '/about': {
    title: 'About Zyvotrix — Bengaluru Edtech for Career-Ready Tech Skills',
    description:
      'About Zyvotrix: a Bengaluru, Karnataka edtech platform helping professionals master DevOps, Agentic AI, AWS, and Data Science through mentor-led programs and hands-on projects.',
    canonical: '/about',
  },
  '/contact': {
    title: 'Contact Zyvotrix Bengaluru — Programs, Enrollment & Support',
    description:
      'Contact Zyvotrix in Bengaluru for program inquiries, enrollment, and career guidance. DevOps, Agentic AI, AWS, and Data Science training in Karnataka and online.',
    canonical: '/contact',
  },
  '/faq': {
    title: 'Zyvotrix FAQ — Programs, Pricing, Enrollment & Certificates',
    description:
      'Zyvotrix FAQ: answers about certification programs, enrollment, pricing, live training format, certificates, career support, and technical requirements for learners.',
    canonical: '/faq',
  },
  '/enroll': {
    title: 'Enroll at Zyvotrix — Apply for Certification Programs',
    description:
      'Apply and enroll in Zyvotrix certification programs: DevOps Engineer, Agentic AI, AWS Solutions Architect, and Data Science with Python. Start your upskilling journey.',
    canonical: '/enroll',
  },
  '/bonus': {
    title: 'Zyvotrix Program Bonuses — Certifications & Career Resources',
    description:
      'Zyvotrix program bonuses: industry certifications, career resources, LLM workshops, and portfolio support bundled with select DevOps, AI, AWS, and Data Science programs.',
    canonical: '/bonus',
  },
  '/verify-certificate': {
    title: 'Verify Zyvotrix Certificate — Online Credential Lookup',
    description:
      'Verify Zyvotrix program certificates online. Enter your certificate ID to confirm DevOps, Agentic AI, AWS, or Data Science training completion at Zyvotrix.',
    canonical: '/verify-certificate',
  },
  '/privacy': {
    title: 'Zyvotrix Privacy Policy — Data Protection for Learners',
    description:
      'Zyvotrix Privacy Policy: how we collect, use, store, and protect personal information for learners, enrollments, live programs, payments, and community access.',
    canonical: '/privacy',
  },
  '/terms': {
    title: 'Zyvotrix Terms of Service — Enrollment & Program Policies',
    description:
      'Zyvotrix Terms of Service: enrollment, live training, certifications, payments, refunds, intellectual property, and community guidelines for all learners.',
    canonical: '/terms',
  },
  '/404': {
    title: 'Page Not Found — Zyvotrix',
    description:
      'The page you are looking for could not be found on Zyvotrix. Explore our DevOps, Agentic AI, AWS, and Data Science programs or browse free learning resources.',
    robots: 'noindex, follow',
  },
  '/profile': {
    title: 'My Profile — Zyvotrix',
    description: 'Manage your Zyvotrix learner profile, enrolled programs, and account settings.',
    robots: 'noindex, nofollow',
  },
  '/enrollment/success': {
    title: 'Enrollment Successful — Zyvotrix',
    description:
      'Your Zyvotrix program enrollment is complete. Access your learning dashboard, live sessions, and curriculum from your account.',
    robots: 'noindex, nofollow',
  },
};

export function buildCheckoutSeo(checkoutId: string): PageSeo {
  const course = getCourseByCheckoutId(checkoutId);
  if (!course) {
    return {
      title: 'Checkout — Zyvotrix',
      description: 'Complete your enrollment and secure your seat in a Zyvotrix certification program.',
      canonical: `/checkout/${checkoutId}`,
      robots: 'noindex, nofollow',
    };
  }

  return {
    title: `Enroll in ${course.shortTitle} — Zyvotrix Checkout`,
    description: `Secure your seat in Zyvotrix ${course.title}. Live mentor-led training, hands-on projects, LMS access, and certificate on completion.`,
    canonical: course.checkoutPath,
    robots: 'noindex, nofollow',
  };
}

export function buildResourceArticleSeo(article: ResourceArticle): PageSeo {
  const override = RESOURCE_PAGE_SEO[article.slug];
  if (override) {
    return {
      ...override,
      canonical: `/resources/${article.slug}`,
    };
  }

  const label = CATEGORY_META[article.category].label;
  return {
    title: `${article.title} — Zyvotrix ${label}`,
    description: `${article.description} Free ${label} learning resource from Zyvotrix.`,
    canonical: `/resources/${article.slug}`,
  };
}

export function buildResourceNotFoundSeo(slug: string): PageSeo {
  return {
    title: 'Resource Not Found — Zyvotrix',
    description:
      'This Zyvotrix learning resource was not found. Browse free DevOps, Agentic AI, AWS, and Data Science guides, roadmaps, and interview prep.',
    canonical: `/resources/${slug}`,
    robots: 'noindex, follow',
  };
}

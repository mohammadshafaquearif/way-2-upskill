import { CATEGORY_META, type ResourceArticle } from '@/lib/resourcesContent';

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
  canonical: string;
}

export const STATIC_PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Zyvotrix — DevOps, Agentic AI, AWS & Data Science Training in Bengaluru',
    description:
      'Zyvotrix is a Bengaluru-based edtech platform helping working professionals build career-ready skills in DevOps, Agentic AI, AWS Solutions Architect, and Data Science through live mentor-led programs and free learning resources.',
    canonical: '/',
  },
  '/courses': {
    title: 'Zyvotrix Certification Programs — Top Tech Training in Bengaluru & Online',
    description:
      'Explore Zyvotrix certification programs in Bengaluru and online: AI-Powered DevOps Engineer (DOP), Agentic AI (AAC), AWS Solutions Architect (SAA-C03), and Data Science & Machine Learning with live mentor-led training.',
    canonical: '/courses',
  },
  '/courses/devops-engineer-program': {
    title: 'Zyvotrix DevOps Engineer Certification — AI-Powered DevOps Program in Bengaluru',
    description:
      'Join Zyvotrix 4-month DevOps Engineer certification in Bengaluru and online. Master Docker, Kubernetes, Terraform, CI/CD, and AIOps with 12+ labs and 4 portfolio projects.',
    canonical: '/courses/devops-engineer-program',
  },
  '/courses/aac': {
    title: 'Zyvotrix Agentic AI Certification (AAC) — AI Training in Bengaluru',
    description:
      'Zyvotrix Agentic AI certification in Bengaluru and online. Master LLMs, RAG, LangChain, LangGraph, CrewAI, and multi-agent systems — deploy portfolio-ready AI applications in 3 months.',
    canonical: '/courses/aac',
  },
  '/courses/aws': {
    title: 'Zyvotrix AWS Solutions Architect Program — SAA-C03 Training in Bengaluru',
    description:
      'Zyvotrix AWS Solutions Architect training in Bengaluru and online for SAA-C03. Master EC2, S3, VPC, IAM, Lambda, and Terraform with 7+ cloud projects and exam-focused mentorship.',
    canonical: '/courses/aws',
  },
  '/courses/data-science': {
    title: 'Zyvotrix Data Science & Machine Learning Certification — Bengaluru',
    description:
      'Zyvotrix Data Science certification in Bengaluru and online: Python, SQL, statistics, visualization, and ML. Build 6+ portfolio projects in 3 months with live mentor support.',
    canonical: '/courses/data-science',
  },
  '/resources': {
    title: 'Zyvotrix Free Resources — DevOps, Agentic AI, AWS & Data Science Guides',
    description:
      'Free Zyvotrix learning resources: roadmaps, interview question guides, project ideas, and career paths for DevOps, Agentic AI, AWS certification, and Data Science.',
    canonical: '/resources',
  },
  '/about': {
    title: 'About Zyvotrix — Bengaluru Tech Training for Career Growth',
    description:
      'Learn about Zyvotrix — a Bengaluru, Karnataka edtech platform helping professionals master DevOps, Agentic AI, AWS, and Data Science through mentor-led programs and hands-on projects.',
    canonical: '/about',
  },
  '/contact': {
    title: 'Contact Zyvotrix Bengaluru — Program Inquiries & Enrollment',
    description:
      'Contact Zyvotrix in Bengaluru for certification program inquiries, enrollment support, and career guidance. DevOps, Agentic AI, AWS, and Data Science programs in Karnataka and online.',
    canonical: '/contact',
  },
  '/faq': {
    title: 'Zyvotrix FAQ — Programs, Enrollment, Pricing & Certificates',
    description:
      'Frequently asked questions about Zyvotrix programs, enrollment process, pricing, live training format, certificates, career support, and technical requirements.',
    canonical: '/faq',
  },
  '/enroll': {
    title: 'Apply to Zyvotrix — Enroll in Certification Programs',
    description:
      'Apply and enroll in Zyvotrix certification programs: DevOps Engineer, Agentic AI, AWS Solutions Architect, and Data Science with Python. Start your learning journey.',
    canonical: '/enroll',
  },
  '/bonus': {
    title: 'Zyvotrix Program Bonuses — Certifications & Career Resources',
    description:
      'Zyvotrix program bonuses include industry certifications, career resources, LLM workshops, and portfolio support bundled with select training programs.',
    canonical: '/bonus',
  },
  '/verify-certificate': {
    title: 'Verify Zyvotrix Certificate — Certificate ID Lookup',
    description:
      'Verify Zyvotrix program certificates online. Enter a certificate ID to confirm completion of DevOps, Agentic AI, AWS, or Data Science training at Zyvotrix.',
    canonical: '/verify-certificate',
  },
  '/privacy': {
    title: 'Zyvotrix Privacy Policy',
    description:
      'Zyvotrix Privacy Policy — how we collect, use, store, and protect personal information for learners, enrollments, live programs, and community access.',
    canonical: '/privacy',
  },
  '/terms': {
    title: 'Zyvotrix Terms of Service',
    description:
      'Zyvotrix Terms of Service — enrollment, live training, certifications, payments, intellectual property, and community guidelines for learners worldwide.',
    canonical: '/terms',
  },
};

const RESOURCE_SEO_SUFFIX: Record<ResourceArticle['category'], string> = {
  devops: 'Free DevOps guide by Zyvotrix — roadmaps, interview prep, and mentor-led DevOps certification.',
  aac: 'Free Agentic AI guide by Zyvotrix — LLM, RAG, and AI agent learning resources.',
  aws: 'Free AWS cloud guide by Zyvotrix — certification prep, interview questions, and project ideas.',
  'data-science': 'Free Data Science guide by Zyvotrix — Python, ML roadmaps, and interview preparation.',
  career: 'Free tech career guide by Zyvotrix — paths into DevOps, AI, AWS, and Data Science roles.',
  interview: 'Free interview prep by Zyvotrix — top questions, answers, and tips to land your next role.',
};

export function buildResourceArticleSeo(article: ResourceArticle): PageSeo {
  const suffix = RESOURCE_SEO_SUFFIX[article.category];
  const label = CATEGORY_META[article.category].label;

  return {
    title: `${article.title} — Zyvotrix ${label}`,
    description: `${article.description} ${suffix}`,
    canonical: `/resources/${article.slug}`,
  };
}

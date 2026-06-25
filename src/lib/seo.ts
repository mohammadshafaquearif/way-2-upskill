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

export function buildResetPasswordSeo(): PageSeo {
  return {
    title: 'Reset Password — Zyvotrix',
    description: 'Reset your Zyvotrix account password and regain access to your learner dashboard.',
    canonical: '/reset-password',
    robots: 'noindex, nofollow',
  };
}

export function buildLearningSimulatorSeo(courseId: string): PageSeo {
  const course = getCourseByCheckoutId(courseId);
  return {
    title: course ? `Learning Simulator — ${course.shortTitle} | Zyvotrix` : 'Learning Simulator — Zyvotrix',
    description:
      course
        ? `Interactive learning simulator for ${course.title}: lessons, labs, and checkpoints to practice core skills.`
        : 'Interactive learning simulator: lessons, labs, and checkpoints to practice core skills.',
    canonical: `/learn/${courseId}`,
    robots: 'noindex, nofollow',
  };
}

export function buildDashboardSeo(pathname: string): PageSeo {
  const base = 'Learner Dashboard';
  const map: { prefix: string; title: string; description: string }[] = [
    { prefix: '/dashboard', title: 'Dashboard', description: 'Your progress, sessions, and upcoming tasks' },
    { prefix: '/dashboard/curriculum', title: 'Curriculum', description: 'Modules, lessons, and your learning path' },
    { prefix: '/dashboard/sessions', title: 'Live Sessions', description: 'Upcoming and past mentor-led sessions' },
    { prefix: '/dashboard/assignments', title: 'Assignments', description: 'Phase projects, due dates, and submissions' },
    { prefix: '/dashboard/projects', title: 'Projects', description: 'Portfolio projects and mentor feedback' },
    { prefix: '/dashboard/resources', title: 'Resources', description: 'Program downloads, links, and references' },
    { prefix: '/dashboard/certificate', title: 'Certificate', description: 'Completion status and certificate access' },
    { prefix: '/dashboard/profile', title: 'Profile', description: 'Account details and preferences' },
  ];
  const match =
    map.find((x) => (x.prefix === '/dashboard' ? pathname === x.prefix : pathname.startsWith(x.prefix))) ??
    map[0];
  return {
    title: `${match.title} — ${base} | Zyvotrix`,
    description: `${match.description}.`,
    canonical: match.prefix === '/dashboard' ? '/dashboard' : match.prefix,
    robots: 'noindex, nofollow',
  };
}

export function buildAdminSeo(pathname: string): PageSeo {
  const base = 'Admin';
  const sectionFromPath = () => {
    const parts = pathname.split('/').filter(Boolean);
    const section = parts[1] || 'overview';
    return section;
  };
  const section = sectionFromPath();
  const titleMap: Record<string, { title: string; description: string }> = {
    admin: { title: 'Admin', description: 'Secure admin area for managing programs, learners, and operations.' },
    overview: { title: 'Overview', description: 'Key metrics and recent activity.' },
    learners: { title: 'Learners', description: 'Learner accounts, enrollments, and status management.' },
    programs: { title: 'Programs', description: 'Program catalog, pricing, and configuration.' },
    sessions: { title: 'Sessions', description: 'Live sessions schedule and meeting links.' },
    assignments: { title: 'Assignments', description: 'Assignments, projects, and submissions review.' },
    certificates: { title: 'Certificates', description: 'Issue and verify learner certificates.' },
    contacts: { title: 'Contacts', description: 'Leads, inquiries, and follow-ups.' },
    sales: { title: 'Sales', description: 'Revenue, orders, and sales reporting.' },
    access: { title: 'Access', description: 'Admin roles and permissions.' },
    login: { title: 'Admin Login', description: 'Sign in to the Zyvotrix admin dashboard.' },
  };
  const meta = titleMap[section] ?? titleMap.overview;
  return {
    title: `${meta.title} — ${base} | Zyvotrix`,
    description: meta.description,
    canonical: pathname.startsWith('/admin') ? pathname : '/admin',
    robots: 'noindex, nofollow',
  };
}

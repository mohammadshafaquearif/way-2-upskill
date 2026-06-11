export interface ProgramFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const PROGRAM_FEATURES: ProgramFeature[] = [
  {
    id: 'curriculum',
    title: 'Modern, Job-Aligned Curriculum',
    description:
      'Structured certification paths in AI-Powered DevOps, Agentic AI, AWS Solutions Architect, and Data Science with Python.',
    image: '/images/features/curriculum.png',
    imageAlt:
      'Zyvotrix learner with study materials in a collaborative classroom environment',
  },
  {
    id: 'experts',
    title: 'Live Instruction from Practitioners',
    description:
      'Learn from working engineers and mentors through live sessions, code reviews, and practical guidance — not theory-only lectures.',
    image: '/images/features/experts.png',
    imageAlt:
      'Confident industry professional representing live expert-led instruction at Zyvotrix',
  },
  {
    id: 'projects',
    title: 'Hands-On Projects to Get Job-Ready',
    description:
      'Build portfolio-worthy apps, cloud deployments, and AI solutions using the same tools and workflows used in modern tech teams.',
    image: '/images/features/projects.png',
    imageAlt:
      'Learner working on a real-world coding project at a Zyvotrix training desk',
  },
  {
    id: 'career',
    title: 'Career Prep & Mentorship Support',
    description:
      'Get help shaping your resume, GitHub portfolio, and interview readiness so you can confidently showcase skills to employers.',
    image: '/images/features/career.png',
    imageAlt:
      'Zyvotrix mentor and learner reviewing career goals together on a laptop',
  },
];

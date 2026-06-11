export type FaqCategory =
  | 'general'
  | 'programs'
  | 'enrollment'
  | 'learning'
  | 'career'
  | 'technical'
  | 'community';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: 'general', label: 'About Zyvotrix' },
  { id: 'programs', label: 'Programs & Curriculum' },
  { id: 'enrollment', label: 'Enrollment & Pricing' },
  { id: 'learning', label: 'Learning Experience' },
  { id: 'career', label: 'Career & Jobs' },
  { id: 'technical', label: 'Technical Requirements' },
  { id: 'community', label: 'Community & Support' },
];

export const FAQS: FaqItem[] = [
  // —— General ——
  {
    id: 'what-is-zyvotrix',
    category: 'general',
    question: 'What is Zyvotrix?',
    answer:
      'Zyvotrix is a practical edtech platform focused on industry-ready tech skills. We offer certification programs in AI-Powered DevOps Engineer (DOP), Agentic AI Certification Training (AAC), AWS Solutions Architect Program (AWS), and Data Science with Python — built around hands-on projects, modern tools, and career-oriented learning paths.',
  },
  {
    id: 'who-is-zyvotrix-for',
    category: 'general',
    question: 'Who is Zyvotrix designed for?',
    answer:
      'Zyvotrix is built for college students, fresh graduates, working professionals, freelancers, and career switchers who want practical tech skills. Whether you are starting from zero or upskilling in a new domain, our programs are structured to meet you at your level and guide you toward job-ready confidence.',
  },
  {
    id: 'how-zyvotrix-differs',
    category: 'general',
    question: 'How is Zyvotrix different from free YouTube tutorials?',
    answer:
      'Unlike scattered tutorials, Zyvotrix provides structured roadmaps, sequenced modules, guided projects, and a clear progression path. You learn what matters for real jobs — in the right order — with implementation-first exercises instead of passive watching alone.',
  },
  {
    id: 'zyvotrix-mission',
    category: 'general',
    question: 'What is Zyvotrix\'s mission?',
    answer:
      'Our mission is to help learners build real skills, real confidence, and real career opportunities through practical, project-based tech education aligned with industry workflows.',
  },

  // —— Programs ——
  {
    id: 'programs-offered',
    category: 'programs',
    question: 'What programs does Zyvotrix offer?',
    answer:
      'Zyvotrix offers four certification programs: AI-Powered DevOps Engineer Program (DOP, 4 months), Agentic AI Certification Training (AAC, 3 months), AWS Solutions Architect Program (AWS, 3 months), and Data Science with Python Certification Program (2 months). View all programs at zyvotrix.com/courses.',
  },
  {
    id: 'beginner-friendly',
    category: 'programs',
    question: 'Are Zyvotrix programs beginner friendly?',
    answer:
      'Yes. Data Science with Python and AWS Solutions Architect welcome beginners with guided fundamentals. DOP and AAC are best suited for learners with basic programming familiarity. Each program page lists prerequisites clearly.',
  },
  {
    id: 'projects-included',
    category: 'programs',
    question: 'Are hands-on projects included in every program?',
    answer:
      'Yes. Every Zyvotrix program includes multiple hands-on labs and capstone-style projects designed to mirror real-world workflows. Projects become portfolio pieces you can showcase to employers.',
  },
  {
    id: 'technologies-covered',
    category: 'programs',
    question: 'What technologies and tools will I learn?',
    answer:
      'Depending on your program, you may learn React, Node.js, Python, JavaScript, Docker, Kubernetes, AWS, Terraform, Git/GitHub, CI/CD pipelines, SQL/NoSQL databases, machine learning basics, LLMs, data dashboards, and security fundamentals — aligned with what modern tech teams use.',
  },
  {
    id: 'program-duration',
    category: 'programs',
    question: 'How long are Zyvotrix programs?',
    answer:
      'Program duration varies by certification: DOP runs 4 months, AAC and AWS run 3 months each, and Data Science with Python runs 2 months. Check each program page at zyvotrix.com/courses for the full syllabus and module breakdown.',
  },
  {
    id: 'syllabus-access',
    category: 'programs',
    question: 'Can I view the full syllabus before enrolling?',
    answer:
      'Yes. Each program has a detailed syllabus page with week-by-week topics, tools covered, and project milestones. Visit zyvotrix.com/courses and select any program to review the complete curriculum.',
  },
  {
    id: 'practical-vs-theory',
    category: 'programs',
    question: 'Is Zyvotrix learning practical or theory-based?',
    answer:
      'Zyvotrix is strongly practical-first. We teach concepts with immediate implementation — you build, deploy, debug, and iterate. Theory supports understanding, but application and projects are the core of every module.',
  },

  // —— Enrollment ——
  {
    id: 'how-to-enroll',
    category: 'enrollment',
    question: 'How do I enroll in a Zyvotrix program?',
    answer:
      'Browse programs at zyvotrix.com/courses, choose your track, review the syllabus, and complete enrollment at zyvotrix.com/enroll. You can also contact our team at zyvotrix.com/contact for guidance on choosing the right program.',
  },
  {
    id: 'pricing',
    category: 'enrollment',
    question: 'What is the cost of Zyvotrix programs?',
    answer:
      'Pricing varies by program and cohort. Visit zyvotrix.com/enroll or contact us at support@zyvotrix.com for current pricing, payment options, and any available bonuses or early-bird offers.',
  },
  {
    id: 'payment-options',
    category: 'enrollment',
    question: 'Are installment or flexible payment options available?',
    answer:
      'We offer flexible payment options for select programs. Contact our team at zyvotrix.com/contact to discuss installment plans and enrollment timelines that work for you.',
  },
  {
    id: 'refund-policy',
    category: 'enrollment',
    question: 'What is Zyvotrix\'s refund policy?',
    answer:
      'Refund terms depend on the program and enrollment date. Please review our Terms of Service at zyvotrix.com/terms or contact support@zyvotrix.com before enrolling for the latest refund and cancellation policy.',
  },
  {
    id: 'free-resources',
    category: 'enrollment',
    question: 'Does Zyvotrix offer free learning resources?',
    answer:
      'Yes. Zyvotrix provides free roadmaps, beginner guides, career tips, and curated learning material at zyvotrix.com/resources — no enrollment required. These resources help you start learning before committing to a full program.',
  },

  // —— Learning ——
  {
    id: 'learning-format',
    category: 'learning',
    question: 'What is the learning format at Zyvotrix?',
    answer:
      'Learning combines structured modules, guided exercises, project assignments, and community support. Content is organized in clear weekly roadmaps so you always know what to learn next and how it connects to real job skills.',
  },
  {
    id: 'live-vs-recorded',
    category: 'learning',
    question: 'Are classes live or recorded?',
    answer:
      'Zyvotrix programs blend flexible self-paced modules with live sessions and community Q&A where applicable. This lets you learn on your schedule while still getting expert guidance and peer interaction.',
  },
  {
    id: 'mentor-support',
    category: 'learning',
    question: 'Will I get mentor or instructor support?',
    answer:
      'Yes. Learners receive guidance throughout their journey — from clarifying concepts to reviewing project approaches. Support channels include community forums, scheduled sessions, and direct contact options outlined in your program.',
  },
  {
    id: 'pace-of-learning',
    category: 'learning',
    question: 'Can I learn at my own pace?',
    answer:
      'Programs follow a recommended weekly schedule to keep you on track, but many modules allow flexible pacing within cohort timelines. Working professionals can balance learning alongside their job using the structured roadmap.',
  },
  {
    id: 'certificates',
    category: 'learning',
    question: 'Do I receive a certificate after completing a program?',
    answer:
      'Yes. Learners who complete program requirements receive a Zyvotrix certificate of completion. This validates your practical project work and structured learning — complementing your portfolio for job applications.',
  },

  // —— Career ——
  {
    id: 'job-ready',
    category: 'career',
    question: 'Will Zyvotrix programs make me job-ready?',
    answer:
      'Zyvotrix is designed to build job-relevant skills: portfolio projects, modern tool experience, and interview-ready confidence. While we do not guarantee employment, our practical approach aligns with skills listed in DevOps, Agentic AI, AWS, and Data Science roles.',
  },
  {
    id: 'portfolio-building',
    category: 'career',
    question: 'Will I build a portfolio during the program?',
    answer:
      'Absolutely. Every program includes multiple projects you can deploy and showcase on GitHub or your personal portfolio. Capstone projects simulate real team deliverables — the kind employers want to see.',
  },
  {
    id: 'career-switchers',
    category: 'career',
    question: 'Can career switchers from non-tech backgrounds join?',
    answer:
      'Yes. Many Zyvotrix learners come from non-CS backgrounds. Data Science with Python and AWS are popular entry points. We recommend starting with our free resources and speaking with our team to pick the right roadmap.',
  },
  {
    id: 'interview-prep',
    category: 'career',
    question: 'Does Zyvotrix help with interview preparation?',
    answer:
      'Programs include career-oriented guidance: how to present projects, explain technical decisions, and approach common interview topics in your domain. Community discussions and resources also cover portfolio and resume tips.',
  },

  // —— Technical ——
  {
    id: 'laptop-requirements',
    category: 'technical',
    question: 'What laptop or hardware do I need?',
    answer:
      'A modern laptop with at least 8 GB RAM (16 GB recommended for DevOps/AI tracks), stable internet, and 50+ GB free storage is sufficient. Windows, macOS, or Linux all work — we guide environment setup in early modules.',
  },
  {
    id: 'prior-coding-experience',
    category: 'technical',
    question: 'Do I need prior coding experience?',
    answer:
      'Not for all programs. Data Science with Python and AWS welcome beginners. DOP and AAC benefit from basic programming knowledge. Each syllabus page lists recommended prerequisites.',
  },
  {
    id: 'software-tools',
    category: 'technical',
    question: 'What software do I need to install?',
    answer:
      'Common tools include VS Code, Git, Node.js, Python, Docker, and cloud CLI tools depending on your track. All setup steps are covered in program onboarding — no paid software licenses are required for core learning.',
  },

  // —— Community ——
  {
    id: 'community-access',
    category: 'community',
    question: 'Is there a learner community at Zyvotrix?',
    answer:
      'Yes. Zyvotrix has a growing community for discussions, project feedback, study groups, and peer support. Visit zyvotrix.com/#community or contact us to join Discord, WhatsApp, or Telegram groups when available.',
  },
  {
    id: 'contact-support',
    category: 'community',
    question: 'How do I contact Zyvotrix support?',
    answer:
      'Reach us at support@zyvotrix.com, through the contact form at zyvotrix.com/contact, or via our social channels linked on the website. We typically respond within 1–2 business days.',
  },
  {
    id: 'newsletter',
    category: 'community',
    question: 'How do I subscribe to Zyvotrix updates?',
    answer:
      'Subscribe via the newsletter section on zyvotrix.com or at the bottom of our homepage. You will receive roadmaps, career tips, program announcements, and free resource updates.',
  },
  {
    id: 'corporate-training',
    category: 'community',
    question: 'Does Zyvotrix offer corporate or team training?',
    answer:
      'Yes. We support teams and organizations looking to upskill in DevOps, Agentic AI, AWS, and Data Science. Contact us at zyvotrix.com/contact with your team size and goals for a custom learning plan.',
  },
];

/** Homepage preview — most common questions */
export const HOMEPAGE_FAQ_IDS = [
  'what-is-zyvotrix',
  'programs-offered',
  'beginner-friendly',
  'how-to-enroll',
  'projects-included',
  'job-ready',
  'certificates',
  'free-resources',
];

export function getFaqsByIds(ids: string[]): FaqItem[] {
  return ids.map((id) => FAQS.find((f) => f.id === id)).filter(Boolean) as FaqItem[];
}

export function getFaqsByCategory(category: FaqCategory): FaqItem[] {
  return FAQS.filter((f) => f.category === category);
}

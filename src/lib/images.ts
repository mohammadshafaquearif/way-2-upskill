/** High-quality Unsplash images (auto format, cropped, compressed) */
const u = (photoId: string, width = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

export const IMAGES = {
  hero: {
    home: u('photo-1522202176988-66273c2fd55f', 1400),
    slideAi: '/images/hero/slide-ai.png',
    slideDev: '/images/hero/slide-dev.png',
    slideCloud: '/images/hero/slide-cloud.png',
    courses: u('photo-1516321497487-e288fb19713f', 1400),
    about: u('photo-1524178232363-1fb2b075b655', 1400),
    contact: u('photo-1556761175-5973dc0f32e7', 1400),
    resources: u('photo-1481627834876-b7833e8f5570', 1400),
    enroll: u('photo-1434030216411-0b793f4b4173', 1400),
    bonus: u('photo-1504639725590-34d0984388bd', 1400),
  },
  heroCaptions: {
    courses: 'Structured programs with real-world projects',
    about: 'Collaborative, industry-oriented learning',
    contact: 'Our team is ready to guide your journey',
    resources: 'Free roadmaps, guides & curated content',
    enroll: 'Start your application in minutes',
    bonus: 'Certifications & career extras included',
  },
  programs: {
    dop: '/images/programs/dop.png',
    aac: '/images/programs/aac.png',
    aws: '/images/programs/aws.png',
    dataScience: '/images/programs/data-science.png',
    /** @deprecated legacy aliases — use dop/aac/aws/dataScience */
    webDev: '/images/programs/data-science.png',
    devops: '/images/programs/dop.png',
    cloud: '/images/programs/aws.png',
    ai: '/images/programs/aac.png',
    analytics: '/images/programs/data-science.png',
    agentic: '/images/programs/aac.png',
    security: '/images/programs/dop.png',
  },
  team: u('photo-1522071820081-009f0129c71c', 800),
  instructor: u('photo-1507003211169-0a1dd7228f2d', 800),
  classroom: u('photo-1523240795612-9a054b0db644', 800),
  workshop: u('photo-1531482615713-2afd69097998', 800),
  certification: u('photo-1434030216411-0b793f4b4173', 600),
  learning: u('photo-1516321497487-e288fb19713f', 800),
  notFound: u('photo-1451187580459-43490279c0fa', 1000),
} as const;

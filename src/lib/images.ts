/** High-quality Unsplash images (auto format, cropped, compressed) */
const u = (photoId: string, width = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

export const IMAGES = {
  hero: {
    home: u('photo-1522202176988-66273c2fd55f', 1400),
    courses: u('photo-1516321497487-e288fb19713f', 1400),
    about: u('photo-1524178232363-1fb2b075b655', 1400),
    contact: u('photo-1556761175-5973dc0f32e7', 1400),
    resources: u('photo-1481627834876-b7833e8f5570', 1400),
    enroll: u('photo-1434030216411-0b793f4b4173', 1400),
    bonus: u('photo-1504639725590-34d0984388bd', 1400),
  },
  programs: {
    webDev: u('photo-1498050108023-c5249f4df085', 800),
    devops: u('photo-1558494949-ef010cbdcc31', 800),
    cloud: u('photo-1563986768609-322da13575f3', 800),
    ai: u('photo-1677442136019-21780ecad995', 800),
    analytics: u('photo-1551288049-bebda4e38f71', 800),
    agentic: u('photo-1485827404703-89b55fcc595e', 800),
    security: u('photo-1550751827-4bd374c3f58b', 800),
  },
  team: u('photo-1522071820081-009f0129c71c', 800),
  certification: u('photo-1434030216411-0b793f4b4173', 600),
  learning: u('photo-1516321497487-e288fb19713f', 800),
} as const;

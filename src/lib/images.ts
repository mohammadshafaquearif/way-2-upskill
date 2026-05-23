/** High-quality Unsplash images (auto format, cropped, compressed) */
const u = (photoId: string, width = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

export const IMAGES = {
  hero: {
    home: u('photo-1522202176988-66273c2fd55f', 1400),
    courses: u('photo-1517694712202-14dd9538aa37', 1400),
    about: u('photo-1524178232363-1fb2b075b655', 1400),
    contact: u('photo-1423666639041-f56000c27a9f', 1400),
    resources: u('photo-1456513080510-7bf93aeed12a', 1400),
    enroll: u('photo-1434030216411-0b793f4b4173', 1400),
    bonus: u('photo-1620712943553-975cc0951bc0', 1400),
  },
  programs: {
    webDev: u('photo-1498050108023-c5249f4df085', 800),
    devops: u('photo-1667372393118-3d198489ef6c', 800),
    cloud: u('photo-1451187580457-85680c843849', 800),
    ai: u('photo-1677442136019-21780ecad995', 800),
    analytics: u('photo-1551288049-bebda4e38f71', 800),
    agentic: u('photo-1620712943553-975cc0951bc0', 800),
    security: u('photo-1550751827-4bd374c3f58b', 800),
  },
  instructor: u('photo-1507003211169-0a1dd7228f2d', 600),
  team: u('photo-1522071820081-009f0129c71c', 800),
  certification: u('photo-1434030216411-0b793f4b4173', 600),
  learning: u('photo-1516321497487-e288fb19713f', 800),
} as const;

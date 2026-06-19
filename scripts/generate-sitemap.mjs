import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const BASE_URL = 'https://www.zyvotrix.com';
const today = new Date().toISOString().split('T')[0];

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/courses', priority: '0.9', changefreq: 'weekly' },
  { path: '/courses/devops-engineer-program', priority: '0.8', changefreq: 'monthly' },
  { path: '/courses/aac', priority: '0.8', changefreq: 'monthly' },
  { path: '/courses/aws', priority: '0.8', changefreq: 'monthly' },
  { path: '/courses/data-science', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.85', changefreq: 'weekly' },
  { path: '/resources', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/enroll', priority: '0.6', changefreq: 'monthly' },
  { path: '/bonus', priority: '0.6', changefreq: 'monthly' },
  { path: '/verify-certificate', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.4', changefreq: 'yearly' },
  { path: '/terms', priority: '0.4', changefreq: 'yearly' },
];

const resourcesContent = readFileSync(join(root, 'src/lib/resourcesContent.ts'), 'utf8');
const resourceSlugs = [
  ...resourcesContent.matchAll(/^\s+'([a-z0-9-]+)': article\(/gm),
].map((match) => match[1]);

const urlEntry = ({ path, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const staticEntries = STATIC_ROUTES.map(urlEntry);
const resourceEntries = resourceSlugs.map((slug) =>
  urlEntry({
    path: `/resources/${slug}`,
    priority: '0.75',
    changefreq: 'monthly',
  }),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...resourceEntries].join('\n')}
</urlset>
`;

const outPath = join(root, 'public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');

console.log(`Sitemap written to public/sitemap.xml (${STATIC_ROUTES.length + resourceSlugs.length} URLs)`);

/**
 * After vite build, write route-specific index.html files with correct
 * title, description, and canonical — so crawlers get unique meta without JS.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildResourceArticleSeo, STATIC_PAGE_SEO, type PageSeo } from '../src/lib/seo';
import { RESOURCE_ARTICLES } from '../src/lib/resourcesContent';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const baseTemplate = readFileSync(join(dist, 'index.html'), 'utf8');

const SKIP_PATHS = new Set(['/404', '/profile', '/enrollment/success']);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function formatTitle(title: string) {
  return title.includes('Zyvotrix') ? title : `${title} | Zyvotrix`;
}

function injectSeo(html: string, seo: PageSeo) {
  const canonical = seo.canonical ?? '/';
  const url = `https://www.zyvotrix.com${canonical}`;
  const title = escapeHtml(formatTitle(seo.title));
  const description = escapeHtml(seo.description);

  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${description}"`,
    )
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`)
    .replace(
      /property="og:title" content="[^"]*"/,
      `property="og:title" content="${title}"`,
    )
    .replace(
      /property="og:description" content="[^"]*"/,
      `property="og:description" content="${description}"`,
    )
    .replace(/property="og:url" content="[^"]*"/, `property="og:url" content="${url}"`)
    .replace(
      /name="twitter:title" content="[^"]*"/,
      `name="twitter:title" content="${title}"`,
    )
    .replace(
      /name="twitter:description" content="[^"]*"/,
      `name="twitter:description" content="${description}"`,
    );
}

function writeRoute(seo: PageSeo) {
  const canonical = seo.canonical ?? '/';
  const html = injectSeo(baseTemplate, seo);

  if (canonical === '/') {
    writeFileSync(join(dist, 'index.html'), html, 'utf8');
    return;
  }

  const outFile = join(dist, canonical.slice(1), 'index.html');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html, 'utf8');
}

let count = 0;

for (const seo of Object.values(STATIC_PAGE_SEO)) {
  const path = seo.canonical ?? '/';
  if (SKIP_PATHS.has(path)) continue;
  writeRoute(seo);
  count += 1;
}

for (const article of Object.values(RESOURCE_ARTICLES)) {
  writeRoute(buildResourceArticleSeo(article));
  count += 1;
}

console.log(`Prerendered meta tags for ${count} public routes`);

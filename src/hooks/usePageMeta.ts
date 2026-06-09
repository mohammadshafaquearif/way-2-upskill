import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
}

const SITE = 'Zyvotrix';
const BASE_URL = 'https://www.zyvotrix.com';

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    document.title = `${title} | ${SITE}`;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', `${title} | ${SITE}`);
    setMetaTag('property', 'og:description', description);
    setMetaTag('name', 'twitter:title', `${title} | ${SITE}`);
    setMetaTag('name', 'twitter:description', description);
    if (canonical) {
      const url = canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`;
      setCanonical(url);
      setMetaTag('property', 'og:url', url);
    }
  }, [title, description, canonical]);
}

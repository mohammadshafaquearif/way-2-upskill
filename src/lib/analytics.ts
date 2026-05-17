const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-6CZMFJ109Y';

/**
 * Google Analytics — script often loads, but POST to google-analytics.com/g/collect
 * shows ERR_BLOCKED_BY_CLIENT with ad blockers (uBlock, Brave, Edge tracking prevention).
 * The site does not block GA. Use Vercel Analytics (in App.tsx) for first-party stats.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || !GA_ID) return;

  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      try {
        window.dataLayer?.push(args);
      } catch {
        /* ad blocker */
      }
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: true });
  } catch {
    /* ad blocker */
  }
}

export function trackEvent(name: string, params?: Record<string, string>) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  } catch {
    /* ad blocker */
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

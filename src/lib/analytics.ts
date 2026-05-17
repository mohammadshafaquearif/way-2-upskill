const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-6CZMFJ109Y';

/** Load Google Analytics (not blocked by app code — ad blockers may still block third-party scripts) */
export function initAnalytics() {
  if (typeof window === 'undefined' || !GA_ID) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.onerror = () => {
    console.info('Google Analytics script could not load (often caused by browser ad blockers).');
  };
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: true });
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to hash anchors after route changes (e.g. /#faq, /courses#programs). */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          const offset = 100;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      };
      const timer = window.setTimeout(scroll, 150);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;

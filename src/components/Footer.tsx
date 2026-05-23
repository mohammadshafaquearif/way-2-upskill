import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight } from 'lucide-react';
import SocialLinks from '@/components/SocialLinks';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

const programLinks = [
  { label: 'All Programs', to: '/courses' },
  { label: 'Full Stack', to: '/courses/web-development' },
  { label: 'DevOps', to: '/courses/devops' },
  { label: 'AI & Analytics', to: '/courses/ai-ml' },
];

const resourceLinks = [
  { label: 'Free Resources', to: '/resources' },
  { label: 'Community', to: '/#community' },
  { label: 'Newsletter', to: '/#newsletter' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const supportLinks = [
  { label: 'FAQs', to: '/#faq' },
  { label: 'Programs', to: '/courses' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

const Footer = () => {
  return (
    <footer className="dark-surface footer-premium relative overflow-hidden text-white">
      <div className="footer-glow-line" />

      <div className="pointer-events-none absolute top-0 left-1/2 h-40 w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" aria-hidden />

      <div className="container relative z-10 px-4 py-14 sm:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-black/20">
                <img
                  src="/zyvotrix-logo.png"
                  alt="Zyvotrix"
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                  width={56}
                  height={56}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Zyvotrix</h3>
                <p className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-sm font-semibold text-transparent">
                  Learn. Build. Thrive.
                </p>
              </div>
            </div>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-400">
              A modern edtech platform focused on practical, industry-oriented learning across Full
              Stack Development, DevOps, Cloud Computing, AI, and Data Analytics.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={SOCIAL_LINKS.email}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:border-teal-400/40 hover:bg-teal-500/10 hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-teal-300" />
                support@zyvotrix.com
              </a>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h4 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                <span className="h-4 w-0.5 rounded-full bg-teal-400" />
                Programs
              </h4>
              <ul className="space-y-3">
                {programLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="link-glow group flex items-center gap-1 text-sm text-slate-400">
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                <span className="h-4 w-0.5 rounded-full bg-sky-400" />
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="link-glow group flex items-center gap-1 text-sm text-slate-400">
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                <span className="h-4 w-0.5 rounded-full bg-blue-400" />
                Support
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="link-glow group flex items-center gap-1 text-sm text-slate-400">
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Zyvotrix. All rights reserved.
          </p>
          <p className="text-center text-sm italic text-slate-500 md:text-right">
            Industry-oriented learning — growing with our community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

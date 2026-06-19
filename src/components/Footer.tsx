import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import SocialLinks from '@/components/SocialLinks';
import { COURSES } from '@/lib/courses';
import { ZYVOTRIX_ADDRESS_LINE, ZYVOTRIX_NAP } from '@/lib/localBusiness';
import { ZYVOTRIX_GOOGLE_MAPS_URL } from '@/lib/seo';

const programLinks = [
  { label: 'All Programs', to: '/courses' },
  ...COURSES.map((course) => ({
    label: course.shortTitle,
    to: course.route,
  })),
];

const resourceLinks = [
  { label: 'Free Resources', to: '/resources' },
  { label: 'Community', to: '/#community' },
  { label: 'Newsletter', to: '/#newsletter' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const supportLinks = [
  { label: 'FAQs', to: '/faq' },
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
          <div className="lg:col-span-4">
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">Zyvotrix</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Zyvotrix helps working professionals build job-ready skills in DevOps, Agentic AI, AWS
              Cloud, and Data Science through live training, hands-on projects, and portfolio-focused
              learning.
            </p>
            <a
              href={`mailto:${ZYVOTRIX_NAP.email}`}
              className="link-glow inline-flex items-center gap-2 text-sm text-slate-400"
            >
              <Mail className="h-4 w-4" />
              {ZYVOTRIX_NAP.email}
            </a>
            <a
              href={ZYVOTRIX_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-glow mt-3 flex items-start gap-2 text-sm text-slate-400"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {ZYVOTRIX_NAP.name}
                <br />
                {ZYVOTRIX_ADDRESS_LINE}
              </span>
            </a>
            <a
              href={`tel:${ZYVOTRIX_NAP.phoneE164}`}
              className="link-glow mt-3 inline-flex items-center gap-2 text-sm text-slate-400"
            >
              <Phone className="h-4 w-4" />
              {ZYVOTRIX_NAP.phoneDisplay}
            </a>
            <div className="mt-6">
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Programs
            </h3>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-glow inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="link-glow text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="link-glow text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter hint */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              Get program updates and free learning resources.
            </p>
            <Link
              to="/#newsletter"
              className="inline-flex items-center gap-1 text-sm font-semibold text-teal-400 hover:text-teal-300"
            >
              Subscribe
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Zyvotrix. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link to="/privacy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

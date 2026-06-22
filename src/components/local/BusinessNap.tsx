import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, Star } from 'lucide-react';
import { ZYVOTRIX_ADDRESS_LINE, ZYVOTRIX_NAP, ZYVOTRIX_SUPPORT_EMAIL } from '@/lib/localBusiness';
import { ZYVOTRIX_GOOGLE_MAPS_URL } from '@/lib/seo';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

interface BusinessNapProps {
  variant?: 'light' | 'dark';
  showReviewLink?: boolean;
  /** Defaults to learner support email (contact page / footer). */
  contactEmail?: string;
}

const BusinessNap = ({
  variant = 'light',
  showReviewLink = true,
  contactEmail = ZYVOTRIX_SUPPORT_EMAIL,
}: BusinessNapProps) => {
  const isDark = variant === 'dark';
  const labelClass = isDark ? 'text-slate-400' : 'text-muted-foreground';
  const valueClass = isDark ? 'text-white' : 'text-foreground';
  const linkClass = isDark
    ? 'text-teal-400 hover:text-teal-300'
    : 'text-primary hover:underline';

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <MapPin className={`mt-0.5 h-5 w-5 shrink-0 ${isDark ? 'text-teal-400' : 'text-primary'}`} aria-hidden />
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${labelClass}`}>Address</p>
          <a
            href={ZYVOTRIX_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-1 block text-sm leading-relaxed ${linkClass}`}
          >
            {ZYVOTRIX_NAP.name}
            <br />
            {ZYVOTRIX_ADDRESS_LINE}
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <Phone className={`mt-0.5 h-5 w-5 shrink-0 ${isDark ? 'text-teal-400' : 'text-primary'}`} aria-hidden />
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${labelClass}`}>Phone</p>
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className={`mt-1 block text-sm font-medium ${linkClass}`}>
            {ZYVOTRIX_NAP.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <Mail className={`mt-0.5 h-5 w-5 shrink-0 ${isDark ? 'text-teal-400' : 'text-primary'}`} aria-hidden />
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${labelClass}`}>Email</p>
          <a href={`mailto:${contactEmail}`} className={`mt-1 block text-sm font-medium ${linkClass}`}>
            {contactEmail}
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <Clock className={`mt-0.5 h-5 w-5 shrink-0 ${isDark ? 'text-teal-400' : 'text-primary'}`} aria-hidden />
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${labelClass}`}>Office Hours</p>
          <p className={`mt-1 text-sm ${valueClass}`}>{ZYVOTRIX_NAP.officeHours}</p>
        </div>
      </div>

      {showReviewLink && (
        <div className="flex gap-3">
          <Star className={`mt-0.5 h-5 w-5 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} aria-hidden />
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wider ${labelClass}`}>Google Reviews</p>
            <a
              href={ZYVOTRIX_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 inline-flex items-center gap-1 text-sm font-medium ${linkClass}`}
            >
              Read or leave a review on Google Maps
            </a>
          </div>
        </div>
      )}

      <p className={`text-sm leading-relaxed ${labelClass}`}>
        <Link to="/contact" className={linkClass}>
          Contact Zyvotrix
        </Link>{' '}
        for DevOps, Agentic AI, AWS, and Data Science programs in Bengaluru and online.
      </p>
    </div>
  );
};

export default BusinessNap;

import { BASE_URL, SITE_NAME, ZYVOTRIX_GOOGLE_MAPS_URL } from '@/lib/seo';

/** Canonical NAP — must match Google Business Profile exactly. Update here only. */
export const ZYVOTRIX_NAP = {
  name: SITE_NAME,
  streetAddress: 'HSR Layout, Sector 3',
  addressLocality: 'Bengaluru',
  addressRegion: 'Karnataka',
  postalCode: '560102',
  addressCountry: 'IN',
  phoneDisplay: '+91 8887720741',
  phoneE164: '+918887720741',
  email: 'support@zyvotrix.com',
  website: BASE_URL,
  officeHours: 'Mon–Fri: 9 AM – 5 PM IST',
  geo: {
    latitude: 12.9079567,
    longitude: 77.640957,
  },
} as const;

export const ZYVOTRIX_ADDRESS_LINE = `${ZYVOTRIX_NAP.streetAddress}, ${ZYVOTRIX_NAP.addressLocality}, ${ZYVOTRIX_NAP.addressRegion} ${ZYVOTRIX_NAP.postalCode}, India`;

export const ZYVOTRIX_MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.163!2d77.6383821!3d12.9079619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158b6bc0a5b5%3A0x34f4bf805465083f!2sZyvotrix!5e0!3m2!1sen!2sin!4v1718822400000!5m2!1sen!2sin';

/** Use in Google Business Profile → Website field for GMB traffic tracking */
export const ZYVOTRIX_GMB_WEBSITE_URL =
  'https://www.zyvotrix.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb';

export const ZYVOTRIX_LOCAL_KEYWORDS = {
  city: 'Bengaluru',
  state: 'Karnataka',
  tagline: 'Based in Bengaluru, India — serving learners across India and worldwide.',
} as const;

export const ZYVOTRIX_LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  name: ZYVOTRIX_NAP.name,
  url: ZYVOTRIX_NAP.website,
  logo: `${BASE_URL}/zyvotrix-logo.png`,
  image: `${BASE_URL}/zyvotrix-logo.png`,
  description:
    'Zyvotrix is a Bengaluru-based edtech platform offering live mentor-led certification programs in DevOps, Agentic AI, AWS, and Data Science.',
  email: ZYVOTRIX_NAP.email,
  telephone: ZYVOTRIX_NAP.phoneE164,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ZYVOTRIX_NAP.streetAddress,
    addressLocality: ZYVOTRIX_NAP.addressLocality,
    addressRegion: ZYVOTRIX_NAP.addressRegion,
    postalCode: ZYVOTRIX_NAP.postalCode,
    addressCountry: ZYVOTRIX_NAP.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: ZYVOTRIX_NAP.geo.latitude,
    longitude: ZYVOTRIX_NAP.geo.longitude,
  },
  hasMap: ZYVOTRIX_GOOGLE_MAPS_URL,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Bengaluru' },
    { '@type': 'State', name: 'Karnataka' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: [
    BASE_URL,
    'https://twitter.com/zyvotrix_',
    'https://www.linkedin.com/company/zyvotrix',
    'https://www.instagram.com/zyvotrix__/',
    ZYVOTRIX_GOOGLE_MAPS_URL,
  ],
};

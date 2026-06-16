import type { AdminSection, ContactLeadStatus, EnrollmentStatus, LearnerStatus } from '@/lib/adminTypes';

export const PROGRAM_CODES = ['DOP', 'AAC', 'AWS', 'DSP'] as const;

export const LEARNER_STATUSES: LearnerStatus[] = ['active', 'inactive', 'paused', 'completed'];

export const ENROLLMENT_STATUSES: EnrollmentStatus[] = [
  'pending',
  'active',
  'completed',
  'cancelled',
];

export const ENROLLMENT_STATUS_OPTIONS: {
  value: EnrollmentStatus;
  label: string;
  description: string;
  countsAsSold: boolean;
}[] = [
  {
    value: 'pending',
    label: 'Pending',
    description: 'Payment incomplete — not counted as sold',
    countsAsSold: false,
  },
  {
    value: 'active',
    label: 'Active',
    description: 'Enrolled — LMS access enabled (Razorpay sale only after payment)',
    countsAsSold: false,
  },
  {
    value: 'completed',
    label: 'Completed',
    description: 'Course finished — LMS access retained',
    countsAsSold: false,
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    description: 'Revoked or refunded — not counted as sold',
    countsAsSold: false,
  },
];

export const CONTACT_STATUSES: ContactLeadStatus[] = ['new', 'contacted', 'converted'];

export const SUBMISSION_STATUSES = ['submitted', 'reviewed', 'approved', 'rejected'] as const;

export const ADMIN_SECTIONS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'learners', label: 'Learners' },
  { id: 'programs', label: 'Programs' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contacts', label: 'Contact Leads' },
] as const;

export function adminSectionFromPath(pathname: string): AdminSection {
  const slug = pathname.replace(/^\/admin\/?/, '').split('/')[0];
  if (!slug) return 'dashboard';
  const match = ADMIN_SECTIONS.find((s) => s.id === slug);
  return match ? (match.id as AdminSection) : 'dashboard';
}

export function adminPathForSection(section: AdminSection): string {
  return section === 'dashboard' ? '/admin' : `/admin/${section}`;
}

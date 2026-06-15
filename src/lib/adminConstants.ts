import type { ContactLeadStatus, EnrollmentStatus, LearnerStatus } from '@/lib/adminTypes';

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
    description: 'Enrolled and paid — counts as sold',
    countsAsSold: true,
  },
  {
    value: 'completed',
    label: 'Completed',
    description: 'Course finished — counts as sold',
    countsAsSold: true,
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

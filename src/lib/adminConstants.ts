import type { ContactLeadStatus, EnrollmentStatus, LearnerStatus } from '@/lib/adminTypes';

export const PROGRAM_CODES = ['DOP', 'AAC', 'AWS', 'DSP'] as const;

export const LEARNER_STATUSES: LearnerStatus[] = ['active', 'inactive', 'paused', 'completed'];

export const ENROLLMENT_STATUSES: EnrollmentStatus[] = [
  'pending',
  'active',
  'completed',
  'cancelled',
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

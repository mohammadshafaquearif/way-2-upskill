export type LearnerStatus = 'active' | 'inactive' | 'paused' | 'completed';
export type EnrollmentStatus = 'pending' | 'active' | 'completed' | 'cancelled';
export type ContactLeadStatus = 'new' | 'contacted' | 'converted';
export type SubmissionStatus = 'submitted' | 'reviewed' | 'approved' | 'rejected';

export type AdminSection =
  | 'dashboard'
  | 'learners'
  | 'programs'
  | 'sessions'
  | 'assignments'
  | 'certificates'
  | 'contacts';

export interface AdminLearner {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string | null;
  assigned_program: string | null;
  learner_status: LearnerStatus;
  admin_notes: string | null;
  created_at: string;
  enrollment_status?: string | null;
  joining_date?: string | null;
}

export interface AdminProgram {
  id: string;
  code: string;
  title: string;
  description: string | null;
  duration: string | null;
  price: number;
  curriculum: string | null;
  category: string | null;
  level: string | null;
  is_active: boolean;
  created_at: string;
}

export interface AdminSession {
  id: string;
  course_id: string;
  title: string;
  meet_link: string | null;
  session_date: string;
  session_time: string;
  mentor_name: string | null;
  program_code?: string;
  program_title?: string;
}

export interface AdminAssignment {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  due_date: string;
  program_code?: string;
  submission_count?: number;
}

export interface AdminSubmission {
  id: string;
  assignment_id: string;
  assignment_title?: string;
  user_id: string | null;
  learner_name: string | null;
  learner_email: string | null;
  file_url: string | null;
  file_name: string | null;
  submitted_at: string;
  status: SubmissionStatus;
  notes: string | null;
}

export interface AdminCertificate {
  id: string;
  certificate_id: string;
  student_name: string;
  user_id: string | null;
  course_id: string | null;
  program_code: string | null;
  completion_date: string;
  created_at: string;
}

export interface AdminContact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string;
  subject: string | null;
  status: ContactLeadStatus;
  created_at: string;
}

export interface AdminEnrollment {
  id: string;
  user_id: string | null;
  course_id: string | null;
  user_name: string;
  user_email: string;
  course_name: string;
  program_code?: string;
  payment_plan: string | null;
  amount: number;
  paid_amount?: number;
  status: string;
  created_at: string;
}

export interface AdminDashboardStats {
  totalLearners: number;
  activeLearners: number;
  programsSold: number;
  revenue: number;
  upcomingSessions: AdminSession[];
  recentEnrollments: AdminEnrollment[];
}

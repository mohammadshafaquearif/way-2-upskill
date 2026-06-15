export type ProgramId = 'aac' | 'dop' | 'aws' | 'data-science';

export type ModuleStatus = 'completed' | 'current' | 'locked';

export type AssignmentStatus = 'pending' | 'submitted' | 'reviewed' | 'approved';

export type ProjectStatus = 'not_started' | 'in_progress' | 'submitted' | 'reviewed';

export interface LMSModule {
  id: number;
  dbId?: string;
  quizId?: string;
  title: string;
  phaseId: string;
  topics: string[];
  hasQuiz: boolean;
  hasAssignment: boolean;
  lessonCount: number;
}

export interface LMSPhaseProject {
  label: string;
  title: string;
  description: string;
  deliverables: string[];
  skills: string[];
  moduleId: number;
  isCapstone?: boolean;
}

export interface LMSPhase {
  id: string;
  phase: string;
  label: string;
  meta?: string;
  project?: LMSPhaseProject;
  modules: LMSModule[];
}

export interface LMSAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: AssignmentStatus;
  moduleId?: number;
  deliverables?: string[];
  skills?: string[];
  isCapstone?: boolean;
}

export interface LMSProject {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  label?: string;
  deliverables?: string[];
  skills?: string[];
  moduleId?: number;
  isCapstone?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  feedback?: string[];
}

export interface LMSSession {
  id: string;
  title: string;
  sessionDate: string;
  sessionTime: string;
  mentorName: string;
  meetLink?: string;
  isUpcoming: boolean;
  recordingUrl?: string;
  slidesUrl?: string;
  notesUrl?: string;
}

export interface LMSResource {
  id: string;
  title: string;
  type: 'pdf' | 'guide' | 'cheatsheet' | 'link';
  url?: string;
}

export interface LearnerProgramState {
  programId: ProgramId;
  programCode: string;
  programTitle: string;
  progress: number;
  currentModule: LMSModule | null;
  currentModuleTitle: string;
  lastWatchedLesson: string;
  totalModules: number;
  completedModules: number;
  pendingAssignments: number;
  submittedProjects: number;
  certificateLocked: boolean;
  certificateId?: string;
  streak: number;
}

export interface LMSNavItem {
  id: string;
  label: string;
  path: string;
  badge?: string;
}

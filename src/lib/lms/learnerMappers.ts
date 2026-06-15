import type { AssignmentStatus, LMSAssignment, LMSProject, LMSSession, ProjectStatus } from './types';
import type { DbAssignmentRow, DbAssignmentSubmissionRow, DbModuleProgress } from './dbTypes';

export function mapSubmissionToAssignmentStatus(
  submission: DbAssignmentSubmissionRow | undefined,
): AssignmentStatus {
  if (!submission) return 'pending';
  const status = (submission.status ?? 'submitted').toLowerCase();
  if (status === 'approved') return 'approved';
  if (status === 'reviewed') return 'reviewed';
  return 'submitted';
}

export function mapDbAssignmentToLms(
  row: DbAssignmentRow,
  submission: DbAssignmentSubmissionRow | undefined,
  moduleNumber?: number,
): LMSAssignment {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    dueDate: row.due_date,
    status: mapSubmissionToAssignmentStatus(submission),
    moduleId: moduleNumber,
    label: row.label ?? undefined,
    deliverables: Array.isArray(row.deliverables) ? row.deliverables : [],
    skills: Array.isArray(row.skills) ? row.skills : [],
    isCapstone: row.is_capstone === true,
  };
}

export function mapAssignmentToProject(
  assignment: LMSAssignment,
  submission: DbAssignmentSubmissionRow | undefined,
  moduleProgress?: DbModuleProgress,
): LMSProject {
  let status: ProjectStatus = 'not_started';
  if (assignment.status === 'reviewed' || assignment.status === 'approved') {
    status = 'reviewed';
  } else if (assignment.status === 'submitted') {
    status = 'submitted';
  } else if (
    moduleProgress?.status === 'in_progress' ||
    moduleProgress?.status === 'current' ||
    moduleProgress?.quiz_passed
  ) {
    status = 'in_progress';
  }

  return {
    id: assignment.id,
    title: assignment.title,
    description: assignment.description,
    status,
    label: assignment.label,
    deliverables: assignment.deliverables,
    skills: assignment.skills,
    moduleId: assignment.moduleId,
    isCapstone: assignment.isCapstone,
    githubUrl: submission?.github_url ?? undefined,
    demoUrl: submission?.demo_url ?? undefined,
    feedback: submission?.notes ? [submission.notes] : undefined,
  };
}

export function mapDbSessionToLms(row: Record<string, unknown>): LMSSession {
  const sessionDate = String(row.session_date ?? '');
  const today = new Date().toISOString().slice(0, 10);
  const status = String(row.status ?? 'scheduled');
  const isUpcoming = sessionDate >= today && status !== 'completed';

  const timeRaw = String(row.session_time ?? '20:00:00');
  const [h, m] = timeRaw.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const sessionTime = `${hour12}:${m ?? '00'} ${ampm} IST`;

  return {
    id: row.id as string,
    title: row.title as string,
    sessionDate,
    sessionTime,
    mentorName: (row.mentor_name as string) ?? 'Mentor',
    meetLink: (row.meet_link as string) ?? undefined,
    isUpcoming,
    recordingUrl: (row.recording_url as string) ?? undefined,
    slidesUrl: (row.slides_url as string) ?? undefined,
  };
}

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/integrations/api/client';
import { getAssignments, getProjects, getSessions } from '@/lib/lms/content';
import { getAllModules } from '@/lib/lms/curriculum';
import type { LearnerProgramState, ProgramId } from '@/lib/lms/types';
import {
  computeSimulatorProgress,
  countCompletedModules,
  courseNameToProgramId,
  formatCertificateId,
  getCurrentModule,
  getProgramMeta,
} from '@/lib/lms/utils';

interface EnrollmentRow {
  id: string;
  course_id: string;
  course_name: string;
  status: string;
  enrollment_date?: string;
  enrollment_number?: string | null;
  razorpay_payment_id?: string | null;
  total_amount?: number | null;
  paid_amount?: number | null;
  payment_status?: string | null;
  country?: string | null;
}

export function useLearnerProgram() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [hasCancelledEnrollment, setHasCancelledEnrollment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setIsLoading(true);
      try {
        const { courses, hasCancelledEnrollment: revoked } = await apiClient.getUserCourses(user.id);
        if (!cancelled) {
          setEnrollments(courses ?? []);
          setHasCancelledEnrollment(revoked);
        }
      } catch {
        if (!cancelled) {
          setEnrollments([]);
          setHasCancelledEnrollment(false);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const activeEnrollment = enrollments[0] ?? null;
  const courseId = activeEnrollment?.course_id ?? null;

  const programId: ProgramId = useMemo(() => {
    if (!activeEnrollment) return 'aac';
    return courseNameToProgramId(activeEnrollment.course_name);
  }, [activeEnrollment]);

  const programMeta = useMemo(() => getProgramMeta(programId), [programId]);

  const learnerState: LearnerProgramState | null = useMemo(() => {
    if (!user || !activeEnrollment) return null;

    const { progress, completedCount, lastWatched } = computeSimulatorProgress(user.id, programId);
    const modules = getAllModules(programId);
    const currentModule = getCurrentModule(programId, completedCount);
    const completedModules = countCompletedModules(programId, completedCount);
    const assignments = getAssignments(programId);
    const projects = getProjects(programId);
    const pendingAssignments = assignments.filter((a) => a.status === 'pending').length;
    const submittedProjects = projects.filter((p) => p.status === 'submitted' || p.status === 'reviewed').length;
    const certificateLocked = progress < 80;

    return {
      programId,
      programCode: programMeta.code,
      programTitle: programMeta.title,
      progress,
      currentModule,
      currentModuleTitle: currentModule?.title ?? modules[0]?.title ?? 'Getting Started',
      lastWatchedLesson: lastWatched,
      totalModules: modules.length,
      completedModules,
      pendingAssignments,
      submittedProjects,
      certificateLocked,
      certificateId: certificateLocked ? undefined : formatCertificateId(programMeta.code),
      streak: 7,
    };
  }, [user, activeEnrollment, programId, programMeta]);

  return {
    user,
    enrollments,
    activeEnrollment,
    courseId,
    programId,
    programMeta,
    learnerState,
    assignments: getAssignments(programId),
    projects: getProjects(programId),
    sessions: getSessions(programId),
    isLoading,
    hasEnrollment: enrollments.length > 0,
    hasCancelledEnrollment,
    hasCourseAccess: enrollments.length > 0,
  };
}

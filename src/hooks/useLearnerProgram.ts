import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/integrations/api/client';
import { lmsDb } from '@/integrations/supabase/lmsDb';
import { getAssignments, getProjects, getSessions } from '@/lib/lms/content';
import { getAllModules, getModuleById } from '@/lib/lms/curriculum';
import type { LMSAssignment, LMSProject, LMSSession, LearnerProgramState, ProgramId } from '@/lib/lms/types';
import {
  courseNameToProgramId,
  formatCertificateId,
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
  const [assignments, setAssignments] = useState<LMSAssignment[]>([]);
  const [projects, setProjects] = useState<LMSProject[]>([]);
  const [sessions, setSessions] = useState<LMSSession[]>([]);
  const [overview, setOverview] = useState<Awaited<ReturnType<typeof lmsDb.getLearnerOverview>> | null>(null);
  const [lmsLoading, setLmsLoading] = useState(false);

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

  const fetchLmsData = useCallback(async () => {
    if (!user || !courseId) {
      setAssignments(getAssignments(programId));
      setProjects(getProjects(programId));
      setSessions(getSessions(programId));
      setOverview(null);
      return;
    }

    setLmsLoading(true);
    try {
      const [assignmentRows, projectRows, sessionRows, overviewRow] = await Promise.all([
        lmsDb.getLearnerAssignments(user.id, courseId),
        lmsDb.getLearnerProjects(user.id, courseId),
        lmsDb.getLearnerSessions(courseId),
        lmsDb.getLearnerOverview(user.id, courseId),
      ]);

      setAssignments(assignmentRows.length ? assignmentRows : getAssignments(programId));
      setProjects(projectRows.length ? projectRows : getProjects(programId));
      setSessions(sessionRows.length ? sessionRows : getSessions(programId));
      setOverview(overviewRow);
    } catch {
      setAssignments(getAssignments(programId));
      setProjects(getProjects(programId));
      setSessions(getSessions(programId));
      setOverview(null);
    } finally {
      setLmsLoading(false);
    }
  }, [user, courseId, programId]);

  useEffect(() => {
    void fetchLmsData();
  }, [fetchLmsData]);

  const submitAssignment = useCallback(
    async (
      assignmentId: string,
      payload: { githubUrl?: string; demoUrl?: string; fileUrl?: string; notes?: string },
    ) => {
      if (!user) throw new Error('Sign in required');
      await lmsDb.submitAssignment(user.id, assignmentId, payload, {
        name: user.firstName ? `${user.firstName} ${user.lastName ?? ''}`.trim() : undefined,
        email: user.email,
      });
      await fetchLmsData();
    },
    [user, fetchLmsData],
  );

  const learnerState: LearnerProgramState | null = useMemo(() => {
    if (!user || !activeEnrollment) return null;

    const modules = getAllModules(programId);
    const currentModule =
      overview?.currentModuleId != null
        ? getModuleById(programId, overview.currentModuleId) ??
          modules.find((m) => m.id === overview.currentModuleId) ??
          null
        : modules[0] ?? null;

    const progress = overview?.progress ?? 0;
    const completedModules = overview?.completedModules ?? 0;
    const totalModules = overview?.totalModules ?? modules.length;
    const pendingAssignments =
      overview?.pendingAssignments ?? assignments.filter((a) => a.status === 'pending').length;
    const submittedProjects =
      overview?.submittedProjects ??
      projects.filter((p) => p.status === 'submitted' || p.status === 'reviewed').length;
    const certificateLocked = overview?.certificateLocked ?? progress < 80;

    return {
      programId,
      programCode: programMeta.code,
      programTitle: programMeta.title,
      progress,
      currentModule,
      currentModuleTitle: overview?.currentModuleTitle ?? currentModule?.title ?? modules[0]?.title ?? 'Getting Started',
      lastWatchedLesson: overview?.lastWatchedLesson ?? 'Getting started',
      totalModules,
      completedModules,
      pendingAssignments,
      submittedProjects,
      certificateLocked,
      certificateId: certificateLocked ? undefined : formatCertificateId(programMeta.code),
      streak: 0,
    };
  }, [user, activeEnrollment, programId, programMeta, overview, assignments, projects]);

  return {
    user,
    enrollments,
    activeEnrollment,
    courseId,
    programId,
    programMeta,
    learnerState,
    assignments,
    projects,
    sessions,
    overview,
    isLoading: isLoading || lmsLoading,
    lmsLoading,
    hasEnrollment: enrollments.length > 0,
    hasCancelledEnrollment,
    hasCourseAccess: enrollments.length > 0,
    refetchLmsData: fetchLmsData,
    submitAssignment,
  };
}

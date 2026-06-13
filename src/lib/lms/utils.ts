import { COURSES } from '@/lib/courses';
import {
  getSimulatorModules,
  getTotalLessons,
  loadSimulatorProgress,
} from '@/lib/learningSimulator';
import { getAllModules } from './curriculum';
import type { LMSModule, ModuleStatus, ProgramId } from './types';

export function courseNameToProgramId(courseName: string): ProgramId {
  const slug = courseName.toLowerCase();
  if (slug.includes('devops') || slug.includes('dop')) return 'dop';
  if (slug.includes('agentic') || slug.includes('aac')) return 'aac';
  if (slug.includes('aws') || slug.includes('cloud')) return 'aws';
  if (slug.includes('data science') || slug.includes('machine learning')) return 'data-science';
  return 'aac';
}

export function getLearnPath(programId: ProgramId): string {
  return `/learn/${programId === 'data-science' ? 'data-science' : programId}`;
}

export function computeSimulatorProgress(userId: string, programId: ProgramId) {
  const modules = getSimulatorModules(programId);
  const totalLessons = getTotalLessons(modules);
  const saved = loadSimulatorProgress(userId, programId);
  const completedCount = saved.completedLessons.length;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  let lastWatched = 'Video 1';
  if (saved.lastLessonId) {
    for (const mod of modules) {
      const lesson = mod.lessons.find((l) => l.id === saved.lastLessonId);
      if (lesson) {
        lastWatched = lesson.title;
        break;
      }
    }
  }

  return { progress, completedCount, totalLessons, lastWatched, saved };
}

export function getModuleStatuses(
  programId: ProgramId,
  completedLessonCount: number,
): Map<number, ModuleStatus> {
  const modules = getAllModules(programId);
  const statuses = new Map<number, ModuleStatus>();

  let lessonsSeen = 0;
  let currentSet = false;

  for (const mod of modules) {
    const modEnd = lessonsSeen + mod.lessonCount;
    if (completedLessonCount >= modEnd) {
      statuses.set(mod.id, 'completed');
    } else if (!currentSet) {
      statuses.set(mod.id, 'current');
      currentSet = true;
    } else {
      statuses.set(mod.id, 'locked');
    }
    lessonsSeen = modEnd;
  }

  if (!currentSet && modules.length > 0) {
    statuses.set(modules[modules.length - 1].id, 'completed');
  }

  return statuses;
}

export function getCurrentModule(
  programId: ProgramId,
  completedLessonCount: number,
): LMSModule | null {
  const statuses = getModuleStatuses(programId, completedLessonCount);
  const modules = getAllModules(programId);
  return modules.find((m) => statuses.get(m.id) === 'current') ?? modules[0] ?? null;
}

export function countCompletedModules(programId: ProgramId, completedLessonCount: number): number {
  const statuses = getModuleStatuses(programId, completedLessonCount);
  return [...statuses.values()].filter((s) => s === 'completed').length;
}

export function getProgramMeta(programId: ProgramId) {
  return COURSES.find((c) => c.id === programId) ?? COURSES[1];
}

export function formatCertificateId(programCode: string, seq = 1): string {
  const year = new Date().getFullYear();
  return `ZYV-${programCode}-${year}-${String(seq).padStart(3, '0')}`;
}

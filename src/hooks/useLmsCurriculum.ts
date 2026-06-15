import { useEffect, useState } from 'react';
import { lmsDb, mapDbPhasesToLms } from '@/integrations/supabase/lmsDb';
import { PROGRAM_CURRICULUM } from '@/lib/lms/curriculum';
import type { DbProgramModule, DbProgramPhase } from '@/lib/lms/dbTypes';
import type { LMSPhase, ProgramId } from '@/lib/lms/types';

interface UseLmsCurriculumResult {
  phases: LMSPhase[];
  dbPhases: DbProgramPhase[] | null;
  isFromDb: boolean;
  isLoading: boolean;
  error: string | null;
  getDbModule: (moduleNumber: number) => DbProgramModule | null;
}

export function useLmsCurriculum(
  courseId: string | null | undefined,
  programId: ProgramId,
): UseLmsCurriculumResult {
  const fallback = PROGRAM_CURRICULUM[programId];
  const [phases, setPhases] = useState<LMSPhase[]>(fallback);
  const [dbPhases, setDbPhases] = useState<DbProgramPhase[] | null>(null);
  const [isFromDb, setIsFromDb] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(courseId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setPhases(fallback);
      setDbPhases(null);
      setIsFromDb(false);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tree = await lmsDb.getCurriculumByCourseId(courseId);
        if (cancelled) return;

        if (tree.length > 0) {
          setDbPhases(tree);
          setPhases(mapDbPhasesToLms(tree, programId));
          setIsFromDb(true);
        } else {
          setDbPhases(null);
          setPhases(fallback);
          setIsFromDb(false);
        }
      } catch (err) {
        if (!cancelled) {
          setDbPhases(null);
          setPhases(fallback);
          setIsFromDb(false);
          setError(err instanceof Error ? err.message : 'Failed to load curriculum');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [courseId, programId]);

  const getDbModule = (moduleNumber: number): DbProgramModule | null => {
    if (!dbPhases) return null;
    for (const phase of dbPhases) {
      const mod = phase.modules.find((m) => m.module_number === moduleNumber);
      if (mod) return mod;
    }
    return null;
  };

  return { phases, dbPhases, isFromDb, isLoading, error, getDbModule };
}

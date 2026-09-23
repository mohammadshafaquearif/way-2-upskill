import { useSearchParams } from 'react-router-dom';
import { isMentorshipEntry } from '@/lib/mentorshipEntry';

/** True when this visit came from the 1-1 Mentorship page. */
export function useMentorshipEntry() {
  const [params] = useSearchParams();
  return isMentorshipEntry(params);
}

export const MENTORSHIP_QUERY = 'mentorship';
export const MENTORSHIP_ENTRY = '1-on-1';

export function mentorshipProgramPath(route: string) {
  const [path, hash = ''] = route.split('#');
  const joiner = path.includes('?') ? '&' : '?';
  return `${path}${joiner}${MENTORSHIP_QUERY}=${MENTORSHIP_ENTRY}${hash ? `#${hash}` : ''}`;
}

export function isMentorshipEntry(params: URLSearchParams) {
  return params.get(MENTORSHIP_QUERY) === MENTORSHIP_ENTRY;
}

export function withoutPriceOffers<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => withoutPriceOffers(item)) as T;
  }
  if (value && typeof value === 'object') {
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (key === 'offers') continue;
      next[key] = withoutPriceOffers(child);
    }
    return next as T;
  }
  return value;
}

export function sectionSlug(heading: string, index: number): string {
  const base = heading
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return base || `section-${index + 1}`;
}

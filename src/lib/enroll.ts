export function isEnrollHref(href: string): boolean {
  return href === '/enroll' || href.startsWith('/checkout');
}

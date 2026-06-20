/**
 * Force all zyvotrix.com (non-www) traffic to https://www.zyvotrix.com
 * Fixes GSC "Indexed, though blocked by robots.txt" on http://zyvotrix.com/
 */
export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.hostname === 'zyvotrix.com') {
    url.hostname = 'www.zyvotrix.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
}

export const config = {
  matcher: '/((?!api/).*)',
};

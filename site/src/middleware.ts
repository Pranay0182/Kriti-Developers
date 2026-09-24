import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const decoded = atob(authValue);
    const [user, pwd] = decoded.split(':');

    // Check credentials
    if (user === 'kritideveloper@gmail.com' && pwd === 'Create_innovate1') {
      return NextResponse.next();
    }
  }

  // If no credentials or wrong credentials, prompt for password
  return new NextResponse('Authentication Required. Site is currently under construction.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Kriti Developers Development Area"',
    },
  });
}

// Ensure the middleware runs on all paths EXCEPT static assets and cron jobs
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/cron (allow vercel cron jobs to ping without password)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api/cron|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

import { type NextRequest } from 'next/server';

import { requireAuth } from '@/utils/middleware/requireAuth';

export async function middleware(request: NextRequest) {
  return requireAuth(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

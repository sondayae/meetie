import { type NextRequest } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';

// TODO 임시로 모두 막았지만 후에 config 경로 정리해야함
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ['/'],
};

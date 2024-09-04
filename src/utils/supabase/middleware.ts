import { NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

import ROUTE_PATH from '@/constants/route';

// TODO 스터디원이 접근하는 예외처리 구현해야 함

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (
      !request.nextUrl.pathname.startsWith(ROUTE_PATH.AUTH.LOGIN) &&
      !request.nextUrl.pathname.startsWith(ROUTE_PATH.AUTH.SIGN_UP)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = ROUTE_PATH.AUTH.LOGIN;
      return NextResponse.redirect(url);
    }
  } else if (
    request.nextUrl.pathname.startsWith(ROUTE_PATH.AUTH.LOGIN) ||
    request.nextUrl.pathname.startsWith(ROUTE_PATH.AUTH.SIGN_UP) ||
    request.nextUrl.pathname.startsWith(ROUTE_PATH.HOME)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTE_PATH.STUDY_ROOM.MAIN;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

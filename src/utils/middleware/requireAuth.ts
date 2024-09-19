import { NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

export async function requireAuth(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

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
          supabaseResponse = NextResponse.next({ request });
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

  const publicPaths = ['/login', '/signup', '/', '/login/find/password'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  const isRestrictedPath =
    request.nextUrl.pathname === '/login/update/password';

  if (isRestrictedPath) {
    if (user) {
      // 로그인한 사용자가 `/login/update/password`경로로 접근 시 participating_study에 따라 리다이렉트
      const { data } = await supabase
        .from('user')
        .select('participating_study')
        .eq('id', user.id)
        .single();

      const url = request.nextUrl.clone();
      url.pathname = data?.participating_study
        ? `/studyroom/${data.participating_study}/calendar`
        : '/studyroom';
      return NextResponse.redirect(url);
    }
    // 비로그인 사용자가 `/login/update/password` 경로로 접근 시 루트로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (user) {
    if (isPublicPath) {
      // 로그인한 사용자가 publicPaths에 포함된 경로로 접근 시 participating_study에 따라 리다이렉트
      const { data } = await supabase
        .from('user')
        .select('participating_study')
        .eq('id', user.id)
        .single();

      const url = request.nextUrl.clone();
      url.pathname = data?.participating_study
        ? `/studyroom/${data.participating_study}/calendar`
        : '/studyroom';
      return NextResponse.redirect(url);
    }
  } else if (!isPublicPath) {
    // 비로그인 사용자가 publicPaths 외의 경로로 접근 시 루트로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

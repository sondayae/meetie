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

  // 사용자 인증 정보를 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인하지 않은 사용자가 접근 가능한 경로 설정
  const publicPaths = ['/login', '/signup', '/', '/login/find/password'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  const isRestrictedPath =
    request.nextUrl.pathname === '/login/update/password';

  // 로그인이 되어 있지 않은 경우
  if (!user) {
    // 비로그인 상태에서 publicPaths가 아닌 경로로 접근 시 홈으로 리다이렉트
    if (!isPublicPath) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // 로그인한 사용자 데이터 가져오기 (온보딩 및 스터디 여부 확인)
  const { data } = await supabase
    .from('user')
    .select('participating_study, onboarding')
    .eq('id', user.id)
    .single();

  const studyRoomPath = data?.participating_study
    ? `/studyroom/${data.participating_study}/calendar`
    : '/studyroom';

  // 스터디 참여 여부를 확인하는 로직 추가
  const studyRoomRegex = /^\/studyroom\/(\d+)\/(calendar|handin|chat)$/;
  const match = request.nextUrl.pathname.match(studyRoomRegex);
  const requestedStudyId = match ? match[1] : null;

  // 스터디에 참여하지 않았거나 요청한 스터디가 참여중인 스터디가 아닌 경우 접근을 차단
  if (
    requestedStudyId &&
    Number(data?.participating_study) !== Number(requestedStudyId)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = studyRoomPath;
    return NextResponse.redirect(url);
  }

  // 온보딩을 완료한 경우
  if (data?.onboarding) {
    // 워크스루, 프로필 생성, 프로필 성공 경로를 제외한 경우
    const restrictedPaths = [
      '/walkthrough',
      '/profile/create',
      '/profile/success',
    ];

    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = studyRoomPath; // 스터디룸 경로로 리다이렉트
      return NextResponse.redirect(url);
    }
    // restrictedPath 또는 publicPaths로 이동 시 리다이렉트
    if (isRestrictedPath || isPublicPath) {
      const url = request.nextUrl.clone();
      if (request.nextUrl.pathname !== studyRoomPath) {
        url.pathname = studyRoomPath;
        return NextResponse.redirect(url);
      }
    }
    return supabaseResponse;
  }

  // 온보딩을 하지 않은 경우
  if (!data?.onboarding) {
    // '/walkthrough' 또는 '/profile/create'가 아니면 '/walkthrough'로 리다이렉트
    if (
      request.nextUrl.pathname !== '/walkthrough' &&
      request.nextUrl.pathname !== '/profile/create'
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/walkthrough';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

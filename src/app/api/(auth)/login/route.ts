import { NextRequest, NextResponse } from 'next/server';

import supabaseServer from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = supabaseServer();
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    const { data: studyAndOnboarding } = await supabase
      .from('user')
      .select('participating_study, onboarding')
      .eq('id', data.user?.id)
      .single();

    const userWithStudy = {
      ...data.user,
      participatingStudy: studyAndOnboarding?.participating_study,
      onboarding: studyAndOnboarding?.onboarding,
    };

    if (error) throw new Error();

    return NextResponse.json(
      { data: { user: userWithStudy } },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: { message: '정확한 로그인 정보를 입력해주세요.' } },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: { message: '알 수 없는 오류가 발생했습니다.' } },
      { status: 500 },
    );
  }
}

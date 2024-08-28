import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error();

    return NextResponse.json({ data }, { status: 200 });
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

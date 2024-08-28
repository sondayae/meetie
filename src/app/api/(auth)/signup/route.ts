import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { email, password, name } = await request.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw new Error();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: { message: '이미 가입된 계정입니다.' } },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: { message: '알 수 없는 오류가 발생했습니다.' } },
      { status: 500 },
    );
  }
}

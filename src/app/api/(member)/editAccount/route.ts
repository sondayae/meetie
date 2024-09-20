import supabaseServer from '@/utils/supabase/server';

export async function POST(req: Request) {
  console.log('이메일 변경 요청 수신');

  try {
    const { newEmail } = await req.json();
    const supabase = supabaseServer();

    // 사용자 세션 확인
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error('세션 오류:', sessionError?.message);
      return new Response(
        JSON.stringify({ error: '유효한 세션을 찾을 수 없습니다.' }),
        { status: 400 },
      );
    }
    // console.log('session ::::', session.user.email);

    const { data: existingUser, error: checkError } = await supabase
      .from('user')
      .select('*')
      .eq('email', newEmail);

    console.log('existingUser ::::', existingUser);

    if (checkError) {
      console.error('이메일 확인 중 오류 발생:', checkError.message);
      return new Response(
        JSON.stringify({
          error: '이메일 확인 중 오류가 발생했습니다.',
        }),
        { status: 500 },
      );
    }

    if (existingUser.length > 0) {
      console.log('이미 등록된 이메일입니다.');
      return new Response(
        JSON.stringify({
          error: '이미 등록된 이메일입니다.',
        }),
        { status: 400 },
      );
    }

    // 이메일 업데이트
    const { data, error } = await supabase.auth.updateUser(
      { email: newEmail },
      // { emailRedirectTo: 'http://localhost:3000/api/verifyEmail' },
      {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      },
    );

    console.log('data', data);

    if (error) {
      console.error('이메일 업데이트 실패:', error.message);
      console.log('이메일 업데이트 실패:', error.message);
      return new Response(
        JSON.stringify({
          error: '이메일을 업데이트하는 중 오류가 발생했습니다.',
        }),
        { status: 400 },
      );
    }

    console.log('이메일 업데이트 및 검증 이메일 발송 완료');

    return new Response(
      JSON.stringify({
        message: '이메일이 업데이트되었습니다. 새 이메일을 확인하세요.',
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error('서버 오류 발생:', err);
    return new Response(
      JSON.stringify({
        error: '서버 오류가 발생했습니다. 다시 시도해 주세요.',
      }),
      { status: 500 },
    );
  }
}

import supabase from '@/utils/supabase/client';

export async function DELETE(req: Request) {
  console.log('회원 탈퇴 요청 수신');
  try {
    const { userId } = await req.json();
    console.log('userId', userId);

    const { error } = await supabase.from('user').delete().eq('id', userId);

    console.log('error', error);

    if (error) {
      console.error('회원 탈퇴 실패:', error.message);
      return new Response(
        JSON.stringify({
          error: '회원 탈퇴 중 오류가 발생했습니다.',
        }),
        { status: 400 },
      );
    }

    console.log('회원 탈퇴 완료');

    return new Response(
      JSON.stringify({
        message: '회원 탈퇴가 완료되었습니다.',
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

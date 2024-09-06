import supabaseServer from '@/utils/supabase/server';

export async function GET(req: Request) {
  const supabase = supabaseServer();
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (code) {
    // Supabase 인증 코드로 세션 교환
    const { error: codeExchangeError } =
      await supabase.auth.exchangeCodeForSession(code);
    if (codeExchangeError) {
      return new Response(
        JSON.stringify({
          error: '이메일 확인 링크가 만료되었거나 유효하지 않습니다.',
        }),
        { status: 400 },
      );
    }

    return new Response(
      JSON.stringify({ message: '이메일이 성공적으로 확인되었습니다.' }),
      { status: 200 },
    );
  } else {
    return new Response(
      JSON.stringify({ error: '검증 코드가 제공되지 않았습니다.' }),
      { status: 400 },
    );
  }
}

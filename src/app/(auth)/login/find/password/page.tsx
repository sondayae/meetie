import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
// TODO 컴포넌트 퍼블리싱과 분리 및 예외처리
export default async function FindPassword() {
  const confirmReset = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/login/update/password`,
    });

    if (error) {
      console.log(error);
      return redirect(
        '/login/find/password?message=Could not authenticate user',
      );
    }

    return redirect(
      '/?message=Password Reset link has been sent to your email address',
    );
  };

  return (
    <>
      <div>
        <h2>비밀번호 찾기</h2>
        <p>가입한 이메일을 입력해 주세요.</p>
        <br />
        이메일을 통해 비밀번호 변경 링크가 전송됩니다
      </div>
      <form action={confirmReset}>
        <input type="email" name="email" />
        <button type="submit">이메일</button>
      </form>
    </>
  );
}

'use server';

import { UpdatePasswordFormData } from '@/types/auth';
import { createClient } from '@/utils/supabase/server';

const updatePassword = async (
  formData: UpdatePasswordFormData,
  searchParams?: { [key: string]: string },
) => {
  const supabase = createClient();

  if (searchParams?.code) {
    const { error: CodeExchangeError } =
      await supabase.auth.exchangeCodeForSession(searchParams.code);

    if (CodeExchangeError) {
      return {
        success: false,
        error: '비밀번호를 재설정할 수 없습니다. 링크가 만료되었습니다!`',
      };
    }
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (updateError) {
    return {
      success: false,
      error: '비밀번호를 재설정할 수 없습니다. 다시 시도해 보세요!',
    };
  }

  return { success: true, error: '' };
};

export default updatePassword;

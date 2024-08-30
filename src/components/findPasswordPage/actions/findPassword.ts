'use server';

import { headers } from 'next/headers';

import { FindPasswordFormData } from '@/types/auth';
import supabaseServer from '@/utils/supabase/server';

const findPassword = async (formData: FindPasswordFormData) => {
  const origin = headers().get('origin');
  const supabase = supabaseServer();

  const { error: matchError } = await supabase
    .from('user')
    .select('email')
    .eq('email', formData.email)
    .single();

  if (matchError) {
    return {
      success: false,
      type: 'notFound',
      message: '존재하지 않는 정보 입니다.',
    };
  }

  const { error: resetError } = await supabase.auth.resetPasswordForEmail(
    formData.email,
    {
      redirectTo: `${origin}/login/update/password`,
    },
  );

  if (resetError) {
    throw new Error(resetError.message);
  }

  return { success: true };
};

export default findPassword;

'use server';

import supabase from '@/utils/supabase/client';

export const postApply = async (params: string, userId: string) => {
  console.log(params, userId);
  try {
    const { data, error } = await supabase
      .from('study_apply')
      .select('*')
      .eq('studyId', params)
      .eq('userId', userId);

    if (error) {
      throw error;
    }

    const { data: data2, error: error2 } = await supabase
      .from('study_apply')
      .insert([
        {
          studyId: params,
          userId: userId,
          status: 'waiting',
        },
      ]);

    if (error2) {
      throw error2;
    }

    // console.log(`data`, data);
    // console.log(`data2`, data2);
    // return
  } catch (error) {
    alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
  }
};

export const deleteApply = async (params: string, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('study_apply')
      .delete()
      .eq('studyId', params)
      .eq('userId', userId);

    if (error) {
      throw error;
    }
  } catch (error) {
    alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
  }
};

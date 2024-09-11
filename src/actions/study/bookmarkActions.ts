'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

export async function bookmarkStudy(studyId: string) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const {data: isExist} = await supabase.from('bookmark').select().eq('user_id', userId).eq('study_id', studyId).single();

  if (!isExist || isExist.length === 0) {
    const {data, error} = await supabase.from('bookmark').insert({user_id: userId, study_id: studyId}).select();
    if (error) {
      return null;
    }
    
    return data;
  } else {
    const {data, error} = await supabase.from('bookmark').delete().eq('id', isExist?.id).select();
    if (error) {
      return null;
    }

    return data;
  }
}
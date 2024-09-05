'use server';

import supabaseServer from '@/utils/supabase/server';
import { getServerUserId } from './getServerUserId';
import { revalidatePath } from 'next/cache';


export async function upsertComment(state: any, formData: FormData) {
  const userId = await getServerUserId();
  const supabase = supabaseServer();
  const comment = formData.get('comment');
  const targetId = formData.get('targetId');
  const id = formData.get('id');

  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (comment === '') {
      throw new Error('comment is required');
    }
    const { data, error } = await supabase
      .from('comments')
      .upsert({
        id: id,
        target_id: targetId,
        user_id: userId,
        comment,
      }, {onConflict: 'id'})
      .select();

    if (error) {
      throw new Error(`${error}`);
    }
    revalidatePath('./');
    return { success: true, data };
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}

'use server';

import supabaseServer from '@/utils/supabase/server';
import { getServerUserId } from './getServerUserId';
import { revalidatePath } from 'next/cache';

export async function deleteComment(commentId: string) {
  const userId = await getServerUserId();
  const supabase = supabaseServer();
  
  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (!commentId) {
      throw new Error('comment id is required');
    }
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
  
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

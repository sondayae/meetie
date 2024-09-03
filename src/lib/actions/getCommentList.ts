'use server';

import supabase from '@/utils/supabase/client';

export async function getCommentList(targetId: string) {
  
  try {
    if (!targetId) {
      throw new Error('comment id is required');
    }
    const { data, error } = 
    await supabase.from('comments').select(`
      id,
      comment,
      created_at,
      user(name, images(url))
    `)
    .eq('target_id', targetId)
    .order('created_at', { ascending: false });
  
    if (error) {
      throw new Error(`${error.message}`);
    }
    return { success: true, data };
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}

'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

export async function getComments(targetId: string) {
  const supabase = supabaseServer();
  const {data, error} = await supabase.from('comments').select('*, user(name, images(url)), reactions(*)').eq('target_id', targetId).order('created_at', {ascending: false});

  if (error) {
    return null;
  }

  return data;
}

export async function createReaction({targetId, emoji}: {targetId: string, emoji: string}) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const {data: isExist} = await supabase.from('reactions').select().eq('target_id', targetId).eq('user_id', userId).eq('emoji', emoji);

  if (isExist!.length === 0) {
    const { data, error } = await supabase
    .from('reactions')
    .insert({ target_id: targetId, user_id: userId, emoji: emoji})
    .select();
    if (error) {
      return null;
    }
    return data;
  } else {
    const {data, error} = await supabase.from('reactions').delete().eq('target_id',targetId).eq('emoji', emoji).select();
    if (error) {
      return null;
    }
    return data;
  }
}

export async function updateComment({id, comment}: {id: string, comment: string}) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (comment === '') {
      throw new Error('comment is required');
    }
    const { data, error } = await supabase
      .from('comments')
      .update({
        comment,
      })
      .eq('id', id);

    if (error) {
      throw new Error(`${error}`);
    }
    return { success: true, data };
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}

export async function deleteComment({id}: {id: string}) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();
  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (id === '') {
      throw new Error('comment id is required');
    }
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`${error.message}`);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
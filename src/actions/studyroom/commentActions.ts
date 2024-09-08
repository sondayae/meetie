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
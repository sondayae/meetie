'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

export async function addFriend(receiverId: string) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const {data: isExist} = await supabase.from('friend').select().eq('requester', userId).eq('receiver', receiverId).single();

  if (!isExist || isExist.length === 0) {
    const {data, error} = await supabase.from('friend').insert({requester: userId, receiver: receiverId}).select();
    if (error) {
      return null;
    }
    
    return data;
  } else {
    const {data, error} = await supabase.from('friend').delete().eq('id', isExist?.id).select();
    if (error) {
      return null;
    }

    return data;
  }
}
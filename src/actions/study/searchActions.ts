'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

export async function getUsers() {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const {data, error} = await supabase
  .from('user')
  .select('*, images(url), friend!friend_receiver_fkey(*)')
  .or(`requester.eq.${userId}`, { referencedTable: 'friend'})
  .order('created_at', {ascending: false});

  if (error) {
    console.log(error);
  }
  return data;
}
'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

export async function getUser() {
  const supabase = supabaseServer();
  const userId = await getServerUserId();
  const { data } = await supabase
    .from('user')
    .select('*, images(url)')
    .eq('id', userId)
    .single();
  return data;
}

'use server';

import supabase from '@/utils/supabase/client';
import supabaseServer from '@/utils/supabase/server';

export async function getUser({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select('*, images (url)')
    .eq('id', id)
    .maybeSingle();

  return data;
}

export async function getJoinInfo({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select(`*, bookmark (*), friend!friend_requester_fkey(*), studymember (*)`)
    .eq('id', id)
    .maybeSingle();

  return data;
}

export async function getBookMark({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select(`*, bookmark (*, study (*))`)
    .eq('id', id)
    .maybeSingle();

  return data;
}

export async function getJoinStudy({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select(`*, studymember (*, study (*))`)
    .eq('id', id)
    .maybeSingle();

  return data;
}

export async function getUserBadgeList() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const { data, error } = await supabase
    .from('user_badge')
    .select('*, badge(*)')
    .eq('user_id', userId);
  if (error) {
    return null;
  }
  return data;
}

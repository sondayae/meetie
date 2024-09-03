'use server';

import supabase from '@/utils/supabase/client';

export async function getUser({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select('*, images (url)')
    .eq('id', id)
    .maybeSingle();

  return data;
}

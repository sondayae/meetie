import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabase from '@/utils/supabase/client';

export async function fetchStudyList(num?: number) {
  const userId = await getServerUserId();

  let query = supabase
    .from('study')
    .select('*, bookmark(user_id)')
    .or(`user_id.eq.${userId}`, { referencedTable: 'bookmark' })
    .order('created_at', { ascending: false });

  if (num) {
    query = query.limit(num);
  }

  const { data, error } = await query;

  if (error) {
    console.error('스터디 목록을 가져오는 중 오류가 발생했습니다', error);
    throw new Error('스터디 목록을 가져오는 중 오류가 발생했습니다.');
  }

  return data;
}

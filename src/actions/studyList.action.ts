import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabase from '@/utils/supabase/client';

export async function fetchStudyList() {
  const userId = await getServerUserId();

  const { data, error } = await supabase
  .from('study')
  .select('*, bookmark(user_id)')
  .or(`user_id.eq.${userId}`, { referencedTable: 'bookmark' })
  .order('created_at', { ascending: false });

  if (error) {
    console.error('스터디 목록을 가져오는 중 오류가 발생했습니다', error);
    throw new Error('스터디 목록을 가져오는 중 오류가 발생했습니다.');
  }

  return data;
}

// export async function fetchStudiesTags() {
//   const { data, error } = await supabase.from('study').select('tags');
//   const allTags = Array.from(new Set(data?.flatMap((study) => study.tags)));

//   if (error) {
//     console.error('스터디 태그 목록을 가져오는 중 오류가 발생했습니다', error);
//     throw new Error('스터디 태그 목록을 가져오는 중 오류가 발생했습니다.');
//   }

//   return allTags;
// }

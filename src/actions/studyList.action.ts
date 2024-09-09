import supabase from '@/utils/supabase/client';

export async function fetchStudyList() {
  const { data, error } = await supabase.from('study').select('*');
  // .range(offset, offset + limit);

  if (error) {
    console.error('스터디 목록을 가져오는 중 오류가 발생했습니다', error);
    throw new Error('스터디 목록을 가져오는 중 오류가 발생했습니다.');
  }

  return data;
}

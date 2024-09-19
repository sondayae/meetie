'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

export async function incView({ studyId }: { studyId: string }) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  // study 테이블에서 해당 studyId의 현재 viewCount 조회
  const { data: currentData, error: fetchError } = await supabase
    .from('study')
    .select('viewCount')
    .eq('id', studyId)
    .single();

  console.log('run incView');
  console.log(currentData);

  if (fetchError || !currentData) {
    console.error('Failed to fetch current view count:', fetchError);
    return { error: fetchError || 'Study not found' };
  }

  // 조회수 증가 작업 수행
  const newViewCount = currentData.viewCount + 1;
  const { data, error } = await supabase
    .from('study')
    .update({ viewCount: newViewCount })
    .eq('id', studyId)  // studyId에 해당하는 row만 업데이트
    .select(); // 업데이트된 데이터를 반환

  if (error) {
    console.error('Failed to update view count:', error);
    return { error: 'Failed to update view count' };
  }

  console.log(`View count for studyId ${studyId} updated to ${newViewCount}`);
  return { data, newViewCount };
}

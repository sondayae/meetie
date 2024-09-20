import supabaseServer from '@/utils/supabase/server';

export async function incrementViewCount(studyId: string) {
  const supabase = supabaseServer();

  const { data: currentStudy, error: fetchError } = await supabase
    .from('study')
    .select('viewCount')
    .eq('id', studyId)
    .single();

  if (fetchError) {
    console.error('View count 에러', fetchError.message);
    return { error: fetchError };
  }

  // const updatedViewCount = currentStudy.viewCount;
  const updatedViewCount = currentStudy.viewCount;
  console.log('currentStudy.viewCount', currentStudy.viewCount);

  const { data, error: updateError } = await supabase
    .from('study')
    .update({ viewCount: updatedViewCount })
    .eq('id', studyId);

  if (updateError) {
    console.error('View count 업데이트 에러', updateError.message);
    return { error: updateError };
  }

  return { data, viewCount: updatedViewCount };
}

import supabase from '@/utils/supabase/client';

export async function POST(request: Request) {
  const { job, purposes, personalities, studySpan } = await request.json();
  const userId = '3c572fd8-c5d2-4e20-b65b-91f9c153adb6';

  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from('user')
      .select('id')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;
    if (existingProfile) {
      // 기존 프로필이 있으면 업데이트하거나 삽입
      const { data, error } = await supabase
        .from('user')
        .upsert({
          id: userId,
          job,
          purpose: purposes,
          personality: personalities,
          expected_study_span: studySpan,
        })
        .select();

      if (error) throw error;

      return Response.json({
        message: '프로필이 추가되거나 업데이트되었습니다.',
        data,
      });
    } else {
      return Response.json(
        { error: '해당 사용자 ID에 대한 프로필이 존재하지 않습니다.' },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error('error adding or updating profile', error);
    return Response.json(
      { error: '프로필을 추가하거나 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

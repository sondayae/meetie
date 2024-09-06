import supabase from '@/utils/supabase/client';

// 스터디 조회
export async function GET(
  request: Request,
  { params }: { params: { studyId: string } },
) {
  try {
    // 스터디 정보 조회
    const { data: studyData, error: studyError } = await supabase
      .from('study')
      .select(`*, user(*)`)
      .eq('id', params.studyId)
      .single();

    if (studyError) throw studyError;

    // 스터디 참여 중인 인원 조회
    const { data: acceptedStudy, error: applyError } = await supabase
      .from('study_apply')
      .select('*')
      .eq('studyId', params.studyId)
      .eq('status', 'accepted');

    if (applyError) throw applyError;

    console.log(studyData)
    const responseData = {
      study: studyData,
      acceptedStudy: acceptedStudy.length,
    };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error('Error fetching study details:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch study details' }),
      { status: 500 },
    );
  }
}

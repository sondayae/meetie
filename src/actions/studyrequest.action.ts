import supabase from '@/utils/supabase/client';

// 요청 목록 조회
export async function fetchStudyApplies(studyId: string) {
  try {
    const { data, error } = await supabase
      .from('study_apply')
      .select(`*, user (*)`)
      .eq('studyId', studyId);

    if (error) {
      console.error('Error fetching study details:', error);
      throw new Error('Failed to fetch study details');
    }

    return data;
  } catch (error) {
    console.error('Error in server action:', error);
    throw new Error('Failed to fetch study applies');
  }
}

// 요청 수정(수락, 거절)
export async function updateStudyApplyStatus(studyId: string, status: string) {
  try {
    // Validate input if needed
    if (!studyId || !status) {
      throw new Error('Missing studyId or status');
    }

    // Study가 존재하는지 확인
    const { data: studyData, error: studyError } = await supabase
      .from('study')
      .select(`*`)
      .eq('id', studyId)
      .single();

    if (studyError || !studyData) {
      console.error('Study not found:', studyError);
      throw new Error('Study not found');
    }

    // Study 신청 상태 업데이트
    const { data, error } = await supabase
      .from('study_apply')
      .update({ status })
      .eq('id', studyId);

    if (error) {
      console.error('Error updating study status:', error);
      throw new Error('Failed to update study status');
    }

    return data;
  } catch (error) {
    console.error('Error in server action:', error);
    throw new Error('Failed to update study status');
  }
}

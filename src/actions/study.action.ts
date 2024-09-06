import supabase from '@/utils/supabase/client';

export async function getStudyDetails(studyId: string) {
  try {
    const { data: studyData, error: studyError } = await supabase
      .from('study')
      .select(`*, user(*)`)
      .eq('id', studyId)
      .single();

    if (studyError) throw studyError;

    const { data: acceptedStudy, error: applyError } = await supabase
      .from('study_apply')
      .select('*')
      .eq('studyId', studyId)
      .eq('status', 'accepted');

    if (applyError) throw applyError;

    const responseData = {
      study: studyData,
      acceptedStudy: acceptedStudy.length,
    };

    return responseData;
  } catch (error) {
    console.error('Error fetching study details:', error);
    throw new Error('Failed to fetch study details');
  }
}

import supabase from '@/utils/supabase/client';

export async function GET(
  request: Request,
  { params }: { params: { studyId: string } },
) {
  try {
    const { data: studyData, error: studyError } = await supabase
      .from('study')
      .select(`*, user(*)`)
      .eq('id', params.studyId)
      .single();

    if (studyError) throw studyError;

    const { data: acceptedApplications, error: applyError } = await supabase
      .from('study_apply')
      .select('*')
      .eq('studyId', params.studyId)
      .eq('status', 'accepted');

    if (applyError) throw applyError;

    const responseData = {
      study: studyData,
      acceptedApplications: acceptedApplications.length,
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

import supabase from '@/utils/supabase/client';

// 요청 목록 조회
export async function GET(
  request: Request,
  { params }: { params: { studyId: string } },
) {
  try {
    const { data, error } = await supabase
      .from('study_apply')
      .select(`*, user (*)`)
      .eq('studyId', params.studyId);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching study details:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch study details' }),
      { status: 500 },
    );
  }
}

// 요청 생성

// 요청 수정(수락, 거절)
export async function PATCH(
  request: Request,
  { params }: { params: { studyId: string } },
) {
  try {
    const { studyId } = params;
    const { status } = await request.json();

    // Validate input if needed
    if (!studyId || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing studyId or status' }),
        { status: 400 },
      );
    }

    const { data: studyData, error: studyError } = await supabase
      .from('study')
      .select(`*`)
      .eq('id', params.studyId)
      .single();

    console.log(`studyData: ${studyData}`);
    console.log(studyData);

    // Update the study status in the database
    const { data, error } = await supabase
      .from('study_apply')
      .update({ status })
      .eq('id', studyId);

    if (error) {
      console.error('Error updating study status:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to update study status' }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error processing PATCH request:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500 },
    );
  }
}

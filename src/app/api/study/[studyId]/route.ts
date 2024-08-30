import supabase from '@/utils/supabase/client';

export async function GET(
  request: Request,
  { params }: { params: { studyId: string } },
) {
  console.log(params.studyId);
  
  try {
    const { data, error } = await supabase
    .from('study')
    .select(`*,user(*)`)
    .eq('id', params.studyId)
    .single();

    console.log(data)

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching study details:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch study details' }), { status: 500 });
  }
}

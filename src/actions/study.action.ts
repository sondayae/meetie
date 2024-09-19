import supabase from '@/utils/supabase/client';

export async function getStudyDetails(studyId: string) {
  try {
    const { data, error } = await supabase
      .from('study')
      .select('*, user(*, images(url))')
      .eq('id', studyId)
      .single();

    if (error) throw error;

  return data;
  } catch (error) {
    console.error('Error fetching study details:', error);
    throw new Error('Failed to fetch study details');
  }
}

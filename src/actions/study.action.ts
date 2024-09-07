import supabase from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache';

export async function getStudyDetails(studyId: string) {
  try {
    const { data, error } = await supabase
      .from('study')
      .select(`*, user(*)`)
      .eq('id', studyId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching study details:', error);
    throw new Error('Failed to fetch study details');
  }
}

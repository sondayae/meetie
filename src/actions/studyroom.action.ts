'use server';

import supabase from '@/utils/supabase/client';

export async function createStudyRoom(studyId: string) {
  console.log(studyId)

  try {
    if (studyId) {
      const { data, error } = await supabase
        .from('study')
        .update({ isRecruiting: false })
        .eq('id', studyId);

      if (error) {
        throw error;
      }

      // Optionally revalidate paths to reflect the change
      // revalidatePath('/studyrooms'); // Use this to revalidate a path after mutation

      return data;
    } else {
      throw new Error('Request body is missing or studyId is undefined');
    }
  } catch (error) {
    console.error('Error creating study room:', error);
    throw new Error('Failed to create study room');
  }
}

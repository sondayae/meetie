'use server';

import { redirect } from 'next/navigation';
import supabase from '@/utils/supabase/client';

export async function createStudyRoom(studyId: string) {

  try {
    if (studyId) {
      const { data, error } = await supabase
        .from('study')
        .update({ isRecruiting: false })
        .eq('id', studyId);

      if (error) {
        throw error;
      }

      return data;
    } else {
      throw new Error('Request body is missing or studyId is undefined');
    }
  } catch (error) {
    console.error('Error creating study room:', error);
    throw new Error('Failed to create study room');
  }
}

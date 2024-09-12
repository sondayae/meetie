'use server';

import { redirect } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import { getServerUserId } from '@/lib/actions/getServerUserId';

export async function createStudyRoom(studyId: string) {
  const userId = await getServerUserId();
  try {
    if (studyId) {
      const { data, error } = await supabase
        .from('study')
        .update({ isRecruiting: false })
        .eq('id', studyId);

      const { data2, error2 } = await supabase
        .from('studymember')
        .insert([
          {
            studyId: studyId,
            isLeader: false,
            participantId: userId,
            isLeader: true,
          },
        ]);

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

'use server';

import { redirect } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

export async function createStudyRoom(studyId: string) {
  const userId = await getServerUserId();
  try {
    if (studyId) {
      const { data, error } = await supabase
        .from('study')
        .update({ isRecruiting: false })
        .eq('id', studyId);

      const { data: data2, error: error2 } = await supabase
        .from('studymember')
        .insert([
          {
            study_id: studyId,
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

export async function getJoinedStudyList() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  const { data, error } = await supabase.from('studymember').select('study(*)').eq('participantId', userId);
  if (error) {
    return null;
  }
  return data;
}

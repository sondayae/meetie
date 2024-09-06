'use server';

import supabase from '@/utils/supabase/client';

export async function getHomeworks(studyRoomId: string) {
  try {
    if (!studyRoomId) {
      throw new Error('id is required');
    }
    const { data, error } = await supabase
      .from('homework')
      .select()
      .eq('studyId', studyRoomId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`${error.message}`);
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

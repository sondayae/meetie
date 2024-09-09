'use server';

import supabaseServer from '@/utils/supabase/server';

export async function getFeedbacks(studyId: string) {
  const supabase = supabaseServer();
  try {
    if (!studyId) {
      throw new Error('studyRoom id is required');
    }

    const { data, error } = await supabase
      .from('handin')
      .select(
        'id, text, created_at, homework(id, title), user(id, name, images(url)), images(url), comments(*), feedback_reactions(*)',
      )
      .order('created_at', { ascending: false })
      .eq('study_id', studyId);

      if (error) {
        throw new Error(`There is an error, ${error.message}`);
      }

      return data;
  } catch (err: any) {
    return err.message;
  }
}
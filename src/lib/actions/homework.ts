'use server';

import supabase from '@/utils/supabase/client';

export async function getHomeworks(id: string) {
  try {
    if (!id) {
      throw new Error('id is required');
    }
    const { data, error } = await supabase
      .from('homework')
      .select('*')
      .eq('study_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`${error.message}`);
    }

    return data;
  } catch (err: any) {
    return err.message;
  }
}

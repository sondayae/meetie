'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import activityEventEmitter from '@/lib/EventEmitter';
import supabaseServer from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getComments(targetId: string) {
  const supabase = supabaseServer();
  const {data, error} = await supabase.from('comments').select('*, user(name, images(url)), reactions(*)').eq('target_id', targetId);

  if (error) {
    return null;
  }

  return data;
}

export async function insertComment(formData: FormData) {
  const targetId = formData.get('targetId');
  const comment = formData.get('comment');
  console.log(comment);
  

  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  try {
    if (!userId) {
      throw new Error('There is no User');
    }

    const { data, error } = await supabase
    .from('comments')
    .insert({ user_id: userId, target_id: targetId, comment: comment, created_at: new Date() })
    .select()
    if (error) {
      throw new Error(`Insert Comment has an error. ${error.message}`);
    }

    activityEventEmitter.emit('comment', user);
    revalidatePath('/');
    return data;
  } catch (err) {
    return err;
  }
}

export async function updateComment(id: number, comment: string) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  try {
    if (!userId) {
      throw new Error('There is no User');
    }

    const { data, error } = await supabase
    .from('comments')
    .update({ comment: comment })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    if (error) {
      throw new Error(`Insert Comment has an error. ${error.message}`);
    }
    revalidatePath('/');
    return data;
  } catch (err: any) {
    return err.message;
  }
}

export async function toggleReaction(targetId: number, emoji: string) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  try {
    if (!userId) {
      throw new Error('There is no user');
    }
    const {data: isExist} = await supabase.from('reactions').select().eq('target_id', targetId).eq('user_id', userId).eq('emoji', emoji);
    if (isExist!.length === 0) {
      const { data, error } = await supabase
      .from('reactions')
      .insert({ target_id: targetId, user_id: userId, emoji: emoji})
      .select();
      if (error) {
        return new Error(`add Reaction has an error, ${error.message}`)
      }

      revalidatePath('/');
      return data;
    } else {
      const {data, error} = await supabase.from('reactions').delete().eq('target_id',targetId).eq('emoji', emoji).select();
      if (error) {
        return new Error(`delete Reaction has an error, ${error.message}`)
      }

      revalidatePath('/');
      return data;
    }
  } catch (err) {
    return err;
  }
  
}

export async function createReaction({targetId, emoji}: {targetId: string, emoji: string}) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const {data: isExist} = await supabase.from('reactions').select().eq('target_id', targetId).eq('user_id', userId).eq('emoji', emoji);

  if (isExist!.length === 0) {
    const { data, error } = await supabase
    .from('reactions')
    .insert({ target_id: targetId, user_id: userId, emoji: emoji})
    .select();
    if (error) {
      return null;
    }
    return data;
  } else {
    const {data, error} = await supabase.from('reactions').delete().eq('id', isExist![0].id).select();
    if (error) {
      return null;
    }
    return data;
  }
}

export async function deleteComment(id: number) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  try {
    if (!userId || !id) {
      throw new Error('There is an error');
    }
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
    revalidatePath('/');
    return {success: true}
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

activityEventEmitter.on('comment', async (user) => {
  console.log('comment on');
  
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc('upsert_user_activity', { _type: 'comment', _user_id: user.id });
  if (error) {
    console.log(error.message);
    
    return null;
  }
  console.log(data);
});
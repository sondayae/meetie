'use server';

import supabase from '@/utils/supabase/client';
import { getServerUserId } from './getServerUserId';


export async function createComment({comment, targetId}: {comment:string, targetId: string}) {
  const userId = await getServerUserId();

  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (comment === '') {
      throw new Error('comment is required');
    }
    const { data, error } = await supabase
      .from('comments')
      .insert({
        target_id: targetId,
        user_id: userId,
        comment,
      })
      .select('id, user(name), comment');

    if (error) {
      throw new Error(`${error}`);
    }
    return { success: true, data: data[0] };
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}

export async function updateComment(formData: FormData) {
  const userId = await getServerUserId();
  const id = formData.get('id');
  const comment = formData.get('comment');

  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (comment === '') {
      throw new Error('comment is required');
    }
    const { data, error } = await supabase
      .from('comments')
      .update({
        comment,
      })
      .eq('id', id)
      .select('id, user(name), comment, created_at');

    if (error) {
      throw new Error(`${error}`);
    }
    return { success: true, data: data[0] };
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}

export async function deleteComment(commentId: string) {
  const userId = await getServerUserId();
  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (commentId === '') {
      throw new Error('comment id is required');
    }
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      throw new Error(`${error.message}`);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getComments(targetId: string) {
  try {
    if (!targetId) {
      throw new Error('comment id is required');
    }
    const { data, error } = await supabase
      .from('comments')
      .select(
        `
      id,
      comment,
      created_at,
      user(id, name, images(url))
    `,
      )
      .eq('target_id', targetId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`${error.message}`);
    }
    return { success: true, data };
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}

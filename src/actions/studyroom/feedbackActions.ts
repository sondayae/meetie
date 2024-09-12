'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

const FOLDER = 'handin';

export async function getFeedbacks(studyId: string) {
  const supabase = supabaseServer();
  try {
    if (!studyId) {
      throw new Error('studyRoom id is required');
    }

    const { data, error } = await supabase
      .from('feedback')
      .select(
        'id, text, created_at, homework(id, title), user(id, name, images(url)), images(url), comment(*, reactions(*)), feedback_reactions(*)',
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

export async function getFeedback(id: string) {
  const supabase = supabaseServer();
  try {
    if (!id) {
      throw new Error('handin id is required');
    }

    const { data, error } = await supabase
      .from('feedback')
      .select(
        '*, homework(*), user(id, name, images(url)), images(url), comment(*, user(name, images(url)), reactions(*)), feedback_reactions(*, user(images(url)))',
      )
      .eq('id', id)
      .order('created_at', { referencedTable: 'comment', ascending: false })
      .single();

    if (error) {
      throw new Error(`There is an error, ${error.message}`);
    }
    return data;
  } catch (err: any) {
    return err.message;
  }
}

export async function toggleReaction(targetId: string, emoji: string) {
  
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  try {
    if (!userId) {
      throw new Error('There is no user');
    }
    const {data: isExist} = await supabase.from('feedback_reactions').select().eq('target_id', targetId).eq('user_id', userId).eq('emoji', emoji);

    if (isExist!.length === 0) {
      const { data, error } = await supabase
      .from('feedback_reactions')
      .insert({ target_id: targetId, user_id: userId, emoji: emoji})
      .select();
      if (error) {
        throw new Error(`add Reaction has an error, ${error.message}`)
      }

      revalidatePath('/');
      return data;
    } else {
      const {data, error} = await supabase.from('feedback_reactions').delete().eq('id', isExist![0].id).select();
      if (error) {
        throw new Error(`delete Reaction has an error, ${error.message}`)
      }

      revalidatePath('/');
      return data;
    }
  } catch (err: any) {
    return err.message;
  }
  
}

export async function updateFeedback(formData: FormData) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const id = formData.get('id');
  const homeworkId = formData.get('homeworkId');
  const text = formData.get('text');
  const file = formData.get('file') as File;

  try {
    if (!userId) {
      throw new Error('There is no user.');
    }
    // 과제 업데이트
    const { data: handinData, error: handinError }: { data: any; error: any } =
      await supabase
        .from('handin')
        .update({ homework_id: homeworkId, text })
        .eq('id', id)
        .select();

    if (handinError) {
      throw new Error(`Failed to insert handin: ${handinError.message}`);
    }

    // 파일이 있는 경우 스토리지 업로드
    if (file.size > 0) {
      const fileName = `handin_${crypto.randomUUID()}`;
      const filePath = `${FOLDER}/${fileName}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)
        .upload(filePath, file, {
          upsert: true,
        });

      if (storageError) {
        throw new Error(`Failed to upload storage: ${storageError.message}`);
      }

      // 이미지 테이블 업로드
      const { data: imgData, error: imgError } = await supabase
        .from('images')
        .update({
          url: storageData?.path,
          target: 'handin',
        })
        .eq('target_id', id)
        .select();
      if (imgError) {
        throw new Error(`Failed to upload images: ${imgError.message}`);
      }
      return { success: true, data: { handin: handinData, image: imgData } };
    }
    return { success: true, data: { handin: handinData } };
  } catch (error: any) {
    console.log(error.message);

    return { success: false, error: error.message };
  }
}

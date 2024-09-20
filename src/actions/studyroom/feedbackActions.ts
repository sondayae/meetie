'use server';

import supabaseServer from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

const TABLE = 'handin';
const FOLDER = 'handin';

export async function getFeedbacks(studyId: string) {
  const supabase = supabaseServer();
  try {
    if (!studyId) {
      throw new Error('studyRoom id is required');
    }

    const { data, error } = await supabase
      .from(TABLE)
      .select(
        'id, text, created_at, homework(id, title), user(id, name, images(url)), images(url), comments(*, reactions(*)), feedback_reactions(*)',
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
      .from(TABLE)
      .select(
        '*, homework(*), user(id, name, images(url)), images(url), comments(*, user(name, images(url)), reactions(*)), feedback_reactions(*, user(images(url)))',
      )
      .order('created_at', { referencedTable: 'comments', ascending: true })
      .eq('id', id)
      .single();

    console.log(data);
    

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

export async function createFeedback(previousState: any, formData: FormData) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const text = formData.get('text');
  const image = formData.get('file') as File;
  const homeworkId = formData.get('homeworkId');
  const studyId = formData.get('studyId');

  try {
    const {data, error }= await supabase
        .from('handin')
        .insert({ user_id: userId, homework_id: homeworkId, text: text, study_id: studyId})
        .select();

    if (error) {
      throw error;
    }

    console.log(data);
    
    const feedbackId = data[0].id;

    if (image.size > 0) {
      // 스토리지 업로드
      const fileName = `feedback_${crypto.randomUUID()}`;
      const filePath = `${FOLDER}/${fileName}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)
        .upload(filePath, image, { upsert: true });

      if (storageError) {
        throw new Error(`Failed to upload storage: ${storageError.message}`);
      }

      // 이미지 테이블 업로드
      const { data: imgData, error: imgError } = await supabase
        .from('images')
        .insert({
          url: storageData?.path,
          target: 'feedback',
          target_id: feedbackId,
        });

      if (imgError) {
        throw new Error(`Failed to upload images: ${imgError.message}`);
      }
    }
    return { success: true };

  } catch (err: any) {
    return { error: {
      message: err.message,
    }}
  }
}

export async function updateFeedback(id: number, formData: FormData) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  console.log(formData.get('file'));

  // const { data, error } = await supabase
  // .from('feedback')
  // .update(newData)
  // .eq('id', id)
  // .select();

  // try {
  //   if (!userId) {
  //     throw new Error('There is no user.');
  //   }
  //   // 파일이 있는 경우 스토리지 업로드

  //   // 과제 업데이트
  //   const { data: handinData, error: handinError }: { data: any; error: any } =
  //     await supabase
  //       .from('handin')
  //       .update({ homework_id: homeworkId, text })
  //       .eq('id', id)
  //       .select();

  //   if (handinError) {
  //     throw new Error(`Failed to insert handin: ${handinError.message}`);
  //   }

  //   // 파일이 있는 경우 스토리지 업로드
  //   if (file.size > 0) {
  //     const fileName = `handin_${crypto.randomUUID()}`;
  //     const filePath = `${FOLDER}/${fileName}`;
  //     const { data: storageData, error: storageError } = await supabase.storage
  //       .from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)
  //       .upload(filePath, file, {
  //         upsert: true,
  //       });

  //     if (storageError) {
  //       throw new Error(`Failed to upload storage: ${storageError.message}`);
  //     }

  //     // 이미지 테이블 업로드
  //     const { data: imgData, error: imgError } = await supabase
  //       .from('images')
  //       .update({
  //         url: storageData?.path,
  //         target: 'handin',
  //       })
  //       .eq('target_id', id)
  //       .select();
  //     if (imgError) {
  //       throw new Error(`Failed to upload images: ${imgError.message}`);
  //     }
  //     return { success: true, data: { handin: handinData, image: imgData } };
  //   }
  //   return { success: true, data: { handin: handinData } };
  // } catch (error: any) {
  //   console.log(error.message);

  //   return { success: false, error: error.message };
  // }
}

export async function deleteFeedback(id: number) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  try {
    if (!userId || !id) {
      throw new Error('There is an error');
    }
    const { error } = await supabase.from('feedback').delete().eq('id', id);
    if (error) {
      throw error;
    }
    revalidatePath('/');
    return {success: true};
  } catch (err: any) {
    return {success: false, err: err.message};
  }
}


export async function getUser() {
  const supabase = supabaseServer();
  const { data: { user }} = await supabase.auth.getUser();
  return user;
}
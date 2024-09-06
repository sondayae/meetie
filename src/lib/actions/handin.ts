'use server';

import supabase from '@/utils/supabase/client';
import supabaseServer from '@/utils/supabase/server';
import { getImgUrl } from '@/utils/supabase/storage';
import { getServerUserId } from './getServerUserId';

const FOLDER = 'handin';

function handleError(error: any) {
  if (error) {
    throw new Error(error.message);
  }
}

export async function createHandin(formData: FormData) {
  const supabase = await supabaseServer();
  const userId = await getServerUserId();

  const file = formData.get('file') as File;
  const text = formData.get('text');
  const homeworkId = formData.get('homework_id');
  try {
    if (!userId) {
      throw new Error('There is no user.');
    }
    // 1. 과제 테이블에 데이터 삽입
    const { data: handinData, error: handinError }: { data: any; error: any } =
      await supabase
        .from('handin') // 과제 테이블 이름
        .insert({ homework_id: homeworkId, user_id: userId, text })
        .select();

    if (handinError) {
      throw new Error(`Failed to insert handin: ${handinError.message}`);
    }

    const handinId = handinData.id;

    // 2. 스토리지 업로드
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

    const { data: imgData, error: imgError } = await supabase
      .from('images')
      .insert({ url: storageData?.path, target: 'handin', target_id: handinId })
      .select();

    if (imgError) {
      throw new Error(`Failed to upload images: ${imgError.message}`);
    }
    return { success: true, data: { handin: handinData, image: imgData } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteHandin(handinId: string) {
  const supabase = await supabaseServer();
  const userId = await getServerUserId();

  try {
    if (!userId) {
      throw new Error('There is no user.');
    }

    const { data, error } = await supabase
      .from('handin')
      .delete()
      .eq('id', handinId);

    if (error) {
      throw new Error(`Failed to delete handin: ${error.message}`);
    }
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateHandin(formData: FormData) {
  const supabase = await supabaseServer();
  const userId = await getServerUserId();

  const file = formData.get('file') as File;

  const text = formData.get('text');
  const homeworkId = formData.get('homeworkId');
  const id = formData.get('id');
  console.log(file);

  try {
    if (!userId) {
      throw new Error('There is no user.');
    }
    // 과제 업로드
    const { data: handinData, error: handinError }: { data: any; error: any } =
      await supabase
        .from('handin')
        .update({ homework_id: homeworkId, text })
        .eq('id', id)
        .select();

    if (handinError) {
      throw new Error(`Failed to insert handin: ${handinError.message}`);
    }

    const handinId = handinData.id;

    // 스토리지 업로드
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
        .insert({
          url: storageData?.path,
          target: 'handin',
          target_id: handinId,
        })
        .select();
      if (imgError) {
        throw new Error(`Failed to upload images: ${imgError.message}`);
      }
      return { success: true, data: { handin: handinData, image: imgData } };
    }
    return { success: true, data: { handin: handinData } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getHandin(handinId: string) {
  try {
    if (!handinId) {
      throw new Error('handin id is required');
    }

    const { data, error } = await supabase
      .from('handin')
      .select(
        'id, text, created_at, homework(id, title, subtitle), user(id, name, images(url)), images(url)',
      )
      .eq('id', handinId)
      .single();

    handleError(error);

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getHandinList(studyId: string) {
  try {
    if (!studyId) {
      throw new Error('studyRoom id is required');
    }

    const { data, error }: { data: any; error: any } = await supabase
      .from('handin')
      .select(
        'id, text, created_at, homework(id, title), user(id, name, images(url)), images(url), comments(count)',
      )
      .order('created_at', { ascending: false })
      .eq('study_id', studyId);

    handleError(error);

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getJoinedStudyRoomList() {
  const userId = await getServerUserId();

  try {
    if (!userId) {
      handleError(new Error('user is required'));
    }
    const { data, error } = await supabase
      .from('studymember')
      .select('*, study(id, title, topic, endDate)')
      .eq('participantId', userId);

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
export async function getJoinedStudyRoom(studyId: string) {
  const userId = await getServerUserId();

  try {
    if (!userId) {
      handleError(new Error('user is required'));
    }
    const { data, error } = await supabase
      .from('study')
      .select('*')
      .eq('id', studyId)
      .single();

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

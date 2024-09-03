'use server';

import supabaseServer from '@/utils/supabase/server';
import { getServerUserId } from './getServerUserId';

const FOLDER = 'handin';

export async function createHandin(state: any, formData: FormData) {
  const supabase = await supabaseServer();
  const userId = await getServerUserId();

  const file = formData.get('file') as File;
  const text = formData.get('text');
  const homeworkId = '2';
  try {
    if (!userId) {
      throw new Error('There is no user.');
    }
    // 1. 과제 테이블에 데이터 삽입
    const { data: handinData, error: handinError } = await supabase
      .from('handin')  // 과제 테이블 이름
      .insert({ homework_id: homeworkId, user_id: userId, text: text })
      .select();

    if (handinError) {
      throw new Error(`Failed to insert handin: ${handinError.message}`);
    }

    const handinId = handinData.id;

    // 2. 스토리지 업로드
    const fileName = 'handin_' + crypto.randomUUID();
    const filePath = `${FOLDER}/${fileName}`;
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)
      .upload(filePath, file, {
        upsert: true
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
    return { success: true, data: {handin: handinData, image: imgData}};
  } catch (error) {
    console.error('Error during handin creation and image upload:', error.message);
    return { success: false, error: error.message };
  }
}


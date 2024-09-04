'use server';

import supabaseServer from '@/utils/supabase/server';
import { getServerUserId } from './getServerUserId';

const FOLDER = 'handin';

export async function createHandin(formData: FormData) {
  const supabase = await supabaseServer();
  const userId = await getServerUserId();

  const file = formData.get('file') as File;
  console.log(file);
  
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

    console.log(handinId);
    
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

export async function deleteHandin(handinId: string) {
  const supabase = await supabaseServer();
  const userId = await getServerUserId();
  console.log(handinId);
  
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
    return { success: true, data: data };
  } catch (error: any) {
    console.log(error.message);
    
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
    // 1. 과제 테이블에 데이터 삽입
    const { data: handinData, error: handinError } = await supabase
      .from('handin')  // 과제 테이블 이름
      .update({ homework_id: homeworkId, text: text })
      .eq('id', id)
      .select();

    if (handinError) {
      throw new Error(`Failed to insert handin: ${handinError.message}`);
    }

    const handinId = handinData.id;

    // 2. 스토리지 업로드
    if (file.size > 0) {
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
    }
    return {success: true, data: {handin: handinData}};

  } catch (error) {
    console.error('Error during handin and image update:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getHandin(handinId) {
  const supabase = supabaseServer();
  try {
    if (!handinId) {
      throw new Error('handin id is required');
    }

    const { data, error } = await supabase
      .from('handin')
      .select('*, images(url)')
      .eq('id', handinId);

    if (error) {
      throw new Error(error.message);
    }
    console.log(error);
    
    console.log(data);
    
    return { success: true, data: data};
  } catch (err: any) {
    console.log(err.message);
    
    return { success: false, error: err.message };
  }
}


import supabase from '@/utils/supabase/client';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response(JSON.stringify({ error: '파일이 필요합니다.' }), {
      status: 400,
    });
  }

  const bucket = 'images';
  const folder = 'profile';
  const fileName = 'profileImg_' + crypto.randomUUID();

  // 파일을 업로드
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${folder}/${fileName}`, file);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  // 업로드된 파일의 URL을 가져옵니다
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(`${folder}/${fileName}`);

  return new Response(JSON.stringify({ url: publicUrlData.publicUrl }), {
    status: 200,
  });
}

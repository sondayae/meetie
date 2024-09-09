import supabase from '@/utils/supabase/client';

export async function GET() {
  try {
    const { data, error } = await supabase.from('study').select('*');

    // console.log('studyList', data);

    if (error) {
      console.error('스터디 목록 검색 중 오류가 발생했습니다.', error);
      return Response.json({ error: '서버 오류가 발생했습니다.' });
    }
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('스터디 목록 검색 중 오류가 발생했습니다.', error);
    return Response.json({ error: '서버 오류가 발생했습니다.' });
  }
}

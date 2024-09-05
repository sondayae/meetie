import supabase from '@/utils/supabase/client';

export async function POST(request: Request) {
  try {
    const { filters } = await request.json();

    let query = supabase.from('user').select('*');

    // 직무 필터 적용
    if (filters.job) {
      query = query.eq('job', filters.job);
    }

    // 스터디 기간 필터 적용
    if (filters.studySpan) {
      query = query.eq('expected_study_span', filters.studySpan);
    }

    // 스터디 목적 필터 적용
    if (filters.purpose.length > 0) {
      query = query.contains('purpose', filters.purpose);
    }

    // 작업 스타일 필터 적용
    if (filters.personality.length > 0) {
      query = query.contains('personality', filters.personality);
    }

    // 쿼리 실행
    const { data: users, error } = await query;

    if (error) {
      throw error;
    }

    return Response.json({ users });
  } catch (error) {
    console.error('서버에서 사용자 검색 중 오류 발생:', error);
    return Response.json({ error: '서버 오류' }, { status: 500 });
  }
}

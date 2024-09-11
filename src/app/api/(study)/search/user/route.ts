import supabase from '@/utils/supabase/client';
import supabaseServer from '@/utils/supabase/server';

export async function GET() {
  try {
    // 1. `user` 테이블에서 모든 사용자 정보 가져오기
    const { data: users, error: usersError } = await supabase.from('user')
      .select(`
        id,
        nickname,
        name,
        job,
        personality,
        image_id
      `); // `single()` 제거하여 모든 사용자 정보 가져오기

    if (usersError) throw usersError;

    // 2. 각 사용자의 `image_id`를 사용해 `images` 테이블에서 URL 가져오기
    const usersWithImages = await Promise.all(
      users.map(async (user) => {
        let imageUrl = null;
        if (user.image_id) {
          const { data: image, error: imageError } = await supabase
            .from('images')
            .select('url')
            .eq('id', user.image_id)
            .single(); // 단일 이미지 가져오기 위해 `single()` 사용

          if (imageError) throw imageError;
          imageUrl = image?.url || null;
        }

        // 사용자 정보와 이미지 URL을 결합
        return { ...user, imageUrl };
      }),
    );

    // 3. 모든 사용자 정보와 이미지 URL을 반환
    return new Response(JSON.stringify(usersWithImages), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch users' }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filters, searchTerm, searchField } = body;

    let query = supabase.from('user').select('*');

    // 직무 필터 적용
    if (filters.job) {
      query = query.eq('job', filters.job);
    }

    // 스터디 기간 필터 적용
    if (filters.studySpan) {
      query = query.eq('expected_study_span', filters.studySpan);
    }

    // 스터디 목적 필터 적용 (빈 배열로 초기화)
    if (filters.purpose && filters.purpose.length > 0) {
      query = query.contains('purpose', filters.purpose);
    }

    // 작업 스타일 필터 적용 (빈 배열로 초기화)
    if (filters.personality && filters.personality.length > 0) {
      query = query.contains('personality', filters.personality);
    }

    // 검색어 필터 적용
    if (searchTerm) {
      if (searchField === 'name') {
        query = query.ilike('name', `%${searchTerm}%`); // nickname에서 검색어 포함된 부분 일치
      }
    }

    // 쿼리 실행
    const { data: users, error } = await query;

    if (error) {
      console.error('Query error:', error);
      throw error;
    }

    return Response.json({ users });
  } catch (error) {
    console.error('서버에서 사용자 검색 중 오류 발생:', error);
    return Response.json({ error: '서버 오류' }, { status: 500 });
  }
}

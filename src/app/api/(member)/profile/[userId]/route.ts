import supabase from '@/utils/supabase/client';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    // `user` 테이블에서 특정 사용자 정보 가져오기 (단일 사용자)
    const { data: user, error: userError } = await supabase
      .from('user')
      .select(
        `
        nickname,
        introduction,
        job,
        purpose,
        personality,
        expected_study_span,
        image_id
      `,
      )
      .eq('id', userId)
      .single(); // 단일 사용자를 가져오기 위해 `single()` 사용

    if (userError) throw userError;

    // `image_id`를 사용해 `images` 테이블에서 URL 가져오기
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

    // 사용자 정보와 이미지 URL을 함께 반환
    return new Response(JSON.stringify({ ...user, imageUrl }), { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return new Response('Failed to fetch user profile', { status: 500 });
  }
}

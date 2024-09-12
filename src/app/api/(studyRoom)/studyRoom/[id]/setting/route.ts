import supabase from '@/utils/supabase/client';
import supabaseServer from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log(params.id);
  const supabaseAuth = supabaseServer();

  const { data, error } = await supabaseAuth.auth.getUser();

  if (error || !data || !data.user) {
    console.error('User not authenticated or session invalid');
    return Response.json('Unauthorized', { status: 401 });
  }

  const leaderId = data.user.id;

  // 리더인지 확인
  const { data: leaderStudyData, error: leaderStudyError } = await supabase
    .from('studymember')
    .select('study_id')
    .eq('participantId', leaderId)
    .single();

  if (leaderStudyError || !leaderStudyData) {
    console.error('리더 정보 조회 오류:', leaderStudyError);
    return Response.json('Forbidden', { status: 403 });
  }

  const studyId = leaderStudyData.studyId;

  try {
    // `studymember`와 `user` 테이블을 조인하여 사용자 정보를 조회
    const { data: membersData, error: membersError } = await supabase
      .from('studymember')
      .select(
        `
        participantId,
        user:user (
          id,
          name,
          nickname,
          job,
          personality,
          introduction
        )
      `,
      )
      .eq('study_id', studyId) // 리더가 속한 스터디의 ID로 필터링
      .neq('participantId', leaderId); // 리더 제외

    if (membersError) {
      console.error('스터디 멤버 조회 오류:', membersError);
      return Response.json(
        { error: '스터디 멤버 조회 오류 발생' },
        { status: 500 },
      );
    }

    // 멤버들 중에서 리더 제외
    const members = membersData.map((member) => member.user);

    return Response.json(members, { status: 200 });
  } catch (error) {
    console.error('스터디 멤버 조회 중 오류 발생:', error);
    return Response.json(
      { error: '스터디 멤버 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { newLeaderId } = await request.json();

    const supabaseAuth = supabaseServer();

    const { data, error } = await supabaseAuth.auth.getUser();

    if (error || !data || !data.user) {
      console.error('User not authenticated or session invalid');
      return Response.json('Unauthorized', { status: 401 });
    }

    const oldLeaderId = data.user.id;

    // 유효성 검사
    if (!newLeaderId) {
      return Response.json(
        JSON.stringify({ error: '새 리더 ID는 필수입니다.' }),
        { status: 400 },
      );
    }

    // 기존 리더의 isLeader를 false로 업데이트
    const { error: updateOldLeaderError } = await supabase
      .from('studymember')
      .update({ isLeader: false })
      .eq('participantId', oldLeaderId);

    if (updateOldLeaderError) {
      console.error('기존 리더 업데이트 오류:', updateOldLeaderError);
      throw updateOldLeaderError;
    }

    // 새로운 리더의 isLeader를 true로 업데이트
    const { error: updateNewLeaderError } = await supabase
      .from('studymember')
      .update({ isLeader: true })
      .eq('participantId', newLeaderId);

    if (updateNewLeaderError) {
      console.error('새 리더 업데이트 오류:', updateNewLeaderError);
      throw updateNewLeaderError;
    }

    return Response.json(
      JSON.stringify({ message: '권한 위임이 성공적으로 완료되었습니다.' }),
      { status: 200 },
    );
  } catch (error) {
    console.error('권한 위임 중 오류 발생:', error);
    return Response.json(
      JSON.stringify({ error: '권한 위임 중 오류가 발생했습니다.' }),
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { participantId } = await request.json();

    // 유효성 검사: participantId가 존재하는지 확인
    if (!participantId) {
      return Response.json(
        JSON.stringify({ error: '참여자 ID는 필수입니다.' }),
        { status: 400 },
      );
    }

    const supabaseAuth = supabaseServer();

    // 현재 인증된 사용자가 있는지 확인
    const { data, error } = await supabaseAuth.auth.getUser();

    if (error || !data || !data.user) {
      console.error('User not authenticated or session invalid');
      return Response.json(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    // 사용자가 속한 스터디 정보 가져오기
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('participating_study')
      .eq('id', participantId)
      .single();

    if (userError) {
      console.error('사용자 정보 조회 오류:', userError);
      return Response.json(
        JSON.stringify({ error: '사용자 정보 조회 중 오류가 발생했습니다.' }),
        { status: 500 },
      );
    }

    const participatingStudyId = userData?.participating_study;

    // 스터디에서 사용자의 참여 정보 삭제
    if (participatingStudyId) {
      const { error: removeFromStudyError } = await supabase
        .from('studymember')
        .delete()
        .eq('participantId', participantId);

      if (removeFromStudyError) {
        console.error('스터디에서 사용자 삭제 오류:', removeFromStudyError);
        return Response.json(
          JSON.stringify({
            error: '스터디에서 사용자 삭제 중 오류가 발생했습니다.',
          }),
          { status: 500 },
        );
      }
    }

    // user 테이블에서 participating_study 컬럼을 null로 설정
    const { error: updateUserError } = await supabase
      .from('user')
      .update({ participating_study: null }) // participating_study를 null로 업데이트
      .eq('id', participantId);

    if (updateUserError) {
      console.error('사용자 업데이트 오류:', updateUserError);
      return Response.json(
        JSON.stringify({ error: '사용자 업데이트 중 오류가 발생했습니다.' }),
        { status: 500 },
      );
    }

    return Response.json(
      JSON.stringify({ message: '사용자가 성공적으로 강퇴되었습니다.' }),
      { status: 200 },
    );
  } catch (error) {
    console.error('DELETE 요청 처리 중 오류 발생:', error);
    return Response.json(
      JSON.stringify({ error: '사용자 강퇴 중 오류가 발생했습니다.' }),
      { status: 500 },
    );
  }
}

import supabase from '@/utils/supabase/client';

export async function GET(request: Request) {
  const leaderId = '3c572fd8-c5d2-4e20-b65b-91f9c153adb6'; // 예시 리더 ID

  try {
    // 하드코딩된 리더 ID로 해당 사용자가 속한 스터디 조회
    const { data: leaderStudyData, error: leaderStudyError } = await supabase
      .from('user')
      .select('participating_study')
      .eq('id', leaderId)
      .single();

    if (leaderStudyError) {
      console.error('리더 스터디 조회 오류:', leaderStudyError);
      return new Response(
        JSON.stringify({ error: '리더 스터디 조회 오류 발생' }),
        { status: 500 },
      );
    }

    if (!leaderStudyData || leaderStudyData.participating_study === null) {
      return Response.json(
        { error: '리더 정보가 없거나 스터디 정보가 없습니다.' },
        { status: 404 },
      );
    }

    const leaderStudyId = leaderStudyData.participating_study;

    // 리더가 속한 스터디 ID로 스터디 멤버 정보 조회
    const { data: membersData, error: membersError } = await supabase
      .from('user')
      .select('id, nickname, job, personality, introduction')
      .eq('participating_study', leaderStudyId);

    if (membersError) {
      console.error('스터디 멤버 조회 오류:', membersError);
      return Response.json(
        { error: '스터디 멤버 조회 오류 발생' },
        { status: 500 },
      );
    }

    // 멤버들 중에서 리더 제외
    const members = membersData.filter((member) => member.id !== leaderId);

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
    const oldLeaderId = '3c572fd8-c5d2-4e20-b65b-91f9c153adb6'; // 현재 리더의 ID (하드코딩된 값)

    // 유효성 검사
    if (!newLeaderId) {
      return new Response(
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

    return new Response(
      JSON.stringify({ message: '권한 위임이 성공적으로 완료되었습니다.' }),
      { status: 200 },
    );
  } catch (error) {
    console.error('권한 위임 중 오류 발생:', error);
    return new Response(
      JSON.stringify({ error: '권한 위임 중 오류가 발생했습니다.' }),
      { status: 500 },
    );
  }
}

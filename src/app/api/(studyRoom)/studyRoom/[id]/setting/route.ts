import supabase from '@/utils/supabase/client';
import supabaseServer from '@/utils/supabase/server';

// 기존 get 로직
// export async function GET(
//   request: Request,
//   { params }: { params: { study_id: string } },
// ) {
//   console.log(params);
//   const supabaseAuth = supabaseServer();

//   const { data, error } = await supabaseAuth.auth.getUser();

//   if (error || !data || !data.user) {
//     console.error('User not authenticated or session invalid');
//     return Response.json('Unauthorized', { status: 401 });
//   }

//   const leaderId = data.user.id;

//   // 리더인지 확인
//   const { data: leaderStudyData, error: leaderStudyError } = await supabase
//     .from('studymember')
//     .select('study_id')
//     .eq('participantId', leaderId)
//     .single();

//   if (leaderStudyError || !leaderStudyData) {
//     console.error('리더 정보 조회 오류:', leaderStudyError);
//     return Response.json('Forbidden', { status: 403 });
//   }

//   const study_id = leaderStudyData.study_id;

//   try {
//     // `studymember`와 `user` 테이블을 조인하여 사용자 정보를 조회
//     const { data: membersData, error: membersError } = await supabase
//       .from('studymember')
//       .select(
//         `
//         participantId,
//         user:user (
//           id,
//           name,
//           nickname,
//           job,
//           personality,
//           introduction
//         )
//       `,
//       )
//       .eq('study_id', study_id) // 리더가 속한 스터디의 ID로 필터링
//       .neq('participantId', leaderId); // 리더 제외

//     if (membersError) {
//       console.error('스터디 멤버 조회 오류:', membersError);
//       return Response.json(
//         { error: '스터디 멤버 조회 오류 발생' },
//         { status: 500 },
//       );
//     }

//     // 멤버들 중에서 리더 제외
//     const members = membersData.map((member) => member.user);

//     return Response.json(members, { status: 200 });
//   } catch (error) {
//     console.error('스터디 멤버 조회 중 오류 발생:', error);
//     return Response.json(
//       { error: '스터디 멤버 조회 중 오류가 발생했습니다.' },
//       { status: 500 },
//     );
//   }
// }

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  // Supabase 인증 가져오기
  const supabaseAuth = supabaseServer();
  const { data, error } = await supabaseAuth.auth.getUser();

  // 인증 오류 처리
  if (error || !data || !data.user) {
    console.error('User not authenticated or session invalid');
    return Response.json('Unauthorized', { status: 401 });
  }

  const userId = data.user.id;

  // 사용자가 리더인지 확인
  const { data: leaderStudyData, error: leaderStudyError } = await supabase
    .from('studymember')
    .select('study_id, isLeader')
    .eq('participantId', userId)
    .eq('study_id', id)
    .single();

  // 스터디 멤버가 아닌 경우 또는 리더가 아닌 경우 접근 불가
  if (leaderStudyError || !leaderStudyData) {
    console.error(
      'User is not part of the study or invalid study ID:',
      leaderStudyError,
    );
    return Response.json('Forbidden', { status: 403 });
  }

  // 리더가 아닌 경우 접근 불가
  if (!leaderStudyData.isLeader) {
    console.error('User is not the leader of the study');
    return Response.json('Forbidden', { status: 403 });
  }

  try {
    // 스터디 멤버 정보 조회
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
      .eq('study_id', id)
      .neq('participantId', userId); // 리더 제외

    if (membersError) {
      console.error('스터디 멤버 조회 오류:', membersError);
      return Response.json(
        { error: '스터디 멤버 조회 오류 발생' },
        { status: 500 },
      );
    }

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

// export async function DELETE(request: Request) {
//   try {
//     const { participantId } = await request.json();

//     // 유효성 검사: participantId가 존재하는지 확인
//     if (!participantId) {
//       return Response.json(
//         JSON.stringify({ error: '참여자 ID는 필수입니다.' }),
//         { status: 400 },
//       );
//     }

//     const supabaseAuth = supabaseServer();

//     // 현재 인증된 사용자가 있는지 확인
//     const { data, error } = await supabaseAuth.auth.getUser();

//     if (error || !data || !data.user) {
//       console.error('User not authenticated or session invalid');
//       return Response.json(JSON.stringify({ error: 'Unauthorized' }), {
//         status: 401,
//       });
//     }

//     // 사용자가 속한 스터디 정보 가져오기
//     const { data: userData, error: userError } = await supabase
//       .from('user')
//       .select('participating_study')
//       .eq('id', participantId)
//       .single();

//     if (userError) {
//       console.error('사용자 정보 조회 오류:', userError);
//       return Response.json(
//         JSON.stringify({ error: '사용자 정보 조회 중 오류가 발생했습니다.' }),
//         { status: 500 },
//       );
//     }

//     const participatingStudy_id = userData?.participating_study;

//     // 스터디에서 사용자의 참여 정보 삭제
//     if (participatingStudy_id) {
//       const { error: removeFromStudyError } = await supabase
//         .from('studymember')
//         .delete()
//         .eq('participantId', participantId);

//       if (removeFromStudyError) {
//         console.error('스터디에서 사용자 삭제 오류:', removeFromStudyError);
//         return Response.json(
//           JSON.stringify({
//             error: '스터디에서 사용자 삭제 중 오류가 발생했습니다.',
//           }),
//           { status: 500 },
//         );
//       }
//     }

//     // user 테이블에서 participating_study 컬럼을 null로 설정
//     const { error: updateUserError } = await supabase
//       .from('user')
//       .update({ participating_study: null }) // participating_study를 null로 업데이트
//       .eq('id', participantId);

//     if (updateUserError) {
//       console.error('사용자 업데이트 오류:', updateUserError);
//       return Response.json(
//         JSON.stringify({ error: '사용자 업데이트 중 오류가 발생했습니다.' }),
//         { status: 500 },
//       );
//     }

//     return Response.json(
//       JSON.stringify({ message: '사용자가 성공적으로 강퇴되었습니다.' }),
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('DELETE 요청 처리 중 오류 발생:', error);
//     return Response.json(
//       JSON.stringify({ error: '사용자 강퇴 중 오류가 발생했습니다.' }),
//       { status: 500 },
//     );
//   }
// }

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
    const { data: userData, error: authError } =
      await supabaseAuth.auth.getUser();

    if (authError || !userData || !userData.user) {
      console.error('User not authenticated or session invalid');
      return Response.json(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    console.log('Deleting participant with ID:', participantId);

    // 스터디 멤버에서 사용자의 참여 정보 삭제
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

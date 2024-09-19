import supabase from '@/utils/supabase/client';
import { UUID } from 'crypto';
import { is } from 'date-fns/locale';
import { revalidatePath } from 'next/cache';

// 요청 목록 조회
export async function getStudyApply(studyId: string) {
  try {
    const { data, error } = await supabase
      .from('study_apply')
      // .select(`*`)
      // .select(`*, user (*)`)
      .select('*, user(*, images(url))')
      .eq('studyId', studyId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching study details:', error);
      throw new Error('Failed to fetch study details');
    }

    
    return data;
  } catch (error) {
    console.error('Error in server action:', error);
    throw new Error('Failed to fetch study applies');
  }
}

// 요청 수정(수락, 거절)
export async function updateStudyApplyStatus(
  studyId: string,
  userId: string,
  status: string,
) {
  try {
    // Validate input if needed
    if (!studyId || !userId) {
      throw new Error('Missing studyId or userId');
    }

    // Study가 존재하는지 확인
    // const { data: studyData, error: studyError } = await supabase
    //   .from('study')
    //   .select(`*`)
    //   .eq('id', studyId)
    //   .single();

    // if (studyError || !studyData) {
    //   console.error('Study not found:', studyError);
    //   throw new Error('Study not found');
    // }

    // Study멤버에 존재 하는지 확인
    // const { data: studyData, error: studyError } = await supabase
    //   .from('study')
    //   .select(`*`)
    //   .eq('id', studyId)
    //   .single();
    // => 이미 수락됨으로 return

    // 스터디 멤버 추가
    const { data: insertData, error: insertError } = await supabase
      .from('studymember')
      .insert([{ study_id: studyId, isLeader: false, participantId: userId }])
      .select();

    if (insertError) {
      console.error('Error inserting study member:', insertError);
      throw new Error('Failed to insert study member');
    }

    // Study 신청 상태 업데이트
    const { data: updateData, error: updateError } = await supabase
      .from('study_apply')
      .update({ 'status': status })
      .eq('studyId', studyId)
      .eq('userId', userId);

    if (updateError) {
      console.error('Error updating study status:', updateError);
      throw new Error('Failed to update study status');
    }

  } catch (error) {
    console.error('Error in server action:', error);
    throw new Error('Failed to update study status');
  }
}



// 요청 수정(수락, 거절)
// 요청 수정(수락, 거절)
export async function allUpdateStudyApplyStatus(
  studyId: string,  // 하나의 스터디 ID
  userIds: string[],  // 다수의 사용자 ID
  status: string,
) {
  try {
    if (!studyId || !userIds.length) {
      throw new Error('Missing studyId or userIds');
    }

    // 스터디 멤버 추가
    const insertDataArray = userIds.map((userId) => ({
      study_id: studyId,
      isLeader: false,
      participantId: userId,
    }));

    const { data: insertData, error: insertError } = await supabase
      .from('studymember')
      .insert(insertDataArray)
      .select();

    if (insertError) {
      console.error('Error inserting study members:', insertError);
      throw new Error('Failed to insert study members');
    }

    // Study 신청 상태 업데이트
    const updatePromises = userIds.map(async (userId) => {
      const { data: updateData, error: updateError } = await supabase
        .from('study_apply')
        .update({ status })  // 상태를 매개변수로 변경
        .eq('studyId', studyId)
        .eq('userId', userId);

      if (updateError) {
        console.error(`Error updating study status for userId ${userId}:`, updateError);
        throw new Error(`Failed to update study status for userId ${userId}`);
      }

      return updateData;
    });

    // 모든 업데이트 Promise 실행
    await Promise.all(updatePromises);

  } catch (error) {
    console.error('Error in server action:', error);
    throw new Error('Failed to update study status');
  }
}

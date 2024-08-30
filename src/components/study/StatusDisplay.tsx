'use client';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { useParams, usePathname, useRouter } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { getacceptedApplyUser } from '@/hooks/useStudy';

export default function StatusDisplay() {
  const accessNum = getacceptedApplyUser();

  const params = useParams();
  const path = usePathname();
  const displayRequest = path.endsWith('studyrequest');

  console.log(params.studyId);

  const isLeader = true;
  // const isLeader = false;

  // TODO: api 분리
  const postApply = async () => {
    const userId = '10669baa-7476-4f40-8bbf-37ba8765de74';

    try {
      // 신청 상태 확인
      const { data, error } = await supabase
        .from('study_apply')
        .select('*')
        .eq('studyId', params.studyId)
        .eq('userId', userId);

      if (error) {
        throw error;
      }

      // 신청 정보가 존재하는 경우
      if (data && data.length > 0) {
        alert('이미 신청한 상태입니다.');
        return;
      }

      // 신청 정보가 없는 경우
      const { data2, error2 } = await supabase.from('study_apply').insert([
        {
          studyId: params.studyId,
          userId: userId,
          status: 'wating',
        },
      ]);

      if (error2) {
        throw error2;
      }

      console.log(data2);
      alert('신청이 완료되었습니다.');
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };

  let btnText =
    isLeader && !displayRequest && accessNum.length === 0
      ? '아직 대기 인원이 없습니다'
      : '대기 중인 요청 확인';
  let btnbg =
    isLeader && !displayRequest && accessNum.length === 0
      ? '#d0d6e0'
      : '대기 중인 요청 확인';

  return (
    <>
      <div className="fixed bottom-0 h-[#104px] w-full max-w-[600px] items-center justify-center px-8">
        <div className="flex items-center justify-center gap-5 bg-white py-4 text-[14px]">
          <div className="flex w-full flex-col items-center">
            <p className="text-[14px]">참여가능인원</p>
            <p className="text-bold text-[18px]">
              <span
                className={`${accessNum.length === 0 ? 'text-middle-gray' : 'text-main-purple'}`}
              >
                {accessNum.length}명
              </span>
              <span className="text-dark-gray"> / 4명</span>
            </p>
          </div>

          <div className="flex w-full items-center justify-center">
            {isLeader && !displayRequest && (
              <Link href={`${params.studyId}/studyrequest`}>
                <Button primary label={btnText} size="large"></Button>
              </Link>
            )}
            {isLeader && displayRequest && (
              <Link href={`${params.studyId}/studyrequest`}>
                <Button primary label={'전체 수락'} size="large"></Button>
              </Link>
            )}
            {/* TODO: 스터디원 => 요청(상태)*/}
            {!isLeader && (
              <>
                <Button
                  type="primary"
                  size="large"
                  label="참가 요청"
                  onClick={() => postApply()}
                ></Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

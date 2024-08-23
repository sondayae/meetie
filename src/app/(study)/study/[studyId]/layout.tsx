'use client';

import Link from 'next/link';
import { Button } from '@/stories/Button';
import { useParams, usePathname } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import NavLink from '@/components/study/NavLink';

export default function StudyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLeader = true;
  // const isLeader = false;

  const params = useParams();
  const path = usePathname();
  const displayRequest = path.endsWith('studyrequest');

  const postApply = async () => {
    try {
      const { data, error } = await supabase.from('study_apply').insert([
        // TODO: 유저 중복 요청 처리
        {
          studyId: 1,
          uesrId: '10669baa-7476-4f40-8bbf-37ba8765de74',
          status: 'wating',
        },
      ]);
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };

  return (
    <>
      {children}
      {
        <div className="fixed bottom-0 mx-auto h-[#104px] w-full max-w-[375px] items-center justify-center px-4">
          <div className="flex w-full items-center justify-center gap-5 bg-white py-4 text-[14px]">
            <div>
              <p>참여가능인원</p>
              <p>0명/4명</p>
            </div>
            {/* TODO
           스터디장 => 요청확인
           */}
            {/* <button type="button">아직 대기 인원이 없습니다</button> */}
            <div className="flex w-full items-center justify-center">
              {isLeader && !displayRequest && (
                <Link href={`${params.studyId}/studyrequest`}>
                  <Button
                    primary
                    label="대기 중인 요청 확인"
                    size="large"
                  ></Button>
                </Link>
              )}
              {isLeader && displayRequest && (
                <Link href={`${params.studyId}/studyrequest`}>
                  <Button primary label={'전체 수락'} size="large"></Button>
                </Link>
              )}
              {/* TODO: 스터디원 => 요청(상태)*/}

              {!isLeader && (
                <Button
                  primary
                  label="참가 요청"
                  onClick={() => postApply()}
                ></Button>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
}

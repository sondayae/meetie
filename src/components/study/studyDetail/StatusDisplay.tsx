'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/common/Button';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/hooks';

export default function StatusDisplay({
  isRecruiting,
  isApply,
  params,
  isAuthor,
  children,
  acceptedStudy,
  userId,
  recruitNum,
}: {
  isApply: boolean;
  isRecruiting: string | undefined;
  params: string | undefined;
  isAuthor: boolean;
  children: React.ReactNode;
  acceptedStudy: number;
  recruitNum: number;
  userId: string;
}) {
  // 스터티 멤버 정보 가져오기
  // const memberData = await getStudyMember(params.studyId);
  // console.log(`memberData: ${memberData.length}`);

  const path = usePathname();
  console.log(path.split('/')[3]);
  const postApply = async () => {
    try {
      const { data, error } = await supabase
        .from('study_apply')
        .select('*')
        .eq('studyId', params)
        .eq('userId', userId);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        useModal({ title: '이미', onConfirm: () => {}, onCancel: () => {} });

        alert('이미 신청한 상태입니다.');
        return;
      }

      const { data: data2, error: error2 } = await supabase
        .from('study_apply')
        .insert([
          {
            studyId: params,
            userId: userId,
            status: 'waiting',
          },
        ]);

      if (error2) {
        throw error2;
      }

      console.log(data2);
      alert('신청이 완료되었습니다.');
    } catch (error) {
      console.log(error);
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };
  console.log(`recruitNum: ${recruitNum}`);
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="fixed bottom-0 mx-auto w-full bg-white pt-8">
          <div className="flex w-full items-center justify-center">
            {isRecruiting && (
              <div className="flex h-[#104px] items-center justify-center gap-5 bg-white px-8 py-8">
                <div className="flex w-20 flex-col items-center justify-center">
                  <p className="w-20 text-sm leading-tight">참여가능인원</p>
                  <p className="text-bold flex items-center justify-center text-[18px]">
                    <span
                      className={`${acceptedStudy === 0 ? 'text-middle-gray' : 'text-primary'}`}
                    >
                      {acceptedStudy}명
                    </span>
                    <span className="text-text-primary"> / {recruitNum}명</span>
                  </p>
                </div>

                <div className="flex w-full items-center justify-center">
                  {/* isAuthor */}
                  {isAuthor && (
                    <Link href={`${params}/studyrequest`}>
                      <Button
                        type="primary"
                        label={
                          path.split('/')[3] === 'studyrequest'
                            ? '전체수락'
                            : '대기 중인 요청 확인'
                        }
                        // size="large"
                        onClick={() => {}}
                      />
                    </Link>
                  )}
                  {!isAuthor && (
                    <Button
                      type={isApply ? 'disabled' : 'primary'}
                      label={isApply ? '신청완료' : '신청하기'}
                      onClick={postApply}
                    />
                  )}
                  {children}
                </div>
              </div>
            )}

            {!isRecruiting && (
              // <Link href={`/studyRoom/${params.studyId}/schedule`}>
              <div className="flex w-full min-w-[600px] items-center justify-center py-8">
                <div className="text-text-primary border-disabled bg-disabled flex w-full max-w-[343px] items-center justify-center rounded-lg border-2 p-4">
                  <p>모집이 마감되었습니다.</p>
                </div>
              </div>
              // </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

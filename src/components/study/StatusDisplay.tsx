'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/common/Button';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { getStudyMember } from '@/actions/studymember.action';

export default function StatusDisplay({
  isRecruit,
  params,
  isAuthor,
  children,
  acceptedStudy,
  userId,
  recruitNum,
}: {
  isRecruit: string | undefined;
  params: string | undefined;
  isAuthor: boolean;
  children: React.ReactNode;
  acceptedStudy: number;
  recruitNum: number;
  userId: string;
}) {
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
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };
  return (
    <>
      <div className="flex h-[#104px] w-full max-w-[600px] items-center justify-center gap-5 bg-white px-8">
        <div className="flex w-full flex-col items-center">
          <p className="text-[14px]">참여가능인원</p>
          <p className="text-bold text-[18px]">
            <span
              className={`${acceptedStudy === 0 ? 'text-middle-gray' : 'text-main-purple'}`}
            >
              {acceptedStudy}명
            </span>
            <span className="text-dark-gray"> / {recruitNum}명</span>
          </p>
        </div>

        <div className="flex w-full items-center justify-center">
          {/* isAuthor */}
          {isAuthor && (
            <Link href={`${params}/studyrequest`}>
              <Button
                type="primary"
                label="대기 중인 요청 확인"
                // size="large"
                onClick={() => {}}
              />
            </Link>
          )}
          {!isAuthor && (
            <Button
              type="primary"
              label="신청하기"
              // size="large"
              onClick={postApply}
            />
          )}
          {children}
        </div>
      </div>
    </>
  );
}

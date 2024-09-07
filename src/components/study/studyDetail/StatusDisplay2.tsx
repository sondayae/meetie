'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/common/Button';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/hooks';

export default function StatusDisplay({
  isRecruiting,
  params,
  children,
  acceptedStudy,
  userId,
  recruitNum,
}: {
  isRecruiting: string | undefined;
  params: { studyId: string };
  children: React.ReactNode;
  acceptedStudy: number;
  recruitNum: number;
  userId: string;
}) {

  const path = usePathname();
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

      alert('신청이 완료되었습니다.');
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };
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
                  {acceptedStudy > recruitNum && (
                    <Button
                      type="primary"
                      label={'스터디룸 생성'}
                      onClick={() => {}}
                    />
                  )}
                  {acceptedStudy < recruitNum && (
                    <Button
                      type="primary"
                      label={'전체수락'}
                      onClick={() => {}}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

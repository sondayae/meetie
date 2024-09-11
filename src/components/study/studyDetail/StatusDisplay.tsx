'use client';
import Link from 'next/link';
import Button from '@/components/common/Button';
import supabase from '@/utils/supabase/client';
import { useState } from 'react';

export default function StatusDisplay({
  isRecruiting,
  isApply,
  params,
  isAuthor,
  acceptedStudy,
  userId,
  recruitNum,
}: {
  isApply: boolean;
  isRecruiting: string | undefined;
  params: string | undefined;
  isAuthor: boolean;
  acceptedStudy: number;
  recruitNum: number;
  userId: string;
}) {
  // 스터티 멤버 정보 가져오기
  // const memberData = await getStudyMember(params.studyId);
  const [btnisApply, setbtnisApply] = useState(isApply);

  const postApply = async () => {
    try {
      const { data, error } = await supabase
        .from('study_apply')
        .select('*')
        .eq('studyId', params)
        .eq('userId', userId);

      setbtnisApply(true);
      if (error) {
        throw error;
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
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };
  const deleteApply = async () => {
    try {
      const { data, error } = await supabase
        .from('study_apply')
        .delete()
        .eq('studyId', params)
        .eq('userId', userId);

      if (error) {
        throw error;
      }

      setbtnisApply(false);
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };

  console.log(`isApply: ${isApply}`);
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
                  {isAuthor && (
                    <Link href={`${params}/studyrequest`}>
                      <Button
                        type="primary"
                        label="대기 중인 요청 확인"
                        onClick={() => {}}
                      />
                    </Link>
                  )}
                  {!isAuthor && (
                    <Button
                      type={btnisApply ? 'disabled' : 'primary'}
                      size="large"
                      label={!btnisApply ? '신청하기' : '신청취소'}
                      onClick={!btnisApply ? postApply : deleteApply}
                    />
                  )}
                </div>
              </div>
            )}

            {!isRecruiting && (
              <>
                <Button
                  type="disabled"
                  buttonType="submit"
                  label="모집이 마감되었습니다."
                ></Button>

                {/* <div className="flex w-full min-w-[600px] items-center justify-center py-8">
                  <div className="text-text-primary flex w-full max-w-[343px] items-center justify-center rounded-lg border-2 border-disabled bg-disabled p-4">
                    <p>모집이 마감되었습니다.</p>
                  </div>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

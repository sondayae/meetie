'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/common/Button';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function StatusDisplay({
  params,
  isAuthor,
  children,
  acceptedApplications,
  userId
}: {
  params: string;
  isAuthor: boolean;
  children: React.ReactNode;
  acceptedApplications: number;
  userId: string;
}) {
  const [accessNum, setAccessNum] = useState<number>(0);
  const path = usePathname();
  const displayRequest = path.endsWith('studyrequest');

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await fetch(
        new URL(`/api/study/${params}/studyrequest`, baseUrl).toString(),
      );

      const data = await response.json();
      console.log(data);
      setAccessNum(data.participants.length || 0);
    };

    fetchData();
  }, [params]);

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

  return (
    <div className="fixed bottom-0 h-[#104px] w-full max-w-[600px] items-center justify-center px-8">
      <div className="flex items-center justify-center gap-5 bg-white py-4 text-[14px]">
        <div className="flex w-full flex-col items-center">
          <p className="text-[14px]">참여가능인원</p>
          <p className="text-bold text-[18px]">
            <span
              className={`${acceptedApplications === 0 ? 'text-middle-gray' : 'text-main-purple'}`}
            >
              {acceptedApplications}명
            </span>
            <span className="text-dark-gray"> / 4명</span>
          </p>
        </div>

        <div className="flex w-full items-center justify-center">
          {isAuthor && (
            <Link href={`${params}/studyrequest`}>
              <Button
                type="primary"
                label="대기 중인 요청 확인"
                size="large"
                onClick={() => {}}
              />
            </Link>
          )}
          {!isAuthor && (
            <Button
              type="primary"
              label="신청하기"
              size="large"
              onClick={postApply}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

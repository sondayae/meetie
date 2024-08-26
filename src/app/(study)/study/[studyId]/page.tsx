'use client';
import Link from 'next/link';
// import { Button } from '@/stories/Button';
import { useParams } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import { getStudy } from './studyAction';
import { useEffect, useState } from 'react';
import { Study } from '@/types/study';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

function StudyDetailPage() {
  const params = useParams();
  const { studyId } = params;

  const [currentStudy, setCurrentStudy] = useState<Study | null>(null);

  useEffect(() => {
    fetchStudy();
  }, [studyId]);

  const fetchStudy = async () => {
    const { data } = await getStudy(studyId);

    console.log('data', data);
    setCurrentStudy(data);
  };
  console.log(currentStudy);

  return (
    <div className="relative">
      <div className="flex flex-col gap-8 p-4" key={currentStudy?.title}>
        <header className="flex flex-col gap-2 border-b-2 border-[#F2F2F2] pb-4">
          <div className="mb-2 flex w-full items-center justify-between">
            <p className="text-[24px] font-bold">{currentStudy?.title}</p>
            <span className="rounded-full border-[1px] border-[#8446FF] px-2 py-1 text-[14px] text-[#8446FF]">
              D-day
            </span>
          </div>
          <div className="mb-2">
            {/* {Array.isArray(currentStudy && currentStudy?.tags) &&
              currentStudy?.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="mr-2 rounded-lg bg-[#f5f1ff] px-2 py-2 text-[14px] text-[#434343]"
                >
                  {tag}1
                </span>
              ))} */}
          </div>
          <div className="flex items-center gap-2">
            <img
              className="h-[38px] w-[38px] rounded-full"
              src="https://th.bing.com/th/id/OIG3.6Q6JSjGGulke2mGv6MPj?pid=ImgGn"
              alt="Profile"
            />
            <div className="flex w-full flex-col text-[#555555]">
              <p className="flex text-[13px] font-semibold">Study Leader</p>
              <div className="flex w-full justify-between">
                <span className="text-[12px] text-[#82829B]">
                  작성일&nbsp;
                  {currentStudy &&
                    format(
                      new Date(currentStudy?.created_at as string),
                      'yyyy-MM-dd hh:mm:ss',
                      { locale: ko },
                    )}
                  &nbsp;|&nbsp;
                  {/* {/* {currentStudy?.leader.creation_time} | 조회수{' '} */}
                  {Number(currentStudy?.viewCount)}
                </span>
                <span className="items-end text-[11px] text-[#908794]">
                  VIEW {Number(currentStudy?.viewCount)}
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="font-semibold">스터디 주제</p>
            <p className="text-[15px]">{currentStudy?.topic}</p>
          </div>
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="font-semibold">스터디 목표</p>
            <p className="text-[15px]">{currentStudy?.goal}</p>
          </div>
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="font-semibold">스터디 소개</p>
            <p className="whitespace-pre-wrap text-[15px]">
              {currentStudy?.info}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="font-semibold">스터디 인원</p>
            <p className="text-[15px]">
              {currentStudy?.recruitNum}
              {/* {currentStudy?.available_slots} slots available */}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="font-semibold">스터디 기간</p>
            <p className="text-[15px]">
              {currentStudy &&
                format(
                  new Date(`${currentStudy?.startDate}`),
                  'yyyy-MM-dd',
                )}{' '}
              -
              {currentStudy &&
                format(new Date(`${currentStudy?.endDate}`), 'yyyy-MM-dd')}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudyDetailPage;

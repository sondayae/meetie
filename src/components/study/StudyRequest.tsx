'use client';
import { useEffect, useState } from 'react';
import StudyRequestItem from '@/components/study/StudyRequestItem';
import Button from '../common/Button';
import Link from 'next/link';
import { format } from 'date-fns';

export interface StudyRequestItem {
  id: string;
  created_at: string;
  status: string;
}

interface PageProps {
  memberData: any;
  params: {
    studyId: string;
  };
  acceptedStudy: number;
  recruitNum: number;
  applyData: StudyRequestItem[];
}

export default function Page({
  memberData,
  applyData,
  params,
  acceptedStudy,
  recruitNum,
}: PageProps) {
  // const [data, setData] = useState<StudyRequestItem[]>([]);
  const [groupedData, setGroupedData] = useState<
    Record<string, StudyRequestItem[]>
  >({});
  const [acceptedReqStudy, setacceptedReqStudy] = useState(acceptedStudy);

  useEffect(() => {
    const fetchData = async () => {
      // setData(applyData);
      setGroupedData(groupByDate(applyData)); // 데이터를 시간별로 그룹핑
    };

    fetchData();

    console.log(acceptedReqStudy);
  }, [params.studyId]);

  return (
    <div className="relative flex h-full min-h-dvh flex-col">
      {/* <section className="flex flex-col justify-center border-b-2 border-[#F1F2F6] px-4 pb-[14px] pt-6"></section> */}
      <div className="flex h-full flex-col px-4 py-7">
        {Object.keys(groupedData).length > 0 && (
          <>
            {Object.entries(groupedData).map(([date, items]) => (
              <div key={date} className="flex flex-col gap-[18px]">
                <div className="text-sm font-medium text-[#434343]">
                  {format(date, 'yyyy년 MM월 dd일')}
                </div>
                <ul className="mb-4 flex flex-col gap-4">
                  {items.map((item: any) => (
                    <StudyRequestItem
                      setacceptedReqStudy={setacceptedReqStudy}
                      params={params.studyId}
                      key={item.id}
                      item={item}
                      acceptedStudy={acceptedStudy}
                      recruitNum={recruitNum}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="sticky bottom-0 flex min-h-[104px] max-w-[600px] justify-between border-t-[1px] border-[#DDDDDD] bg-white p-2 px-4 py-7">
        {/* 신청마감 */}
        {/* {!isRecruiting && (
          <Button type="disabled" label="모집이 마감되었습니다."></Button>
        )} */}
        {/* 신청중 => 로그인x */}
        {/* {isRecruiting && !userdata?.id && (
          <Link className="w-full" href={`/login`}>
            <Button type="disabled" label="로그인 후 신청하기" />
          </Link>
        )} */}
        {/* 신청여부확인 => 로그인O */}
        {/* {isRecruiting && userdata?.id && ( */}
        <div className="flex w-full gap-[19px]">
          <div className="flex w-[74px] flex-col items-center">
            <div className="w-[74px] text-sm font-medium text-[#81819b]">
              수락가능인원
            </div>
            <div>
              <span className="text-lg font-medium leading-normal text-[#6224fd]">
              {memberData?.length || 0}
              </span>
              <span className="text-lg font-medium leading-normal text-[#9d9d9d]">
                {' '}
                /{' '}
              </span>

              <span className="text-lg font-medium leading-normal text-[#6f6f6f]">
                {recruitNum}명
              </span>
            </div>
          </div>
          {/* 신청여부확인 => 로그인O => 작성자*/}
          {/* {isAuthor && ( */}
          <Link
            className="w-full"
            href={`/study/${params.studyId}/studyrequest`}
          >
            <Button type="primary" label="전체 수락" onClick={() => {}} />
          </Link>
          {/* )} */}
          {/* {!isAuthor && ( */}
          {/* <Button
                type={btnisApply ? 'disabled' : 'primary'}
                size="large"
                label={!btnisApply ? '신청하기' : '신청취소'}
                onClick={async () => {
                  if (!btnisApply) {
                    await handleApply(true);
                  } else {
                    await handleApply(false);
                  }
                }}
              /> */}
          {/* )} */}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

// 시간별 데이터를 그룹핑
const groupByDate = (data: any[]) => {
  return data.reduce(
    (acc, item) => {
      // 대기중만 표시 => 취소
      // if (item.status === 'waiting') {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(item);
      // }
      return acc;
    },
    {} as Record<string, any[]>,
  );
};

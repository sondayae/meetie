'use client';
import { useState } from 'react';
import StudyRequestItem from '@/components/study/StudyRequestItem';
import Button from '../common/Button';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  getStudyApply,
  updateStudyApplyStatus,
  allUpdateStudyApplyStatus,
} from '@/actions/studyrequest.action';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { useRouter } from 'next/navigation';
import { createStudyRoom } from '@/actions/studyroom.action';

export interface StudyRequestItem {
  id: number;
  created_at: string;
  status: string;
  studyId: number;
  user: {
    id: `${string}-${string}-${string}-${string}-${string}`;
    name: string;
    job: string;
    introduce?: string;
    personality?: string[];
    images: {
      url: string;
    };
  };
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
  applyData,
  params,
  acceptedStudy,
  recruitNum,
}: PageProps) {
  //
  //
  //
  const applyDatas = useQuery({
    queryKey: ['studyApply', params.studyId],
    queryFn: () => getStudyApply(params.studyId),
  });

  const waiting = applyDatas.data
    ?.filter((item) => item.status === 'waiting')
    .map((item) => item.user.id);
  console.log(`waiting 유저수: ${waiting?.length}`);
  console.log(waiting);

  const modallacceptedMutation = useMutation({
    mutationFn: async () => {
      return allUpdateStudyApplyStatus(
        params.studyId,
        waiting ?? [],
        'accepted',
      );
    },

    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries({ queryKey: ['studyApply'] });
    },
    onError: (error) => {
      alert(`error: ${error}`);
    },
  });

  const waitingNum = waiting?.length;
  const router = useRouter();

  const acceptedNum = applyDatas.data?.filter(
    (item) => item.status === 'accepted',
  ).length;
  console.log(`승인된 유저: ${acceptedNum}`);

  const count = recruitNum - (acceptedNum ?? 0);
  console.log(`남은 허용된 유저 수: ${count}`);

  // 남은유저보사 대기중인 유저수가 더 많으면 초과
  const isOver = count < (waitingNum ?? 0);

  const groupedDatas: Record<string, StudyRequestItem[]> = applyData
    ? groupByDate(applyData)
    : {};

  const [acceptedReqStudy, setacceptedReqStudy] = useState(acceptedStudy);

  // 신청한 유저 아이디
  // const alluser = applyData.map((item) => item.user.id);
  // console.log(alluser);

  const modall = async (studyid: string, userid: string[]) => {
    if (isOver) {
      alert(`인원이 초과되었습니다.
수락가능인원: ${count} 대기중인인원: ${waitingNum ?? 0}`);
    } else {
      // alert('전체수락 가능');
      modallacceptedMutation.mutate();
    }
    if (count === 0 && waitingNum === 0) {
      router.push(`/study/${params.studyId}/studyover`);
    }
  };

  const modApply = async (
    studyId: number,
    userId: `${string}-${string}-${string}-${string}-${string}`,
    status: string,
  ) => {
    try {
      await updateStudyApplyStatus(params.studyId, userId, status);
      if (status === 'accepted') {
        setacceptedReqStudy((prev) => prev + 1);
      }
      queryClient.invalidateQueries({ queryKey: ['studyApply'] });
    } catch (error) {
      console.error('Error updating study apply status:', error);
    }

    console.log(count);
    if (count <= 1) {
      createStudyRoom(params.studyId);
      router.push(`/study/${params.studyId}/studyover`);
    }
  };

  return (
    <>
      {count === recruitNum && waitingNum === 0 && (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="text-lg font-medium text-[#434343]">
              대기중인 요청이 없습니다.
            </div>
          </div>
        </div>
      )}

      <div className="flex h-full min-h-dvh flex-col">
        {/* <section className="flex flex-col justify-center border-b-2 border-[#F1F2F6] px-4 pb-[14px] pt-6"></section> */}
        <div className="flex h-full flex-col px-4 py-7">
          {Object.keys(groupedDatas).length > 0 && (
            <>
              {Object.entries(groupedDatas).map(([date, items]) => (
                <div key={date} className="flex flex-col gap-[18px]">
                  <div className="text-sm font-medium text-[#434343]">
                    {format(date, 'yyyy년 MM월 dd일')}
                  </div>
                  <ul className="mb-4 flex flex-col gap-4">
                    {items.map((item: StudyRequestItem) => (
                      <StudyRequestItem
                        setacceptedReqStudy={setacceptedReqStudy}
                        params={params.studyId}
                        key={item.id}
                        item={item}
                        acceptedStudy={acceptedStudy}
                        recruitNum={recruitNum}
                        modApply={modApply}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="sticky bottom-16 flex min-h-[104px] max-w-[600px] justify-between border-t-[1px] border-[#DDDDDD] bg-white p-2 px-4 py-7">
        <div className="flex w-full gap-[19px]">
          <div className="flex w-[74px] flex-col items-center">
            <div className="w-[74px] text-sm font-medium text-[#81819b]">
              수락가능인원
            </div>
            <div>
              <span className="text-lg font-medium leading-normal text-[#6224fd]">
                {count}
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

          <Link
            className="w-full"
            href={`/study/${params.studyId}/studyrequest`}
          >
            <Button
              type="primary"
              label="전체 수락"
              onClick={() => modall(params.studyId, waiting ?? [])}
            />
          </Link>
        </div>
      </div>
    </>
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

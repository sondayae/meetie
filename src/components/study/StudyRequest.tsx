'use client';
import { useEffect, useState } from 'react';
import StudyRequestItem from '@/components/study/StudyRequestItem';
import Button from '../common/Button';
import Link from 'next/link';
import { format, set } from 'date-fns';
import {
  getStudyApply,
  updateStudyApplyStatus,
  allUpdateStudyApplyStatus,
} from '@/actions/studyrequest.action';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { useRouter } from 'next/navigation';
import { createStudyRoom } from '@/actions/studyroom.action';

export default function StudyRequest({
  params,
  acceptedStudy,
  recruitNum,
}: PageProps) {
  const [groupedDatas, getGroupedDatas] = useState({});

  const router = useRouter();

  const applyData = useQuery({
    queryKey: ['studyApply', params.studyId],
    queryFn: () => getStudyApply(params.studyId),
  });

  const waiting = applyData.data
    ?.filter((item) => item.status === 'waiting')
    .map((item) => item.user.id);

  const modallacceptedMutation = useMutation({
    mutationFn: async () => {
      const result = await allUpdateStudyApplyStatus(
        params.studyId,
        waiting ?? [],
        'accepted',
      );
      return result;
    },
    onSuccess: () => {
      applyData.refetch();
      queryClient.invalidateQueries({ queryKey: ['studyApply'] });
    },
    onError: (error) => {
      alert(`Error: ${error}`);
    },
  });

  const acceptedNum = applyData.data?.filter(
    (item) => item.status === 'accepted',
  ).length;

  const count = recruitNum - (acceptedNum ?? 0);

  // 남은유저보사 대기중인 유저수가 더 많으면 초과
  const waitingNum = waiting?.length;
  const isOver = count < (waitingNum ?? 0);

  // 전체수락
  const modall = async (studyid: string, userid: string[]) => {
    if (isOver) {
      alert(
        `인원이 초과되었습니다.\n수락가능인원: ${count} 대기중인인원: ${waitingNum ?? 0}`,
      );
    } else {
      try {
        await modallacceptedMutation.mutateAsync();
        applyData.refetch();
        if (count < 1 && (waitingNum ?? 0) < 1) {
          router.push(`/study/${params.studyId}/studyover`);
        }
      } catch (error) {
        console.error('Error accepting all:', error);
      }
    }
  };

  const modApply = async (
    studyId: number,
    userId: `${string}-${string}-${string}-${string}-${string}`,
    status: string,
  ) => {
    try {
      await updateStudyApplyStatus(params.studyId, userId, status);
      queryClient.invalidateQueries({ queryKey: ['studyApply'] });
    } catch (error) {
      console.error('Error updating study apply status:', error);
    }

    if (count <= 1) {
      createStudyRoom(params.studyId);
      router.push(`/study/${params.studyId}/studyover`);
    }
  };

  const handleCreateStudyRoom = async () => {
    createStudyRoom(params.studyId);
    router.push(`/study/${params.studyId}/studyover`);
  };

  useEffect(() => {
    if (applyData.data) {
      const groupdata = groupByDate(applyData.data);
      getGroupedDatas(groupdata);
    }
  }, [applyData.data]);

  return (
    <>
      <div className="flex h-full min-h-dvh flex-col">
        {/* <section className="flex flex-col justify-center border-b-2 border-[#F1F2F6] px-4 pb-[14px] pt-6"></section> */}
        <div className="flex h-full flex-col px-4 py-7">
          {applyData.data?.length === 0 && (
            <>
              <div className="flex justify-center">대기중인 요청이 없어요.</div>
            </>
          )}
          {Object.keys(groupedDatas).length > 0 && (
            <>
              {Object.entries(groupedDatas).map(([date, items]) => (
                <div key={date} className="flex flex-col gap-[18px]">
                  <div className="text-sm font-medium text-[#434343]">
                    {format(new Date(date), 'yyyy년 MM월 dd일')}
                  </div>
                  <ul className="mb-4 flex flex-col gap-4">
                    {(items as StudyRequestItem[]).map(
                      (item: StudyRequestItem) => (
                        <StudyRequestItem
                          params={params.studyId}
                          key={item.id}
                          item={item}
                          acceptedStudy={acceptedStudy}
                          recruitNum={recruitNum}
                          modApply={modApply}
                        />
                      ),
                    )}
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
                {count}명
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
            {count !== 0 && (
              <Button
                type="primary"
                label="전체 수락"
                onClick={() => modall(params.studyId, waiting ?? [])}
              />
            )}
            {count === 0 && (
              <Button
                type="primary"
                label="스터디룸 생성"
                onClick={() => handleCreateStudyRoom()}
              />
            )}
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
    introduction: string;
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

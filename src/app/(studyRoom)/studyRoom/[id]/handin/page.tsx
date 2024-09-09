'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import Navigator from '@/components/common/Navigator';
import NoticeBox from '@/components/common/NoticeBox';
import Handin from '@/components/handin/Handin';
import Header from '@/components/handin/Header';
import EventCalendarIcon from '@/components/icons/EventCalendarIcon';
import SelectBox from '@/components/studyRoom/SelectBox';
import useBottomSheet from '@/hooks/use-bottomsheet';
import NewCheckSignIcon from '@/components/icons/NewCheckSignIcon';
import StudyAvatar from '@/components/common/StudyAvatar';
import TabMenu from '@/components/studyRoom/TabMenu';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getFeedbacks } from '@/actions/studyroom/handinActions';
import { SkeletonFeedback } from '@/components/handin/SkeletonFeedback';
import Button from '@/components/common/Button';
import { PlusCircle, PlusCircleIcon } from 'lucide-react';
import Plus from '@/components/icons/Header/Plus';

export default function Page({ params }: { params: { id: string } }) {
  const studyId = params.id;
  const { BottomSheet, open, close } = useBottomSheet();

  const getFeedbackList = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const data = await getFeedbacks(studyId);
      const feedbacks = data.map((item: any) => {
        item.commentCount = item.comments[0].count ? item.comments[0].count : 0;
        item.emojiCount = item.feedback_reactions[0].count ? item.feedback_reactions[0].count : 0;
        return item;
      });
      console.log(feedbacks);
      
      return feedbacks;
    }
  });

  // 가입된 스터디룸 정보 가져오기
  // const handleChangeStudyroom = (study: string) => {
  //   setSelectedStudy(study);
  //   console.log('링크 이동');
  //   close();
  // }

  return (
    <>
      {/* 헤더 영역 */}
      <div onClick={() => close()}>
        <BottomSheet>
          <div>스터디 리스트</div>
        </BottomSheet>
      </div>
      <div className='bg-[#E3E3FA] p-4'>
          <Header
            label="스터디룸"
            rightIcon={<Plus />}
            useBorderBottom={false}
          />
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex items-center justify-end text-xs">
              <span className="rounded-l-lg border border-transparent bg-primary px-2 py-1 text-white">
                진행중 3
              </span>
              <span className="rounded-r-lg border border-primary bg-white px-2 py-1 text-muted-foreground">
                진행완료
              </span>
            </div>
            <SelectBox selected={''} handleClick={() => open()} />
          </div>
      </div>
      <TabMenu />
      {/* 콘텐츠 영역 */}
      <div className="bg-[#FAFAFA] flex-1 overflow-scroll">
        <div className="border-b-2 px-4 py-7">
          <div className="mb-[20px] flex flex-col gap-1">
            <h1 className="text-lg font-bold">📚 과제 일정</h1>
            <p className="text-sm text-muted-foreground">
              주차별 과제 현황을 확인하고 소통해요.
            </p>
          </div>
          <NoticeBox />
        </div>
        <div className="p-4">
          <div className="mb-6 flex justify-between">
            <span className="font-semibold">6월</span>
            <span>
              <EventCalendarIcon />
            </span>
          </div>
        </div>
        <div className="rounded-t-xl bg-white drop-shadow-md">
          <div className="flex flex-col gap-1 border-b p-8">
            <h1 className="text-lg font-semibold">✏️ 6월 4일 화요일</h1>
            <p className="text-sm text-muted-foreground">
              과제를 인증한 팀원들을 확인해 보세요.
            </p>
          </div>
          <div>
            {getFeedbackList.data?.map((feedback: any) => (
              <Handin 
                key={feedback.id}
                data={feedback}
              />
            ))}
            {getFeedbackList.isPending &&
            <div>
              <SkeletonFeedback />
              <SkeletonFeedback />
            </div>
            }
          </div>
          <div className='bg-white p-8'>
            <button className='flex justify-center gap-2 w-full px-4 py-3.5 border-2 border-border border-dotted rounded-lg text-muted-foreground'>
              <PlusCircleIcon />
              과제 인증하기
            </button>
          </div>
        </div>
      </div>
      <Navigator />
    </>
  );
}

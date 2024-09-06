'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import CheckList from '@/components/common/CheckList';
import Navigator from '@/components/common/Navigator';
import NoticeBox from '@/components/common/NoticeBox';
import Handin from '@/components/handin/Handin';
import Header from '@/components/handin/Header';
import EventCalendarIcon from '@/components/icons/EventCalendarIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import SelectBox from '@/components/studyRoom/SelectBox';
import useBottomSheet from '@/hooks/use-bottomsheet';
import {
  getHandinList,
  getJoinedStudyRoom,
  getJoinedStudyRoomList,
} from '@/lib/actions/handin';
import NewCheckSignIcon from '@/components/icons/NewCheckSignIcon';
import StudyAvatar from '@/components/common/StudyAvatar';

export default function Page({ params }: { params: { id: string } }) {
  const studyId = params.id;
  const [handinList, setHandinList] = useState<any>();
  const [selectedStudy, setSelectedStudy] = useState<any>();
  const [joinedStudyList, setJoinedStudyList] = useState<any>();
  const { BottomSheet, open, close } = useBottomSheet();

  const fetchData = async () => {
    // const { data: studyRoomList } = await getJoinedStudyRoomList();
    const studyRoomList = [
      { id: 1, title: '스터디 1' },
      { id: 2, title: '스터디 2' },
      { id: 3, title: '스터디 3' },
    ];
    const { data: nowStudyRoomData } = await getJoinedStudyRoom(studyId);
    const { data } = await getHandinList(studyId);
    setJoinedStudyList(studyRoomList);
    setSelectedStudy(nowStudyRoomData);
    setHandinList(data);
  };

  const handleChangeStudyroom = (study) => {
    setSelectedStudy(study);
    console.log('링크 이동');
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BottomSheet>
        {joinedStudyList &&
        <>
        <div className='flex justify-center mb-8 font-medium text-lg gap-1'>
          <h1>진행 중인 스터디</h1>
          <span className='text-[#697DD4]'>{joinedStudyList.length}</span>
        </div>
        <div className='rounded-lg border [&>*:first-child]:border-none'>
          {joinedStudyList.map(study => (
            <div key={study.id} className='flex items-center px-3 py-2 gap-3 border-t' onClick={() => handleChangeStudyroom(study)}>
                <StudyAvatar />
                <div className='flex flex-col flex-grow'>
                  <span className="font-semibold">{study.title}</span>
                  <span>14일차 과제</span>
                </div>
                { selectedStudy.id === study.id && <NewCheckSignIcon circleClassName='fill-white stroke-main-purple' checkClassName='fill-main-purple'/> }
            </div>
          ))}
        </div>
        </>
        }
      </BottomSheet>
      <div className="bg-[#E3E3FA]">
        <div className="flex flex-col gap-5">
          <Header
            label="스터디룸"
            rightIcon={<PlusIcon className="fill-black" />}
          />
          <div className="flex items-center justify-end text-xs">
            <span className="rounded-l-lg border border-transparent bg-main-purple px-2 py-1 text-white">
              진행중 3
            </span>
            <span className="rounded-r-lg border border-main-purple bg-white px-2 py-1 text-gray-purple">
              진행완료
            </span>
          </div>
          <SelectBox selected={selectedStudy} handleClick={() => open()}/>
        </div>
      </div>
      <div className="bg-[#FAFAFA]">
        <div className="border-b-2 px-4 py-7">
          <div className="mb-[20px] flex flex-col gap-1">
            <h1 className="text-lg font-bold">📚 과제 일정</h1>
            <p className="text-sm text-gray-purple">
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
          <div className="flex justify-between gap-3 text-xs">
            <div className="flex flex-col items-center gap-2">
              <span>월</span>
              <span className="inline-block aspect-square rounded-full border border-main-purple bg-main-purple p-3 text-center font-bold text-white opacity-20">
                3
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span>화</span>
              <span className="inline-block aspect-square rounded-full border border-[#EAEAEA] bg-[#F4F4F4] p-3 text-center font-bold">
                4
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span>수</span>
              <span className="inline-block aspect-square rounded-full border border-[#EAEAEA] bg-[#F4F4F4] p-3 text-center font-bold">
                5
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span>목</span>
              <span className="inline-block aspect-square rounded-full border border-[#EAEAEA] bg-[#F4F4F4] p-3 text-center font-bold">
                6
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span>금</span>
              <span className="inline-block aspect-square rounded-full border border-[#EAEAEA] bg-[#F4F4F4] p-3 text-center font-bold">
                7
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span>토</span>
              <span className="inline-block aspect-square rounded-full border border-[#EAEAEA] bg-[#F4F4F4] p-3 text-center font-bold">
                8
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span>일</span>
              <span className="inline-block aspect-square rounded-full border border-[#EAEAEA] bg-[#F4F4F4] p-3 text-center font-bold">
                9
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-t-xl bg-white drop-shadow-md">
          <div className="flex flex-col gap-1 border-b p-8">
            <h1 className="text-lg font-semibold">✏️ 6월 4일 화요일</h1>
            <p className="text-sm text-gray-purple">
              과제를 인증한 팀원들을 확인해 보세요.
            </p>
          </div>
          <div>
            {handinList ? (
              handinList.map((handin: any) => {
                return (
                  <Link key={handin.id} href={`./handin/${handin.id}`}>
                    <Handin
                      key={handin.id}
                      user={handin.user}
                      handin={handin}
                      commentsCount={handin.comments[0].count}
                    />
                  </Link>
                );
              })
            ) : (
              <span>로딩</span>
            )}
          </div>
        </div>
        <div className="sticky bottom-0">
          <Navigator />
        </div>
      </div>
    </>
  );
}

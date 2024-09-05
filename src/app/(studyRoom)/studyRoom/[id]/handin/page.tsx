'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import NoticeBox from '@/components/common/NoticeBox';
import Handin from '@/components/handin/Handin';
import EventCalendarIcon from '@/components/icons/EventCalendarIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import SelectBox from '@/components/studyRoom/SelectBox';
import { getHandinList } from '@/lib/actions/handin';

export default function Page({ params }: { params: { id: string } }) {
  const studyRoomId = params.id;

  const [handinList, setHandinList] = useState<any>();
  // const [studyRoomList, setStudyRoomList] = useState<[]>();
  // const [studyRoom, setStudyRoom] = useState();

  const fetchData = async () => {
    const { data } = await getHandinList(studyRoomId);
    setHandinList(data);

    // const tempStudyRoomList: any = [
    //   { id: '1', title: '스터디룸 1', subtitle: '디자인 | 멤버 5' },
    //   { id: '2', title: '스터디룸 2', subtitle: '개발 | 멤버 5' },
    // ];
    // setStudyRoomList(tempStudyRoomList);
    // setStudyRoom(tempStudyRoomList[0]);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-[#E3E3FA] px-4 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">스터디룸</h1>
            <PlusIcon className="fill-black" />
          </div>
          <div className="flex items-center justify-end text-xs">
            <span className="rounded-l-lg border border-transparent bg-main-purple px-2 py-1 text-white">
              진행중 3
            </span>
            <span className="rounded-r-lg border border-main-purple bg-white px-2 py-1 text-gray-purple">
              진행완료
            </span>
          </div>
          <SelectBox
            selected={{ title: '피그마 정복하기', subtitle: '디자인 | 멤버 5' }}
            setShowModal={() => {}}
          />
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
              handinList.map((handin) => {
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
      </div>
    </>
  );
}

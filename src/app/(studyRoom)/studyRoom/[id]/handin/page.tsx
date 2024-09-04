'use client';
import { useState, useEffect } from 'react';
import HandinList from '@/components/handin/HandinList';
import MainLayout from '@/components/studyRoom/MainLayout';
import { getHandinList } from '@/lib/actions/handin';
import MegaphoneIcon from '@/components/icons/MegaphoneIcon';
import RightArrowIcon from '@/components/icons/RightArrowIcon';
import NoticeBox from '@/components/common/NoticeBox';
import ProfileImg from '@/components/common/ProfileImg';
import NewCheckSignIcon from '@/components/icons/NewCheckSignIcon';
import DropDownMenu from '@/components/handin/DropDownMenu';
import ImageFrame from '@/components/handin/ImageFrame';
import CommentIcon from '@/components/icons/CommentIcon';
import EmojiIcon from '@/components/icons/EmojiIcon';
import Separator from '@/components/common/Separator';
import Handin from '@/components/handin/Handin';
import EventCalendarIcon from '@/components/icons/EventCalendarIcon';
import SelectBox from '@/components/studyRoom/SelectBox';
import PlusIcon from '@/components/icons/PlusIcon';

const page = ({ params }: { params: { id: string } }) => {
  const studyRoomId = params.id;

  const [handinList, setHandinList] = useState<any[]>([]);
  const [studyRoomList, setStudyRoomList] = useState<[]>();
  const [studyRoom, setStudyRoom] = useState();

  const fetchData = async () => {
    const { data } = await getHandinList(studyRoomId);
    setHandinList(data);

    const tempStudyRoomList: any = [
      { id: '1', title: '스터디룸 1', subtitle: '디자인 | 멤버 5' },
      { id: '2', title: '스터디룸 2', subtitle: '개발 | 멤버 5' },
    ];
    setStudyRoomList(tempStudyRoomList);
    setStudyRoom(tempStudyRoomList[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className='bg-[#E3E3FA] px-4 py-5'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold text-lg'>스터디룸</h1>
          <PlusIcon className='fill-black'/>
        </div>
        <div className='flex text-xs justify-end items-center'>
          <span className='bg-main-purple text-white px-2 py-1 rounded-l-lg border border-transparent'>진행중 3</span>
          <span className='bg-white text-gray-purple px-2 py-1 border border-main-purple rounded-r-lg'>진행완료</span>
        </div>
        <SelectBox selected={{title: '피그마 정복하기', subtitle: '디자인 | 멤버 5'}} setShowModal={() => {}}/>
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
        <div className='flex justify-between mb-6'>
          <span className='font-semibold'>6월</span>
          <span><EventCalendarIcon /></span>
        </div>
        <div className='flex gap-3 text-xs justify-between'>
          <div className='flex flex-col items-center gap-2'>
            <span>월</span>
            <span className='inline-block border border-main-purple rounded-full p-3 aspect-square text-white text-center font-bold bg-main-purple opacity-20'>3</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span>화</span>
            <span className='inline-block border border-[#EAEAEA] rounded-full p-3 aspect-square text-center font-bold bg-[#F4F4F4]'>4</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span>수</span>
            <span className='inline-block border border-[#EAEAEA] rounded-full p-3 aspect-square text-center font-bold bg-[#F4F4F4]'>5</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span>목</span>
            <span className='inline-block border border-[#EAEAEA] rounded-full p-3 aspect-square text-center font-bold bg-[#F4F4F4]'>6</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span>금</span>
            <span className='inline-block border border-[#EAEAEA] rounded-full p-3 aspect-square text-center font-bold bg-[#F4F4F4]'>7</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span>토</span>
            <span className='inline-block border border-[#EAEAEA] rounded-full p-3 aspect-square text-center font-bold bg-[#F4F4F4]'>8</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span>일</span>
            <span className='inline-block border border-[#EAEAEA] rounded-full p-3 aspect-square text-center font-bold bg-[#F4F4F4]'>9</span>
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
        <Handin />
        <Handin />
      </div>
    </div>
    </>
  );
};
export default page;

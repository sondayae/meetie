'use client';
import { useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import SelectBox from './SelectBox';
import TabMenu from './TabMenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const MainLayout = () => {
  const pathname = usePathname()
  const pathID = pathname.split('/')[2];

  const menus = [
    { id: 'schedule', name: '캘린더' },
    { id: 'feedback', name: '피드백' },
    { id: 'chat', name: '채팅' },
  ];

  return (
    <div className="bg-[#E3E3FA]">
      <div className="mx-[16px] flex justify-between pb-[17px]">
        <span>스터디룸</span>
        <Link href={`/studyRoom/${pathID}/write`}>
          <PlusIcon className="h-5 w-5 fill-black stroke-black" />
        </Link>
      </div>
      <div className="mr-[16px] flex justify-end">
        <div>
          <span className="bg-sub-purple p-2">진행중 3</span>
          <span className="bg-white p-2 text-middle-gray">진행완료</span>
        </div>
      </div>
      <div className="mx-[16px] pb-[20px] pt-[12px]">
        <SelectBox />
      </div>
      <ul className="flex justify-evenly border-t-2 border-middle-gray bg-white p-[14px]">
        {menus.map((menu) => {
          return <TabMenu key={menu.id} label={menu.name}></TabMenu>;
        })}
      </ul>
    </div>
  );
};
export default MainLayout;

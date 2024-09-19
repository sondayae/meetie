'use client';

import Link from 'next/link';
import Plus from '../icons/Header/Plus';
import Header from '../handin/Header';
import SelectBox from './SelectBox';
import PlusMenu from './PlusMenu';
import TabMenu from './TabMenu';
import StudyroomDrawer from './StudyroomDrawer';
import { useJoinedStudyStore } from '@/stores/studyStore';
import { useRouter } from 'next/navigation';

export default function StudyroomHeader({studyId}: {studyId: string}) {
  const router = useRouter();
  const {joinedStudyList} = useJoinedStudyStore();
  const handleSelect = (id: string) => {
    if (id) {
      router.push(`/studyroom/${id}/feedback`);
    }
  };

  const list = joinedStudyList
  .map((item: any) => {
    const { id, title } = item;
    let subtitle = `${item.roles} | ${item.goal}`;
    return { id, title, subtitle };
  })

  const preSelected = list.filter((item: any) => item.id == studyId);


  
  
  
  
  return (
    <>
    <div className="bg-[#E3E3FA] p-4">
      <Header
          label="스터디룸"
          leftIcon={false}
          rightIcon={
            <PlusMenu />
          }
          useBorderBottom={false}
          />
        {/* <div className="mt-4 flex flex-col gap-5">
          <div className="flex items-center justify-end text-xs">
            <span className="rounded-l-lg border border-transparent bg-primary px-2 py-1 text-white">
              진행중 3
            </span>
            <span className="rounded-r-lg border border-primary bg-white px-2 py-1 text-muted-foreground">
              진행완료
            </span>
          </div>
          <SelectBox />
        </div> */}
        <div className='mt-5'>
          {list.length > 0 && preSelected.length > 0 &&
          <StudyroomDrawer list={list} preSelected={preSelected[0]} handleSelect={handleSelect} title='참여중인 스터디'/>
          }
        </div>
    </div>
    <TabMenu />
    </>
  )
}
'use client';

import { getMembers, getUser } from '@/actions/studyroom/chatActions';
import { useChatUserStore } from '@/app/stores/chatStore';
import ChatPeopleList from '@/components/chat/ChatPeopleList';
import Person from '@/components/chat/Person';
import Header from '@/components/handin/Header';
import BackArrowIcon from '@/components/icons/BackArrowIcon';
import Plus from '@/components/icons/Header/Plus';
import SelectBox from '@/components/studyRoom/SelectBox';
import TabMenu from '@/components/studyRoom/TabMenu';
import useBottomSheet from '@/hooks/use-bottomsheet';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const studyId = params.id;
  const { BottomSheet, open, close } = useBottomSheet();
  const { selectedUserId, setSelectedUserId } = useChatUserStore();


  const getMemberList = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const data = await getMembers(studyId);
      console.log(data);

      return data;
    }
  });

  const handleClick = (member: object) => {
    setSelectedUserId(member.participantId);
    router.push(`./chat/${member.id}`);
  }

  return (
    <>
    {/* 헤더 영역 */}
    <div>
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
        <div className='p-4 bg-muted'>
          {getMemberList.data?.map(member => (
              <Person key={member.id} name={member.user.name} onlinedAt={''} onClick={() => handleClick(member)} />
          ))}
        </div>
    </div>
    </>
  );
}

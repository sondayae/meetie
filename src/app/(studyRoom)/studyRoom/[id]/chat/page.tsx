'use client';

import { getMembers, getUser } from '@/actions/studyroom/chatActions';
import { useChatPresenceStore, useChatUserStore } from '@/app/stores/chatStore';
import Person from '@/components/chat/Person';
import Header from '@/components/handin/Header';
import Plus from '@/components/icons/Header/Plus';
import SelectBox from '@/components/studyRoom/SelectBox';
import TabMenu from '@/components/studyRoom/TabMenu';
import useBottomSheet from '@/hooks/use-bottomsheet';
import { useUser } from '@/stores/user/user';
import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const studyId = params.id;
  const { BottomSheet, open, close } = useBottomSheet();
  const { setSelectedUserId } = useChatUserStore();
  const { presence, setPresence } = useChatPresenceStore();

  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await getUser();
      return data;
    }
  })

  const getMemberList = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const data = await getMembers(studyId);
      return data;
    }
  });

  const handleClick = (member: object) => {
    setSelectedUserId(member.participantId);
    router.push(`./chat/${member.id}`);
  }

  useEffect(() => {
    const channel = supabase.channel("online_users", {
      config: {
        presence: {
          key: getUserQuery.data?.id,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      const newState = channel.presenceState();
      const newStateObj = JSON.parse(JSON.stringify(newState));
      setPresence(newStateObj);
    });

    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return;
      }

      const newPresenceStatus = await channel.track({
        onlinedAt: new Date().toISOString(),
      });
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
              <Person 
                key={member.id} 
                name={member.user.name} 
                onlinedAt={presence?.[member.participantId]?.[0].onlinedAt} 
                onClick={() => handleClick(member)} 
              />
          ))}
        </div>
    </div>
    </>
  );
}

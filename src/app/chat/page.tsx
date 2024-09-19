'use client';

import { getChatRoomList } from '@/actions/chatActions';
import Navigator from '@/components/common/Navigator';
import Header from '@/components/handin/Header';
import {
  useChatPresenceStore,
  useChatroomStore,
  useChatUserStore,
} from '../../stores/chatStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Person from '@/components/chat/Person';

export default function chatPage() {
  const router = useRouter();
  const { setSelectedUserId } = useChatUserStore();
  const { chatroomList, setChatroomList } = useChatroomStore();
  const { presence, setPresence } = useChatPresenceStore();

  useEffect(() => {
    async function fetchData() {
      const data = await getChatRoomList();
      setChatroomList(data);
    }
    fetchData();
  }, []);

  const handleClick = (receiverId: string) => {
    setSelectedUserId(receiverId);
    const chatroomId = receiverId.split('-')[0];
    router.push(`./chat/${chatroomId}`);
  };

  return (
    <>
      <Header label="채팅" rightIcon={<div></div>} />
      <div className="flex flex-grow flex-col bg-muted">
        <div className="flex flex-col gap-1 px-4 py-7">
          <p className="text-lg font-bold">🗣️ 참여중인 채팅 목록</p>
          <span className="text-sm text-muted-foreground">
            스터디원들과 대화를 나눠보세요!
          </span>
        </div>
        <div className="flex flex-grow flex-col rounded-t-2xl bg-white p-4 drop-shadow-md">
          {chatroomList?.map((chatroom: any) => (
            <Person
              key={chatroom.receiver}
              name={chatroom.receiver_name}
              onlinedAt={presence?.[chatroom.receiver]?.[0].onlinedAt}
              onClick={() => handleClick(chatroom.receiver)}
            />
          ))}
        </div>
      </div>
      <Navigator />
    </>
  );
}

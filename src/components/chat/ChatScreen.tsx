'use client';

import { useChatPresenceStore, useChatUserStore, useMessageStore } from '@/app/stores/chatStore'
import Message from './Message';
import Person from './Person';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllMessages, getUserById, sendMessage } from '@/actions/chatActions';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import supabase from '@/utils/supabase/client';
import SendIcon from '../icons/SendIcon';

export default function ChatScreen({}) {
  const { selectedUserId } = useChatUserStore();
  const { message, setMessage} = useMessageStore();
  const { presence } = useChatPresenceStore();

  const sendRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedUserId]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return; 
    if (e.key === "Enter") {
      sendRef.current?.click();
    }
  }

  const getSelectedUserQuery = useQuery({
    queryKey: ['user',selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });
  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      return sendMessage({
        message,
        chatUserId: selectedUserId,
      });
    },
    onSuccess: () => {
      setMessage('');
      getAllMessagesQuery.refetch();
    }
  });
  const getAllMessagesQuery = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: () => getAllMessages({chatUserId: selectedUserId}),
  });

  useEffect(() => {
    const channel = supabase.channel('chatroom_postrgres_changes')
    .on('postgres_changes',
    {
      event: "INSERT",
      schema: 'public',
      table: 'message',
    },
    (payload) => {
      if (payload.eventType === 'INSERT' && !payload.errors) {
        getAllMessagesQuery.refetch();
      }
    }
  )
  .subscribe();

  return () => {
    channel.unsubscribe();
  };
  }, []);

  return (
    <>
    <Person name={getSelectedUserQuery.data?.name} onlinedAt={presence?.[selectedUserId!]?.[0].onlinedAt} />
    {/* 콘텐츠 영역 */}
    <div className='flex flex-col flex-1 overflow-y-scroll p-2 bg-muted'>
        {
          getAllMessagesQuery.data?.map(message => (
            <Message
              key={message.id}
              message={message.message}
              isMine={message.receiver === selectedUserId}
              />
          ))
        }
        <div ref={scrollRef}></div>
      </div>
      <div className="flex items-center relative p-3 border">
        <input
          type="text"
          value={message}
          placeholder="메세지 보내기"
          className="w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] p-3.5 py-3 text-sm placeholder-gray-purple focus:outline-none"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
          />
          <button
            type='button'
            className="absolute right-5"
            onClick={() => sendMessageMutation.mutate()}
            ref={sendRef}
            >
            {sendMessageMutation.isPending ? <LoaderIcon /> : <SendIcon />}
          </button>
      </div>
    </>
  )
}
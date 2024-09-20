'use client';
import { insertComment } from '@/actions/studyroom/commentActions';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import SendIcon from '@/components/icons/SendIcon';
import supabase from '@/utils/supabase/client';
import { RefObject, useEffect, useRef, useState } from 'react';

export default function CommentForm({targetId, scrollRef}: {targetId: string, scrollRef: RefObject<HTMLDivElement>}) {
  const [user, setUser] = useState<any>();
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end'});
    }
  };

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUserData();
  }, []);

  return (
    <form ref={formRef} className="sticky bottom-0 shadow-md" action={async formData => {
      formRef.current?.reset();
      await insertComment(formData);
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }}>
      <div className="flex items-center gap-3 border border-[#efefef] bg-white px-4 py-5">
        <ProfileAvatar src={user?.user_metadata.avatar_url} alt='유저 이미지'/>
        <input type="text"
          name='targetId'
          defaultValue={targetId}
          hidden
        />
        <textarea
          name='comment'
          placeholder='스터디원에게 응원의 메세지 보내기'
          className='text-sm content-center w-full focus:outline-none resize-none px-2 py-1 bg-[#F3F3F3] rounded-lg overflow-y-hidden'
        />
        <button
          type="submit"
          aria-label="commentSend"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  )
}
'use client';
import { insertComment } from '@/actions/studyroom/commentActions';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import SendIcon from '@/components/icons/SendIcon';
import { RefObject, useRef } from 'react';

export default function CommentForm({targetId, scrollRef}: {targetId: string, scrollRef: RefObject<HTMLDivElement>}) {
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end'});
    }
  };

  return (
    <form ref={formRef} className="sticky bottom-0 shadow-md" action={async formData => {
      formRef.current?.reset();
      await insertComment(formData);
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }}>
      <div className="flex items-center gap-3 border border-[#efefef] bg-white px-4 py-5">
        <ProfileAvatar />
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
          className=""
        >
          <SendIcon />
        </button>
      </div>
    </form>
  )
}
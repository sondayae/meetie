/* eslint-disable simple-import-sort/imports */

'use client';

import { useState } from 'react';
import { insertComment } from '@/actions/studyroom/commentActions';
import { useUser } from '@/stores/user/user';
import SendIcon from '../icons/SendIcon';
import ProfileAvatar from '../common/ProfileAvatar';

export default function CommentForm({ targetId, user, scrollRef }: { targetId: string, user: any, scrollRef: any }) {
  const [comment, setComment] = useState('');
  // const { user } = useUser();
  // console.log(user);
  // TODO 유저 정보 -> userid, name, email, token, image 필요

  const handleSubmit = async () => {
    const data = await insertComment(targetId, comment);
    if (data) {
      setComment('');
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }
  }

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end'});
    }
  };

  return (
    <div className="sticky bottom-0 shadow-md">
      <div className="flex items-center gap-3 border border-[#efefef] bg-white px-4 py-5">
        <ProfileAvatar />
        <textarea
          value={comment}
          placeholder='스터디원에게 응원의 메세지 보내기'
          onChange={(e) => setComment(e.target.value)}
          className='text-sm content-center w-full focus:outline-none resize-none px-2 py-1 bg-[#F3F3F3] rounded-lg overflow-y-hidden'
        />
        <button
          type="button"
          aria-label="commentSend"
          className=""
          onClick={handleSubmit}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

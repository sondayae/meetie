/* eslint-disable simple-import-sort/imports */

'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { upsertComment } from '@/actions/studyroom/commentActions';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { useUser } from '@/stores/user/user';
import SendIcon from '../icons/SendIcon';
import ProfileAvatar from '../common/ProfileAvatar';

export default function CommentForm({ targetId, user }: { targetId: string, user: any }) {
  const [comment, setComment] = useState('');
  // const { user } = useUser();
  // console.log(user);
  // TODO 유저 정보 -> userid, name, email, token, image 필요

  const handleSubmit = async () => {
    const data = await upsertComment(targetId, comment);
    if (data) {
      setComment('');
    }
  }

  return (
    <div className="sticky bottom-0 shadow-md">
      <div className="flex items-center gap-3 border border-[#efefef] bg-white px-4 py-5">
        <ProfileAvatar src={user.images?.url}/>
        <input
          type="text"
          placeholder="스터디원에게 응원의 메세지 보내기"
          className="placeholder-gray-purple w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] p-3.5 py-3 text-sm focus:outline-none"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          type="button"
          aria-label="commentSend"
          className="absolute bottom-2 right-6 top-2"
          onClick={handleSubmit}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

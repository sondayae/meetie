'use client';

import SendIcon from '../icons/SendIcon';
import ProfileAvatar from '../common/ProfileAvatar';
import { createComment } from '@/actions/studyroom/commentActions';
import { useRef, useState } from 'react';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { useMutation } from '@tanstack/react-query';

export default function CommentForm({ targetId }: { targetId: string}) {
  const [comment, setComment] = useState('');

  const createCommentMutation = useMutation({
    mutationFn: () =>
      createComment({
        comment: comment,
        targetId: targetId,
      }),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({queryKey: ['comments']});
    },
  });


  return (
    <div className='sticky bottom-0'>
      <div className="flex items-center gap-3 border border-[#efefef] bg-white px-4 py-5">
        <ProfileAvatar />
          <input
            type="text"
            placeholder="스터디원에게 응원의 메세지 보내기"
            className="w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] p-3.5 py-3 text-sm placeholder-gray-purple focus:outline-none"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button
            type='submit'
            className="absolute right-6 top-2 bottom-2"
            onClick={() => createCommentMutation.mutate()}
          >
            <SendIcon />
          </button>
      </div>
    </div>
  );
}

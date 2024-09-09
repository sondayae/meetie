'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import ProfileAvatar from '../common/ProfileAvatar';
import SendIcon from '../icons/SendIcon';
import Comment from './Comment';
import { useState } from 'react';
import { getComments } from '@/actions/studyroom/commentActions';

export default function CommentList({targetId}: {targetId: string}) {


  const getCommentList = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const comments = await getComments(targetId);
      return comments;
    }
  });

  return (
    <div className='bg-[#FAFAFA] bg-opacity-45'>
      {getCommentList.data?.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
          />
      ))}
    </div>
  )
}
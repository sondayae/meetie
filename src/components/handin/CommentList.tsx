'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import ProfileAvatar from '../common/ProfileAvatar';
import SendIcon from '../icons/SendIcon';
import Comment from './Comment';
import { useState } from 'react';
import { getComments } from '@/actions/studyroom/commentActions';

export default function CommentList({targetId}) {


  const getCommentList = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const comments = await getComments(targetId);
      return comments;
    }
  });

  return (
    <>
    <div className='bg-[#fafafa]'>
      {getCommentList.data?.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
          />
      ))}
    </div>
  </>
  )
}
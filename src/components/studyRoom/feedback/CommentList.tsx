'use client';

import CommentForm from '@/components/handin/CommentForm';
import Comment from './Comment';
import { useEffect, useRef, useState } from 'react';

export default function CommentList({targetId, comments}: {targetId: string, comments: FeedComment[]|null}) {
  const [user, setUser] = useState();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {comments?.map((item: FeedComment) => (
        <Comment key={item.id} comment={item} />
      ))}
      <CommentForm targetId={targetId} user={user} scrollRef={scrollRef}/>
      <div ref={scrollRef}/>
    </>
  )
}
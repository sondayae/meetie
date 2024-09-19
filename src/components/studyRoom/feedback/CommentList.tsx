'use client';

import Comment from './Comment';
import { useRef, useState } from 'react';
import CommentForm from './CommentForm';

export default function CommentList({targetId, comments}: {targetId: string, comments: FeedComment[]|null}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {comments?.map((item: FeedComment) => (
        <Comment key={item.id} comment={item} />
      ))}
      <CommentForm targetId={targetId} scrollRef={scrollRef}/>
      <div ref={scrollRef}/>
    </>
  )
}
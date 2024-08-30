'use client';
import { useState, useEffect } from 'react';
import Comment from './Comment';

const CommentList = (props: any) => {
    const fetchData = async () => {
        const res = await fetch(`/api/studyRoom/handin/comments?target_id=${props.handinId}`);
        const data = await res.json();
        const commentList = data.map((data: any) => {
            return {id: data.id, userId: data.user_id, targetId: data.target_id, userName: data.user.name, comment: data.comment, date: props.dateFormatter(data.created_at)}
        });

        props.setCommentList(commentList);
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div>
        {props.commentList.map((comment: any) => (
            <Comment
                key={comment.id}
                data={comment}
            />
        ))}
    </div>
  )
}
export default CommentList
'use client';
import { useState, useEffect } from 'react';
import Comment from './Comment';

const CommentList = (props: any) => {
    const fetchData = async () => {
        const res = await fetch(`/api/studyRoom/handin/comments?target_id=${props.handinId}`);
        const data = await res.json();
        console.log(data);
        
        const commentList = data.map((data: any) => {
            return {id: data.id, userId: data.user_id, targetId: data.target_id, userName: data.user.name, comment: data.comment, date: props.dateFormatter(data.created_at), reactions: data.reactions ? data.reactions.reactions : []}
        });
        props.setCommentList(commentList);
        console.log(commentList);
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div>
        {props.commentList.map((comment: any) => (
            <Comment
                key={comment.id}
                comment={comment}
            />
        ))}
    </div>
  )
}
export default CommentList
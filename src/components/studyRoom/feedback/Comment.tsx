/* eslint-disable simple-import-sort/imports */

'use client';

import ProfileAvatar from '@/components/common/ProfileAvatar';
import { dateTimeFormatter } from '@/utils/common/dateFormatter';
import CommentReaction from './CommentReaction';
import Dropdown from '../Dropdown';
import { useUser } from '@/stores/user/user';
import { useEffect, useRef, useState } from 'react';
import { deleteComment, updateComment } from '@/actions/studyroom/commentActions';

export default function Comment({ comment }: { comment: FeedComment }) {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(comment.comment);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // TODO user 스토어에 avatar url 추가할 것 -> updateuser, user_meta
  const { user } = useUser();
  
  const reactionListWithCount = comment.reactions.reduce(
    (acc: any, current: any, idx) => {
      const existingEntry = acc.find(
        (item: any) => item.emoji === current.emoji,
      );
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ id: idx, emoji: current.emoji, count: 1 });
      }
      return acc;
    },
    [],
  );

  const handleEdit = async () => {
    const data = await updateComment(comment.id, text);
    console.log(data);
    
    setIsEdit(false);
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.setSelectionRange(text.length, text.length);
      inputRef.current?.focus();
    }
  }, [isEdit]);

  return (
    <div className="flex gap-2 bg-[#FAFAFA] bg-opacity-50 px-4 py-5 border-b">
      <ProfileAvatar src={comment.user?.images?.url} />
      {isEdit ? (
        <>
        <div className="w-full border rounded-lg bg-muted">
            <textarea
              value={text}
              placeholder='스터디원에게 응원의 메세지 보내기'
              ref={inputRef}
              onChange={(e) => setText(e.target.value)}
              className='p-1 w-full bg-transparent focus:outline-none resize-none text-sm'
            />
          <div className="flex justify-end gap-[8px] border-t border-[#dfdfdf] p-1">
            <button
              type="button"
              className="border-foreground rounded-lg border px-3 py-2 text-xs"
              onClick={() => {setIsEdit(false); setText(comment.comment)}}
            >
              취소
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary px-3 py-2 text-xs text-white"
              onClick={handleEdit}
            >
              저장
            </button>
          </div>
        </div>
        </>
      ) : (
        <>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{comment.user?.name}</span>
            <span className="text-xs font-medium text-muted-foreground">
              {dateTimeFormatter(comment.created_at)}
            </span>
          </div>
          <p className="text-sm break-words">{comment.comment}</p>
          <div className="mt-9">
            <CommentReaction targetId={comment.id} reactions={reactionListWithCount} />
          </div>
        </div>
        {comment.user_id === user?.id && (
          <div className='ml-auto'>
            <Dropdown handleEdit={() => setIsEdit(true)} handleDelete={() => deleteComment(comment.id)} deleteDialogOption={{title: '댓글 삭제', message: '댓글을 삭제하시겠습니까?'}}/>
          </div>
        )}
        </>
      )}
    </div>
  );
}

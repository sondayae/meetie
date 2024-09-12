'use client';

import { useRef, useState } from 'react';

import Picker from '@emoji-mart/react';
import { useMutation } from '@tanstack/react-query';

import AddReaction from '../icons/AddReaction';
import DropDownMenu from './DropDownMenu';

import { deleteComment, updateComment } from '@/actions/studyroom/commentActions';
import { createReaction } from '@/actions/studyroom/commentActions';
import { queryClient } from '@/config/ReactQueryClientProvider';
import useConfirm from '@/hooks/use-confirm';
import { dateFormatter } from '@/utils/common/dateFormatter';
import ProfileAvatar from '../common/ProfileAvatar';

type CommentProps = {
  comment: any;
};

export default function Comment({ comment }: CommentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(comment.comment);
  const [showEmoji, setShowEmoji] = useState(false);
  const reactionListWithCount = comment.reactions.reduce(
    (acc: any, current: any) => {
      const existingEntry = acc.find(
        (item: any) => item.emoji === current.emoji,
      );

      if (existingEntry) {
        // 이미 해당 value가 존재하면 count를 증가
        existingEntry.count += 1;
      } else {
        // 존재하지 않으면 새로운 객체를 추가
        acc.push({ emoji: current.emoji, count: 1 });
      }

      return acc;
    },
    [],
  );

  const handleDelete = async () => {
    const result = await confirm();
    if (result) {
      deleteCommentMutation.mutate();
    }
  };

  const { ConfirmModal, confirm } = useConfirm({
    title: '삭제',
    message: '댓글을 삭제하시겠습니까?',
  });

  const updateCommentMutation = useMutation({
    mutationFn: () =>
      updateComment({
        comment: text,
        id: comment.id,
      }),
    onSuccess: () => {
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () =>
      deleteComment({
        id: comment.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const createReactionMutation = useMutation({
    mutationFn: (emoji: string) =>
      createReaction({
        targetId: comment.id,
        emoji,
      }),
    onSuccess: (data) => {
      setShowEmoji(false);
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleEmojiSelect = (emoji: string) => {
    createReactionMutation.mutate(emoji);
  };

  const handleEmojiPicketSelect = (e: any) => {
    const sym: any = `0x${e.unified}`;
    const emoji = String.fromCodePoint(sym);
    handleEmojiSelect(emoji);
  };

  return (
    <>
      <ConfirmModal />
      <div
        key={comment.id}
        className="border-x border-b border-[#efefef] p-[18px]"
      >
        <div className="flex gap-[12px]">
          <div>
            <ProfileAvatar />
          </div>
          {isEdit && (
            <div className="w-full">
              <div className="rounded-lg bg-[#f3f3f3]">
                <input
                  value={text}
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                  className="placeholder-gray-purple w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] p-2 py-[11.5px] text-sm focus:outline-none"
                />
                <div className="flex justify-end gap-[8px] border-t border-[#dfdfdf] p-1">
                  <button
                    type="button"
                    className="border-middle-gray rounded-lg border px-3 py-2 text-xs"
                    onClick={() => setIsEdit(false)}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-primary px-3 py-2 text-xs text-white"
                    onClick={() => updateCommentMutation.mutate()}
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isEdit && (
            <div className="flex w-full flex-col gap-5">
              <div className="flex flex-col gap-1">
                <div className="relative flex flex-nowrap justify-between">
                  <div className="flex items-center">
                    <span className="mr-[7px] font-bold">
                      {comment.user?.name}
                    </span>
                    <span className="text-xs text-[#898989]">
                      {dateFormatter(comment.created_at)}
                    </span>
                  </div>
                  <DropDownMenu
                    handleEdit={() => setIsEdit(true)}
                    handleDelete={handleDelete}
                  />
                </div>
                <span className="break-all text-sm">
                  {comment.comment}
                  {!!comment.sending && <small>(Sending...)</small>}
                </span>
              </div>
              <div className="relative flex items-center gap-2">
                <span
                  className="cursor-pointer rounded-lg border border-[#DDDDDD] bg-[#F3F3F3] p-2"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <AddReaction />
                </span>
                {reactionListWithCount.map(
                  (reaction: { emoji: string; count: string }, idx: string) => (
                    <div
                      key={idx}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#DDDDDD] bg-[#F3F3F3] px-2 py-1"
                      onClick={() => handleEmojiSelect(reaction.emoji)}
                    >
                      <span>{reaction.emoji}</span>
                      <span className="text-xs">{reaction.count}</span>
                    </div>
                  ),
                )}
                {showEmoji && (
                  <div className="absolute bottom-10">
                    <Picker
                      onEmojiSelect={(e: any) => handleEmojiPicketSelect(e)}
                      locale="ko"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

'use client';

import { useEffect } from 'react';

import Separator from '@/components/common/Separator';
import AddReaction from '@/components/icons/AddReaction';
import useEmojiPicker from '@/hooks/use-emoji-picker';

export default function FeedReaction({
  reactionLength,
  commentLength,
}: {
  reactionLength: number | undefined;
  commentLength: number | undefined;
}) {
  const { open, close, EmojiPicker, selectedEmoji } = useEmojiPicker();
  useEffect(() => {
    if (selectedEmoji) {
      // todo 이모지 추가
      console.log(selectedEmoji);
    }
  }, [selectedEmoji]);
  return (
    <div className="flex flex-col gap-4 border-y p-4">
      <div className="flex items-center gap-1 text-sm font-semibold">
        <span>표정</span>
        <span>{reactionLength || 0}</span>
        <Separator type="circle" />
        <span>댓글</span>
        <span>{commentLength || 0}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="FeedEmojiPicker"
          className="relative items-center justify-center rounded-full border bg-muted p-2"
          onClick={() => open()}
        >
          <AddReaction className="h-6 w-6 fill-[#504F50]" />
          <EmojiPicker />
        </button>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';

import AddReaction from '@/components/icons/AddReaction';
import useEmojiPicker from '@/hooks/use-emoji-picker';

interface CommReaction extends Reaction {
  count: number;
}

export default function CommentReaction({
  reactions,
}: {
  reactions: CommReaction[];
}) {
  const { open, EmojiPicker, selectedEmoji } = useEmojiPicker();
  useEffect(() => {
    if (selectedEmoji) {
      // todo 이모지 추가
      console.log(selectedEmoji);
    }
  }, [selectedEmoji]);

  return (
    <div className="flex gap-2">
      {reactions.map((reaction: CommReaction, idx) => (
        <p
          key={reaction.id}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-[#DDDDDD] bg-[#F3F3F3] px-2 py-1"
        >
          <span>{reaction.emoji}</span>
          <span className="text-xs">{reaction.count}</span>
        </p>
      ))}
      <button
        type="button"
        aria-label="emojiPicker"
        className="relative w-fit rounded-lg border border-[#DDDDDD] bg-[#F3F3F3] p-2"
        onClick={() => open()}
      >
        <AddReaction className="fill-[#725484]" />
        <EmojiPicker />
      </button>
    </div>
  );
}

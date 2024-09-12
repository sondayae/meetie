'use client';

import { useEffect, useState } from 'react';

import AddReaction from '@/components/icons/AddReaction';
import useEmojiPicker from '@/hooks/use-emoji-picker';
import { toggleReaction } from '@/actions/studyroom/commentActions';

interface CommReaction extends Reaction {
  count: number;
}

export default function CommentReaction({
  targetId,
  reactions,
}: {
  targetId: number;
  reactions: CommReaction[];
}) {

  const [ selectedEmoji, setSelectedEmoji ] = useState('');
  const { open, close, EmojiPicker} = useEmojiPicker(setSelectedEmoji);

  useEffect(() => {
    if (selectedEmoji) {
      const handleReaction = async () => {
        const data = await toggleReaction(targetId, selectedEmoji);
        if (data) {
          setSelectedEmoji('');
          close();
        }
      }
      handleReaction();
    }
  }, [selectedEmoji]);

  return (
    <div className="flex gap-2">
      {reactions.map((reaction: CommReaction, idx) => (
        <p
          key={reaction.id}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-[#DDDDDD] bg-[#F3F3F3] px-2 py-1"
          onClick={() => setSelectedEmoji(reaction.emoji)}
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

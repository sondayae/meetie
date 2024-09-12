'use client';

import { useEffect, useState } from 'react';

import Separator from '@/components/common/Separator';
import AddReaction from '@/components/icons/AddReaction';
import useEmojiPicker from '@/hooks/use-emoji-picker';
import { toggleReaction } from '@/actions/studyroom/feedbackActions';
import ProfileAvatar from '@/components/common/ProfileAvatar';

export default function FeedReaction({
  targetId,
  feedReactions,
  commentLength,
}: {
  targetId: string;
  feedReactions: FeedReaction[];
  commentLength: number | undefined;
}) {
  const [ selectedEmoji, setSelectedEmoji ] = useState('');
  const { open, close, EmojiPicker } = useEmojiPicker(setSelectedEmoji);

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
    <div className="flex flex-col gap-4 border-y p-4">
      <div className="flex items-center gap-1 text-sm font-semibold">
        <span>표정</span>
        <span>{feedReactions.length}</span>
        <Separator type="circle" />
        <span>댓글</span>
        <span>{commentLength}</span>
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
        {feedReactions.map((reaction: FeedReaction) => (
          <p
            key={reaction.id}
            className='relative'
            onClick={() => setSelectedEmoji(reaction.emoji)}
          >
            <ProfileAvatar src={reaction.user?.images?.url} className='border w-11 h-11'/>
            <span className='absolute -bottom-2 right-0 text-lg'>{reaction.emoji}</span>
        </p>
        ))}
      </div>
    </div>
  );
}

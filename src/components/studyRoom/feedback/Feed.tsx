'use client';

import CustomDropDownMenu from '@/components/common/CustomDropdownMenu';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import ImageFrame from '@/components/handin/ImageFrame';
import CommentIcon from '@/components/icons/CommentIcon';
import EmojiIcon from '@/components/icons/EmojiIcon';
import MoreIcon from '@/components/icons/MoreIcon';
import NewCheckSignIcon from '@/components/icons/NewCheckSignIcon';
import { getImgUrl } from '@/utils/supabase/storage';
import Link from 'next/link';

export default function Feed({feedback}: {feedback: Feedback}) {

  return (
    <Link href={`./feedback/${feedback.id}`}>
      <div className='flex border-b px-4 pt-[1.125rem] pb-8 gap-2'>
        <ProfileAvatar src={feedback.user.images?.url} className='w-11 h-11'/>
        <div className='flex-grow'>
          <div className='flex gap-2 items-center'>
            <span className='font-bold text-base'>{feedback.user.name} </span>
            <NewCheckSignIcon sizeClassName='w-4 h-4' circleClassName='fill-black' checkClassName='fill-white'/>
            <span className='text-xs text-muted-foreground'>{feedback.homework.title}</span>
          </div>
          <div className='mt-4'>
            <p className='text-sm mb-3'>{feedback.text}</p>
            <ImageFrame
              src={getImgUrl(feedback.images[0]?.url)}
              alt="data_image"
            />
            <div className='flex justify-end gap-1 pt-2'>
              <EmojiIcon />
              <span className='text-xs text-muted-foreground'>{feedback.feedback_reactions?.length}</span>
              <CommentIcon />
              <span className='text-xs text-muted-foreground'>{feedback.comments?.length}</span>
            </div>
          </div>
        </div>
        <MoreIcon className='stroke-black'/>
      </div>
    </Link>
  )
}
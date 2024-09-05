'use client';

import ProfileImg from '../common/ProfileImg';
import Separator from '../common/Separator';
import CommentIcon from '../icons/CommentIcon';
import EmojiIcon from '../icons/EmojiIcon';
import NewCheckSignIcon from '../icons/NewCheckSignIcon';
import DropDownMenu from './DropDownMenu';
import ImageFrame from './ImageFrame';

import { dateFormatter, timeFormatter } from '@/utils/common/dateFormatter';
import { getImgUrl } from '@/utils/supabase/storage';

export default function Handin({ user, handin, commentsCount }) {
  return (
    <div className="flex flex-col gap-4 border-b px-4 py-5">
      <div className="relative flex gap-2">
        <div className="flex flex-shrink-0">
          <ProfileImg src={user.images?.url} />
        </div>
        <div className="flex w-full flex-grow items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-bold">{user.name}</span>
            <span>
              <NewCheckSignIcon
                circleClassName="fill-black"
                checkClassName="fill-white"
              />
            </span>
            <span className="text-xs text-[#898989]">
              {handin.homework.title}
            </span>
          </div>
          <div>
            <DropDownMenu handleEdit={() => {}} handleDelete={() => {}} />
          </div>
        </div>
      </div>
      <div className="m-6 flex flex-col gap-5">
        <p>{handin.text}</p>
        <ImageFrame src={getImgUrl(handin.images[0].url)} alt="handin_image" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-[#636363]">
            <span>{timeFormatter(handin.created_at)}</span>
            <Separator type="circle" />
            <span>{dateFormatter(handin.created_at)}</span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <div className="flex items-center gap-1">
              <span>
                <EmojiIcon />
              </span>
              <span className="text-xs text-[#636363]">1</span>
            </div>
            <div className="flex items-center gap-1">
              <span>
                <CommentIcon />
              </span>
              <span className="text-xs text-[#636363]">{commentsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

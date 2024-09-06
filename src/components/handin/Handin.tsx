'use client';

import ProfileAvatar from '../common/ProfileAvatar';
import Separator from '../common/Separator';
import CommentIcon from '../icons/CommentIcon';
import EmojiIcon from '../icons/EmojiIcon';
import NewCheckSignIcon from '../icons/NewCheckSignIcon';
import ImageFrame from './ImageFrame';

import { useUser } from '@/stores/user/user';
import { dateFormatter, timeFormatter } from '@/utils/common/dateFormatter';
import { getImgUrl } from '@/utils/supabase/storage';
import CustomDropDownMenu from '../common/DropdownMenu';

export default function Handin({
  user,
  handin,
  commentsCount,
}: {
  user: any;
  handin: any;
  commentsCount: any;
}) {
  const loginUser = useUser((store) => store.user);
  console.log(handin);
  console.log(user);
  
  

  return (
    <div className="grid grid-cols-[50px_1fr_45px] px-4 py-5 gap-2 border-b">
      <div className='mx-auto'>
        <ProfileAvatar src={user.images?.url}/>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span className="font-bold">{handin.user.name}</span>
          <span>
            <NewCheckSignIcon
              sizeClassName='w-4 h-4'
              circleClassName="fill-black"
              checkClassName="fill-white"
            />
          </span>
          <span className="text-xs text-[#898989]">
            {handin.homework.title}
          </span>
        </div>
        <div className='min-h-20'>
          <p>{handin.text}</p>
        </div>
        <div>
          <ImageFrame
            src={getImgUrl(handin.images[0].url)}
            alt="handin_image"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1 text-xs text-[#636363]">
            <span>{timeFormatter(handin.created_at)}</span>
            <Separator type="circle" />
            <span>{dateFormatter(handin.created_at)}</span>
          </div>
          <div className="flex gap-2 items-center">
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
      <div className='mx-auto'>
        <CustomDropDownMenu />
      </div>
    </div>
  );
}

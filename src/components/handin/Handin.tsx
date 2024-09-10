'use client';

import ProfileAvatar from '../common/ProfileAvatar';
import Separator from '../common/Separator';
import CommentIcon from '../icons/CommentIcon';
import EmojiIcon from '../icons/EmojiIcon';
import NewCheckSignIcon from '../icons/NewCheckSignIcon';
import ImageFrame from './ImageFrame';
import { dateFormatter, timeFormatter } from '@/utils/common/dateFormatter';
import { getImgUrl } from '@/utils/supabase/storage';
import CustomDropDownMenu from '../common/CustomDropdownMenu';
import { useRouter } from 'next/navigation';
import useConfirm from '@/hooks/use-confirm';
import { Feedback } from '@/types/feedbacks';

export default function Handin({ data }: {data : Feedback}) {
  const router = useRouter();
  const handleEdit = (e: any) => {
    e.stopPropagation();
    router.push(`./handin/edit/${data.id}`);
  }
  const handleDelete = async (e: any) => {
    e.stopPropagation();
    const result = await confirm();
  }

  const { ConfirmModal, confirm } = useConfirm({
    title: '삭제',
    message: '댓글을 삭제하시겠습니까?',
  });
  
  

  return (
    <>
    {data && 
    <div onClick={() => router.push(`./handin/${data.id}`)}>
      <ConfirmModal />
      <div className="grid grid-cols-[50px_1fr_45px] px-4 py-5 gap-2 border-b">
        <div className='mx-auto'>
          <ProfileAvatar src={data.user?.[0].images?.[0].url}/>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="font-bold">{data.user?.[0].name}</span>
            <span>
              <NewCheckSignIcon
                sizeClassName='w-4 h-4'
                circleClassName="fill-black"
                checkClassName="fill-white"
                />
            </span>
            <span className="text-xs text-[#898989]">
              {!Array.isArray(data.homework) ? data.homework?.title : data.homework?.[0].title}
            </span>
          </div>
          <div className='min-h-20'>
            <p>{data.text}</p>
          </div>
          <div>
            <ImageFrame
              src={data.images ? getImgUrl(data.images?.[0].url) : ''}
              alt="data_image"
              />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1 text-xs text-[#636363]">
              <span>{timeFormatter(data.created_at)}</span>
              <Separator type="circle" />
              <span>{dateFormatter(data.created_at)}</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1">
                <span>
                  <EmojiIcon />
                </span>
                <span className="text-xs text-[#636363]">{data.feedback_reactions?.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <CommentIcon />
                </span>
                <span className="text-xs text-[#636363]">{data.comments?.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-auto'>
          <CustomDropDownMenu handleEdit={handleEdit} handleDelete={handleDelete}/>
        </div>
      </div>
    </div>}
            </>
  );
}

'use client';

import useConfirm from '@/hooks/use-confirm';
import NewCheckSignIcon from '../icons/NewCheckSignIcon';
import ImageFrame from './ImageFrame';

import { useUser } from '@/stores/user/user';
import { dateFormatter, timeFormatter } from '@/utils/common/dateFormatter';
import { getImgUrl } from '@/utils/supabase/storage';
import ProfileAvatar from '../common/ProfileAvatar';
import CustomDropDownMenu from '../common/CustomDropdownMenu';
import Separator from '../common/Separator';
import { deleteHandin } from '@/actions/studyroom/handinActions';
import { useRouter } from 'next/navigation';

export default function HandinDetail({
  data
}: any) {
  const router = useRouter();
  const { ConfirmModal, confirm } = useConfirm({
    title: '삭제',
    message: '삭제하시겠습니까?',
  });

  const handleEdit = () => {
    router.push(`./edit/${data.id}`);
  }
  const handleDelete = async () => {
    const result = await confirm();
    if (result) {
      await deleteHandin(data.id);
      router.push('./');
    }
  };

  const loginUser = useUser((store) => store.user);

  return (
    <>
      <ConfirmModal />
      <div className='flex flex-col'>
        {/* 사용자 이름 영역 */}
        <div className="flex justify-between p-5 bg-white">
          <div className="flex flex-shrink-0 flex-grow items-center">
            <ProfileAvatar />
            <span className="ml-[8px] font-bold">{data.user.name}</span>
          </div>
          <div className="relative flex w-full items-center justify-end gap-6">
            <div className="flex items-center">
              <span className="mr-[4px] text-sm text-muted-foreground">
                사진으로 인증됨
              </span>
              <NewCheckSignIcon
                sizeClassName='w-4 h-4'
                circleClassName="fill-primary"
                checkClassName="fill-white"
              />
            </div>
            {loginUser?.id === data.user.id && (
              <CustomDropDownMenu 
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
        {/* 과제 영역 */}
        <div className='flex flex-col border-y p-4 gap-4 bg-[#FAFAFA]'>
            <span className="block break-all text-sm mt-10">{data.text}</span>
            {data.images.map((image: { url: string }) => {
              return (
                <ImageFrame
                  key={image.url}
                  src={getImgUrl(image.url)}
                  alt="과제 인증 이미지"
                  />
              );
            })}
          <div className="flex gap-1 items-center text-xs text-[#636363] mt-10">
            <span>{timeFormatter(data.created_at)}</span>
            <Separator type='cirlce'/>
            <span>{dateFormatter(data.created_at)}</span>
            <Separator type='cirlce'/>
            <span>{data.homework.title}</span>
          </div>
        </div>
      </div>
    </>
  );
}

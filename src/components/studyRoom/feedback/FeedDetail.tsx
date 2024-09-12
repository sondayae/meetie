import ProfileAvatar from '@/components/common/ProfileAvatar';
import Separator from '@/components/common/Separator';
import ImageFrame from '@/components/handin/ImageFrame';
import MoreIcon from '@/components/icons/MoreIcon';
import NewCheckSignIcon from '@/components/icons/NewCheckSignIcon';
import { dateFormatter, timeFormatter } from '@/utils/common/dateFormatter';
import { getImgUrl } from '@/utils/supabase/storage';

export default async function FeedDetail({feedback}: {feedback: Feedback}) {
  console.log(feedback);
  

  return (
    <div className='bg-[#FAFAFA]'>
      <div className='flex justify-between bg-white px-4 py-7 border-b'>
        <p className='flex items-center gap-2'>
          <ProfileAvatar src={feedback.user.images?.url}/>
          <span className='font-bold'>{feedback.user.name}</span>
        </p>
        <p className='flex items-center gap-6'>
          <span className='flex items-center gap-1'>
            <span className='text-sm text-muted-foreground'>사진으로 인증됨</span>
            <NewCheckSignIcon sizeClassName='w-4 h-4' circleClassName='fill-primary' checkClassName='fill-white'/>
          </span>
          <MoreIcon className='w-8 h-8 stroke-[#7B7B7B]'/>
        </p>
      </div>
      <div className='px-4 pt-[4.25rem]'>
        <p className='mb-[4.25rem]'>{feedback.text}</p>
        <ImageFrame src={getImgUrl(feedback.images[0]?.url)} alt='과제 인증 이미지'/>
        <ImageFrame src={getImgUrl(feedback.images[0]?.url)} alt='과제 인증 이미지'/>
        <ImageFrame src={getImgUrl(feedback.images[0]?.url)} alt='과제 인증 이미지'/>
        <div className="flex gap-1 items-center text-xs text-[#636363] mt-10">
            <span>{timeFormatter(feedback.created_at)}</span>
            <Separator type='cirlce'/>
            <span>{dateFormatter(feedback.created_at)}</span>
            <Separator type='cirlce'/>
            <span>{feedback.homework.title}</span>
          </div>
      </div>
    </div>
  )
}
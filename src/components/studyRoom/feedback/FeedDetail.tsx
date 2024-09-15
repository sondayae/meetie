import ProfileAvatar from '@/components/common/ProfileAvatar';
import Separator from '@/components/common/Separator';
import ImageFrame from '@/components/handin/ImageFrame';
import MoreIcon from '@/components/icons/MoreIcon';
import NewCheckSignIcon from '@/components/icons/NewCheckSignIcon';
import { dateFormatter, timeFormatter } from '@/utils/common/dateFormatter';
import { getImgUrl } from '@/utils/supabase/storage';
import Dropdown from '../Dropdown';
import FeedDetailHeader from './FeedDetailHeader';

export default async function FeedDetail({ feedback }: { feedback: Feedback }) {

  return (
    <div className="bg-[#FAFAFA]">
      <FeedDetailHeader feedId={feedback.id} user={feedback.user}/>
      <div className="px-4 pb-4 pt-[4.25rem]">
        <p className="mb-[4.25rem]">{feedback.text}</p>
        <ImageFrame
          src={getImgUrl(feedback.images[0]?.url)}
          alt="과제 인증 이미지"
        />
        <div className="mt-10 flex items-center gap-1 text-xs text-[#636363]">
          <span>{timeFormatter(feedback.created_at)}</span>
          <Separator type="cirlce" />
          <span>{dateFormatter(feedback.created_at)}</span>
          <Separator type="cirlce" />
          <span>{feedback.homework.title}</span>
        </div>
      </div>
    </div>
  );
}

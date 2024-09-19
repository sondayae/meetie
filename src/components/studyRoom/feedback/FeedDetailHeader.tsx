'use client';

import ProfileAvatar from '@/components/common/ProfileAvatar';
import NewCheckSignIcon from '@/components/icons/NewCheckSignIcon';
import Dropdown from '../Dropdown';
import { usePathname, useRouter } from 'next/navigation';
import { deleteFeedback } from '@/actions/studyroom/feedbackActions';

export default function FeedDetailHeader({ feedId, user }: { feedId: number, user: User }) {
  const router = useRouter();
  const path = usePathname();

  const handleDelete = async () => {
    const data = await deleteFeedback(feedId);
    if (data.success) {
      router.push('./');
    }
  }

  return (
    <div className="flex justify-between border-b bg-white px-4 py-7">
    <p className="flex items-center gap-2">
      <ProfileAvatar src={user.images?.url} />
      <span className="font-bold">{user.name}</span>
    </p>
    <p className="flex items-center gap-6">
      <span className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">
          사진으로 인증됨
        </span>
        <NewCheckSignIcon
          sizeClassName="w-4 h-4"
          circleClassName="fill-primary"
          checkClassName="fill-white"
        />
      </span>
      <Dropdown 
        handleEdit={() => router.push(`${path}/edit`)}
        handleDelete={handleDelete}
        deleteDialogOption={{title: '과제 인증 삭제', message: '인증하신 과제를 삭제하시겠습니까?'}}
      />
    </p>
  </div>
  )
}
import { getBadgeImgUrl } from '@/utils/supabase/storage'
import { twMerge } from 'tailwind-merge'
import BadgeCard from './BadgeCard';

export default function BadgeList({badgeList, userBadgeList}: {badgeList: any[]|undefined, userBadgeList: any[]|null}) {
  return (
    <div className='flex justify-between'>
    {badgeList?.map((badge: any) => {
      const userBadge = userBadgeList?.find(userBadge => userBadge.badge_id === badge.id);
      return (
        <BadgeCard key={badge.id} badge={badge} isAwarded={userBadge ? true : false} awardedAt={userBadge?.created_at}/>
      )
    })}
    </div>
  )
}
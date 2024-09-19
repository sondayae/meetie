import { getBadgeImgUrl } from '@/utils/supabase/storage'

export default function BadgeList({badgeList}: {badgeList: any[]|undefined}) {
  return (
    <div className='flex justify-between'>
    {badgeList?.map((badge: any) => (
      <div className='flex flex-col items-center gap-2' key={badge.id}>
        <img src={getBadgeImgUrl(badge.image_path)} alt={badge.name} className='min-w-[150px]'/>
        <p className='text-sm'>{badge.name}</p>
      </div>
    ))}
    </div>
  )
}
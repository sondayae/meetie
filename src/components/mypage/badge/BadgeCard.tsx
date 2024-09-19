import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { dateFormatter } from '@/utils/common/dateFormatter';
import { getBadgeImgUrl } from '@/utils/supabase/storage';
import { twMerge } from 'tailwind-merge';

export default function BadgeCard({badge, isAwarded, awardedAt}: {badge: any, isAwarded: boolean|undefined, awardedAt: string}) {
  
  const getType = (type: string) => {
    let typeText = '';
    switch(type) {
      case 'comment': typeText = '댓글뱃지'; break;
      case 'feedback': typeText = '피드뱃지'; break;
      case 'study': typeText = '스터디뱃지'; break;
      case 'meett': typeText = '밋티뱃지'; break;
    }
    return typeText;
  }

  return (
    <Drawer>
    {isAwarded ? (
    <DrawerTrigger>
      <div className='flex flex-col items-center gap-2 cursor-pointer'>
        <img src={getBadgeImgUrl(badge.image_path)} alt={badge.name} className={twMerge('w-[150px]', isAwarded ? '' : 'grayscale')}/>
        <p className='text-sm font-medium'>{badge.name}</p>
      </div>
    </DrawerTrigger>
    ) : (
      <div className='flex flex-col items-center gap-2'>
        <img src={getBadgeImgUrl(badge.image_path)} alt={badge.name} className={twMerge('w-[150px]', isAwarded ? '' : 'grayscale')}/>
        <p className='text-sm font-medium'>{badge.name}</p>
      </div>
    )}
    <DrawerContent className='h-[50vh]'>
      <DrawerHeader className='pt-8'>
        <div className='flex flex-col gap-6 justify-center items-center text-center'>
          <p className='font-medium'>{getType(badge.type)}</p>
          <div className='flex flex-col gap-2'>
            <DrawerTitle>{badge.title}</DrawerTitle>
            <DrawerDescription>{badge.description}</DrawerDescription>
          </div>
        </div>
      </DrawerHeader>
      <div className='flex flex-col mx-auto items-center shadow-md w-1/2 p-5 rounded-2xl'>
        <img src={getBadgeImgUrl(badge.image_path)} alt={badge.name} className='min-w-[200px]'/>
        <h1 className='font-bold text-xl'>{badge.name}</h1>
        <h1 className='font-medium text-sm mt-1'>{dateFormatter(awardedAt)}</h1>
      </div>
    </DrawerContent>
  </Drawer>
  )
}
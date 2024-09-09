import { Skeleton } from "@/components/ui/skeleton"
import MoreIcon from '../icons/MoreIcon'

export function SkeletonFeedback() {
  return (
    <div className="grid grid-cols-[50px_1fr_45px] px-4 py-5 gap-2 border-b">
      <div className='flex'>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className="h-4 w-[200px] mb-3" />
        <Skeleton className="h-7 w-[250px]" />
        <Skeleton className="h-[125px] w-full rounded-xl" />
      </div>
      <div className='mx-auto'>
        <MoreIcon className='w-5 h-5 stroke-black'/>
      </div>
    </div>
  )
}

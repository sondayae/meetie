import { Skeleton } from '@/components/ui/skeleton';
import MoreIcon from '../icons/MoreIcon';

export function SkeletonFeedback() {
  return (
    <div className="grid animate-pulse grid-cols-[50px_1fr_45px] gap-2 border-b px-4 py-5">
      <div className="flex">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="mb-3 h-4 w-[200px]" />
        <Skeleton className="h-7 w-[250px]" />
        <Skeleton className="h-[125px] w-full rounded-xl" />
      </div>
      <div className="mx-auto">
        <MoreIcon className="h-6 w-6 stroke-black" />
      </div>
    </div>
  );
}

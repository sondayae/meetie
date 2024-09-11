import Button from '@/components/common/Button';
import { WalkthroughCarousel } from '@/components/common/WalkthroughCarousel';
import ROUTE_PATH from '@/constants/route';
import Link from 'next/link';

export default function Walkthrough() {

  return (
    <div className='flex-grow bg-gradient-custom'>
      <div className='flex flex-col py-3 gap-10'>
        <div className='flex flex-col gap-6'>
          <Link
            className="ml-auto pr-4 text-sm font-medium text-muted-foreground"
            href={ROUTE_PATH.MEMBER.PROFILE.CREATE}
          >
            SKIP
          </Link>
          <WalkthroughCarousel />
        </div>
        <Link href={ROUTE_PATH.MEMBER.PROFILE.CREATE} >
          <Button type='primary' label='나와 비슷한 팀원 찾기'/>
        </Link>
      </div>
    </div>
  );
}

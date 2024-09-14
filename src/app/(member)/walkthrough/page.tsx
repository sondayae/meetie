import Button from '@/components/common/Button';
import { WalkthroughCarousel } from '@/components/common/WalkthroughCarousel';
import ROUTE_PATH from '@/constants/route';
import Link from 'next/link';

export default function Walkthrough() {
  return (
    <div className="flex-grow bg-gradient-custom">
      <div className="flex min-h-dvh flex-col">
        <div className="relative flex flex-1 flex-col pt-4">
          <Link
            className="ml-auto pr-4 text-sm font-medium text-muted-foreground"
            href={ROUTE_PATH.MEMBER.PROFILE.CREATE}
          >
            SKIP
          </Link>
          <WalkthroughCarousel />
        </div>
        <Link
          href={ROUTE_PATH.MEMBER.PROFILE.CREATE}
          className={'m-w-[600px] sticky bottom-0 px-4 py-2.5'}
        >
          <Button type="primary" label="나와 비슷한 팀원 찾기" />
        </Link>
      </div>
    </div>
  );
}

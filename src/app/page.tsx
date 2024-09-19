import Link from 'next/link';

import HomeSVG from '@/components/icons/HomeSVG';
import AccountRecoveryLinks from '@/components/loginPage/AccountRecoveryLinks';
import SocialButtons from '@/components/loginPage/SocialButtons';
import ROUTE_PATH from '@/constants/route';
import userEventEmitter from '@/lib/EventEmitter';

export default function Home() {

  return (
    <div className="flex-1 bg-gradient-custom py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-dark-gray text-lg font-semibold">
          같은 목표로 공부중인 유저
        </p>
        <span className="font-extrabold text-2xl text-[#7677FF]">
          6,438명
        </span>
      </div>

      <div className="mb-3 mt-20 flex h-[332px] w-full items-center justify-center overflow-hidden">
        <HomeSVG className="h-full w-auto pr-11" />
      </div>

      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex justify-center gap-6">
          <SocialButtons />
        </div>
        <div className='flex flex-col items-center gap-7'>
          <Link
            href={ROUTE_PATH.AUTH.LOGIN}
            className="after:contents-[''] text-foreground after:bg-foreground relative px-2 py-1 text-sm font-medium after:absolute after:bottom-1 after:left-2 after:right-2 after:h-px"
            >
            이메일로 로그인
          </Link>
          <AccountRecoveryLinks />
        </div>
      </div>
    </div>
  );
}

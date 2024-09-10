import Link from 'next/link';

import HomeSVG from '@/components/icons/HomeSVG';
import AccountRecoveryLinks from '@/components/loginPage/AccountRecoveryLinks';
import SocialButtons from '@/components/loginPage/SocialButtons';
import ROUTE_PATH from '@/constants/route';

export default async function Home() {
  return (
    <div className="bg-gradient-custom py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-dark-gray text-lg font-semibold">
          같은 목표로 공부중인 유저
        </p>
        <span className="text-sub-purple text-center text-2xl font-extrabold">
          123명
        </span>
      </div>

      <div className="mb-3 mt-20 flex h-[332px] w-full items-center justify-center overflow-hidden">
        <HomeSVG className="h-full w-auto pr-11" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center gap-6">
          <SocialButtons />
        </div>
        <Link
          href={ROUTE_PATH.AUTH.LOGIN}
          className="after:contents-[''] text-dark-gray after:bg-dark-gray relative mt-6 px-2 py-1 text-sm font-medium after:absolute after:bottom-1 after:left-2 after:right-2 after:h-px"
        >
          이메일로 로그인
        </Link>
      </div>

      <AccountRecoveryLinks />
    </div>
  );
}

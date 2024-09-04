import Link from 'next/link';

import HomeSVG from '@/components/icons/HomeSVG';
import MoreIcon from '@/components/icons/MoreIcon';
import AccountRecoveryLinks from '@/components/loginPage/AccountRecoveryLinks';
import SocialButtons from '@/components/loginPage/SocialButtons';
import ROUTE_PATH from '@/constants/route';

export default async function Home() {
  return (
    <div className="bg-gradient-custom py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-lg font-semibold text-dark-gray">
          같은 목표로 공부중인 유저
        </p>
        <span className="text-center text-2xl font-extrabold text-sub-purple">
          123명
        </span>
      </div>

      <div className="mb-3 mt-20 flex h-[332px] w-full items-center justify-center overflow-hidden">
        <HomeSVG className="h-full w-auto pr-11" />
      </div>

      <div className="flex justify-center gap-6">
        <SocialButtons />
        <Link
          href={ROUTE_PATH.AUTH.LOGIN}
          className="flex h-11 w-11 items-center justify-center rounded bg-dark-gray shadow"
        >
          <MoreIcon stroke="white" className="h-7 w-7" />
        </Link>
      </div>

      <AccountRecoveryLinks />
    </div>
  );
}

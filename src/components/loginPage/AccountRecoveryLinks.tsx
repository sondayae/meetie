'use client';

import Link from 'next/link';

import ROUTE_PATH from '@/constants/route';

function AccountRecoveryLinks() {
  return (
    <div className="flex justify-center gap-3">
      <Link
        href={ROUTE_PATH.AUTH.SIGN_UP}
        className="text-xs font-medium text-muted-foreground"
      >
        회원가입하기
      </Link>
      <div className="relative top-[-2px] h-2.5 w-[1px] translate-y-1/2 bg-[#c4c4c4]"></div>
      <Link
        href={ROUTE_PATH.AUTH.FIND_PASSWORD}
        className="text-xs font-medium text-[#ADB5Bd]"
      >
        비밀번호 찾기
      </Link>
    </div>
  );
}
export default AccountRecoveryLinks;

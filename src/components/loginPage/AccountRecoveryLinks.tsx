'use client';

import Link from 'next/link';

import ROUTE_PATH from '@/constants/route';

function AccountRecoveryLinks() {
  return (
    <div className="flex justify-center gap-3">
      <Link
        href={ROUTE_PATH.AUTH.SIGN_UP}
        className="border-r border-[#c4c4c4] pr-3 text-xs font-medium text-muted-foreground"
      >
        회원가입하기
      </Link>
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

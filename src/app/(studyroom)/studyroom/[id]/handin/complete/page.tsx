'use client';
import Button from '@/components/common/Button';
import FireWork from '@/components/common/Firework';
import GradientCheckSign from '@/components/icons/GradientCheckSign';
import Link from 'next/link';

const page = () => {
  const border = 'bg-gradient-to-br from-[#B3BBFF] to-[#CED3FF]';
  const background = 'bg-gradient-to-bl from-[#7273FF] to-[#B8B9FF]';

  return (
    <div className="my-[180px] flex flex-col items-center justify-center gap-[100px]">
      <div className="relative">
        <FireWork />
        <div className="relative flex flex-col items-center gap-10">
          <GradientCheckSign />
          <span className="text-3xl font-bold">과제 인증 완료!</span>
        </div>
      </div>
      <div className="flex w-full max-w-[340px] flex-col gap-3">
        <Link href={'./add'}>
          <Button type="primary" label="계속하기" size="large" />
        </Link>
        <Link href={'./'}>
          <Button label="과제 페이지로 가기" size="large" />
        </Link>
      </div>
    </div>
  );
};
export default page;

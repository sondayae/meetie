'use client';
import Button from '@/components/common/Button';
import FireWork from '@/components/common/Firework';
import GradientCheckSign from '@/components/icons/GradientCheckSign';
import Link from 'next/link';

type CompleteModalProps = {
  label: string;
  studyId: string;
};

export default function CompleteModal({ label, studyId }: CompleteModalProps) {
  const border = 'bg-gradient-to-br from-[#B3BBFF] to-[#CED3FF]';
  const background = 'bg-gradient-to-bl from-[#7273FF] to-[#B8B9FF]';

  return (
    <div className="fixed top-0 z-50 flex h-full w-full max-w-[600px] flex-col items-center justify-center gap-[100px] bg-white py-[180px]">
      <div className="relative">
        <FireWork />
        <div className="relative flex flex-col items-center gap-10">
          <GradientCheckSign />
          <span className="text-2xl font-bold">{label}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link href={`/study/${studyId}`}>
          <Button type="primary" label="스터디 상세보기" size="large" />
        </Link>
        <Link href={'../search'}>
          <Button label="돌아가기" size="large" type={'secondary'} />
        </Link>
      </div>
    </div>
  );
}

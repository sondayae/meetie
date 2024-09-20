import Button from '@/components/common/Button';
import FireWork from '@/components/common/Firework';
import GradientCheckSign from '@/components/icons/GradientCheckSign';
import Link from 'next/link';

export default function FeedbackCompletePage() {
  return (
    <div className="flex flex-grow flex-col">
      <div className="relative m-auto">
        <FireWork />
        <div className="relative flex flex-col items-center gap-10">
          <GradientCheckSign />
          <span className="text-3xl font-bold">과제 인증 완료!</span>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-3 px-4 pb-4">
        <Link href={'./add'}>
          <Button type="primary" label="계속하기" size="large" />
        </Link>
        <Link href={'./'}>
          <Button label="돌아가기" size="large" />
        </Link>
      </div>
    </div>
  );
}

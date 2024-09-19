import Button from '@/components/common/Button';
import FireWork from '@/components/common/Firework';
import GradientCheckSign from '@/components/icons/GradientCheckSign';
import Link from 'next/link';

export default function FeedbackCompletePage() {
  return (
  <div className='flex flex-col flex-grow'>
    <div className='m-auto relative'>
      <FireWork />
      <div className='flex flex-col relative gap-10 items-center'>
        <GradientCheckSign />
        <span className='text-3xl font-bold'>과제 인증 완료!</span>
      </div>
    </div>
    <div className='flex flex-col gap-3 mt-auto pb-4'>
      <Link href={'./add'}>
        <Button type='primary' label='계속하기' size='large' />
      </Link>
      <Link href={'./'}>
        <Button label='돌아가기' size='large' />
      </Link>
    </div>
  </div>
  )
}
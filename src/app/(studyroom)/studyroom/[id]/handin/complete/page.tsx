'use client';
import Button from '@/components/common/Button'
import FireWork from '@/components/common/Firework';
import GradientCheckSign from '@/components/icons/GradientCheckSign';
import Link from 'next/link';

const page = () => {
  const border = 'bg-gradient-to-br from-[#B3BBFF] to-[#CED3FF]';
  const background = 'bg-gradient-to-bl from-[#7273FF] to-[#B8B9FF]';

  return (
      <div className='flex flex-col items-center justify-center gap-[100px] my-[180px]'>
        <div className='relative'>
          <FireWork />
          <div className='flex flex-col relative gap-10 items-center'>
            <GradientCheckSign />
            <span className='text-3xl font-bold'>과제 인증 완료!</span>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
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
export default page
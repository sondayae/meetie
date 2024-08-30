'use client';
import Button from '@/components/common/Button'
import CheckSign from '@/components/handin/CheckSign'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();
  const border = 'bg-gradient-to-br from-[#B3BBFF] to-[#CED3FF]';
  const background = 'bg-gradient-to-bl from-[#7273FF] to-[#B8B9FF]';

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mt-[200px] mb-[40px]'>
        <CheckSign fill='fill-white' background={`${background}`} border={`${border}`} size='large'/>
      </div>
      <div className='mb-[200px]'>
        <span className='text-3xl font-bold'>과제 인증 완료!</span>
      </div>
      <div className='mb-[12px]'>
        <Button type='primary' label='계속하기' size='large' onClick={() => router.push('./add')}/>
      </div>
      <div>
        <Button label='돌아가기' size='large' onClick={() => router.push('./')}/>
      </div>
    </div>
  )
}
export default page
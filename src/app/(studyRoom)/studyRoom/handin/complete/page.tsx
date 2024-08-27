import Button from '@/components/common/Button'
import CheckSign from '@/components/handin/CheckSign'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mt-[200px] mb-[40px]'>
        <CheckSign />
      </div>
      <div className='mb-[200px]'>
        <span className='text-3xl font-bold'>과제 인증 완료!</span>
      </div>
      <div className='mb-[12px]'>
        <Button type='primary' label='계속하기' size='large'/>
      </div>
      <div>
        <Button label='돌아가기' size='large'/>
      </div>
    </div>
  )
}
export default page
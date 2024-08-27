import UpdownArrowIcon from '../icons/UpdownArrowIcon'
import Mark from '../common/Mark'

const SelectBox = () => {
  return (
    <div className='h-[70px] bg-white border-2 border-light-gray rounded-md'>
    <div className='flex'>
        <div className='flex flex-col justify-center items-center w-[18px] h-[40px] bg-[#F7F3FF] border border-[#EBE9F5] rounded-lg m-[16px]'>
          <UpdownArrowIcon className='w-5 h-5'/>
        </div>
        <div className='flex flex-col justify-center flex-grow'>
          <span className='text-base font-medium mb-[2px]'>콜로소 인강 1강 완강 인증하기</span>
          <span className='text-xs text-gray-purple'>강의 과제 화면 캡쳐</span>
        </div>
        <div className='flex flex-col justify-end items-end mb-[18px] mr-[18px]'>
          <Mark />
        </div>
    </div>
    </div>
  )
}
export default SelectBox
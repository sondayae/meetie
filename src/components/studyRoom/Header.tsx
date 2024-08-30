'use client';
import PlusIcon from '../icons/PlusIcon';
import SelectBox from './SelectBox';

const Header = () => {
  return (
    <div className="bg-[#E3E3FA]">
      <div className="flex justify-between pb-[17px] mx-[16px]">
        <span>스터디룸</span>
        <PlusIcon className="h-5 w-5 fill-black stroke-black" />
      </div>
      <div className="flex justify-end mr-[16px]">
        <div>
          <span className="bg-sub-purple p-2">진행중 3</span>
          <span className="text-middle-gray bg-white p-2">진행완료</span>
        </div>
      </div>
      <SelectBox />
    </div>
  )
}
export default Header
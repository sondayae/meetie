'use client';

import { Dispatch, SetStateAction } from 'react';
import UpdownArrowIcon from '../icons/UpdownArrowIcon';

type SelectBoxProps = {
  selected: {
    title: string;
    subtitle: string;
  }|undefined,
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function SelectBox({ selected, setShowModal }: SelectBoxProps) {
  

  return (
    <div className='p-[16px] border b-[#E9E9E9] rounded-lg shadow bg-white hover:bg-[#efefef] hover:cursor-pointer'  onClick={() => setShowModal(true)}>
      <div className='flex gap-[17px]'>
        <span className='bg-[#F7F3FF] py-[11.5px] border-[#E9E9E9] border rounded-xl'>
          <UpdownArrowIcon />
        </span>
        <div className='flex flex-col'>
          <span className='font-medium'>{selected && selected.title}</span>
          <span className='text-gray-purple text-xs'>{selected && selected.subtitle}</span>
        </div>
      </div>
    </div>
  );
}
export default SelectBox;

'use client';

import { Dispatch, SetStateAction } from 'react';

import UpdownArrowIcon from '../icons/UpdownArrowIcon';

type SelectBoxProps = {
  selected:
    | {
        title: string;
        subtitle: string;
      }
    | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function SelectBox({ selected, setShowModal }: {selected: any, setShowModal: any}) {
  return (
    <div
      className="b-[#E9E9E9] rounded-lg border bg-white p-[16px] shadow delay-75 hover:cursor-pointer hover:bg-[#efefef]"
      onClick={() => setShowModal(true)}
    >
      <div className="flex gap-[17px]">
        <span className="rounded-xl border border-[#E9E9E9] bg-[#F7F3FF] py-[11.5px]">
          <UpdownArrowIcon />
        </span>
        <div className="flex flex-col">
          <span className="font-medium">{selected && selected.title}</span>
          <span className="text-xs text-gray-purple">
            {selected && selected.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
export default SelectBox;

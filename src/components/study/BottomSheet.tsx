import { useState } from 'react';
// import CheckSign from '../handin/CheckSign';
import UnCheckedIcon from '../icons/UncheckedIcon';
import CheckedIcon from '../icons/CheckedIcon';

type BottomSheetProps = {
  title: string;
  data: any[];
  bottomSheet: boolean;
  onClick: () => void;
  selectedItems: any[];
  onSelect: (item: any) => void;
  setSelectedItems: (item: any) => void;
};

export default function BottomSheet({
  title,
  data,
  bottomSheet,
  onClick,
  selectedItems,
  onSelect,
  setSelectedItems,
}: BottomSheetProps) {
  const handleItemClick = (item: any) => {
    onSelect(item);
  };
  return (
    <>
      {/* scrim */}
      <div
        onClick={onClick}
        className={`ease-out-expo fixed left-[50%] top-0 z-10 h-full w-full max-w-[600px] translate-x-[-50%] bg-black bg-opacity-30 transition-opacity duration-300 ${
          bottomSheet ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* content */}
        <div
          className={`transform px-5 py-10 transition-transform duration-400 ease-in-out ${
            bottomSheet ? 'translate-y-0' : 'translate-y-full'
          } absolute bottom-0 h-auto w-full max-w-[600px] rounded-t-lg bg-white shadow-[0_2px_8px_0px_rgb(0,0,0,0.16)]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between">
            <div>
              {/* title */}
              <h3 className="mb-1 text-xl font-semibold">{title}</h3>
              {/* p */}
              <p className="mb-5 text-xs text-[#9d9d9d]">중복선택도 가능해요</p>
            </div>
            {/* 전체선택 */}
            <span
              className="cursor-pointer border-b-2 border-b-[#e9e9e9] text-xs text-[#999999]"
              onClick={() => setSelectedItems(data)}
            >
              전체선택
            </span>
          </div>
          {/* multi-select list */}
          <ul className="rounded-lg border border-[#F3F3F3]">
            {data.map((item, index) => (
              <li
                key={index}
                className="flex cursor-pointer border-b border-b-[#e9e9e9] px-3 py-4 font-semibold [&:last-child]:border-none"
                onClick={() => handleItemClick(item)}
              >
                {item}
                <div className="relative ml-auto">
                  {/* 선택 아이콘 */}
                  {selectedItems && selectedItems.includes(item) ? (
                    <CheckedIcon className="" />
                  ) : (
                    <UnCheckedIcon className="" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

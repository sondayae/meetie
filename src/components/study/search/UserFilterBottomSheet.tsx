'use client';

import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import CheckIcon from '@/components/icons/CheckIcon';
import { useState } from 'react';

type BottomSheetProps = {
  title: string;
  onConfirm: () => void;

  filterOptions: string[];
  filterLabels: string[];
  selectedFilter: string | null;
  onFilterClick: (filter: string) => void;
  filterTags: {
    job: string | null;
    studySpan: string | null;
    purpose: string[];
    personality: string[];
  };
  onTagRemove: (tag: string) => void;
  onOptionClick: (option: string) => void;
  bottomSheet: boolean;
  onClick: () => void;
};

export default function UserFilterBottomSheet({
  title,
  onConfirm,

  filterOptions,
  filterLabels,
  selectedFilter,
  onFilterClick,
  filterTags,
  onTagRemove,
  onOptionClick,
  onClick,
  bottomSheet,
}: BottomSheetProps) {
  const [activeOption, setActiveOption] = useState();

  const handleOptionClick = (option: any) => {
    setActiveOption(option);
    onOptionClick(option);
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
          className={`duration-400 transform px-5 py-10 transition-transform ease-in-out ${
            bottomSheet ? 'translate-y-0' : 'translate-y-full'
          } absolute bottom-0 h-auto w-full max-w-[600px] rounded-t-lg bg-white shadow-[0_2px_8px_0px_rgb(0,0,0,0.16)]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex">
            {/* 왼쪽 필터 항목 */}
            <div className="w-2/5 min-w-28 border-r border-[#eeeeee] p-2">
              {filterLabels.map((label) => (
                <button
                  key={label}
                  className={`block w-full p-2 text-left ${selectedFilter === label ? 'rounded-lg bg-muted font-medium text-primary' : ''}`}
                  onClick={() => onFilterClick(label)}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* 오른쪽 필터 옵션 */}
            <div className="max-h-[170px] w-2/3 overflow-y-auto p-2">
              {filterOptions.length > 0 ? (
                <ul className="pl-2">
                  {filterOptions.map((option) => (
                    <li
                      key={option}
                      className={`flex cursor-pointer items-center rounded-lg p-2 ${
                        activeOption === option
                          ? 'bg-muted font-medium text-primary'
                          : ''
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                      {activeOption === option && (
                        <CheckIcon className="ml-2 h-4 w-4 stroke-primary" />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>선택된 필터가 없습니다.</p>
              )}
            </div>
          </div>
          {/* 태그 영역 */}

          <div className="my-4">
            <div className="flex flex-wrap gap-2">
              {[
                filterTags.job,
                filterTags.studySpan,
                ...filterTags.purpose,
                ...filterTags.personality,
              ]
                .filter((tag): tag is string => tag !== null)
                .map((tag) => (
                  <Tag
                    key={tag}
                    className="mr-0 flex items-center border-primary bg-accent px-[11px] py-[2px] text-primary"
                  >
                    {tag}
                    <button
                      className="ml-2 text-primary"
                      onClick={() => onTagRemove(tag)}
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </Tag>
                ))}
            </div>
          </div>
          {/* 확인 및 취소 버튼 */}
          <div className="mt-4 flex gap-4">
            <Button
              label="결과 보기"
              type="primary"
              size="small"
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </>
  );
}

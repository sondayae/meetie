'use client';

import Button from '@/components/common/Button';

type TModal = {
  title: string | undefined;
  onConfirm: () => void;
  onCancel: () => void;
  filterOptions: string[]; // 필터 옵션 배열
  filterLabels: string[]; // 필터 항목 레이블
  selectedFilter: string | null; // 선택된 필터 항목
  onFilterClick: (filter: string) => void; // 필터 클릭 핸들러
  selectedTags: string[]; // 선택된 태그들
  onTagRemove: (tag: string) => void; // 태그 제거 핸들러
  onOptionClick: (option: string) => void; // 옵션 클릭 핸들러
};

function FilterModal({
  title,
  onConfirm,
  onCancel,
  filterOptions,
  filterLabels,
  selectedFilter,
  onFilterClick,
  selectedTags,
  onTagRemove,
  onOptionClick,
}: TModal) {
  return (
    <div className="relative mx-auto max-w-lg rounded-lg bg-white shadow dark:bg-gray-700">
      <div className="p-4 md:p-5">
        {/* 모달 제목과 설명 */}
        <h1 className="text-xl font-semibold">{title}</h1>

        <div className="flex">
          {/* 왼쪽 필터 항목 */}
          <div className="w-1/3 border-r border-gray-300 p-2">
            {filterLabels.map((label) => (
              <button
                key={label}
                className={`block w-full p-2 text-left ${selectedFilter === label ? 'bg-gray-200' : ''}`}
                onClick={() => onFilterClick(label)}
              >
                {label}
              </button>
            ))}
          </div>
          {/* 오른쪽 필터 옵션 */}
          <div className="max-h-[170px] w-2/3 overflow-y-auto p-2">
            {filterOptions.length > 0 ? (
              <ul className="list-disc pl-5">
                {filterOptions.map((option) => (
                  <li
                    key={option}
                    className="mb-1 cursor-pointer"
                    onClick={() => onOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            ) : (
              <p>선택된 필터가 없습니다.</p>
            )}
          </div>
        </div>
        {/* 태그 영역 */}
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            >
              {tag}
              <button
                className="ml-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
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
            </span>
          ))}
        </div>
        {/* 확인 및 취소 버튼 */}
        <div className="mt-4 flex gap-4">
          <Button
            label="확인"
            type="primary"
            size="small"
            onClick={onConfirm}
          />
          <Button label="닫기" size="small" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default FilterModal;

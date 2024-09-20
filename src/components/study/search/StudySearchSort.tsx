import { useFilterStore } from '@/stores/search/useFilterStore';
import { Study } from '@/types/study';
import { useEffect, useState } from 'react';

type StudySearchSortProps = {
  loading: boolean;
  setSelectedFilter: (filter: string) => void;
};

export default function StudySearchSort({
  loading,
  setSelectedFilter,
}: StudySearchSortProps) {
  const { filteredList, originalList } = useFilterStore();

  return (
    <>
      <div className={'mx-4 my-5 flex justify-between text-xs text-[#555555]'}>
        {loading ? (
          <div
            className={'h-4 w-9 animate-pulse rounded-sm bg-[#f1f1f1]'}
          ></div>
        ) : (
          `총 ${filteredList?.length}건`
        )}
        <div>
          <select onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="desc">최신순</option>
            <option value="viewCount">조회수순</option>
          </select>

          {/* <select className="ml-4">
            <option>등록일 전체</option>
            <option>최근 1주일</option>
            <option>최근 1개월</option>
          </select> */}
        </div>
      </div>
    </>
  );
}

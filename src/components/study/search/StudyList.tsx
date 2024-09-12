'use client';

import SearchSkeleton from './SearchSkeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Study } from '@/types/study';
import { useFilterStore } from '@/stores/search/useFilterStore';
import { useEffect } from 'react';
import StudyListItem from './StudyListItem';

type StudyListProps = {
  loading: boolean;
  studySearchTerm: string;
  originalList: Study[];
};

export default function StudyList({
  loading,
  studySearchTerm,
  originalList,
}: StudyListProps) {
  const { filteredList, isRecruiting, setIsRecruiting, setStudyList } =
    useFilterStore();

  useEffect(() => {
    if (studySearchTerm.length > 0) {
      const filteredStudies = originalList.filter((study) =>
        study.title.toLowerCase().includes(studySearchTerm.toLowerCase()),
      );
      setStudyList(filteredStudies);
    } else {
      setStudyList(originalList); // 검색어가 없을 때는 전체 리스트로 복구
    }
  }, [studySearchTerm]);

  return (
    <>
      <div className="flex min-h-dvh w-full flex-col gap-4 bg-[#fafafa] px-4 pb-[100px] pt-4">
        <div className={'flex items-center gap-2 text-sm'}>
          {loading ? (
            <div
              className={
                'h-5 w-24 animate-pulse rounded-sm bg-[#f1f1f1] shadow-[0_4px_4px_rgb(0,0,0,0.03)]'
              }
            />
          ) : (
            <>
              <Checkbox
                id={'isRecruting'}
                className={
                  'h-4 w-4 border-[#999999] data-[state=checked]:bg-[#837486]'
                }
                onClick={() => setIsRecruiting(!isRecruiting)}
              />
              <label htmlFor={'isRecruting'} className={'text-[#777777]'}>
                {' '}
                모집중만 보기
              </label>
            </>
          )}
        </div>
        {loading && <SearchSkeleton />}
        {filteredList.length > 0 ? (
          filteredList.map((study) => (
            <StudyListItem key={study.id} study={study} />
          ))
        ) : (
          <p className="text-center text-[#777777]">검색 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
}

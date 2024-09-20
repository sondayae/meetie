import FilterIcon from '@/components/icons/FilterIcon';
import { useFilterStore } from '@/stores/search/useFilterStore';
import { useState } from 'react';
import { purposes, studySpans } from '@/lib/profileConstants';
import StudyFilterBottomSheet from './StudyFilterBottomSheet';
import { Study } from '@/types/study';

export default function StudyFilter({ allTags }: { allTags: string[] }) {
  const { activeTag, setActiveTag } = useFilterStore();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    '모집 직군',
  );

  type FilterTags = {
    // 모집 직군
    roles: string | null;
    // 스터디 목적
    purposes: string[];
    // 스터디 기간
    studySpan: string | null;
    // 모집 인원
    recruitNum: string | null;
  };

  // 모집 인원 range
  const recruitNum = ['1-2명', '3-5명', '6-10명', '11-15명', '16-20명'];
  const roles = ['개발자', '디자이너', '기획자'];

  const FILTER_OPTIONS: Record<string, string[]> = {
    '모집 직군': roles,
    '스터디 목적': purposes,
    '스터디 기간': studySpans,
    '모집 인원': recruitNum,
  };

  // 실제 적용된 필터 태그 (필터 아이콘 옆에 표시)
  const [filterTags, setFilterTags] = useState<FilterTags>({
    roles: null,
    purposes: [],
    studySpan: null,
    recruitNum: null,
  });

  // 임시로 선택된 필터 태그 (바텀시트 안에서 선택 중인 상태)
  const [tempFilterTags, setTempFilterTags] = useState<FilterTags>({
    roles: null,
    purposes: [],
    studySpan: null,
    recruitNum: null,
  });

  // const [studies, setStudies] = useState<Study[]>([]);
  const { filteredList, setStudyList } = useFilterStore();

  const handleConfirm = async () => {
    // 임시 태그를 실제 태그로 적용
    setFilterTags(tempFilterTags);
    await fetchStudies(tempFilterTags); // 검색 수행
    setIsBottomSheetOpen(false); // 바텀시트 닫기
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleOptionClick = (option: string) => {
    const tagKey =
      selectedFilter === '모집 직군'
        ? 'roles'
        : selectedFilter === '스터디 목적'
          ? 'purposes'
          : selectedFilter === '스터디 기간'
            ? 'studySpan'
            : 'recruitNum';

    setTempFilterTags((prevTags) => ({
      ...prevTags,
      [tagKey]: Array.isArray(prevTags[tagKey])
        ? (prevTags[tagKey] as string[]).includes(option)
          ? (prevTags[tagKey] as string[]).filter((tag) => tag !== option)
          : [...(prevTags[tagKey] as string[]), option]
        : option,
    }));
  };

  const handleTagRemove = (tag: string) => {
    // 바텀시트 내에서 선택된 태그를 제거
    setTempFilterTags((prevTags) => ({
      ...prevTags,
      roles: prevTags.roles === tag ? null : prevTags.roles,
      purposes: prevTags.purposes.filter((t) => t !== tag),
      studySpan: prevTags.studySpan === tag ? null : prevTags.studySpan,
      recruitNum: prevTags.recruitNum === tag ? null : prevTags.recruitNum,
    }));
  };

  const handleResetFilters = () => {
    setTempFilterTags({
      roles: null,
      purposes: [],
      studySpan: null,
      recruitNum: null,
    });
    setFilterTags({
      roles: null,
      purposes: [],
      studySpan: null,
      recruitNum: null,
    });
    fetchStudies({
      roles: null,
      purposes: [],
      studySpan: null,
      recruitNum: null,
    });
  };

  type StudyResponse = {
    studies: Study[];
  };

  const fetchStudies = async (filters: FilterTags) => {
    try {
      const tags = [
        filters.roles,
        ...filters.purposes,
        filters.studySpan,
        filters.recruitNum,
      ].filter((tag): tag is string => tag !== null);

      // console.log('스터디 페치:', tags);

      const response = await fetch('/api/search/study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters }),
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data: StudyResponse = await response.json(); // 타입 명시
      const studies = data.studies;

      // 모집 중 필터 적용
      let filteredStudies = studies;
      if (useFilterStore.getState().isRecruiting) {
        filteredStudies = filteredStudies.filter(
          (study: Study) => study.isRecruiting,
        );
      }

      // 태그 필터 적용
      if (useFilterStore.getState().activeTag !== '전체') {
        filteredStudies = filteredStudies.filter((study: Study) =>
          study.tags.includes(useFilterStore.getState().activeTag),
        );
      }

      // 정렬 및 필터 적용
      const sortedStudies =
        useFilterStore.getState().selectedFilter === 'viewCount'
          ? filteredStudies.sort(
              (a: Study, b: Study) => Number(b.viewCount) - Number(a.viewCount),
            )
          : filteredStudies.sort(
              (a: Study, b: Study) =>
                new Date(String(b.created_at)).getTime() -
                new Date(String(a.created_at)).getTime(),
            );

      setStudyList(sortedStudies);

      // console.log('페치 스터디:', data.studies);
    } catch (error) {
      console.error('사용자 검색 중 오류 발생:', error);
    }
  };

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div className={'flex items-baseline justify-between'}>
        {/* 필터 아이콘 */}
        <div className="ml-4 w-full overflow-x-auto">
          <ul className="flex gap-2 whitespace-nowrap">
            {allTags?.length > 0
              ? ['전체', ...allTags].map((tag, index) => (
                  <li
                    className={`cursor-pointer rounded-sm border px-2 py-0.5 text-sm ${
                      activeTag === tag
                        ? 'border-primary text-primary'
                        : 'border-[#E1E1E1] text-[#aaaaaa]'
                    }`}
                    key={index}
                    onClick={() => setActiveTag(tag)}
                  >
                    #{tag}
                  </li>
                ))
              : [...Array(10)].map((_, index) => (
                  <li
                    key={index}
                    className={
                      'mb-2.5 mt-[5px] h-[26px] min-w-12 animate-pulse cursor-pointer rounded-sm bg-[#f1f1f1] px-2 py-0.5 text-sm text-[#aaaaaa]'
                    }
                  ></li>
                ))}
          </ul>
        </div>

        <FilterIcon
          onClick={() => setIsBottomSheetOpen(true)}
          className={'mt-1 self-start'}
        />
        <StudyFilterBottomSheet
          title="검색 조건을 선택해주세요"
          onConfirm={handleConfirm} // 결과보기 클릭 시 임시 태그를 실제 태그로 적용
          filterOptions={FILTER_OPTIONS[selectedFilter || ''] || []}
          filterLabels={Object.keys(FILTER_OPTIONS)}
          selectedFilter={selectedFilter}
          onFilterClick={handleFilterClick}
          filterTags={tempFilterTags} // 바텀시트에서 사용하는 태그는 임시 태그
          onTagRemove={handleTagRemove}
          onOptionClick={handleOptionClick}
          bottomSheet={isBottomSheetOpen}
          onClick={handleClose}
          onResetFilters={handleResetFilters}
        />
      </div>
    </>
  );
}

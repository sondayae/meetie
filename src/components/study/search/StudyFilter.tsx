import FilterIcon from '@/components/icons/FilterIcon';
import { useFilterStore } from '@/stores/search/useFilterStore';
import { useState } from 'react';
import { jobs, purposes, studySpans } from '@/lib/profileConstants';
import StudyFilterBottomSheet from './StudyFilterBottomSheet';

export default function StudyFilter({ allTags }: { allTags: string[] }) {
  const { activeTag, setActiveTag } = useFilterStore();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  type User = {
    id: string;
    name: string;
  };

  type FilterTags = {
    // 모집 직군
    job: string | null;
    // 스터디 기간
    studySpan: string | null;
    // 스터디 목적
    purpose: string[];
    // 모집 인원
    studyMemberCount: string[];
  };

  // 모집 인원 range
  const studyMemberCount = ['1-2명', '3-5명', '6-10명', '11-15명', '16-20명'];

  const FILTER_OPTIONS: Record<string, string[]> = {
    '모집 직군': jobs,
    '스터디 목적': purposes,
    '스터디 기간': studySpans,
    '모집 인원': studyMemberCount,
  };

  // 실제 적용된 필터 태그 (필터 아이콘 옆에 표시)
  const [filterTags, setFilterTags] = useState<FilterTags>({
    job: null,
    studySpan: null,
    purpose: [],
    studyMemberCount: [],
  });

  // 임시로 선택된 필터 태그 (바텀시트 안에서 선택 중인 상태)
  const [tempFilterTags, setTempFilterTags] = useState<FilterTags>({
    job: null,
    studySpan: null,
    purpose: [],
    studyMemberCount: [],
  });

  const [users, setUsers] = useState<User[]>([]);

  const handleConfirm = async () => {
    // 임시 태그를 실제 태그로 적용
    setFilterTags(tempFilterTags);
    await fetchUsers(tempFilterTags); // 검색 수행
    setIsBottomSheetOpen(false); // 바텀시트 닫기
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleOptionClick = (option: string) => {
    const tagKey =
      selectedFilter === '직무'
        ? 'job'
        : selectedFilter === '스터디 기간'
          ? 'studySpan'
          : selectedFilter === '스터디 목적'
            ? 'purpose'
            : 'studyMemberCount';

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
      job: prevTags.job === tag ? null : prevTags.job,
      studySpan: prevTags.studySpan === tag ? null : prevTags.studySpan,
      purpose: prevTags.purpose.filter((t) => t !== tag),
      personality: prevTags.studyMemberCount.filter((t) => t !== tag),
    }));
  };

  const fetchUsers = async (filters: FilterTags) => {
    try {
      const tags = [
        filters.job,
        filters.studySpan,
        ...filters.purpose,
        ...filters.studyMemberCount,
      ].filter((tag): tag is string => tag !== null);

      console.log('Fetching users with filters:', tags);

      const response = await fetch('/api/search/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters }),
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      setUsers(data.users);
      console.log('Fetched Users:', data.users);
    } catch (error) {
      console.error('사용자 검색 중 오류 발생:', error);
    }
  };

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div className={'flex justify-between'}>
        {/* 필터 아이콘 */}
        <ul className={'flex flex-wrap gap-2'}>
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
                    'h-[26px] min-w-12 animate-pulse cursor-pointer rounded-sm bg-[#f1f1f1] px-2 py-0.5 text-sm text-[#aaaaaa]'
                  }
                ></li>
              ))}
        </ul>
        <FilterIcon onClick={() => setIsBottomSheetOpen(true)} />
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
        />
      </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import {
  jobs,
  purposes,
  personalities,
  studySpans,
} from '@/lib/profileConstants';
import FilterIcon from '@/components/icons/FilterIcon';
import Tag from '@/components/common/Tag';
import UserFilterBottomSheet from './UserFilterBottomSheet';

type User = {
  id: string;
  name: string;
};

type FilterTags = {
  job: string | null;
  studySpan: string | null;
  purpose: string[];
  personality: string[];
};

const FILTER_OPTIONS: Record<string, string[]> = {
  직무: jobs,
  '스터디 목적': purposes,
  '작업 스타일': personalities,
  '스터디 기간': studySpans,
};

export type UserCardProps = {
  name: string;
  nickname?: string;
  job: string;
  personality?: string[];
  imageUrl: string;
};

interface UserFilterProps {
  onUsersUpdate: (users: UserCardProps[]) => void; // Update this type to User[] for consistency
}

export default function UserFilter({ onUsersUpdate }: UserFilterProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // 실제 적용된 필터 태그 (필터 아이콘 옆에 표시)
  const [filterTags, setFilterTags] = useState<FilterTags>({
    job: null,
    studySpan: null,
    purpose: [],
    personality: [],
  });

  // 임시로 선택된 필터 태그 (바텀시트 안에서 선택 중인 상태)
  const [tempFilterTags, setTempFilterTags] = useState<FilterTags>({
    job: null,
    studySpan: null,
    purpose: [],
    personality: [],
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
            : 'personality';

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
      personality: prevTags.personality.filter((t) => t !== tag),
    }));
  };

  const fetchUsers = async (filters: FilterTags) => {
    try {
      const tags = [
        filters.job,
        filters.studySpan,
        ...filters.purpose,
        ...filters.personality,
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
      onUsersUpdate(data.users); // 필터링된 사용자 목록을 상위 컴포넌트에 전달
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
      <div className="mb-4 flex items-center justify-between">
        {/* 선택된 태그들 (필터 아이콘 옆에 표시) */}
        <div className="flex flex-grow flex-nowrap overflow-x-auto whitespace-nowrap">
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
                className="border-primary bg-accent px-[11px] py-[2px] text-primary"
              >
                {tag}
              </Tag>
            ))}
        </div>

        {/* 필터 아이콘 */}
        <FilterIcon onClick={() => setIsBottomSheetOpen(true)} />
      </div>

      <UserFilterBottomSheet
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
    </>
  );
}

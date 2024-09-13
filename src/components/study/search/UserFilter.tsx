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
  id: string;
  name: string;
  nickname?: string;
  job: string;
  personality?: string[];
  imageUrl: string;
};

interface UserFilterProps {
  onUsersUpdate: (users: UserCardProps[]) => void;
  currentFilters: FilterTags; // 현재 필터 상태를 받습니다
  onFiltersChange: (filters: FilterTags) => void; // 필터 상태 변경 콜백
  userSearchTerm: string; // 추가
}

export default function UserFilter({
  onUsersUpdate,
  currentFilters,
  onFiltersChange,
  userSearchTerm,
}: UserFilterProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('직무');
  const [tempFilterTags, setTempFilterTags] =
    useState<FilterTags>(currentFilters);

  const handleConfirm = async () => {
    onFiltersChange(tempFilterTags); // 필터 상태를 상위 컴포넌트에 전달
    await fetchUsers(tempFilterTags, userSearchTerm); // 검색 수행
    setIsBottomSheetOpen(false);
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
    setTempFilterTags((prevTags) => ({
      ...prevTags,
      job: prevTags.job === tag ? null : prevTags.job,
      studySpan: prevTags.studySpan === tag ? null : prevTags.studySpan,
      purpose: prevTags.purpose.filter((t) => t !== tag),
      personality: prevTags.personality.filter((t) => t !== tag),
    }));
  };

  const handleResetFilters = () => {
    setTempFilterTags({
      job: null,
      purpose: [],
      studySpan: null,
      personality: [],
    });
    fetchUsers(
      {
        job: null,
        purpose: [],
        studySpan: null,
        personality: [],
      },
      userSearchTerm,
    );
  };

  const fetchUsers = async (filters: FilterTags, searchTerm: string) => {
    try {
      const tags = [
        filters.job,
        filters.studySpan,
        ...filters.purpose,
        ...filters.personality,
      ].filter((tag): tag is string => tag !== null);

      const response = await fetch('/api/search/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters, searchTerm }),
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      onUsersUpdate(data.users); // 필터링된 사용자 목록을 상위 컴포넌트에 전달
    } catch (error) {
      console.error('사용자 검색 중 오류 발생:', error);
    }
  };

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="ml-4 flex flex-grow flex-nowrap gap-2 overflow-x-auto whitespace-nowrap">
          {[
            currentFilters.job,
            currentFilters.studySpan,
            ...currentFilters.purpose,
            ...currentFilters.personality,
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
        <FilterIcon onClick={() => setIsBottomSheetOpen(true)} />
      </div>

      <UserFilterBottomSheet
        title="검색 조건을 선택해주세요"
        onConfirm={handleConfirm}
        filterOptions={FILTER_OPTIONS[selectedFilter || ''] || []}
        filterLabels={Object.keys(FILTER_OPTIONS)}
        selectedFilter={selectedFilter}
        onFilterClick={handleFilterClick}
        filterTags={tempFilterTags}
        onTagRemove={handleTagRemove}
        onOptionClick={handleOptionClick}
        bottomSheet={isBottomSheetOpen}
        onClick={handleClose}
        onResetFilters={handleResetFilters}
      />
    </>
  );
}

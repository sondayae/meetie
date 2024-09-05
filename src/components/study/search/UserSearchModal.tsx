'use client';

import { useState } from 'react';
import FilterModal from '@/components/study/search/FilterModal';
import {
  jobs,
  purposes,
  personalities,
  studySpans,
} from '@/lib/profileConstants';
import FilterIcon from '@/components/icons/FilterIcon';

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

export default function UserSearchModal() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterTags, setFilterTags] = useState<FilterTags>({
    job: null,
    studySpan: null,
    purpose: [],
    personality: [],
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = async () => {
    setIsModalOpen(false);
    await fetchUsers();
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

    setFilterTags((prevTags) => ({
      ...prevTags,
      [tagKey]: Array.isArray(prevTags[tagKey])
        ? (prevTags[tagKey] as string[]).includes(option)
          ? (prevTags[tagKey] as string[]).filter((tag) => tag !== option)
          : [...(prevTags[tagKey] as string[]), option]
        : option,
    }));
  };

  const handleTagRemove = (tag: string) => {
    setFilterTags((prevTags) => ({
      ...prevTags,
      job: prevTags.job === tag ? null : prevTags.job,
      studySpan: prevTags.studySpan === tag ? null : prevTags.studySpan,
      purpose: prevTags.purpose.filter((t) => t !== tag),
      personality: prevTags.personality.filter((t) => t !== tag),
    }));
  };

  const fetchUsers = async () => {
    try {
      const tags = [
        filterTags.job,
        filterTags.studySpan,
        ...filterTags.purpose,
        ...filterTags.personality,
      ].filter((tag): tag is string => tag !== null);

      console.log('Fetching users with filters:', tags);

      const response = await fetch('/api/search/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters: filterTags }),
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

  return (
    <div>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        <FilterIcon />
      </div>

      <FilterModal
        title="검색 조건을 선택해주세요"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        filterOptions={FILTER_OPTIONS[selectedFilter || ''] || []}
        filterLabels={Object.keys(FILTER_OPTIONS)}
        selectedFilter={selectedFilter}
        onFilterClick={handleFilterClick}
        selectedTags={[
          filterTags.job,
          filterTags.studySpan,
          ...filterTags.purpose,
          ...filterTags.personality,
        ].filter((tag): tag is string => tag !== null)}
        onTagRemove={handleTagRemove}
        onOptionClick={handleOptionClick}
      />

      <div>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

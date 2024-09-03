'use client';

import { useState } from 'react';
import FilterModal from '@/components/study/search/FilterModal';
import {
  jobs,
  purposes,
  personalities,
  studySpans,
} from '@/lib/profileConstants';

// 사용자 타입 정의
type User = {
  id: string;
  name: string;
  // 기타 사용자 정보
};

function Search() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 모달 취소 핸들러
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 모달 확인 핸들러
  const handleConfirm = async () => {
    setIsModalOpen(false);
    await fetchUsers(); // 사용자 검색 수행
  };

  // 필터 클릭 핸들러
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);

    switch (filter) {
      case '직무':
        setFilterOptions(jobs);
        break;
      case '스터디 목적':
        setFilterOptions(purposes);
        break;
      case '작업 스타일':
        setFilterOptions(personalities);
        break;
      case '스터디 기간':
        setFilterOptions(studySpans);
        break;
      default:
        setFilterOptions([]);
    }
  };

  // 필터 옵션 클릭 핸들러
  const handleOptionClick = (option: string) => {
    if (!selectedTags.includes(option)) {
      setSelectedTags([...selectedTags, option]);
    }
  };

  // 선택된 태그 제거 핸들러
  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  // 사용자 검색 요청
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/search/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: selectedFilter,
          tags: selectedTags,
        }),
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      console.log('Fetched Users:', data.users); // Log data for debugging
      setUsers(data.users); // 사용자 상태 업데이트
    } catch (error) {
      console.error('사용자 검색 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        {/* SVG 아이콘 추가 */}
      </div>

      <FilterModal
        title="필터"
        subtitle="필터"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        filterOptions={filterOptions}
        filterLabels={['직무', '스터디 목적', '작업 스타일', '스터디 기간']}
        selectedFilter={selectedFilter}
        onFilterClick={handleFilterClick}
        selectedTags={selectedTags}
        onTagRemove={handleTagRemove}
        onOptionClick={handleOptionClick}
      />

      <div>
        {/* 검색 결과 표시 */}
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

export default Search;

'use client';
import React, { useState } from 'react';
import SearchHeader from '@/components/study/search/SearchHeader';

import UserSearch from '@/components/study/search/UserSearch';

const ParentComponent: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [studySearchTerm, setStudySearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    if (index === 0) {
      setStudySearchTerm(''); // 스터디 찾기 탭으로 전환 시 검색어 초기화
    } else {
      setUserSearchTerm(''); // 팀원 찾기 탭으로 전환 시 검색어 초기화
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeTabIndex === 0) {
      setStudySearchTerm(e.target.value);
    } else {
      setUserSearchTerm(e.target.value);
    }
  };

  const getSearchTerm = () => {
    return activeTabIndex === 0 ? studySearchTerm : userSearchTerm;
  };

  return (
    <div>
      <SearchHeader
        activeTabIndex={activeTabIndex}
        onTabChange={handleTabChange}
        searchTerm={getSearchTerm()}
        onSearchChange={handleSearchChange}
      />

      <div className="mt-4">
        {activeTabIndex === 0 ? (
          '스터디찾기'
        ) : (
          <UserSearch searchTerm={userSearchTerm} />
        )}
      </div>
    </div>
  );
};

export default ParentComponent;

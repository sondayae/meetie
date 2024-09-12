'use client';
import React, { useState } from 'react';
import SearchHeader from '@/components/study/search/SearchHeader';
import UserSearch from '@/components/study/search/UserSearch';
import Navigator from '@/components/common/Navigator';
import StudySearch from '@/components/study/search/StudySearch';

export default function SearchPage() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [studySearchTerm, setStudySearchTerm] = useState('');
  const [studySearchTermEnter, setStudySearchTermEnter] = useState('');
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

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setStudySearchTermEnter(studySearchTerm);
    }
  };

  const getSearchTerm = () => {
    return activeTabIndex === 0 ? studySearchTerm : userSearchTerm;
  };

  return (
    <>
      <div className={'relative h-full min-h-dvh'}>
        <h1
          className={
            'sticky top-0 z-50 bg-white p-4 text-lg font-bold shadow-sm'
          }
        >
          탐색하기
        </h1>
        <div>
          <SearchHeader
            activeTabIndex={activeTabIndex}
            onTabChange={handleTabChange}
            searchTerm={getSearchTerm()}
            onSearchChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />

          <div className="mt-4">
            {activeTabIndex === 0 ? (
              <StudySearch studySearchTerm={studySearchTermEnter} />
            ) : (
              <UserSearch userSearchTerm={userSearchTerm} />
            )}
          </div>
        </div>
      </div>
      {/* 네비게이션바 */}
      <div className="fixed bottom-0 w-full max-w-[600px]">
        <Navigator />
      </div>
    </>
  );
}

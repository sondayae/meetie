'use client';
import React, { useState } from 'react';
import SearchHeader from '@/components/study/search/SearchHeader';

import UserSearch from '@/components/study/search/UserSearch';

import Navigator from '@/components/common/Navigator';
import WritingIcon from '@/components/icons/WritingIcon';
import SearchIcon from '@/components/icons/Navigator/Search';
import Link from 'next/link';
import StudyList from '@/components/study/search/StudyList';

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
    <>
      <div className={'relative h-dvh'}>
        <h1 className={'my-4 text-lg font-bold'}>탐색하기</h1>
        <div>
          <SearchHeader
            activeTabIndex={activeTabIndex}
            onTabChange={handleTabChange}
            searchTerm={getSearchTerm()}
            onSearchChange={handleSearchChange}
          />

          <div className="mt-4">
            {activeTabIndex === 0 ? (
              <StudyList />
            ) : (
              <UserSearch searchTerm={userSearchTerm} />
            )}
          </div>
        </div>
        {/* 스터디 만들기 바로가기 아이콘 */}
        <Link href="../study/write">
          <WritingIcon className="max-w-[600px]:right-6 fixed bottom-[100px] md:right-[24px]" />
        </Link>
      </div>
      {/* 네비게이션바 */}
      <div className="fixed bottom-0 w-full max-w-[600px]">
        <Navigator />
      </div>
    </>
  );
};

export default ParentComponent;

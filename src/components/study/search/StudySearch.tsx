'use client';

import Link from 'next/link';
import StudyList from './StudyList';
import WritingIcon from '@/components/icons/WritingIcon';
import StudySearchSort from './StudySearchSort';
import { useEffect, useState } from 'react';
import { fetchStudyList } from '@/actions/studyList.action';
import { useFilterStore } from '@/stores/search/useFilterStore';
import StudyFilter from './StudyFilter';

export default function StudySearch({
  studySearchTerm,
}: {
  studySearchTerm: string;
}) {
  const { setStudyList, setSelectedFilter, originalList } = useFilterStore();
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  // 스터디 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: studies } = await fetchStudyList();
        setStudyList(studies);

        const allTags = Array.from(
          new Set(studies.flatMap((study) => study.tags)),
        );
        setAllTags(allTags);

        setLoading(false);
      } catch (error) {
        console.error('스터디 목록을 가져오는 중 오류가 발생했습니다', error);
      }
    };
    fetchData();
  }, [setStudyList]);

  return (
    <>
      {/* 태그 필터링 & 상세 필터링 */}
      <StudyFilter allTags={allTags} />

      {/* 최신순, 조회수 정렬 */}
      <StudySearchSort
        loading={loading}
        setSelectedFilter={setSelectedFilter}
      />

      {/*  모집중 필터링, 스터디 리스트 */}
      <StudyList
        studySearchTerm={studySearchTerm}
        loading={loading}
        originalList={originalList}
      />

      {/* 스터디 만들기 아이콘 */}
      <Link href="../study/write">
        <WritingIcon className="fixed bottom-20 right-6 translate-x-0 sm:translate-x-[calc(-50dvw+306px)]" />
      </Link>
    </>
  );
}

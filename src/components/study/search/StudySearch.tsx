import Link from 'next/link';
import StudyList from './StudyList';
import WritingIcon from '@/components/icons/WritingIcon';
import StudySearchSort from './StudySearchSort';
import { useEffect, useState } from 'react';
import { fetchStudiesTags, fetchStudyList } from '@/actions/studyList.action';
import { useFilterStore } from '@/stores/search/useFilterStore';
import StudyFilter from './StudyFilter';

export default function StudySearch() {
  const { setStudyList, setSelectedFilter } = useFilterStore();
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  // 스터디 목록 불러오기
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const studies = await fetchStudyList();
        setStudyList(studies);
        setLoading(false);
      } catch (error) {
        console.error('스터디 목록을 가져오는 중 오류가 발생했습니다', error);
      }
    };
    fetchStudies();

    const fetchTags = async () => {
      const allTags = await fetchStudiesTags();
      //   console.log('allTags', allTags);
      setAllTags(allTags);
    };
    fetchTags();
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
      <StudyList loading={loading} />

      {/* 스터디 만들기 아이콘 */}
      <Link href="../study/write">
        <WritingIcon className="max-w-[600px]:right-6 fixed bottom-[100px] md:right-[24px]" />
      </Link>
    </>
  );
}

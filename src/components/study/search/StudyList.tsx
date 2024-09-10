// 'use client';
import CalendarSmallIcon from '@/components/icons/CalendarSmallIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import ScrapIcon from '@/components/icons/Scrap';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import SearchSkeleton from './SearchSkeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Study } from '@/types/study';
import { useFilterStore } from '@/stores/search/useFilterStore';
import { useEffect } from 'react';

type StudyListProps = {
  loading: boolean;
  studySearchTerm: string;
  originalList: Study[];
};

export default function StudyList({
  loading,
  studySearchTerm,
  originalList,
}: StudyListProps) {
  const { filteredList, isRecruiting, setIsRecruiting, setStudyList } =
    useFilterStore();

  // 스터디 스크랩 토글
  const handleToggleScrap = (id: string) => {
    if (setStudyList)
      setStudyList(
        filteredList.map((study: Study) =>
          study.id === id ? { ...study, scraped: !study.scraped } : study,
        ),
      );
  };
  console.log('originalList', originalList);
  useEffect(() => {
    if (studySearchTerm.length > 0) {
      const filteredStudies = originalList.filter((study) =>
        study.title.toLowerCase().includes(studySearchTerm.toLowerCase()),
      );
      setStudyList(filteredStudies);
    } else {
      setStudyList(originalList); // 검색어가 없을 때는 전체 리스트로 복구
    }
  }, [studySearchTerm]);

  return (
    <>
      <div className="flex min-h-dvh w-full flex-col gap-4 bg-[#fafafa] px-4 pb-[100px] pt-4">
        <div className={'flex items-center gap-2 text-sm'}>
          {loading ? (
            <div
              className={'h-5 w-24 animate-pulse rounded-sm bg-[#f1f1f1]'}
            ></div>
          ) : (
            <>
              <Checkbox
                id={'isRecruting'}
                className={
                  'h-4 w-4 border-[#999999] data-[state=checked]:bg-[#837486]'
                }
                onClick={() => setIsRecruiting(!isRecruiting)}
              />
              <label htmlFor={'isRecruting'} className={'text-[#777777]'}>
                {' '}
                모집중만 보기
              </label>
            </>
          )}
        </div>
        {loading ? (
          <SearchSkeleton />
        ) : filteredList.length > 0 ? (
          filteredList.map((study) => (
            // 스터디 카드
            <Link
              href={`/study/${study.id}`}
              key={study.id}
              className="cursor-pointer rounded-lg border border-muted bg-white px-4 py-5 shadow-[0_4px_4px_rgb(0,0,0,0.03)]"
            >
              <div className={'mb-1 flex justify-between text-[#777777]'}>
                {/* 모집 직군 */}
                <ul className={'flex gap-1 text-xs'}>
                  {study.roles?.map((role, index) => (
                    <li key={index} className={'flex'}>
                      {role}
                      {index !== study.roles.length - 1 && (
                        <div
                          className={'ml-1 mt-[5px] h-1.5 w-[1px] bg-[#aaaaaa]'}
                        ></div>
                      )}
                    </li>
                  ))}
                </ul>
                {/* 스크랩 버튼 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    study.id && handleToggleScrap(study.id);
                  }}
                >
                  <ScrapIcon
                    className="transition-all duration-300 ease-in-out"
                    stroke={study.scraped ? '' : '#bbbbbb'}
                    fill={study.scraped ? '#6224FD' : 'transparent'}
                  />
                </button>
              </div>
              <div className={'flex flex-col gap-2'}>
                <div
                  className={`w-fit rounded-full border px-2 py-0.5 text-xs ${
                    study.isRecruiting
                      ? 'border-[#ba9fff] bg-accent text-secondary'
                      : 'bg-muted text-[#aaaaaa]'
                  } `}
                >
                  {study.isRecruiting ? '모집 중' : '모집 완료'}
                </div>
                {/* 스터디 제목 */}
                <h2 className="font-medium">{study.title}</h2>
              </div>
              {/* 스터디 태그들 */}
              {study.tags.length !== 0 && (
                <ul className={'mb-6 mt-2 flex flex-wrap gap-2'}>
                  {study.tags?.map((tag, index) => (
                    <li
                      key={index}
                      className="rounded-sm bg-accent px-2 py-1 text-xs text-[#777777]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <div className={'mt-6 flex'}>
                {/* 디데이 */}
                <div className={'mr-3 text-xs font-semibold text-primary'}>
                  {`D${
                    Number(new Date(study.endDate)) - Number(new Date()) > 0
                      ? '-'
                      : '+'
                  }${Math.abs(
                    Math.round(
                      (Number(new Date(study.endDate)) - Number(new Date())) /
                        1000 /
                        60 /
                        60 /
                        24,
                    ),
                  )}`}
                </div>
                {/* 기간 */}
                <div
                  className={'flex items-center gap-1 text-xs text-[#777777]'}
                >
                  <CalendarSmallIcon fill={'#82829b'} />
                  {format(new Date(study.startDate), 'yyyy.MM.dd (EE)', {
                    locale: ko,
                  })}
                  &nbsp;-&nbsp;
                  {format(new Date(study.endDate), 'MM.dd (EE)', {
                    locale: ko,
                  })}
                </div>
                {/* 조회수 */}
                <div className={'ml-auto flex gap-1 text-xs text-[#908794]'}>
                  <EyeIcon fill={'#908794'} />
                  {study.viewCount?.toString()}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-[#777777]">검색 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
}

'use client';

import { bookmarkStudy } from '@/actions/study/bookmarkActions';
import CalendarSmallIcon from '@/components/icons/CalendarSmallIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import ScrapIcon from '@/components/icons/Scrap';
import { useFilterStore } from '@/stores/search/useFilterStore';
import { Study } from '@/types/study';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

type Bookmark = {
  id: string;
  user_id: string;
};

export default function StudyListItem({
  study,
  className,
}: {
  study: Study;
  className?: string;
}) {
  const { filteredList, setStudyList } = useFilterStore();

  // 스터디 북마크
  const handleToggleScrap = async () => {
    const data: Bookmark[] | null = await bookmarkStudy(study.id);
    if (data) {
      const newList = filteredList.map((item) => {
        let newStudy = item;
        if (item.id === study.id) {
          if (item.bookmark.length > 0) {
            newStudy = { ...item, bookmark: [] };
          } else {
            newStudy = { ...item, bookmark: [{ user_id: data?.[0].user_id }] };
          }
        }
        return newStudy;
      });
      setStudyList(newList);
    }
  };

  const formattedStartDate = format(
    new Date(study.startDate),
    'yyyy.MM.dd (EE)',
    { locale: ko },
  );
  const formattedEndDate = format(new Date(study.endDate), 'yyyy.MM.dd (EE)', {
    locale: ko,
  });

  const getDday = () => {
    const today = new Date();
    const startDate = new Date(study.startDate);

    const dday = Math.abs(
      Math.round(
        (Number(new Date(study.endDate)) - Number(new Date())) /
          1000 /
          60 /
          60 /
          24,
      ),
    );
    if (today > startDate) {
      return '-' + dday;
    } else {
      return '+' + dday;
    }
  };

  // {`D${
  //   Number(new Date(study.endDate)) - Number(new Date()) > 0
  //     ? '-'
  //     : '+'
  // }${Math.abs(
  //   Math.round(
  //     (Number(new Date(study.endDate)) - Number(new Date())) /
  //       1000 /
  //       60 /
  //       60 /
  //       24,
  //   ),
  // )}`}

  return (
    <Link
      href={`/study/${study.id}`}
      key={study.id}
      className={`cursor-pointer rounded-lg border border-muted bg-white px-4 py-5 shadow-[0_4px_4px_rgb(0,0,0,0.03)] ${className}`}
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
            handleToggleScrap();
          }}
        >
          <ScrapIcon
            className="transition-all duration-300 ease-in-out"
            stroke={study.bookmark?.length > 0 ? '' : '#bbbbbb'}
            fill={study.bookmark?.length > 0 ? '#6224FD' : 'transparent'}
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
          {`D${getDday()}`}
        </div>
        {/* 기간 */}
        <div className={'flex items-center gap-1 text-xs text-[#777777]'}>
          <CalendarSmallIcon fill={'#82829b'} />
          {formattedStartDate} - {formattedEndDate}
        </div>
        {/* 조회수 */}
        <div className={'ml-auto flex gap-1 text-xs text-[#908794]'}>
          <EyeIcon fill={'#908794'} />
          {study.viewCount?.toString()}
        </div>
      </div>
    </Link>
  );
}

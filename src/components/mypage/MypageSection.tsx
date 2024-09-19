'use client';
import BookIcon from '../icons/Book';
import BookmarkIcon from '../icons/Bookmark';
import RightArrowIcon from '../icons/RightArrowIcon';
import ScrapIcon from '../icons/Scrap';
import StudyItem from './StudyItem';
import Link from 'next/link';
import Button from '../common/Button';
import Image from 'next/image';
import Logout from './Logout';

interface MypageSectionProps {
  bookmark: any[];
  studymember: any[];
  friend: any[];
}

export default function MypageSection({
  bookmark,
  studymember,
  friend,
}: MypageSectionProps) {
  const listItem = [
    {
      label: '관심 스터디',
      num: bookmark.length,
      icon: (
        <ScrapIcon className="h-5 w-5" fill={'transparent'} stroke={'black'} />
      ),
      path: '/bookmark',
    },
    {
      label: '참여 스터디',
      num: studymember.length,
      icon: <BookmarkIcon className="h-4 w-4" />,
      path: '/study',
    },
    {
      label: '내 작성글',
      num: '',
      icon: <BookIcon className="h-4 w-4" />,
      path: '/myposts',
    },
  ];

  const dummyBadges = [
    {
      title: '지식뉴비',
      src: 'https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/badge/study/1-beginner.svg',
    },
    {
      title: '피드러너',
      src: 'https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/badge/feedback/2-runner.svg',
    },
    {
      title: '댓뉴비',
      src: 'https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/badge/comment/1-beginner.svg',
    },
    {
      title: '밋티러너',
      src: 'https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/badge/meett/2-runner.svg',
    },
  ];
  return (
    <div className="flex flex-col gap-10">
      {/* 내 능력 현황 */}
      <section className="flex flex-col gap-5 border-b border-[#EEEAFF] pb-5">
        <Link href="/mypage/badge">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">내 능력 현황</p>
            <RightArrowIcon className="h-4 w-4" />
          </div>
        </Link>
        <div className="flex justify-start gap-3">
          {dummyBadges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center gap-3">
              <Image
                src={badge.src}
                alt={badge.title}
                width={80}
                height={80}
                priority
              />
              <span className="text-xs font-semibold">{badge.title}</span>
            </div>
          ))}
        </div>
      </section>
      {/* 내 스터디 */}
      <section className="flex flex-col gap-5 border-b border-[#EEEAFF] pb-5">
        <p className="text-lg font-bold">내 스터디</p>
        <ul className="flex flex-col gap-5">
          {listItem.map((item) => (
            <Link key={item.label} href={`/mypage${item.path}`}>
              <StudyItem label={item.label} num={item.num} icon={item.icon} />
            </Link>
          ))}
        </ul>
      </section>
      {/* 고객센터 */}
      <section className="flex flex-col gap-5 border-b border-[#EEEAFF] pb-5">
        <p className="text-lg font-bold">고객센터</p>
        <ul className="flex flex-col gap-5">
          <li>
            <Link href="/mypage/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/mypage/qna">문의사항</Link>
          </li>
          <li>
            <Link href="/mypage/notice">공지사항</Link>
          </li>
        </ul>
      </section>
      {/* 계정 정보 */}
      <section className="flex flex-col gap-5 pb-5">
        <p className="text-lg font-bold">계정 정보</p>
        <ul className="flex flex-col gap-5">
          <li>
            <Link href="/mypage/editAccount">회원 정보 수정</Link>
          </li>
          <li>
            <Link href="">비밀번호 설정</Link>
          </li>
          <li>
            <Link href="">마케팅 개인정보 제 3자 제공 동의</Link>
          </li>
        </ul>
      </section>

      <Logout />
    </div>
  );
}

'use client';
import BookIcon from '../icons/Book';
import BookmarkIcon from '../icons/Bookmark';
import RightArrowIcon from '../icons/RightArrowIcon';
import ScrapIcon from '../icons/Scrap';
import StudyItem from './StudyItem';
import Link from 'next/link';
import Logout from '@/components/mypage/Logout';
import BadgeCard from '../badge/BadgeCard';
import Button from '../common/Button';

export default function MypageSection() {
  return (
    <div className='flex flex-col gap-10'>
    {/* 내 능력 현황 */}
    <section>
      <Link href='/mypage/badge'>
        <div className='flex items-center justify-between'>
          <p className="text-lg font-bold">내 능력 현황</p>
          <RightArrowIcon className="w-4 h-4" />
        </div>
      </Link>
      {/* <BadgeCard />
      <BadgeCard />
      <BadgeCard /> */}
    </section>
    {/* 내 스터디 */}
    <section className='flex flex-col gap-8'>
      <p className="text-lg font-bold">내 스터디</p>
        <ul className="flex flex-col gap-5">
          <Link href="/mypage/bookmark">
            <StudyItem
              icon={<ScrapIcon fill="black" />}
              text="관심스터디"
              num={12}
              />
          </Link>
          <Link href="/mypage/study">
            <StudyItem
              icon={<BookmarkIcon fill="black" />}
              text="참여스터디"
              num={34}
              />
          </Link>
          <Link href="/mypage/myposts">
            <StudyItem
              icon={<BookIcon fill="black" />}
              text="내 작성글"
              num={56}
              />
          </Link>
      </ul>
    </section>
    {/* 고객센터 */}
    <section className='flex flex-col gap-8'>
      <p className="text-lg font-bold">고객센터</p>
      <ul className='flex flex-col gap-5'>
        <li>
          <Link href='/mypage/faq'>FAQ</Link>
        </li>
        <li>
          <Link href='/mypage/question'>문의사항</Link>
        </li>
        <li>
          <Link href='/mypage/notice'>공지사항</Link>
        </li>
      </ul>
    </section>
    {/* 계정 정보 */}
    <section className='flex flex-col gap-8'>
      <p className="text-lg font-bold">계정 정보</p>
    <ul className='flex flex-col gap-5'>
        <li>
          <Link href="/mypage/editAccount">회원 정보 수정</Link>
        </li>
        <li>
          <Link href=''>비밀번호 설정</Link>
        </li>
        <li>
          <Link href=''>마케팅 개인정보 제 3자 제공 동의</Link>
        </li>
      </ul>
    </section>
    <Button type='secondary' label='로그아웃'></Button>
    </div>
  );
}

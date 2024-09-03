import BookIcon from '../icons/Book';
import BookmarkIcon from '../icons/Bookmark';
import RightArrowIcon from '../icons/RightArrowIcon';
import ScrapIcon from '../icons/Scrap';
import StudyItem from './StudyItem';
import Link from 'next/link';

export default function MypageSection() {
  return (
    <div className="flex flex-col gap-4">
      <section>
        <div className="w-full py-4">
          <Link href="/mypage/badge">
            <div className="flex w-full items-center justify-between">
              <p className="text-lg font-bold">내 능력 현황</p>
              <p>
                <RightArrowIcon className="m-auto h-4 w-4" />
              </p>
            </div>
          </Link>
        </div>

        <ul className="flex gap-2">
          <li>뱃지1</li>
          <li>뱃지2</li>
          <li>뱃지3</li>
        </ul>
      </section>
      <p className="border-t-4 border-light-gray text-lg font-bold"></p>
      <section className="py-4">
        <p className="pb-4 text-lg font-bold">내 스터디</p>
        <ul className="flex flex-col gap-5 px-2 text-base">
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
      <p className="border-t-4 border-light-gray text-lg font-bold"></p>
      <section>
        <p className="py-4 text-lg font-bold">고객센터</p>
        <ul className="flex flex-col gap-5 px-2 text-base">
          <Link href="/mypage/faq">
            <li className="flex items-center justify-between">
              <p className="flex gap-2">
                <span>FAQ</span>
              </p>
              <p>
                <RightArrowIcon className="m-auto h-4 w-4" />
              </p>
            </li>
          </Link>

          {/* <Link href="/mypage/requests"></Link> */}
          <Link href="/mypage/question">
            <li className="flex items-center justify-between">
              <p className="flex gap-2">
                <span>문의하기</span>
              </p>
              <p>
                <RightArrowIcon className="m-auto h-4 w-4" />
              </p>
            </li>
          </Link>
          <Link href="/mypage/notice">
            <li className="flex items-center justify-between">
              <p className="flex gap-2">
                <span>공지사항</span>
              </p>
              <p>
                <RightArrowIcon className="m-auto h-4 w-4" />
              </p>
            </li>
          </Link>
        </ul>
      </section>
      <p className="border-t-4 border-light-gray text-lg font-bold"></p>
      <section>
        <p className="py-4 text-lg font-bold">계정 정보</p>
        <ul className="flex flex-col gap-5 px-2 text-base">
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>회원 정보 수정</span>
            </p>
            <p>
              <RightArrowIcon className="m-auto h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>비밀번호 설정</span>
            </p>
            <p>
              <RightArrowIcon className="m-auto h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>마케팅 개인정보 제 3자 제공 동의</span>
            </p>
            <p>
              <RightArrowIcon className="m-auto h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>회원탈퇴</span>
            </p>
            <p>
              <RightArrowIcon className="m-auto h-4 w-4" />
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}

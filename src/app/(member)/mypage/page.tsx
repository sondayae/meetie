'use client';
import FriendIcon from '@/components/icons/FriendIcon';
import RightArrowIcon from '@/components/icons/RightArrowIcon';
import ScrapIcon from '@/components/icons/ScrapIcon';
import StudyIcon from '@/components/icons/StudyIcon';
import { useRouter } from 'next/navigation';

const MyInfo = [
  {
    id: 1,
    icon: <StudyIcon className="m-auto h-4 w-4 fill-sub-purple" />,
    title: '스터디',
    count: 2,
  },
  {
    id: 2,
    icon: <ScrapIcon className="m-auto h-4 w-4 fill-sub-purple" />,
    title: '스크랩',
    count: 9,
  },
  {
    id: 3,
    icon: <FriendIcon className="m-auto h-4 w-4 fill-sub-purple" />,
    title: '스터디 친구',
    count: 13,
  },
];

function MyPage() {
  const router = useRouter();
  return (
    <div className="m-auto flex h-full w-full max-w-[600px] flex-col">
      <header className="mb-11 mt-4 px-4">
        <h1 className="text-xl font-bold">마이페이지</h1>
      </header>
      {/* 프로필 */}
      <section className="mb-4 px-4">
        <div className="flex h-16 w-full items-end justify-between">
          <div className="flex items-center justify-center gap-4">
            <img
              className="relative h-16 w-16 rounded-full"
              src="https://th.bing.com/th/id/OIG4.7h3EEAkofdcgjDEjeOyg?pid=ImgGn"
            />
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="font-medium leading-none text-[#474747]">
                디자이너
              </div>
              <div className="text-xl font-bold text-black">김서희님</div>
            </div>
          </div>
          <div className="relative h-8 w-20">
            <div className="absolute left-0 top-0 h-8 w-20 rounded border border-[#ede9ff] bg-[#fdfbff]" />
            <div className="absolute left-[9px] top-[7px] text-center text-xs font-medium text-[#645294]">
              공개용 프로필
            </div>
          </div>
        </div>
      </section>
      {/* 내정보 */}
      <p className="px-4 py-4 text-lg font-bold">내 정보</p>
      <section className="mx-4 flex items-center justify-center gap-[60px] rounded-lg border border-[#E0D8FF] bg-[#F5F1FF] px-4 px-8 py-6">
        {MyInfo.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-start gap-[10px]"
            >
              {/* icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfd8ff] bg-[#f5f1ff]">
                {item.icon}
              </div>
              {/* text */}
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-4 text-center font-normal leading-none text-gray-purple">
                    {item.title}
                  </div>
                </div>
              </div>
              {/* num */}
              <div className="text-center text-lg font-bold leading-none text-black">
                {item.count}
              </div>
            </div>
          );
        })}
      </section>
      <div className="flex items-center justify-between px-4 py-8">
        <p className="text-lg font-bold">내 능력 현황</p>
        <p>
          <RightArrowIcon className="h-4 w-4" />
        </p>
      </div>
      <section className="px-4">
        <ul className="flex gap-3">
          <li className="w-full text-center">댓글 뱃지</li>
          <li className="w-full text-center">토론 뱃지</li>
          <li className="w-full text-center">방장 뱃지</li>
          <li className="w-full text-center">피드백 뱃지</li>
        </ul>
      </section>
      <div className="mb-4 mt-10 h-1 w-full bg-[#F1F2F6]"></div>
      <p className="px-4 pb-4 pt-8 text-lg font-bold">내 스터디</p>
      <section className="px-4">
        <ul className="flex flex-col gap-5 px-2">
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>icon</span>
              <span>관심스터디</span>
              <span>num</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>icon</span>
              <span>참여 중인 스터디</span>
              <span>num</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>icon</span>
              <span>내 작성글</span>
              <span>num</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
        </ul>
      </section>
      <div className="mb-4 mt-10 h-[2px] w-full bg-[#F1F2F6]"></div>
      <p className="px-4 pb-4 pt-8 text-lg font-bold">고객센터</p>
      <section className="px-4">
        <ul className="flex flex-col gap-5 px-2">
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>FAQ</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>문의하기</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>공지사항</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
        </ul>
      </section>
      <div className="mb-4 mt-10 h-[2px] w-full bg-[#F1F2F6]"></div>
      <p className="px-4 pb-4 pt-8 text-lg font-bold">계정 정보</p>
      <section className="px-4 pb-16">
        <ul className="flex cursor-pointer flex-col px-2">
          <li
            className="flex items-center justify-between py-3"
            onClick={() => router.push('/mypage/editAccount')}
          >
            <p className="flex gap-2">
              <span>회원 정보 수정</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between py-3">
            <p className="flex gap-2">
              <span>비밀번호 설정</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
          <li className="flex items-center justify-between py-3">
            <p className="flex gap-2">
              <span>마케팅 개인정보 제 3자 제공 동의</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
          <li
            className="flex items-center justify-between py-3"
            onClick={() => router.push('/mypage/deleteUser')}
          >
            <p className="flex gap-2">
              <span>회원탈퇴</span>
            </p>
            <p>
              <RightArrowIcon className="h-4 w-4" />
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
export default MyPage;

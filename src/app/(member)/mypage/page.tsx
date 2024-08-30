import Link from 'next/link';

function MyPage() {
  return (
<<<<<<< HEAD
    <>
      <div>MyPage</div>
      <ul>
        <li>
          <Link href="/mypage/editProfile">회원 정보 수정</Link>
        </li>
      </ul>
    </>
=======
    <div className="m-auto flex w-full max-w-[600px] flex-col">
      <header className="mb-11">
        <h1 className="text-xl font-bold">마이페이지</h1>
      </header>
      {/* 프로필 */}

      <section className="mb-4">
        <div className="flex h-16 w-full items-end justify-between px-4">
          <div className="flex items-center justify-center gap-4">
            <img
              className="relative h-16 w-16 rounded-full"
              src="https://th.bing.com/th/id/OIG4.7h3EEAkofdcgjDEjeOyg?pid=ImgGn"
            />
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="text-base font-medium text-[#474747]">
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
      <p className="py-4 text-lg font-bold">내정보</p>
      <section className="flex items-center justify-center gap-[60px] bg-light-purple px-8 py-6">
        {[1, 2, 3].map(() => {
          return (
            <div className="flex flex-col items-center justify-start gap-4">
              {/* icon */}
              <div className="h-10 w-10">
                <div className="left-0 top-0 h-10 w-10 rounded-full border border-[#dfd8ff] bg-[#f5f1ff]" />
              </div>
              {/* text */}
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-4 text-center font-normal text-gray-purple">
                    스터디 친구
                  </div>
                </div>
              </div>
              {/* num */}
              <div className="text-center text-lg font-bold text-black">13</div>
            </div>
          );
        })}
      </section>
      <div className="flex items-center justify-between">
        <p className="py-4 text-lg font-bold">내 능력 현황</p>
        <p>&gt;</p>
      </div>
      <section>
        <ul>
          <li>뱃지1</li>
          <li>뱃지2</li>
          <li>뱃지3</li>
        </ul>
      </section>
      <p className="py-4 text-lg font-bold">내 스터디</p>
      <section>
        <ul className="px-2">
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>icon</span>
              <span>관심스터디</span>
              <span>num</span>
            </p>
            <p>&gt;</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>icon</span>
              <span>참여 중인 스터디</span>
              <span>num</span>
            </p>
            <p>&gt;</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>icon</span>
              <span>내 작성글</span>
              <span>num</span>
            </p>
            <p>&gt;</p>
          </li>
        </ul>
      </section>
      <br className="bg-light-purples h-4" />
      <p className="py-4 text-lg font-bold">고객센터</p>
      <section>
        <ul className="px-2">
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>FAQ</span>
            </p>
            <p>&gt;</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>문의하기</span>
            </p>
            <p>&gt;</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>공지사항</span>
            </p>
            <p>&gt;</p>
          </li>
        </ul>
      </section>
      <p className="py-4 text-lg font-bold">계정 정보</p>
      <section>
        <ul className="px-2">
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>회원 정보 수정</span>
            </p>
            <p>&gt;</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>비밀번호 설정</span>
            </p>
            <p>&gt;</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>마케팅 개인정보 제 3자 제공 동의</span>
            </p>
            <p>&gt;</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="flex gap-2">
              <span>회원탈퇴</span>
            </p>
            <p>&gt;</p>
          </li>
        </ul>
      </section>
    </div>
>>>>>>> c0a7502b9cd83e80e0d2f7c3fd54d284b901b3e3
  );
}
export default MyPage;

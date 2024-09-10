import { getUser } from '@/actions/mypage.action';
import SimpleCard from '@/components/mypage/SimpleCard';
import StudyCard from '@/components/mypage/StudyCard';
import BookmarkIcon from '@/components/icons/Bookmark';
import FriendsIcon from '@/components/icons/Friends';
import ScrapIcon from '@/components/icons/Scrap';
import MypageSection from '@/components/mypage/MypageSection';
import Link from 'next/link';
import supabaseServer from '@/utils/supabase/server';

import Navigator from '@/components/common/Navigator';

export default async function page() {
  const supabaseAuth = supabaseServer();
  const { data, error } = await supabaseAuth.auth.getUser();

  const userdata = await getUser({ id: data?.user?.id });

  return (
    <div className="flex h-full min-h-dvh flex-col">
      <div className="m-auto flex w-full max-w-[600px] flex-col px-4">
        {!userdata && <p className='text-center'>로그인 정보가 없습니다</p>}
        {userdata && (
          <>
            <header className="mb-11">
              <h1 className="text-xl font-bold">마이페이지</h1>
            </header>
            {/* 프로필 */}
            <SimpleCard userdata={userdata} />
            {/* 내정보 */}
            <p className="py-4 text-lg font-bold">내정보</p>

            <section className="border-1 flex items-center justify-center gap-[60px] rounded-lg border-[#E0D8F] bg-[#FDFBFF] px-8 py-6">
              {/* <StudyCard text="참여스터디" num={userdata. || 0} />
        <StudyCard text="관심스터디" num={userdata. || 0} />
        <StudyCard text="스터디친구" num={userdata. || 0} /> */}

              
              <Link href="/mypage/study">
                <StudyCard
                  icon={<ScrapIcon fill="#8655FF" />}
                  text="관심스터디"
                  num={3}
                />
              </Link>
              <Link href="/mypage/bookmark">
                <StudyCard
                  icon={<BookmarkIcon fill="#8655FF" />}
                  text="참여스터디"
                  num={1}
                />
              </Link>
              <Link href="/mypage/friend">
                <StudyCard
                  icon={<FriendsIcon fill="#8655FF" />}
                  text="스터디친구"
                  num={5}
                />
              </Link>
            </section>
            <MypageSection />
          </>
        )}
      </div>
      <Navigator />
    </div>
  );
}

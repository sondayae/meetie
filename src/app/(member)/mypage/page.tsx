import { getUser } from '@/actions/mypage.action';
import supabaseServer from '@/utils/supabase/server';
import SimpleCard from '@/components/mypage/SimpleCard';
import StudyCard from '@/components/mypage/StudyCard';
import BookmarkIcon from '@/components/icons/Bookmark';
import FriendsIcon from '@/components/icons/Friends';
import ScrapIcon from '@/components/icons/Scrap';
import MypageSection from '@/components/mypage/MypageSection';
import Link from 'next/link';

export async function MyPage() {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session?.user.id);

  const userdata = await getUser({ id: session?.user.id });
  console.log(userdata);

  return (
    <div className="m-auto flex w-full max-w-[600px] flex-col px-4">
      <header className="mb-11">
        <h1 className="text-xl font-bold">마이페이지</h1>
      </header>
      {/* 프로필 */}
      <SimpleCard userdata={userdata} />
      {/* 내정보 */}
      <p className="py-4 text-lg font-bold">내정보</p>
      <section className="flex items-center justify-center gap-[60px] rounded-lg border-1 border-[#E0D8F] bg-[#FDFBFF] px-8 py-6">
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
    </div>
  );
}
export default MyPage;

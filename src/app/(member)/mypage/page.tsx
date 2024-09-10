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
import Header from '@/components/handin/Header';

export default async function page() {
  const supabaseAuth = supabaseServer();
  const { data, error } = await supabaseAuth.auth.getUser();

  const userdata = await getUser({ id: data?.user?.id });

  return (
    <>
    {/* 헤더 영역 */}
    <Header leftIcon={false} label='마이페이지'/>
    {/* 콘텐츠 영역 */}
    { userdata &&
      <div className='flex flex-col flex-1 overflow-y-scroll px-4 gap-10'>
        <div className='mt-10'>
          <SimpleCard userdata={userdata} />
        </div>
        <div>
          <div className='mb-8'>
            <p className="text-lg font-bold mb-3">내정보</p>
            <div className='flex justify-center items-center gap-20 p-6 rounded-lg bg-[#FDFBFF] border border-[#E0D8FF] text-muted-foreground'>
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
            </div>
          </div>
          <MypageSection />
        </div>
      </div>
    }
    {!userdata && <p className='text-center'>로그인 정보가 없습니다</p>}
      <Navigator />
      {/* <StudyCard text="참여스터디" num={userdata. || 0} />
      <StudyCard text="관심스터디" num={userdata. || 0} />
      <StudyCard text="스터디친구" num={userdata. || 0} /> */}
    </>
  );
}

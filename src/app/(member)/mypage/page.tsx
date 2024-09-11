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
  const supabase = supabaseServer();
  const { data: {user} } = await supabase.auth.getUser();
  const userdata = await getUser({ id: user?.id });

  const studyCardItem = [
    {label: '관심스터디', num: 3, icon: <ScrapIcon stroke='#A180F4' className='fill-none'/>, path: '/study'},
    {label: '참여스터디', num: 3, icon: <BookmarkIcon className='fill-[#A180F4]' />, path: '/bookmark'},
    {label: '스터디친구', num: 3, icon: <FriendsIcon className='fill-[#A180F4]'/>, path: '/friend'},
  ]

  return (
    <>
    {/* 헤더 영역 */}
    <Header leftIcon={false} label='마이페이지'/>
    {/* 콘텐츠 영역 */}
    { userdata &&
      <div className='flex flex-col flex-1 overflow-y-scroll px-4 py-10 gap-10'>
        <SimpleCard userdata={userdata} />
          <div className='mb-8'>
            <p className="text-lg font-bold mb-3">내정보</p>
            <div className='flex justify-center items-center gap-20 p-6 rounded-lg bg-[#FDFBFF] border border-[#E0D8FF] text-muted-foreground'>
              {studyCardItem.map(item => (
                <Link key={item.path} href={`/mypage${item.path}`}>
                  <StudyCard 
                    icon={item.icon}
                    label={item.label}
                    num={item.num}
                  />
                </Link>
              ))}
            </div>
          </div>
          <MypageSection />
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

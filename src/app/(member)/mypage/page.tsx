import { getUser, getJoinInfo } from '@/actions/mypage.action';
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userdata = await getUser({ id: user?.id });
  const joindata = await getJoinInfo({ id: user?.id });

  type StudyCardItem = {
    label: string;
    num: number;
    icon: JSX.Element;
    path: string;
  };

  const studyCardItem: StudyCardItem[] = [
    {
      label: '관심 스터디',
      num: joindata?.bookmark?.length || 0,
      icon: <ScrapIcon stroke="#A180F4" className="fill-none" />,
      path: '/bookmark',
    },
    {
      label: '참여 스터디',
      num: joindata?.studymember?.length || 0,
      icon: <BookmarkIcon className="fill-[#A180F4]" />,
      path: '/study',
    },
    {
      label: '스터디 친구',
      num: joindata?.friend?.length || 0,
      icon: <FriendsIcon className="fill-[#A180F4]" />,
      path: '/friends',
    },
  ];

  return (
    <>
      {/* 헤더 영역 */}
      <Header
        leftIcon={false}
        label="마이페이지"
        sticky={true}
        useBorderBottom={false}
        bgColor={'bg-white'}
      />
      {/* 콘텐츠 영역 */}
      {userdata && (
        <div className="flex flex-1 flex-col gap-10 px-4 py-10">
          <SimpleCard userdata={userdata} />
          <div className="">
            <p className="mb-3 text-lg font-bold">내 정보</p>
            <div className="flex items-center justify-center gap-20 rounded-lg border border-[#E0D8FF] bg-[#FDFBFF] p-6 text-muted-foreground">
              {studyCardItem.map((item) => (
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
          <MypageSection {...joindata} />
        </div>
      )}
      {!userdata && (
        <p className="min-h-dvh pt-[50%] text-center">로그인 정보가 없습니다</p>
      )}
      <Navigator />
      {/* <StudyCard text="참여스터디" num={userdata. || 0} />
      <StudyCard text="관심스터디" num={userdata. || 0} />
      <StudyCard text="스터디친구" num={userdata. || 0} /> */}
    </>
  );
}

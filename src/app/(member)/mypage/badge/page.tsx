import Header from '@/components/handin/Header';
import VerifiedIcon from '@/components/icons/VerifiedIcon';
import BadgeList from '@/components/mypage/badge/BadgeList';
import supabaseServer from '@/utils/supabase/server';
import Image from 'next/image';

const megaphone =
  'https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/assets/megaphone.svg';

export default async function BadgePage() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const badgeTypes = [
    { type: 'comment', title: '댓글 뱃지' },
    { type: 'feedback', title: '피드 뱃지' },
    { type: 'study', title: '스터디 뱃지' },
    { type: 'meett', title: '밋티 뱃지' },
  ];
  const { data: badgeList } = await supabase
    .from('badge')
    .select('*', { count: 'exact' });
  const { data: userBadgeList } = await supabase
    .from('user_badge')
    .select('*')
    .eq('user_id', userId);

  const badgeListByType = badgeTypes.map((typeObj) => ({
    type: typeObj.type,
    title: typeObj.title,
    list: badgeList?.filter((badge) => badge.type === typeObj.type),
  }));

  return (
    <>
      <Header label="내 뱃지 현황" rightIcon={<div></div>} />
      <div className="px-4 py-8">
        <div className="flex items-center justify-between rounded-lg bg-[#E3E3FA] p-5 text-sm">
          <div>
            <p>축하합니다!</p>
            <p className="font-semibold">
              그동안 밋티에서 활동하며 획득한 뱃지를 확인해보세요.
            </p>
          </div>
          <Image
            width={50}
            height={50}
            src={megaphone}
            alt="손 흔드는 이미지"
            priority
          />
        </div>
        <h1 className="mb-5 mt-10 text-lg font-semibold">내 뱃지</h1>
        <div className="flex flex-col gap-5 px-4">
          {badgeListByType.map((item) => (
            <div key={item.type} className="flex flex-col gap-2">
              <p className="flex items-center gap-1">
                <span className="font-semibold">{item.title}</span>
                <VerifiedIcon />
              </p>
              <BadgeList badgeList={item.list} userBadgeList={userBadgeList} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import Header from '@/components/handin/Header';
import BadgeList from '@/components/mypage/badge/BadgeList';
import supabaseServer from '@/utils/supabase/server';

export default async function BadgePage() {
  const supabase = supabaseServer();
  const badgeTypes = [
    {type: 'comment', title: '댓글 뱃지'},
    {type: 'feedback', title: '피드 뱃지'},
    {type: 'study', title: '스터디 뱃지'},
    {type: 'meett', title: '밋티 뱃지'},
  ];
  const { data: badgeList } = await supabase.from('badge').select('*', {count: 'exact'});
  
  const badgeListByType = badgeTypes.map(typeObj => ({
    type: typeObj.type,
    title: typeObj.title,
    list: badgeList?.filter(badge => badge.type === typeObj.type)
  }));

  return (
    <>
      <Header label='내 뱃지 현황'/>
      <div className='flex flex-col gap-4 px-4 py-8'>
        <div className='bg-[#E3E3FA] rounded-lg px-3 py-5'>
          <p>내가 획득한 뱃지를 확인해보세요.</p>
        </div>
        <h1 className='font-semibold text-lg'>내 뱃지</h1>
        {badgeListByType.map((item) => (
          <div key={item.type} className='flex flex-col gap-4'>
            <h1 className='font-semibold'>{item.title}</h1>
            <BadgeList badgeList={item.list}/>
          </div>
        ))}
      </div>
    </>
  )
}
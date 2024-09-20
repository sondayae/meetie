import { getFriends } from '@/actions/mypage.action';
import Header from '@/components/handin/Header';
import FriendCard from '@/components/mypage/FriendCard';
import supabaseServer from '@/utils/supabase/server';

export default async function page() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = await getFriends({ id: user?.id });

  return (
    <div className="bg-[#F5F5FF relative h-dvh h-full">
      <Header
        leftIcon
        // label={`내 친구`}
        label={`내 친구 ${data?.length ?? 0}`}
        rightIcon={<div></div>}
        sticky={true}
        useBorderBottom={false}
        bgColor={'bg-white'}
      />
      <div className="m-auto mb-4 flex w-full max-w-[600px] flex-col items-center gap-2 bg-[#F5F5FF] px-4 pb-12 pt-7">
        <div className="grid w-full max-w-80 grid-cols-2 gap-3">
          {data?.map((friend: any) => (
            <FriendCard {...friend.receiverDetails} />
          ))}
        </div>
      </div>
    </div>
  );
}

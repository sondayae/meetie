import { getMyPost } from '@/actions/mypage.action';
import Header from '@/components/handin/Header';
import PostItem from '@/components/mypage/postItem';
import supabaseServer from '@/utils/supabase/server';
import { da } from 'date-fns/locale';
// import PostItem from '@/components/mypage/postItem';

export default async function page() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = await getMyPost({ id: user?.id });

  return (
    <>
      <Header
        leftIcon
        label={`내 작성글 ${data?.length}`}
        rightIcon={<div></div>}
      />
      <div className="flex flex-col gap-2 py-4">
        {data?.map((item) => (
          <PostItem key={item.id} item={{ study: { ...item } }} />
        ))}
      </div>
    </>
  );
}

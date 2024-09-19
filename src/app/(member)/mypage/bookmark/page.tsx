import PostItem from '@/components/mypage/postItem';
import { getBookMark, getJoinInfo, getUser } from '@/actions/mypage.action';
import Header from '@/components/handin/Header';
import supabaseServer from '@/utils/supabase/server';
import Link from 'next/link';

type Bookmark = {
  study: {
    id: string;
    title: string;
    roles: string;
    recruitNum: number;
    endDate: string;
  };
};

export default async function page() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = await getBookMark({ id: user?.id });
  // console.log(data);

  const calddays = (data: string) => {
    // console.log(data);
    const ddays = Math.round(
      (Number(new Date(data)) - Number(new Date())) / 1000 / 60 / 60 / 24,
    );

    const result =
      ddays === 0 ? 'D-Day' : ddays > 0 ? `D-${ddays}` : `D+${Math.abs(ddays)}`;
    return result;
  };

  return (
    <div className="relative h-full">
      <Header
        leftIcon
        label={`북마크한 스터디 ${data.bookmark.length}`}
        sticky={true}
        useBorderBottom={false}
        bgColor={'bg-white'}
      />
      <div className="m-auto mb-4 flex w-full max-w-[600px] flex-col gap-2 px-4 pt-7">
        {/* <div className="border-middle-gray flex flex-col rounded-lg border-2"> */}
        {data.bookmark.map((item: Bookmark) => (
          <PostItem item={item} />
          // <Link href={`/study/${item.study.id}`}>
          //   <div className="border-middle-gray flex items-center gap-2 border-b-2 p-2">
          //     {/* <img
          //     className="h-[38px] w-[38px] rounded-lg"
          //     src="https://th.bing.com/th/id/OIG3.6Q6JSjGGulke2mGv6MPj?pid=ImgGn"
          //     alt="Profile"
          //   /> */}
          //     <div className="flex-col items-start justify-start gap-6">
          //       <div className="flex flex-col items-start justify-start gap-3">
          //         <div className="flex w-full flex-col justify-start gap-1">
          //           <p className="text- text-[16px] font-semibold text-black">
          //             {item.study.title}
          //           </p>
          //           <div className="h-5 grow basis-0 text-xs font-medium text-muted-foreground">
          //             {item.study.roles} | 멤버 {item.study.recruitNum} |{' '}
          //             {calddays(item.study.endDate)}
          //           </div>
          //           <div className="w-72 items-center justify-start"></div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </Link>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}

import NoticeBox from '@/components/common/NoticeBox';
import Handin from '@/components/handin/Handin';
import Header from '@/components/handin/Header';
import { SkeletonFeedback } from '@/components/handin/SkeletonFeedback';
import EventCalendarIcon from '@/components/icons/EventCalendarIcon';
import Plus from '@/components/icons/Header/Plus';
import SelectBox from '@/components/studyRoom/SelectBox';
import TabMenu from '@/components/studyRoom/TabMenu';
import supabaseServer from '@/utils/supabase/server';
import { PlusCircleIcon } from 'lucide-react';
import Navigator from '@/components/common/Navigator';

export default async function page({ params }: { params: { id: string } }) {
  const supabase = supabaseServer();
  let { data } = await supabase
    .from('handin')
    .select('*, homework(*), user(*, images(*)), images(*), comments(count)')
    .order('created_at', {ascending: false})
    .eq('study_id', params.id);

  console.log(data);
  

  // TODO 가입된 스터디룸 정보 가져와서 selectBox 에 표기

  return (
    <div>
      {/* 헤더 영역 */}
      <div className="bg-[#E3E3FA] p-4">
        <Header label="스터디룸" rightIcon={<Plus />} useBorderBottom={false} />
        <div className="mt-4 flex flex-col gap-5">
          <div className="flex items-center justify-end text-xs">
            <span className="rounded-l-lg border border-transparent bg-primary px-2 py-1 text-white">
              진행중 3
            </span>
            <span className="rounded-r-lg border border-primary bg-white px-2 py-1 text-muted-foreground">
              진행완료
            </span>
          </div>
          {/* <SelectBox /> */}
        </div>
      </div>
      <TabMenu />
      {/* 콘텐츠 영역 - 과제 일정 및 캘린더 부분*/}
      <div className="bg-muted">
        <div className="border-b-2 px-4 py-7">
          <div className="mb-[20px] flex flex-col gap-1">
            <h1 className="text-lg font-bold">📚 과제 일정</h1>
            <p className="text-sm text-muted-foreground">
              주차별 과제 현황을 확인하고 소통해요.
            </p>
          </div>
          <NoticeBox />
        </div>
        <div className="p-4">
          <div className="mb-6 flex justify-between">
            <span className="font-semibold">6월</span>
            <span>
              <EventCalendarIcon />
            </span>
          </div>
        </div>
        {/* 콘텐츠 영역 - 과제 인증 리스트 */}
        <div className="rounded-t-xl bg-white drop-shadow-md">
          <div className="flex flex-col gap-1 border-b p-8">
            <h1 className="text-lg font-semibold">✏️ 6월 4일 화요일</h1>
            <p className="text-sm text-muted-foreground">
              과제를 인증한 팀원들을 확인해 보세요.
            </p>
          </div>
          <div>
            {data?.map((item) => <Handin key={item.id} data={item} />)}
            {!data && <SkeletonFeedback />}
          </div>
          <div className="bg-white p-8">
            <button className="flex w-full justify-center gap-2 rounded-lg border-2 border-dotted border-border px-4 py-3.5 text-muted-foreground">
              <PlusCircleIcon />
              과제 인증하기
            </button>
          </div>
        </div>
      </div>
      <Navigator />
    </div>
  );
}

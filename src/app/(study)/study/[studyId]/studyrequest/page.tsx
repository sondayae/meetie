import supabaseServer from '@/utils/supabase/server';
import StudyRequest from '@/components/study/StudyRequest';

import { getStudyDetails } from '@/actions/study.action';
import Header from '@/components/handin/Header';
import CreateStudyRoom from '@/components/studyRoom/CreateStudyRoom';

import Navigator from '@/components/common/Navigator';

export default async function Page({
  params,
}: {
  params: { studyId: string };
}) {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const data = await getStudyDetails(params.studyId);

  const detaildata = { params, ...data };

  return (
    <div className="flex h-full min-h-dvh max-w-[600px] flex-col">
      <Header
        label="대기중인 요청"
        sticky={true}
        bgColor={'bg-white'}
        leftIcon
        rightIcon
      />

      <CreateStudyRoom params={params.studyId} />
      {/* <StudyRequest {...detaildata} /> */}
      <StudyRequest {...detaildata} />

      <Navigator />
    </div>
  );
}

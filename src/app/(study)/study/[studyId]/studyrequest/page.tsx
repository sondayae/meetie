import supabaseServer from '@/utils/supabase/server';
import StatusDisplay2 from '@/components/study/studyDetail/StatusDisplay2';
import StudyRequest from '@/components/study/StudyRequest';

import { getStudyDetails } from '@/actions/study.action';
import Header from '@/components/handin/Header';
import { createStudyRoom } from '@/actions/studyroom.action';
import CreateStudyRoom from '@/components/studyRoom/CreateStudyRoom';
import { getStudyMember } from '@/actions/studymember.action';
import { getStudyApply } from '@/actions/studyrequest.action';
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

  const applyData = await getStudyApply(params.studyId);

  const memberData = await getStudyMember(params.studyId);

  const detaildata = { memberData, applyData, params, ...data };

  return (
    <div className="flex h-full min-h-dvh max-w-[600px] flex-col pb-24">
      <Header label="대기중인요청" leftIcon rightIcon />

      <CreateStudyRoom params={params.studyId} />

      <StudyRequest {...detaildata} />
      {/* 로그인 === 작성자 
      <div className="flex w-full items-center justify-center">
        <div className="fixed bottom-0 mx-auto w-full bg-white pt-8">
          <div className="flex items-center justify-center">
            <StatusDisplay2
              userId={session?.user.id || ''}
              params={params.studyId}
              acceptedStudy={memberData.length}
              recruitNum={data.recruitNum}
              isRecruiting={data.isRecruiting}
              children={null}
            />
          </div>
        </div>
      </div> */}
      <Navigator />
    </div>
  );
}

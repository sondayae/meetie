import supabaseServer from '@/utils/supabase/server';
import StatusDisplay from '@/components/study/StatusDisplay';
import StudyRequest from '@/components/study/StudyRequest';

import { getStudyDetails } from '@/actions/study.action';
import Header from '@/components/handin/Header';
import { createStudyRoom } from '@/actions/studyroom.action';
import CreateStudyRoom from '@/components/studyRoom/CreateStudyRoom';

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

  // 작성자 여부 확인
  const isAuthor = session?.user.id === data.study.user.id;
  console.log(`작성자 여부 확인: ${isAuthor}`);

  return (
    <div className="flex flex-col pb-24">
      <Header label="대기중인요청" leftIcon rightIcon />
      {isAuthor && <CreateStudyRoom params={params.studyId} />}

      {/* <StudyDetail {...data.study} /> */}
      <StudyRequest
        params={params}
        acceptedStudy={data.acceptedStudy}
        recruitNum={data.study.recruitNum}
      />
      {/* 로그인 === 작성자  */}
      <div className="flex items-center justify-center">
        <div className="fixed bottom-0 w-full bg-white pt-8">
          <StatusDisplay
            userId={session?.user.id || ''}
            isAuthor={isAuthor}
            params={params.studyId}
            acceptedStudy={data.acceptedStudy}
            recruitNum={data.study.recruitNum}
            isRecruit={data.study.isRecruit} // Add the isRecruit property with the appropriate value
            children={null}
          />
        </div>
      </div>
    </div>
  );
}

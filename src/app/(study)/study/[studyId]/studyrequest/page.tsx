import StudyDetail from '@/components/study/StudyDetail';
import supabaseServer from '@/utils/supabase/server';
import StatusDisplay from '@/components/study/StatusDisplay';
import StudyRequest from '@/components/study/StudyRequest';

import { getStudyDetails } from '@/actions/study.action';

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

  // console.log(data2);
  // fetch(
  //   new URL(`/api/study/${params.studyId}`, baseUrl).toString(),
  // );

  // const data = await response.json();

  // console.log(data.study);

  // if (!response.ok) {
  //   throw new Error(data.error || 'Error occurred while updating profile');
  // }

  // 작성자 여부 확인
  const isAuthor = session?.user.id === data.study.user.id;
  console.log(`작성자 여부 확인: ${isAuthor}`);

  return (
    <div className="flex flex-col">
      {/* <StudyDetail {...data.study} /> */}
      <StudyRequest
        params={params}
        acceptedStudy={data.acceptedStudy}
        recruitNum={data.study.recruitNum}
      />
      {/* 로그인 === 작성자  */}
      <div className="flex-1">
        <StatusDisplay
          userId={session?.user.id || ''}
          isAuthor={isAuthor}
          params={params.studyId}
          acceptedStudy={data.acceptedStudy}
          recruitNum={data.study.recruitNum}
          children={null}
        />
      </div>
    </div>
  );
}

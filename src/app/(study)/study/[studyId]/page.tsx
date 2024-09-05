import StudyDetail from '@/components/study/StudyDetail';
import StatusDisplay from '@/components/study/StatusDisplay';
import supabaseServer from '@/utils/supabase/server';
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

  console.log(data);

  // 작성자 여부 확인
  const isAuthor = session?.user.id === data.study.user.id;
  console.log(`작성자 여부 확인: ${isAuthor}`);

  return (
    <>
      {!data.study.isRecruiting && <p className='h-24'>모집이 마감되었습니다.</p>}
      {data.study.isRecruiting && (
        <div className="flex flex-col">
          <StudyDetail {...data.study} />
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
      )}
    </>
  );
}

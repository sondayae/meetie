import StudyDetail from '@/components/study/StudyDetail';
import StatusDisplay from '@/components/study/StatusDisplay';
import supabaseServer from '@/utils/supabase/server';
import { getStudyDetails } from '@/actions/study.action';
import Button from '@/components/common/Button';

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
      <div className="flex flex-col pb-24">
        <StudyDetail {...data.study} />
        {/* 로그인 === 작성자  */}
        <div className="flex items-center justify-center">
          <div className="fixed bottom-0 pt-8">
            {data.study.isRecruiting && (
              <StatusDisplay
                isRecruit={data.study.isRecruit}
                userId={session?.user.id || ''}
                isAuthor={isAuthor}
                params={params.studyId}
                acceptedStudy={data.acceptedStudy}
                recruitNum={data.study.recruitNum}
                children={null}
              />
            )}
            {!data.study.isRecruiting && (
              <div className="flex w-full min-w-[600px] items-center justify-center">
                <div className="mb-8 flex w-full max-w-[343px] items-center justify-center rounded-lg border-2 border-disabled bg-disabled p-4 text-white">
                  모집이 마감되었습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

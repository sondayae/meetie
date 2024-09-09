import StudyMain from '@/components/study/StudyMain';
import StatusDisplay from '@/components/study/studyDetail/StatusDisplay';
import supabaseServer from '@/utils/supabase/server';
import { getStudyDetails } from '@/actions/study.action';
import Header from '@/components/handin/Header';
import KebabMenuIcon from '@/components/icons/KebabMenuIcon';
import { getStudyMember } from '@/actions/studymember.action';
import { getStudyApply } from '@/actions/studyrequest.action';
import ToggleMenu from '@/components/study/ToggleMenu';
// import { useRouter } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { studyId: string };
}) {
  // const router = useRouter();

  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 스터디 정보 가져오기
  const data = await getStudyDetails(params.studyId);

  // 스터티 신청 정보 가져오기
  const applyData = await getStudyApply(params.studyId);

  // 로그인 유저 신청 여부 확인
  const isApply = applyData.find(
    (item: any) => item.userId === session?.user.id,
  );

  // 스터티 멤버 정보 가져오기
  const memberData = await getStudyMember(params.studyId);

  // 작성자 여부 확인
  const isAuthor = session?.user.id === data.user.id;

  return (
    <>
      <div className="flex flex-col pb-24">
        <header>
          <Header leftIcon rightIcon={isAuthor ? <KebabMenuIcon /> : ''} />
        </header>
        <StudyMain {...data} />
        <footer>
          <StatusDisplay
            isRecruiting={data.isRecruiting}
            userId={session?.user.id || ''}
            isAuthor={isAuthor}
            isApply={isApply}
            params={params.studyId}
            acceptedStudy={memberData.length}
            recruitNum={data.recruitNum}
          />
        </footer>
      </div>
    </>
  );
}

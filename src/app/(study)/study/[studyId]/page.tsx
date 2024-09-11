import StudyMain from '@/components/study/StudyMain';
import supabaseServer from '@/utils/supabase/server';
import { getStudyDetails } from '@/actions/study.action';
import Header from '@/components/handin/Header';
import KebabMenuIcon from '@/components/icons/KebabMenuIcon';
import { getStudyMember } from '@/actions/studymember.action';
import { getStudyApply } from '@/actions/studyrequest.action';
import { getUser } from '@/actions/mypage.action';

export default async function Page({
  params,
}: {
  params: { studyId: string };
}) {
  // const router = useRouter();
  const supabaseAuth = supabaseServer();
  const { data, error } = await supabaseAuth.auth.getUser();

  // 로그인 유저  정보
  const userdata = await getUser({ id: data?.user?.id });
  // console.log(userdata);

  // 스터디 정보 가져오기
  const studydata = await getStudyDetails(params.studyId);

  // 스터티 신청 정보 가져오기
  const applyData = await getStudyApply(params.studyId);

  // 로그인 유저 신청 여부 확인
  const isApply = applyData.some((item: any) => item.userId === userdata?.id);

  const detaildata = { userdata, isApply, params, ...studydata };

  // 작성자 여부 확인 => 작성자일 경우 kebabMenuIcon 표시
  const isAuthor = userdata === studydata.user.id;

  return (
    <>
      <div className="flex min-h-dvh max-w-[600px] flex-col pb-24">
        <Header leftIcon rightIcon={isAuthor ? <KebabMenuIcon /> : ''} />
        <StudyMain {...detaildata} />
      </div>
    </>
  );
}

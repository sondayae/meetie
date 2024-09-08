import { getUser } from '@/actions/mypage.action';
import StudyForm from '@/components/study/StudyForm';
import { getServerUserId } from '@/lib/actions/getServerUserId';
import { get } from 'http';

export default async function StudyWrite() {
  const userId = await getServerUserId();
  const user = await getUser({ id: userId });

  return (
    <>
      {/* 스터디 폼 */}
      <StudyForm isEditMode={false} userId={userId} user={user} />
    </>
  );
}

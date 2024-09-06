import StudyForm from '@/components/study/StudyForm';
import { getServerUserId } from '@/lib/actions/getServerUserId';

export default async function StudyWrite() {
  const userId = await getServerUserId();
  return (
    <>
      {/* 스터디 폼 */}
      <StudyForm isEditMode={false} userId={userId} />
    </>
  );
}

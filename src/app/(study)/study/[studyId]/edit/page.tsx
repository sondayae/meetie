// 'use client';
import { getUser } from '@/actions/mypage.action';
import StudyForm from '@/components/study/StudyForm';
import { getServerUserId } from '@/lib/actions/getServerUserId';

export default async function EditPage() {
  const userId = await getServerUserId();
  const user = await getUser({ id: userId });

  return (
    <>
      {/* 스터디 수정 폼 */}
      <StudyForm isEditMode={true} userId={userId} user={user} />
    </>
  );
}

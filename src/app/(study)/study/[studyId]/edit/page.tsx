'use client';
import StudyForm from '@/components/study/StudyForm';
import { useUser } from '@/stores/user/user';

export default function EditPage() {
  const { user } = useUser();
  return (
    <>
      {/* 스터디 수정 폼 */}
      <StudyForm isEditMode={true} user={user} />
    </>
  );
}

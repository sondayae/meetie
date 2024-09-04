import StudyForm from '@/components/study/StudyForm';

export default function EditPage() {
  return (
    <>
      {/* 스터디 수정 폼 */}
      <StudyForm isEditMode={true} />
    </>
  );
}

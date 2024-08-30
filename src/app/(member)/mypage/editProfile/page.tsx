import supabase from '@/utils/supabase/client';

export default function editProfile() {
  const getStudy = async (studyId: string | string[]) => {
    try {
      console.log('studyId', studyId);
      const { data, error } = await supabase
        .from('study')
        .select('*')
        .eq('id', studyId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('알 수 없는 에러가 발생했습니다.', error);
      throw error;
    }
  };
  return (
    <>
      <h1>회원 정보 수정</h1>
    </>
  );
}

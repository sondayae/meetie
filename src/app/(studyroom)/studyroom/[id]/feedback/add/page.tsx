import Header from '@/components/handin/Header';
import FeedForm from '@/components/studyRoom/feedback/FeedForm';
import supabaseServer from '@/utils/supabase/server';

export default async function FeedbackAddPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = supabaseServer();
  const {data: homeworks} = await supabase.from('homework').select().eq('study_id', params.id);

  return (
    <>
      <Header label='과제 인증'/>
      <FeedForm studyId={params.id} homeworks={homeworks}/>
    </>
  )
}
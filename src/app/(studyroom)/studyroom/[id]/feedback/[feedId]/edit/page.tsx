import { getFeedback } from '@/actions/studyroom/feedbackActions';
import NoticeBox from '@/components/common/NoticeBox';
import HandinForm from '@/components/handin/HandinForm';
import Header from '@/components/handin/Header';
import CalendarIcon from '@/components/icons/CalendarIcon';
import FeedForm from '@/components/studyRoom/feedback/FeedForm';
import { getHomeworks } from '@/lib/actions/homework';

export default async function FeedbackEditPage({params}: {params: {id: string, feedId: string}}) {
  const feedback = await getFeedback(params.feedId);
  const homeworks = await getHomeworks(params.id);
  console.log(homeworks);
  
  

  return (
    <>
    <Header label='과제 인증 수정' rightIcon={<CalendarIcon />} />
    <FeedForm feedback={feedback} homeworks={homeworks}/>
    </>
  )
}
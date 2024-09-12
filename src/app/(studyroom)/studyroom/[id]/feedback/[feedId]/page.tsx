import { getFeedback } from '@/actions/studyroom/feedbackActions'
import CommentForm from '@/components/handin/CommentForm';
import Header from '@/components/handin/Header';
import FeedDetail from '@/components/studyRoom/feedback/FeedDetail';
import FeedReaction from '@/components/studyRoom/feedback/FeedReaction';

export default async function feedbackDetailPage({ params }: { params: { feedId: string } }) {
  const feedback: Feedback = await getFeedback(params.feedId);
  return (
    <>
      <Header />
      <section>
        <FeedDetail feedback={feedback}/>
      </section>
      <section className='bg-white'>
        <FeedReaction reactionLength={feedback.feedback_reactions?.length} commentLength={feedback.comment?.length}/>
        <div>댓글 영역</div>
        <CommentForm targetId={params.feedId}/>
      </section>
    </>
  )
}
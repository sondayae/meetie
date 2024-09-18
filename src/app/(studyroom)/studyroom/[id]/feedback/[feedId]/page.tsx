import { getFeedback } from '@/actions/studyroom/feedbackActions';
import { getUser } from '@/actions/userActions';
import Header from '@/components/handin/Header';
import CommentForm from '@/components/studyRoom/feedback/CommentForm';
import CommentList from '@/components/studyRoom/feedback/CommentList';
import FeedDetail from '@/components/studyRoom/feedback/FeedDetail';
import FeedReaction from '@/components/studyRoom/feedback/FeedReaction';
import userEventEmitter from '@/lib/EventEmitter';

export default async function feedbackDetailPage({
  params,
}: {
  params: { feedId: string };
}) {
  const feedback: Feedback = await getFeedback(params.feedId);

  return (
    <div className='h-screen overflow-y-scroll scrollbar-hide'>
      <Header />
      <FeedDetail feedback={feedback} />
      <div className="bg-white">
        <FeedReaction
          targetId={params.feedId}
          feedReactions={feedback.feedback_reactions}
          commentLength={feedback.comment?.length}
          />
      </div>
      <CommentList targetId={params.feedId} comments={feedback.comment}/>
    </div>
  );
}

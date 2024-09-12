import { getFeedback } from '@/actions/studyroom/feedbackActions';
import { getUser } from '@/actions/userActions';
import CommentForm from '@/components/handin/CommentForm';
import Header from '@/components/handin/Header';
import Comment from '@/components/studyRoom/feedback/Comment';
import FeedDetail from '@/components/studyRoom/feedback/FeedDetail';
import FeedReaction from '@/components/studyRoom/feedback/FeedReaction';

export default async function feedbackDetailPage({
  params,
}: {
  params: { feedId: string };
}) {
  const feedback: Feedback = await getFeedback(params.feedId);
  const user = await getUser();

  return (
    <>
      <Header />
      <section>
        <FeedDetail feedback={feedback} />
      </section>
      <section className="bg-white">
        <FeedReaction
          targetId={params.feedId}
          feedReactions={feedback.feedback_reactions}
          commentLength={feedback.comment?.length}
        />
        <div>
          {feedback.comment?.map((item: FeedComment) => (
            <Comment key={feedback.id} comment={item} />
          ))}
        </div>
      </section>
      <CommentForm targetId={params.feedId} user={user}/>
    </>
  );
}

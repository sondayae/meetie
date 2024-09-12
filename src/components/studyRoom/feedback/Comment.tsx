/* eslint-disable simple-import-sort/imports */

'use server';

import ProfileAvatar from '@/components/common/ProfileAvatar';
import MoreIcon from '@/components/icons/MoreIcon';
import { dateTimeFormatter } from '@/utils/common/dateFormatter';
import { getServerUserId } from '@/lib/actions/getServerUserId';
import CommentReaction from './CommentReaction';

export default async function Comment({ comment }: { comment: FeedComment }) {
  const userId = await getServerUserId();
  const reactionListWithCount = comment.reactions.reduce(
    (acc: any, current: any, idx) => {
      const existingEntry = acc.find(
        (item: any) => item.emoji === current.emoji,
      );
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ id: idx, emoji: current.emoji, count: 1 });
      }
      return acc;
    },
    [],
  );

  return (
    <div className="flex gap-2 bg-[#FAFAFA] bg-opacity-50 px-4 py-5 border-b">
      <ProfileAvatar src={comment.user?.images?.url} />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{comment.user?.name}</span>
          <span className="text-xs font-medium text-muted-foreground">
            {dateTimeFormatter(comment.created_at)}
          </span>
        </div>
        <p className="text-sm">{comment.comment}</p>
        <div className="mt-9">
          <CommentReaction targetId={comment.id} reactions={reactionListWithCount} />
        </div>
      </div>
      {comment.user_id === userId && (
        <MoreIcon className="ml-auto stroke-black" />
      )}
    </div>
  );
}

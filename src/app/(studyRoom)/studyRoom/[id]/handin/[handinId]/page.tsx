'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import Comment from '@/components/handin/Comment';
import HandinDetail from '@/components/handin/HandinDetail';
import Header from '@/components/handin/Header';
import SendIcon from '@/components/icons/SendIcon';
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from '@/lib/actions/comment';
import { deleteHandin, getFeedback } from '@/actions/studyroom/handinActions';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import { useMutation, useQuery } from '@tanstack/react-query';
import BackArrowIcon from '@/components/icons/BackArrowIcon';
import Navigator from '@/components/common/Navigator';
import CommentList from '@/components/handin/CommentList';
import { queryClient } from '@/config/ReactQueryClientProvider';
import AddReaction from '@/components/icons/AddReaction';
import Separator from '@/components/common/Separator';

function Page({ params }: { params: { handinId: string } }) {
  const router = useRouter();
  const { handinId } = params;
  const [comment, setComment] = useState('');

  const getFeed = useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const feedback = await getFeedback(handinId);      
      return feedback;
    }
  });

  const createCommentMutation = useMutation({
    mutationFn: () =>
      createComment({
        comment: comment,
        targetId: handinId,
      }),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({queryKey: ['comments']});
    },
  });

  const handleEditHandin = () => {
    router.push(`./edit/${handinId}`);
  };
  const handleDeleteHandin = async (id: string) => {
    const { success } = await deleteHandin(id);
    if (success) {
      router.push('./');
    }
  };

  return (
    <>
    {/* 헤더 영역 */}
    <Header leftIcon={<BackArrowIcon />}/>
    {/* 콘텐츠 영역 */}
    <div className='flex-1 overflow-scroll'>
      {getFeed.data &&
      <>
        <HandinDetail
          handin={getFeed.data}
          />
        <div className='p-4 flex flex-col gap-4 border'>
          <div className='flex items-center font-semibold text-sm gap-1'>
            <span>표정</span>
            <span>2</span>
            <Separator type='circle'/>
            <span>댓글</span>
            <span>1</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-10 h-10 p-2 bg-muted border rounded-full flex items-center justify-center'>
              <AddReaction className='w-5 h-5 fill-[#504F50]'/>
            </span>
            <span className='w-10 h-10'>
              <ProfileAvatar />
            </span>
          </div>
        </div>
        <CommentList targetId={getFeed.data?.[0].id}/>
      </>
      }
    </div>
    <div className='sticky bottom-0'>
      <div className="flex items-center gap-3 border border-[#efefef] bg-white px-4 py-5">
        <ProfileAvatar />
        <span className="flex-grow relative">
            <input
              value={comment}
              type="text"
              placeholder="스터디원에게 응원의 메세지 보내기"
              className="w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] p-3.5 py-3 text-sm placeholder-gray-purple focus:outline-none"
              onChange={(e) => setComment(e.target.value)}
              />
              <button
                type='button'
                className="absolute bottom-[8px] right-[14px] top-[8px]"
                onClick={() => createCommentMutation.mutate()}
                >
                <SendIcon />
              </button>
        </span>
      </div>
    </div>
    </>
  );
}
export default Page;

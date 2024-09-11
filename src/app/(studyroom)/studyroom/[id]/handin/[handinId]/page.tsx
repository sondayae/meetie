// 'use client';

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
import supabaseServer from '@/utils/supabase/server';
import CommentForm from '@/components/handin/CommentForm';

export default async function FeedbackDetailPage({ params }: { params: { handinId: string } }) {
  const supabase = supabaseServer();
  let { data } = await supabase
    .from('handin')
    .select('*, user(name), homework(*), images(*)')
    .eq('id', params.handinId);

  console.log(data);
  // const router = useRouter();
  // const { handinId } = params;
  // const [comment, setComment] = useState('');

  // const getFeed = useQuery({
  //   queryKey: ['feedback'],
  //   queryFn: async () => {
  //     const feedback = await getFeedback(handinId);      
  //     return feedback;
  //   }
  // });

  // const createCommentMutation = useMutation({
  //   mutationFn: () =>
  //     createComment({
  //       comment: comment,
  //       targetId: handinId,
  //     }),
  //   onSuccess: () => {
  //     setComment('');
  //     queryClient.invalidateQueries({queryKey: ['comments']});
  //   },
  // });

  // const handleEditHandin = () => {
  //   router.push(`./edit/${handinId}`);
  // };
  // const handleDeleteHandin = async (id: string) => {
  //   const { success } = await deleteHandin(id);
  //   if (success) {
  //     router.push('./');
  //   }
  // };

  return (
    <>
    {/* 헤더 영역 */}
    <Header leftIcon={<BackArrowIcon />}/>
    {/* 콘텐츠 영역 */}
    <div className='flex-1 overflow-y-scroll'>
      { data?.map(item => (
        <div>
          <HandinDetail data={item} />
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
          <CommentList targetId={item.id} />
          <CommentForm targetId={item.id} />
        </div>
        ))
      }
    </div>
    </>
  );
}

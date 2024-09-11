
'use client';

import { useRouter } from 'next/navigation';

import Comment from '@/components/handin/Comment';
import HandinDetail from '@/components/handin/HandinDetail';
import Header from '@/components/handin/Header';
import SendIcon from '@/components/icons/SendIcon';
import { deleteHandin, getFeedback } from '@/actions/studyroom/handinActions';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import { useMutation, useQuery } from '@tanstack/react-query';
import CommentList from '@/components/handin/CommentList';
import AddReaction from '@/components/icons/AddReaction';
import Separator from '@/components/common/Separator';
import CommentForm from '@/components/handin/CommentForm';

export default function FeedbackDetailPage({ params }: { params: { handinId: string } }) {
  const router = useRouter();
  const handinId = params.handinId;
  

  const getFeed = useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const feedback = await getFeedback(handinId);
      return feedback;
  }});


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
    <Header label='과제 인증'/>
    {/* 콘텐츠 영역 */}
    <div className='flex-1 overflow-y-scroll'>
      { getFeed.data && 
        <div key={getFeed.data.id}>
          <HandinDetail data={getFeed.data} />
          <div className='p-4 flex flex-col gap-4 border'>
            <div className='flex items-center font-semibold text-sm gap-1'>
              <span>표정</span>
              <span>1</span>
              <Separator type='circle'/>
              <span>댓글</span>
              <span>{getFeed.data.comments.length}</span>
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
          <CommentList targetId={getFeed.data.id} />
          <CommentForm targetId={getFeed.data.id}/>
        </div>
      }
    </div>
    </>
  );
}

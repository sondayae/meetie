'use client';

import { useEffect, useRef, useState } from 'react';

import { createComment, deleteComment, getComments, updateComment } from '@/lib/actions/comment';

import ProfileImg from '@/components/common/ProfileImg';
import Header from '@/components/handin/Header';
import HandinDetail from '@/components/handin/HandinDetail';
import Comment from '@/components/handin/Comment';
import SendIcon from '@/components/icons/SendIcon';
import { deleteHandin } from '@/lib/actions/handin';
import { useRouter } from 'next/navigation';

function Page({ params }: { params: { handinId: string } }) {
  const router = useRouter();
  const [handinInfo, setHandinInfo] = useState<any>();
  const [commentList, setCommentList] = useState<any>();
  const { handinId } = params;
  const formRef = useRef();
  
  const fetchData = async () => {
    const res = await fetch(`/api/handin?id=${handinId}`);
    const data = await res.json();
    setHandinInfo(data[0]);
  };
  const fetchCommentList = async () => {
    const { data } = await getComments(handinId);
    setCommentList(data);
  }
  useEffect(() => {
    fetchData();
    fetchCommentList();
  }, []);

  const handleEditHandin = () => {
    router.push(`./edit/${handinId}`)
  }
  const handleDeleteHandin = async (id) => {
    const { success } = await deleteHandin(id);
    if (success) {
      router.push('./');
    }
  }

  const handleCreateComment = async (formData: FormData) => {
    const {data: sentComment} = await createComment(formData);
    formRef.current.reset();
    if (sentComment) {
      setCommentList((commentList) => [sentComment, ...commentList]);
    }
  }
  const handleUpdateComment = async (formData: FormData) => {
    const {data: sentComment} = await updateComment(formData);
    if (sentComment) {
      let newCommentList = commentList.map(item => {
        if (item.id === sentComment.id) {
          item.comment = sentComment.comment;
          item.created_at = sentComment.created_at;
        }
        return item;
      });
      setCommentList(newCommentList);
    }
  }

  const handleDeleteComment = async (commentId) => {
    const { success } = await deleteComment(commentId);
    if (success) {
      let newCommentList = commentList.filter(item => item.id !== commentId);
      setCommentList(newCommentList);
    }
  }

  return (
    <>
      {handinInfo && 
        <div className="h-full">
          <Header />
          <HandinDetail handin={handinInfo} editHandin={handleEditHandin} deleteHandin={handleDeleteHandin}/>
          <div className="flex w-full sticky bottom-0 justify-center items-center gap-[12px] px-[18px] py-[20px] bg-white border-[#efefef] border-y">
            <ProfileImg />
          <span className='flex-grow'>
          <form action={handleCreateComment} className="relative" ref={formRef}>
                <input
                  type="text"
                  name="targetId"
                  className="hidden"
                  required
                  defaultValue={'14'}
                />
                <input
                  required
                  type="text"
                  name="comment"
                  placeholder="스터디원에게 응원의 메세지 보내기"
                  className={`w-full rounded-lg bg-[#f3f3f3] py-[11.5px] border border-[#E9E9E9] text-sm placeholder-gray-purple focus:outline-none p-2`}
                />
                <button
                  type="submit"
                  className="absolute bottom-[8px] right-[14px] top-[8px]"
                  aria-label="send"
                >
                  <SendIcon />
                </button>
            </form>
          </span>
          </div>
          {commentList && commentList.map(comment => <Comment key={comment.id} comment={comment} handleEdit={handleUpdateComment} handleDelete={handleDeleteComment}/>)}
          </div>
      }
    </>
  );
}
export default Page;

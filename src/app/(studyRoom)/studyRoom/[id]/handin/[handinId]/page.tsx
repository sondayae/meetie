'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import ProfileImg from '@/components/common/ProfileImg';
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
import { deleteHandin } from '@/lib/actions/handin';

function Page({ params }: { params: { handinId: string } }) {
  const router = useRouter();
  const [handinInfo, setHandinInfo] = useState<any>();
  const [commentList, setCommentList] = useState<any>();
  const { handinId } = params;
  const formRef: any = useRef(null);

  const fetchData = async () => {
    const res = await fetch(`/api/handin?id=${handinId}`);
    const data = await res.json();
    setHandinInfo(data[0]);
  };
  const fetchCommentList = async () => {
    const { data } = await getComments(handinId);
    setCommentList(data);
  };
  useEffect(() => {
    fetchData();
    fetchCommentList();
  }, []);

  const handleEditHandin = () => {
    router.push(`./edit/${handinId}`);
  };
  const handleDeleteHandin = async (id: string) => {
    const { success } = await deleteHandin(id);
    if (success) {
      router.push('./');
    }
  };

  const handleCreateComment = async (formData: FormData) => {
    const { data: sentComment } = await createComment(formData);
    formRef.current.reset();
    if (sentComment) {
      setCommentList((commentList: any) => [sentComment, ...commentList]);
    }
  };
  const handleUpdateComment = async (formData: FormData) => {
    const { data: sentComment } = await updateComment(formData);
    if (sentComment) {
      const newCommentList = commentList.map((item: any) => {
        if (item.id === sentComment.id) {
          item.comment = sentComment.comment;
          item.created_at = sentComment.created_at;
        }
        return item;
      });
      setCommentList(newCommentList);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const { success } = await deleteComment(commentId);
    if (success) {
      const newCommentList = commentList.filter(
        (item: any) => item.id !== commentId,
      );
      setCommentList(newCommentList);
    }
  };

  return (
    <>
      {handinInfo && (
        <div className="h-full">
          <Header />
          <HandinDetail
            handin={handinInfo}
            editHandin={handleEditHandin}
            deleteHandin={handleDeleteHandin}
          />
          <div className="sticky bottom-0 flex w-full items-center justify-center gap-[12px] border-y border-[#efefef] bg-white px-[18px] py-[20px]">
            <ProfileImg />
            <span className="flex-grow">
              <form
                action={handleCreateComment}
                className="relative"
                ref={formRef}
              >
                <input
                  type="text"
                  name="targetId"
                  className="hidden"
                  required
                  defaultValue="14"
                />
                <input
                  required
                  type="text"
                  name="comment"
                  placeholder="스터디원에게 응원의 메세지 보내기"
                  className="w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] p-2 py-[11.5px] text-sm placeholder-gray-purple focus:outline-none"
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
          {commentList &&
            commentList.map((comment: any) => (
              <Comment
                key={comment.id}
                comment={comment}
                handleEdit={handleUpdateComment}
                handleDelete={handleDeleteComment}
              />
            ))}
        </div>
      )}
    </>
  );
}
export default Page;

'use client';

import { dateFormatter } from '@/utils/common/dateFormatter';
import ProfileImg from '../common/ProfileImg';
import DropDownMenu from './DropDownMenu';
import { useRef, useState } from 'react';
import useConfirm from '@/hooks/use-confirm';

type CommentProps = {
  comment: any;
  handleEdit: any;
  handleDelete: any;
}

export default function Comment({ comment, handleEdit, handleDelete }: CommentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const formRef:any = useRef();

  const formAction = (formData: FormData) => {
    handleEdit(formData);
    setIsEdit(false);
  }

  const deleteComment = async () => {
    const result = await confirm();
    if (result) {
      handleDelete(comment.id);
    }
  }

  const { ConfirmModal, confirm } = useConfirm({
    title: '삭제',
    message: '댓글을 삭제하시겠습니까?',
  });

  return (
    <>
    <ConfirmModal />
    <div key={comment.id} className="border-x border-b border-[#efefef] bg-[#FAFAFA] bg-opacity-45 p-[18px]">
      <div className="flex gap-[12px]">
        <div>
          <ProfileImg />
        </div>
        {isEdit &&
          <div className="w-full">
          <form action={formAction} className="relative" ref={formRef}>
            <input
              type="text"
              name="id"
              className="hidden"
              defaultValue={comment.id}
            />
            <div className="rounded-lg bg-[#f3f3f3]">
            <input
              defaultValue={comment.comment}
              required
              type="text"
              name="comment"
              className={`w-full rounded-lg bg-[#f3f3f3] py-[11.5px] border border-[#E9E9E9] text-sm placeholder-gray-purple focus:outline-none p-2`}
            />
            <div className="flex justify-end gap-[8px] border-t border-[#dfdfdf] p-1">
              <button
                type="button"
                className="rounded-lg border border-middle-gray px-3 py-2 text-xs"
                onClick={() => setIsEdit(false)}
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-lg bg-main-purple px-3 py-2 text-xs text-white"
              >
                저장
              </button>
            </div>
            </div>
            </form>
            </div>
        }
        {!isEdit &&
          <div className="flex flex-col gap-[4px] w-full">
            <div className='flex justify-between relative flex-nowrap'>
              <div className="flex items-center">
                <span className="mr-[7px] font-bold">{comment.user && comment.user.name}</span>
                <span className="text-xs text-[#898989]">{dateFormatter(comment.created_at)}</span>
              </div>
              <DropDownMenu handleEdit={() => setIsEdit(true)} handleDelete={deleteComment}/>
            </div>
            <span className="break-all text-sm">
              {comment.comment}
              {!!comment.sending && <small>(Sending...)</small>}
            </span>
            <div>
              리액션
            </div>
          </div>
        }
        </div>
    </div>
    </>
  );
}
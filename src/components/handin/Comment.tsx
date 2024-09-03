'use client';

import { useEffect, useRef, useState } from 'react';
import { upsertComment } from '@/lib/actions/upsertComment';

import ProfileImg from '../common/ProfileImg';
import DropDownMenu from './DropDownMenu';
import useConfirm from '@/hooks/use-confirm';
import { deleteComment } from '@/lib/actions/deleteComment';
import { useFormState } from 'react-dom';
import { dateFormatter } from '@/utils/common/dateFormatter';

type Comment = {
  id: string;
  comment: string;
  user: any;
  date: string;
}

const initialState = { success: false, data: [] };

export default function Comment({ id, comment, user, date }: Comment) {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(comment);

  const [state, formAction] = useFormState(upsertComment, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && state.data) {
      setIsEdit(false);
      setText(state.data[0].comment);
    }
  }, [state]);
  
  const handleEdit = () => {
    setIsEdit(true);
  }

  const handleDelete = async () => {
    const result = await confirm();
    if (result) {
      deleteComment(id);
    }
  }

  const menus = [
    {name: '수정하기', action: handleEdit},
    {name: '삭제하기', action: () => handleDelete()},
  ];
  const { ConfirmModal, confirm } = useConfirm({
    title: '삭제',
    message: '댓글을 삭제하시겠습니까?',
  });




  return (
    <>
    <ConfirmModal />
    <div className="border-x border-b border-[#efefef] bg-[#FAFAFA] bg-opacity-45 p-[18px]">
      <div className="flex gap-[12px]">
        <div>
          <ProfileImg username={user.name} src={user.images?.url}/>
        </div>
        {!isEdit ? (
          <div className="flex flex-col gap-[4px] w-full">
            <div className='flex justify-between relative flex-nowrap'>
              <div className="flex items-center">
                <span className="mr-[7px] font-bold">{user.name}</span>
                <span className="text-xs text-[#898989]">{dateFormatter(date)}</span>
              </div>
              <DropDownMenu menus={menus}/>
            </div>
            <span className="break-all text-sm">{text}</span>
          </div>
          ) : (
          <div className="w-full">
            <form action={formAction} className="relative" ref={formRef}>
              <input
                type="text"
                name="id"
                className="hidden"
                defaultValue={id}
              />
              <div className="rounded-lg bg-[#f3f3f3]">
              <input
                defaultValue={text}
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
          )}
        </div>
      </div>
    </>
  );
}

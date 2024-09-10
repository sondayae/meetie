import { useRef } from 'react';
import SendIcon from '../icons/SendIcon';
import ProfileAvatar from '../common/ProfileAvatar';

export default function CommentForm({ targetId }: { targetId: string}) {
  // todo form action 사용으로 변경

  return (
    <div className='sticky bottom-0'>
      <div className="flex items-center gap-3 border border-[#efefef] bg-white px-4 py-5">
        <ProfileAvatar />
        <span className="flex-grow relative">
            <input
              type="text"
              placeholder="스터디원에게 응원의 메세지 보내기"
              className="w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] p-3.5 py-3 text-sm placeholder-gray-purple focus:outline-none"
              />
              <button
                type='button'
                className="absolute bottom-[8px] right-[14px] top-[8px]"
                >
                <SendIcon />
              </button>
        </span>
      </div>
    </div>
  );
}

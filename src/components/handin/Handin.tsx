'use client';

import { useRouter } from 'next/navigation';

import ProfileImg from '../common/ProfileImg';
import NewCheckSignIcon from '../icons/NewCheckSignIcon';
import DropDownMenu from './DropDownMenu';
import ImageFrame from './ImageFrame';
import Separator from '../common/Separator';
import EmojiIcon from '../icons/EmojiIcon';
import CommentIcon from '../icons/CommentIcon';
export type HandinType = {
  id: string;
  userName: string;
  text: string;
  handinImg: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function Handin() {

  return (
    <div className="flex flex-col gap-4 border-b px-4 py-5">
      <div className="relative flex gap-2">
        <div className="flex flex-shrink-0">
          <ProfileImg />
        </div>
        <div className="flex w-full flex-grow items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-bold">제이크</span>
            <span>
              <NewCheckSignIcon
                circleClassName="fill-black"
                checkClassName="fill-white"
              />
            </span>
            <span className="text-xs text-[#898989]">14일차 과제 (1)</span>
          </div>
          <div>
            <DropDownMenu handleEdit={() => {}} handleDelete={() => {}} />
          </div>
        </div>
      </div>
      <div className="m-6 flex flex-col gap-5">
        <p>
          강의 듣기 끝! 실습 과정에서 어려움이 있었어요 🤔 피그마 링크
          공유합니다 ~ 피드백 환영
        </p>
        <ImageFrame
          src="https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/images/handin/handin_0aafc97e-4b67-4ba3-bd09-90412d52a8a5"
          alt="handin_image"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-[#636363]">
            <span>오전 9:00</span>
            <Separator type="circle" />
            <span>2024.9.4</span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <div className="flex items-center gap-1">
              <span>
                <EmojiIcon />
              </span>
              <span className="text-xs text-[#636363]">1</span>
            </div>
            <div className="flex items-center gap-1">
              <span>
                <CommentIcon />
              </span>
              <span className="text-xs text-[#636363]">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

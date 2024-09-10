import { useState } from 'react';
import MoreIcon from '../icons/MoreIcon';

type DropDownMenuProps = {
  handleEdit: any;
  handleDelete: any;
}

//TODO 렌더링 최적화
export default function DropDownMenu({handleEdit, handleDelete}: DropDownMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className='flex justify-end'>
      <button
        type="button"
        className="flex h-[32px] w-[32px] items-center justify-center relative"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="moreActions"
      >
        <span id="svgContainer">
          <MoreIcon className='stroke-black'/>
        </span>
      </button>
      {showMenu &&
        <div className="absolute top-10 translate-x-[1.4rem] shadow-xl" onClick={() => setShowMenu(false)}>
          <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#eee]" />
          <div className="z-10 flex flex-col bg-[#eee] py-2 text-start">
            <span className='flex px-4 text-xs tracking-widest hover:bg-[#dfdfdf]' onClick={handleEdit}>수정하기</span>
            <span className='flex px-4 text-xs tracking-widest hover:bg-[#dfdfdf]' onClick={handleDelete}>삭제하기</span>
          </div>
        </div>
      }
    </div>
  );
}

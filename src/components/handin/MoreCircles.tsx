'use client';

import { Dispatch, useState } from 'react';
import MoreIcon from '../icons/MoreIcon'

const MoreCircles = ({ openModal, closeModal, }: any) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        setIsClicked(!isClicked);
    }

    const handleEdit = () => {
      console.log('수정');
      openModal();
    }

    const handleDelete = () => {
      console.log('삭제');
      openModal();
    }

  return (
    <>
    {isClicked ? (
      <div>
        <button onClick={handleClick}>
            <MoreIcon className='h-7 w-7 fill-black stroke-black' />
            <ul>
              <li onClick={handleEdit}>수정</li>
              <li onClick={handleDelete}>삭제</li>
            </ul>
        </button>
      </div>
    ) : (
      <button onClick={handleClick}>
        <MoreIcon className='h-7 w-7 fill-black stroke-black' />
      </button>
    )}
    </>
    )
}
export default MoreCircles
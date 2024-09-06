'use client';

import { useState } from 'react';
import Separator from '../common/Separator';
import NewCheckSignIcon from '../icons/NewCheckSignIcon';
import ProfileImg from '../common/ProfileImg';

type SelectItemProps = {
  title: string;
  subtitle: string;
}

export function SelectItem({title, subtitle}: SelectItemProps) {
  return (
    <div id='selectItem' className='flex w-full justify-center items-center p-[11.5px] gap-[12px] border-t'>
      <div className='aspect-square overflow-hidden w-[40px] h-[40px] border rounded-lg'>
        <img src="https://api.dicebear.com/9.x/glass/svg" alt="" />
      </div>
      <div id='selectItemText' className="flex flex-grow flex-col justify-center">
        <span className="font-semibold text-base">
          {title}
        </span>
        <div className='flex text-xs text-gray-purple font-medium'>
          <span>
            {subtitle}
          </span>
          <Separator type='bar'/>
          <span className="">14일차 과제</span>
        </div>
      </div>
    {/* { selected === id &&
      <div>
        <span>
          <NewCheckSignIcon circleClassName='fill-white stroke-main-purple' checkClassName='fill-main-purple'/>
        </span>
      </div>
    } */}
</div>
  )
}
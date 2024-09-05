'use client';

import Link from 'next/link';
import Chat from '../icons/Navigator/Chat';
import Lamp from '../icons/Navigator/Lamp';
import My from '../icons/Navigator/My';
import Search from '../icons/Navigator/Search';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function Navigator() {
  const path = usePathname();
  
  
  
  const menus = [{
    icon: <Lamp className='stroke-current'/>,
    name: '스터디룸',
    path: '/studyroom'
  }, {
    icon: <Search className='stroke-current'/>,
    name: '탐색',
    path: '/search'
  }, {
    icon: <Chat className='stroke-current'/>,
    name: '채팅',
    path: '/chat'
  }, {
    icon: <My className='stroke-current'/>,
    name: '마이페이지',
    path: '/mypage'
  }];
  return (
    <div className='flex bg-white justify-around py-2 drop-shadow'>
      {menus.map(menu => {
        return (
        <Link key={menu.name} href={menu.path}>
          <div className={twMerge('flex flex-col gap-1 items-center justify-center text-xs', path.includes(menu.path) ? 'text-main-purple' : 'text-gray-purple')}>
            <span>{menu.icon}</span>
            <span>{menu.name}</span>
          </div>
        </Link>
        )
      })}
    </div>
  )
}
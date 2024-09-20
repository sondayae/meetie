'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function TabMenu() {
  const menus = [
    { id: 'calendar', title: '캘린더', path: '/calendar' },
    { id: 'feedback', title: '피드백', path: '/feedback' },
    { id: 'chat', title: '채팅', path: '/chat' },
  ];
  const currentMenu = usePathname();

  return (
    <ul className="grid grid-cols-3 bg-white">
      {menus.map((menu) => {
        return (
          <Link key={menu.id} href={`./${menu.path}`} className="text-center">
            <li
              key={menu.id}
              className={twMerge(
                'p-3.5 text-muted-foreground',
                currentMenu.includes(menu.path) &&
                  'border-b-2 border-primary font-semibold text-primary',
              )}
            >
              {menu.title}
            </li>
          </Link>
        );
      })}
    </ul>
  );
}

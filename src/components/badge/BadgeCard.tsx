'use client';

type Badge = {
  title: string;
  name: string;
  src: string;
}

import {
  Card
} from "@/components/ui/card"


export default function BadgeCard() {
  // { badge, type }: {badge: Badge, type: string}
  // const title = badge.name;
  
  function getDisplayName(title: string) {
    if (title.includes('beginner')) {
        return '뉴비';
    } else if (title.includes('runner')) {
        return '러너';
    } else if (title.includes('master')) {
        return '마스터';
    } else {
        return title;
    }
  }
  return (
    <Card>
      <div className='flex flex-col'>
        <span>뱃지 이미지</span>
        <span>뱃지 이름</span>
      </div>
    </Card>
  );
}

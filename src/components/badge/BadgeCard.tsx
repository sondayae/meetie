'use client';

import { getBadgeImgUrl } from '@/utils/supabase/storage';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react';

export default function BadgeCard({ badge, type }) {
  const title = badge.name;
  
  function getDisplayName(title) {
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
    <Card className="py-4">
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="rounded-xl object-cover"
          // src="https://nextui.org/images/hero-card-complete.jpeg"
          src={badge.src}
          width={270}
        />
      </CardBody>
      <CardFooter>
        <small>{type} {getDisplayName(title)}</small>
      </CardFooter>
    </Card>
  );
}

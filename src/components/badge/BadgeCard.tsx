'use client';

import {
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react';

type Badge = {
  title: string;
  name: string;
  src: string;
}

export default function BadgeCard({ badge, type }: {badge: Badge, type: string}) {
  const title = badge.name;
  
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
    <Card className="py-4">
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="rounded-xl object-cover"
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

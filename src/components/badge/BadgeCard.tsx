'use client';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react';

export default function BadgeCard({ badge }) {
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
        <small>{badge.name}</small>
      </CardFooter>
    </Card>
  );
}

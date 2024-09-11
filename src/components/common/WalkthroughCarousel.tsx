'use client';

import { useState, useEffect } from 'react';

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import WalkthroughStepOne from '../icons/WalkthroughStepOne';
import WalkthroughStepTwo from '../icons/WalkthroughStepTwo';
import WalkthroughStepThree from '../icons/WalkthroughStepThree';

export function WalkthroughCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const slides = [
    {
      id: 0,
      title: (
        <>
          다양한 IT직군과의 <br /> 견고한 스터디를 경험해보세요.
        </>
      ),
      description: '다른 학습자들과 소통하며 함께 성장하세요!',
      icon: <WalkthroughStepOne className="-ml-12 -mt-40" />,
    },
    {
      id: 1,
      title: (
        <>
          다른 학습자들과 <br /> 함께 고민을 나눠보세요.
        </>
      ),
      description: (
        <>
          학습에 어려움을 겪고 있나요? <br /> 고민을 나누고 해결책을 찾아보세요!
        </>
      ),
      icon: <WalkthroughStepTwo className="mx-auto -mt-14" />,
    },
    {
      id: 2,
      title: (
        <>
          뱃지를 통해 성취를 경험하고, <br /> 차별화된 신뢰지표를 만들어보세요.
        </>
      ),
      description: '스터디 활동을 수행하고 다양한 뱃지를 획득하세요!',
      icon: <WalkthroughStepThree className="m-auto mt-20" />,
    },
  ];

  return (
    <>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
                <CardContent className="flex items-center justify-center p-6">
                  <div key={slide.id} className="mt-16 w-full flex-shrink-0 px-4">
                    <div className="flex flex-col gap-6">
                      <h2 className="text-2xl font-semibold text-dark-gray">
                        {slide.title}
                      </h2>
                      <p className="text-sm">{slide.description}</p>
                    </div>
                    {slide.icon}
                  </div>
                </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='flex gap-4 justify-center'>
        {Array.from({ length: slides.length }).map((_, index) => (
          <span key={index} className={`rounded-full h-3 w-3 ${current === index+1 ? 'bg-secondary' : 'bg-disabled'}`} />
        ))}
      </div>
    </>
  )
}

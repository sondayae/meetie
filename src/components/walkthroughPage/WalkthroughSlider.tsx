'use client';

import { useState } from 'react';

import Link from 'next/link';

import Button from '@/components/common/Button';
import RightArrowIcon from '@/components/icons/RightArrowIcon';
import WalkthroughStepOne from '@/components/icons/WalkthroughStepOne';
import WalkthroughStepThree from '@/components/icons/WalkthroughStepThree';
import WalkthroughStepTwo from '@/components/icons/WalkthroughStepTwo';
import ROUTE_PATH from '@/constants/route';

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

export default function WalkthroughSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const onClickPrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <>
      <div className="flex h-14 items-center justify-between p-4">
        {currentIndex > 0 && (
          <button type="button" aria-label="이전 버튼" onClick={onClickPrev}>
            <RightArrowIcon className="h-6 w-6 rotate-180" />
          </button>
        )}
        <Link
          className="ml-auto text-sm font-medium text-muted-foreground"
          href={ROUTE_PATH.MEMBER.PROFILE.CREATE}
        >
          SKIP
        </Link>
      </div>

      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="mt-16 w-full flex-shrink-0 px-4">
            <div className="flex flex-col gap-6">
              <h2 className="text-dark-gray text-2xl font-semibold">
                {slide.title}
              </h2>
              <p className="text-sm">{slide.description}</p>
            </div>
            {slide.icon}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {slides.map((slide) => (
          <span
            key={slide.id}
            className={`h-2.5 w-2.5 rounded-full ${
              currentIndex === slide.id ? 'bg-sub-purple' : 'bg-middle-gray'
            }`}
          />
        ))}
      </div>

      <div className="my-11 w-full px-4">
        {currentIndex === 2 ? (
          <Link
            className="border-main-purple inline-block w-full min-w-[340px] rounded-lg border-2 bg-primary p-3 text-center text-white"
            href={ROUTE_PATH.MEMBER.PROFILE.CREATE}
          >
            나와 비슷한 팀원 찾기
          </Link>
        ) : (
          <Button label="다음" onClick={onClickNext} size="medium" />
        )}
      </div>
    </>
  );
}

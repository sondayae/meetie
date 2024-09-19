'use client';

import { useEffect, useState } from 'react';

import AlramIcon from '../icons/AlramIcon';

interface RemainingTimeProps {
  endDate: string; // ISO 8601 형식의 날짜 문자열
}

export default function RemainingTime({ endDate }: RemainingTimeProps) {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  // 시간을 '00:00:00' 형식으로 변환하는 함수
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`;
  };

  // 남은 시간을 계산하는 함수
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(endDate).getTime();
    const difference = target - now;

    if (difference > 0) {
      setTimeLeft(formatTime(difference / 1000)); // 초 단위로 계산
    } else {
      setTimeLeft('00:00:00'); // 시간이 지나면 00:00:00 표시
    }
  };

  // 매초마다 남은 시간을 업데이트
  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex items-center gap-1 rounded bg-[#ff2c841f] px-2 py-1">
      <AlramIcon fill={'#D43477'} />
      <span className="text-[10px] font-semibold text-[#D43477]">
        인증 마감까지 · {timeLeft}
      </span>
    </div>
  );
}

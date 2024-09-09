'use client';
import ThinkingFace from '@/assets/ThinkingFace.png';
import Wavinghand from '@/assets/Wavinghand.png';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/handin/Header';
import WavingHand from '@/components/common/WavingHand';
import Navigator from '@/components/common/Navigator';
import Question from '@/components/icons/Header/Question';

export default function StudyPage() {
  const router = useRouter();

  // 스터디룸 유무확인
  // TODO: display 개선
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await fetch('/api/studyRoom');
  //       const data = await res.json();

  //       if (!res.ok) {
  //         throw new Error('Error fetching user data');
  //       }

  //       if (data && data.length > 0 && data[0]?.participating_study) {
  //         router.push(`/studyRoom/${data[0].participating_study}/handin`);
  //       }
  //     } catch (error) {
  //       console.error('error:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, [router]);

  return (
    <>
      {/* 헤더 영역 */}
      <div className='bg-muted'>
        <Header label='스터디룸' rightIcon={<Question />}/>
      </div>
      {/* 콘텐츠 영역 */}
      <div className='flex-1 p-4 bg-muted'>
        <div className='mb-8'>
          <h1 className='font-bold text-lg mb-2'>아직 스터디룸이<br/>존재하지 않아요!</h1>
          <p className='text-sm text-muted-foreground'>#원하는 스터디 룸을 탐색해볼까요?</p>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-[1fr_80px] bg-white rounded-lg p-6'>
            <div className='flex flex-col justify-center items-start gap-3'>
              <div>
                <p className='font-medium text-sm text-muted-foreground'>밋티의 맞춤형 스터디를 탐색해보세요!</p>
                <p className='font-bold text-lg'>스터디 탐색하기</p>
              </div>
              <Link href={'./search'} className='font-semibold text-xs bg-[#E3E3FA] rounded-lg p-2'>바로가기</Link>
            </div>
            <div>
              <Image 
                src='https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/assets/thinking-face-blue-bg-white.gif'
                width={80}
                height={80}
                alt='생각하는 이미지'
                priority
                unoptimized
              />
            </div>
          </div>
          <Link href={'/study/write'}>
            <div className='grid grid-cols-[1fr_80px] bg-accent rounded-lg p-6'>
              <div className='flex flex-col gap-1 justify-center'>
                <span className='text-xs text-muted-foreground'>찾으시는 스터디 룸이 없으신가요?</span>
                <span className='font-semibold text-sm'>쉽고 빠른 스터디룸 개설하기</span>
              </div>
              <div>
                <WavingHand />
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* 푸터 영역 */}
      <Navigator />
    </>
  );
}

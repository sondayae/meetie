'use client';
import ThinkingFace from '@/assets/ThinkingFace.png';
import Wavinghand from '@/assets/Wavinghand.png';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/handin/Header';
import WavingHand from '@/components/common/WavingHand';
import Navigator from '@/components/common/Navigator';
import Question from '@/components/icons/Header/Question';
import { fetchStudyList } from '@/actions/studyList.action';
import { Study } from '@/types/study';
import StudyListItem from '@/components/study/search/StudyListItem';

export default function StudyPage() {
  const router = useRouter();

  // 스터디룸 유무확인
  // TODO: display 개선
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await fetch('/api/studyroom');
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

  const [loading, setLoading] = useState(true);
  const [studyList, setStudyList] = useState<Study[]>([]);
  // 스터디 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studies = await fetchStudyList(3);
        setStudyList(studies);
        setLoading(false);
      } catch (error) {
        console.error('스터디 목록을 가져오는 중 오류가 발생했습니다', error);
      }
    };
    fetchData();
  }, [setStudyList]);

  return (
    <>
      {/* 헤더 영역 */}
      <div className='bg-muted'>
        <Header label='스터디룸' leftIcon={false} rightIcon={<Question />}/>
      </div>
      {/* 콘텐츠 영역 */}
      <div className="flex-1 bg-muted p-4">
        <div className="mb-8">
          <h1 className="mb-2 text-lg font-bold">
            아직 스터디룸이
            <br />
            존재하지 않아요!
          </h1>
          <p className="text-sm text-muted-foreground">
            #원하는 스터디 룸을 탐색해볼까요?
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-[1fr_80px] rounded-lg bg-white p-6">
            <div className="flex flex-col items-start justify-center gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  밋티의 맞춤형 스터디를 탐색해보세요!
                </p>
                <p className="text-lg font-bold">스터디 탐색하기</p>
              </div>
              <Link
                href={'./search'}
                className="rounded-lg bg-[#E3E3FA] p-2 text-xs font-semibold"
              >
                바로가기
              </Link>
            </div>
            <div>
              <Image
                src="https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/assets/thinking-face.gif"
                width={80}
                height={80}
                alt="생각하는 이미지"
                priority
                unoptimized
              />
            </div>
          </div>
          <Link href={'/study/write'}>
            <div className="grid grid-cols-[1fr_80px] rounded-lg bg-accent p-6">
              <div className="flex flex-col justify-center gap-1">
                <span className="text-xs text-muted-foreground">
                  찾으시는 스터디 룸이 없으신가요?
                </span>
                <span className="text-sm font-semibold">
                  쉽고 빠른 스터디룸 개설하기
                </span>
              </div>
              <div>
                <WavingHand />
              </div>
            </div>
          </Link>
          {/* 스터디 리스트 영역 */}
          <h2 className="mb-2 mt-6 text-lg font-semibold leading-6">
            지금 떠오르고 있는 <br />
            스터디룸
          </h2>
          <div className={'flex flex-col gap-4'}>
            {loading
              ? [...Array(3)].map((study, index) => (
                  <div
                    key={index}
                    className={'h-48 w-full animate-pulse bg-[#eaeaea]'}
                  ></div>
                ))
              : studyList.map((study) => (
                  <StudyListItem
                    key={study.id}
                    study={study}
                    className={'block'}
                  />
                ))}
          </div>
        </div>
      </div>
      {/* 푸터 영역 */}
      <Navigator />
    </>
  );
}

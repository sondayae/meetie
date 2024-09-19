'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/handin/Header';
import WavingHand from '@/components/common/WavingHand';
import Navigator from '@/components/common/Navigator';
import { fetchStudyList } from '@/actions/studyList.action';
import { Study } from '@/types/study';
import StudyListItem from '@/components/study/search/StudyListItem';
import { useJoinedStudyStore } from '@/stores/studyStore';
import StudyAvatar from '@/components/common/StudyAvatar';
import { QuestionTooltip } from '@/components/common/QuestionTooltip';

export default function StudyPage() {
  const router = useRouter();
  const { joinedStudyList } = useJoinedStudyStore();

  // 리다이렉션 속도가 늦어 UX 개선이 필요함 -> 주석 처리
  // useEffect(() => {
  //   if (joinedStudyList.length > 0) {
  //     router.push(`/studyroom/${joinedStudyList[0].id}/calendar`);
  //   }
  // }, [joinedStudyList]);

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
        const { data: studies } = await fetchStudyList(3);
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
      <Header
        label="스터디룸"
        leftIcon={false}
        rightIcon={<QuestionTooltip />}
        useBorderBottom={false}
        sticky={true}
        bgColor={'bg-muted'}
      />
      {/* 콘텐츠 영역 */}
      <div className="flex-1 bg-muted p-4 pb-10">
        <div className="flex flex-col gap-3">
          {joinedStudyList.length === 0 ? (
            <>
              <div className="mb-8">
                <h1 className="mb-2 text-lg font-bold leading-6">
                  아직 스터디룸이
                  <br />
                  존재하지 않아요!
                </h1>
                <p className="text-sm text-muted-foreground">
                  #원하는 스터디를 탐색해볼까요?
                </p>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-end justify-between rounded-lg bg-white px-6 py-7">
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
                <Image
                  src="https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/assets/thinking-face.gif"
                  width={64}
                  height={64}
                  alt="생각하는 이미지"
                  priority
                  unoptimized
                  className={'sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]'}
                />
              </div>
              <Link href={'/study/write'}>
                <div className="md: grid max-h-20 grid-cols-[1fr_auto] rounded-lg bg-[#ececff] px-6 py-3 md:py-2">
                  <div className="flex flex-col justify-center gap-y-0.5">
                    <span className="text-xs text-muted-foreground">
                      찾으시는 스터디가 없으신가요?
                    </span>
                    <span className="text-sm font-semibold">
                      쉽고 빠른 스터디 개설하기
                    </span>
                  </div>
                  <WavingHand className={'h-14 w-14 md:h-16 md:w-16'} />
                </div>
              </Link>
            </>
          ) : (
            <>
              {joinedStudyList.length > 0 && (
                <div>
                  <p className="pb-3 text-lg font-semibold">참여중인 스터디</p>
                  <div className="flex flex-col rounded-lg border bg-white [&>*:first-child]:border-none">
                    {joinedStudyList.map((study: any) => (
                      <Link
                        href={`./studyroom/${study.id}/calendar`}
                        className="border-t"
                        key={study.id}
                      >
                        <div className="flex gap-3 p-2">
                          <StudyAvatar />
                          <p className="flex flex-col text-start">
                            <span className="font-semibold">{study.title}</span>
                            <span className="text-xs font-medium">
                              {study.tags}
                            </span>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          {/* 스터디 리스트 영역 */}
          <h2 className="mb-2 mt-6 text-lg font-semibold leading-6">
            지금 떠오르고 <br />
            있는 스터디
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

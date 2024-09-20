'use client';
import StudyButton from '@/components/study/write/StudyButton';
import BackArrowIcon from '@/components/icons/BackArrowIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import { useRouter } from 'next/navigation';

export default function EditAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <header className="border-b-light-gray fixed flex w-full max-w-[600px] items-center justify-between border-b bg-white px-4 py-2">
        {/* <Link href={`..`}> */}
        {/* 뒤로가기 */}
        <StudyButton
          onClick={() => router.push('/mypage')}
          borderStyle={'border-none'}
        >
          <BackArrowIcon className="fill-dark-gray" />
        </StudyButton>

        {/* </Link> */}
        <h2 className="absolute left-[50%] translate-x-[-50%] text-lg font-medium">
          회원 정보 수정
        </h2>
        <button
          onClick={() => router.push('/')}
          className="flex h-10 w-10 items-center justify-center"
        >
          <HomeIcon className="h-7 w-7 stroke-[#777777]" />
        </button>
      </header>
      {children}
    </>
  );
}

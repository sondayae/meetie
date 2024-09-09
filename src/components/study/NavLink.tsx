'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import MoreIcon from '../icons/MoreIcon';
// import Button from '../common/Button';
import { useState } from 'react';
import BackArrowIcon from '../icons/BackArrowIcon';
import ToggleMenu from './ToggleMenu';
import StudyButton from './write/StudyButton';

export default function NavLink({
  pathName,
  children,
}: {
  pathName: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const { studyId } = useParams();

  // console.log('path는???', path);
  // console.log('studyId는???', studyId);

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };
  return (
    <>
      {!path.endsWith('study') && (
        <div className="m-auto flex w-full max-w-[600px] flex-col">
          <header className="mx-4 flex items-center justify-between py-2">
            {/* <Link href={`..`}> */}
            {/* 뒤로가기 */}
            <StudyButton
              onClick={
                path.endsWith('edit')
                  ? () => {
                      if (confirm('지금 나가면 스터디가 저장되지 않습니다!')) {
                        router.back();
                      }
                    }
                  : () => router.back()
              }
              borderStyle={'border-none'}
            >
              <BackArrowIcon className="fill-dark-gray" />
            </StudyButton>

            {/* </Link> */}
            <h2 className="absolute left-[50%] m-auto translate-x-[-50%] text-lg font-bold">
              {path.endsWith('studyrequest') && '대기중인 요청'}
              {path.endsWith('write') && '스터디 만들기'}
              {path.endsWith('edit') && '스터디 수정하기'}
            </h2>
            {/* 스터디 만들기 or 스터디 상세 */}
            <div className="relative z-[1] text-[12px]">
              {/* {path.endsWith('write') && '1 / 2'} */}

              {path.endsWith(`study/${studyId}`) && (
                <StudyButton
                  onClick={handleToggleMenu}
                  borderStyle="border-none"
                  buttonStyle="min-w-[50px] flex items-center justify-center"
                >
                  <MoreIcon className="h-7 w-7 fill-black stroke-black" />
                </StudyButton>
              )}
              {/* 토글 메뉴(스터디장만) */}
              {path.endsWith(`study/${studyId}`) && toggleMenu && (
                <ToggleMenu
                  toggleMenu={toggleMenu}
                  onClose={() => setToggleMenu(false)}
                />
              )}
            </div>
          </header>
          {children}
        </div>
      )}
    </>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function NavLink({
  pathName,
  children,
}: {
  pathName: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();

  return (
    <>
      <div className="m-auto flex w-full max-w-96 flex-col">
        <header className="mx-4 mb-[35px] flex items-center justify-between py-2">
          {/* <Link href={`..`}> */}
          <div onClick={() => router.back()}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.5303 11.9697C23.8232 12.2626 23.8232 12.7374 23.5303 13.0303L16.5607 20L23.5303 26.9697C23.8232 27.2626 23.8232 27.7374 23.5303 28.0303C23.2374 28.3232 22.7626 28.3232 22.4697 28.0303L14.9697 20.5303C14.6768 20.2374 14.6768 19.7626 14.9697 19.4697L22.4697 11.9697C22.7626 11.6768 23.2374 11.6768 23.5303 11.9697Z"
                fill="black"
                fillOpacity="0.8"
              />
            </svg>
          </div>
          {/* </Link> */}
          <h2 className="font-bold">
            {path.endsWith('studyrequest') && <p>대기중인 요청</p>}
            {/* 스터디 만들기 */}
          </h2>
          <div className="text-[12px]">
            {path.endsWith('studyrequest') ? ' ' : '1 / 2'}
          </div>
        </header>
        {children}
      </div>
    </>
  );
}

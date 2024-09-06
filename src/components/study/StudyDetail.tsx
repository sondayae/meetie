import { format } from 'date-fns';
import Link from 'next/link';

interface Study {
  title: string;
  endDate: string;
  startDate: string;
  created_at: string;
  viewCount: number;
  goal: string;
  info: string;
  recruitNum: number;
  tags: string[];
  user: {
    id: string;
    name: string;
  };
}

export default function StudyDetail({
  title,
  endDate,
  startDate,
  created_at,
  viewCount,
  goal,
  info,
  recruitNum,
  tags,
  user,
}: Study) {
  const ddays = Math.round(
    (Number(new Date(endDate)) - Number(new Date())) / 1000 / 60 / 60 / 24,
  );

  return (
    <>
      <div className="flex flex-col gap-8 p-4">
        <header className="flex flex-col gap-2 border-b-2 border-light-gray pb-4">
          <div className="mb-2 flex w-full items-center gap-4">
            <p className="text-[24px] font-bold">{title}</p>
            <span className="rounded-full border-[1px] border-sub-purple px-2 py-1 text-[14px] text-sub-purple">
              {`D - ${ddays}`}
            </span>
          </div>
          <div className="mb-2 w-full overflow-hidden">
            {tags?.map((tag, idx) => (
              <span
                key={idx}
                className="mr-2 rounded-lg bg-[#f5f1ff] px-2 py-2 text-[14px] text-[#434343]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/profile/read/${user.id}`}>
              <img
                className="h-[38px] w-[38px] rounded-full"
                src="https://th.bing.com/th/id/OIG3.6Q6JSjGGulke2mGv6MPj?pid=ImgGn"
                alt="Profile"
              />
            </Link>
            <div className="flex w-full flex-col text-muted-foreground">
              <Link href={`/profile/read/${user?.id}`}>
                <p className="flex text-[13px] font-semibold">{user.name}</p>
              </Link>
              <div className="flex w-full justify-between">
                <span className="flex gap-2 text-[12px] text-[#82829B]">
                  <span>작성일</span>
                  <span>{format(created_at, 'yyyy-MM-dd')}</span>
                  <span>&#124;</span>
                  <span>{format(startDate, 'hh:mm')}</span>
                  <span>&#124;</span>
                  <span>조회수</span>
                  <span>{viewCount}</span>
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="font-semibold">스터디 주제</p>
            <p className="whitespace-pre text-[15px]">{info}</p>
          </div>
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="whitespace-break-spaces font-semibold">스터디 목표</p>
            <p className="text-[15px]">{goal}</p>
          </div>
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="font-semibold">스터디 인원</p>
            <p className="text-[15px]">{recruitNum} 명</p>
          </div>
          <div className="flex flex-col gap-4 text-[#434343]">
            <p className="font-semibold">스터디 기간</p>
            <p className="text-[15px]">
              <span>{format(startDate, 'yyyy-MM-dd')}</span>
              <span>&nbsp;~ &nbsp;</span>
              <span>{format(endDate, 'yyyy-MM-dd')}</span>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

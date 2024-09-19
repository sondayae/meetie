import BookmarkFlag from '@/components/icons/BookmarkFlag';
import CalendarSmallIcon from '@/components/icons/CalendarSmallIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import Link from 'next/link';
import { format } from 'date-fns';

export default function PostItem({ item }: { item: any }) {
  const calddays = (data: string) => {
    const ddays = Math.round(
      (Number(new Date(data)) - Number(new Date())) / 1000 / 60 / 60 / 24,
    );

    const result =
      ddays === 0 ? 'D-Day' : ddays > 0 ? `D-${ddays}` : `D+${Math.abs(ddays)}`;
    return result;
  };

  return (
    <>
      <Link href={`/study/${item.study.id}`}>
        <div className="px-4">
          <div className="m-auto w-full max-w-[600px] items-start justify-start gap-60 rounded-lg border border-[#eaeaea] bg-white px-4 py-2 pb-2.5 pt-4 shadow">
            <div className="flex h-5 w-full items-center justify-between">
              <div className="flex h-3.5 w-full items-center justify-between gap-2 text-xs font-medium text-[#555555]">
                {item.study.roles.join(' | ')}
                <BookmarkFlag marked="true" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-6 overflow-hidden whitespace-nowrap">
              <div className="flex flex-col items-start justify-start gap-3">
                <div className="w-auto items-center justify-start gap-2">
                  <div className="text-ellipsis text-base font-semibold text-[#434343]">
                    {item.study.title}
                  </div>
                </div>
                {item.study.tags && (
                  <div className="flex items-start justify-start gap-2">
                    {item.study.tags?.map((tag: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center gap-2.5 rounded border border-[#ebe8f5] bg-[#f5f1ff] px-2 py-px"
                      >
                        <div className="text-center text-xs font-normal leading-normal text-[#41364a]">
                          {tag}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex w-full items-center justify-start gap-1">
                <div className="flex h-6 shrink grow basis-0 items-center justify-start gap-3">
                  <div className="text-xs font-bold text-[#6224fd]">
                    {calddays(item.study.startDate)}
                  </div>
                  <div className="flex h-6 shrink grow basis-0 items-center justify-start gap-1">
                    <div className="relative h-3.5 w-3.5">
                      <CalendarSmallIcon fill={'#82829b'} />
                    </div>
                    <div className="shrink grow basis-0 text-xs font-medium leading-normal text-[#555555]">
                      {format(new Date(item.study.startDate), 'yyyy.MM.dd')} -{' '}
                      {format(new Date(item.study.endDate), 'yyyy.MM.dd')}
                    </div>
                  </div>
                </div>
                <div className="flex h-6 items-center justify-end">
                  <div className="flex items-center justify-start gap-0.5">
                    <div className="relative h-3.5 w-3.5" />
                    <div className="flex w-auto gap-2 text-right text-xs font-medium leading-normal text-[#8f8793]">
                      <EyeIcon /> {item.study.viewCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

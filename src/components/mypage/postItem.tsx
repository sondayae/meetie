import BookmarkFlag from '@/components/icons/BookmarkFlag';

export default function PostItem() {
  return (
    <>
      <div className="px-4">
        <div className="m-auto w-full max-w-[600px] items-start justify-start gap-60 rounded-lg border border-[#eaeaea] bg-white px-4 py-2 pb-2.5 pt-4 shadow">
          <div className="flex h-5 w-full items-center justify-between">
            <div className="flex h-3.5 w-full items-center justify-between gap-2 text-xs font-medium text-[#555555]">
              <p>디자이너 | UXUI 디자인</p>
              <BookmarkFlag marked="true" />
            </div>
          </div>
          <div className="flex-col items-start justify-start gap-6">
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="w-80 items-center justify-start gap-2">
                <div className="text-base font-semibold text-[#434343]">
                  피그마 고급 스킬 스터디 모집
                </div>
              </div>
              <div className="flex items-start justify-start gap-2">
                <div className="flex items-center justify-center gap-2.5 rounded border border-[#ebe8f5] bg-[#f5f1ff] px-2 py-px">
                  <div className="text-center text-xs font-normal leading-normal text-[#41364a]">
                    북 스터디
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2.5 rounded border border-[#ebe8f5] bg-[#f5f1ff] px-2 py-px">
                  <div className="text-center text-xs font-normal leading-normal text-[#41364a]">
                    Javascript
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2.5 rounded border border-[#ebe8f5] bg-[#f5f1ff] px-2 py-px">
                  <div className="text-center text-xs font-normal leading-normal text-[#41364a]">
                    백엔드 개발자
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-1">
              <div className="flex h-6 shrink grow basis-0 items-center justify-start gap-3">
                <div className="text-xs font-bold text-[#6224fd]">D-9</div>
                <div className="flex h-6 shrink grow basis-0 items-center justify-start gap-1">
                  <div className="relative h-3.5 w-3.5">
                    <div className="absolute left-0 top-0 h-3.5 w-3.5 bg-[#d9d9d9]" />
                  </div>
                  <div className="shrink grow basis-0 text-xs font-medium leading-normal text-[#555555]">
                    2024.05.29 (토) - 06.29 (금)
                  </div>
                </div>
              </div>
              <div className="flex h-6 items-center justify-end">
                <div className="flex items-center justify-start gap-0.5">
                  <div className="relative h-3.5 w-3.5" />
                  <div className="w-6 text-right text-xs font-medium leading-normal text-[#8f8793]">
                    823
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

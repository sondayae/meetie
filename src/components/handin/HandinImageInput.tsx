import PlusIcon from '../icons/PlusIcon';

export default function HandinImageInput({ size = 'big' }: { size: string }) {
  return (
    <>
      {size === 'big' ? (
        <div className="flex aspect-video justify-center overflow-hidden rounded-lg border-2 border-[#E9E9E9] bg-[#f9f9f9] shadow-md transition-all hover:cursor-pointer hover:bg-muted">
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <div className="rounded-full bg-[#eaeaea] p-[8px]">
              <span>
                <PlusIcon />
              </span>
            </div>
            <span className="text-[#a9a9a9]">인증하기</span>
          </div>
        </div>
      ) : (
        <div className="aspect-square w-[82px] rounded-lg border-2 border-[#E9E9E9] bg-[#f9f9f9]">
          <div className="flex h-full flex-grow flex-col items-center justify-center gap-[8px]">
            <div className="rounded-full bg-[#eaeaea] p-[8px]">
              <span>
                <PlusIcon />
              </span>
            </div>
            <span className="text-xs text-muted-foreground">0 / 4</span>
          </div>
        </div>
      )}
    </>
  );
}

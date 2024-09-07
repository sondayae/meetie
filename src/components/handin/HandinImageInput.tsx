import PlusIcon from '../icons/PlusIcon';

export default function HandinImageInput({size='big'}: {size: string}) {
  return (
    <>
      {size === 'big' ? (
      <div className="flex aspect-video justify-center overflow-hidden rounded-lg border-2 border-[#E9E9E9] bg-[#f9f9f9] hover:cursor-pointer shadow-md hover:bg-[#dfdfdf]">
        <div className='flex flex-col gap-[8px] justify-center items-center'>
          <div className='rounded-full bg-[#eaeaea] p-[8px]'>
            <span>
              <PlusIcon />
            </span>
          </div>
          <span className="text-[#a9a9a9]">인증하기</span>
        </div>
      </div>
      ) : (
      <div className='w-[82px] aspect-square rounded-lg border-2 border-[#E9E9E9] bg-[#f9f9f9]'>
        <div className='flex flex-col justify-center items-center flex-grow h-full gap-[8px]'>
          <div className='rounded-full bg-[#eaeaea] p-[8px]'>
              <span>
                <PlusIcon />
              </span>
          </div>
          <span className='text-xs text-muted-foreground'>0 / 4</span>
        </div>
      </div>
      )}
    </>
  )
}
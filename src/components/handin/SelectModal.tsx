'use client';

import { SelectItem } from '../studyRoom/SelectItem';

export default function SelectModal({ selectList, setSelected }: {selectList: any, setSelected: (tf:boolean) => void}) {
  return (
    <div className="fixed inset-0 z-10">
      <div className="flex min-h-screen items-center justify-center bg-gray-400 bg-opacity-75 transition-all">
        <div className="m-5 w-full rounded-lg border border-[#DFDFDF] bg-[#f9f9f9] px-[14px] pb-[80px]">
          <div className="pb-[28px] pt-[40px] text-center text-xl">
            진행 중인 과제 {selectList && selectList.length}
          </div>
          <div className="rounded-lg border border-main-purple bg-white [&>*:first-child]:border-none">
            {selectList &&
              selectList.map((item: any) => {
                return (
                  <div key={item.id} onClick={() => setSelected(item)}>
                    <SelectItem title={item.title} subtitle={item.subtitle} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import UpdownArrowIcon from '../icons/UpdownArrowIcon'
import NewCheckSignIcon from '../icons/NewCheckSignIcon'
import StudyAvatar from '../common/StudyAvatar'
import { useEffect, useState } from 'react';


export default function StudyroomDrawer({list, preSelected, handleSelect}: {list: any, preSelected?: any, handleSelect: (args: any) => void}) {

  const [selected, setSelected] = useState(preSelected ? preSelected : list ? list[0]: null);

  useEffect(() => {
    if (selected) {
      handleSelect(selected.id);
    }
  }, [selected])
  return (
    <Drawer>
    <DrawerTrigger>
      <div
        className="b-[#E9E9E9] rounded-lg border bg-white p-[16px] shadow delay-75 hover:cursor-pointer hover:bg-[#efefef]"
      >
        <div className="flex gap-[17px]">
          <span className="rounded-xl border border-[#E9E9E9] bg-[#F7F3FF] py-[11.5px]">
            <UpdownArrowIcon />
          </span>
          <div className="flex flex-col">
            <span className="font-medium">{selected.title}</span>
            <span className="text-xs text-muted-foreground">{selected.subtitle}</span>
          </div>
        </div>
      </div>
    </DrawerTrigger>
    <DrawerContent className='h-[50vh]'>
      <DrawerHeader>
        <DrawerTitle>진행 중인 과제 {list.length}</DrawerTitle>
        <DrawerDescription>제출할 과제를 선택해주세요.</DrawerDescription>
      </DrawerHeader>
        <div className='flex flex-col justify-center m-4 border rounded-lg bg-white'>
            {list?.map((data: any) => (
              <DrawerClose key={data.id}>
                <div className='flex items-center gap-3 border p-4' onClick={() => setSelected(data)}>
                  {data.image ? <StudyAvatar /> : null}
                  <p className='flex flex-col'>
                    <span className='font-semibold'>{data.title}</span>
                    <span className='font-medium text-xs'>{data.subtitle}</span>
                  </p>
                  {selected.id === data.id &&
                    <span className='ml-auto'>
                      <NewCheckSignIcon circleClassName='fill-white stroke-primary' checkClassName='fill-primary'/>
                    </span>
                  }
                </div>
              </DrawerClose>
            ))}
        </div>
    </DrawerContent>
  </Drawer>
  )
}
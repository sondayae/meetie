/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState } from 'react';

import NewCheckSignIcon from '../icons/NewCheckSignIcon';

type CheckListPros = {
  title: string;
  subtitle?: string;
  selectList: any;
  setSelected: (args: object[]) => void;
};

export default function CheckList({
  title,
  subtitle,
  selectList,
  setSelected,
}: CheckListPros) {
  const [checkedList, setCheckedList] = useState<any>([]);

  const handleSelected = (
    isChecked: boolean,
    item: { id: string; title: string },
  ) => {
    let newCheckedList = [...checkedList];

    if (isChecked) {
      newCheckedList.push(item);
      setCheckedList(newCheckedList);
    } else {
      newCheckedList = newCheckedList.filter((c) => c.id !== item.id);
      setCheckedList(newCheckedList);
    }

    setSelected(newCheckedList);
  };

  const handleAllCheck = (checked: boolean) => {
    const newCheckedList: any = [];
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      selectList.forEach((item: object) => newCheckedList.push(item));
      setCheckedList(newCheckedList);
    } else {
      setCheckedList([]);
    }
    setSelected(newCheckedList);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-xl font-semibold">{title}</h3>
          <p className="mb-5 text-xs text-[#9d9d9d]">{subtitle}</p>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkAll"
            className="hidden"
            onChange={(e) => handleAllCheck(e.target.checked)}
            />
          <label
            htmlFor="checkAll"
            className="cursor-pointer border-b-2 border-[#E9E9E9] text-xs text-[#999999]"
            >
            전체선택
          </label>
        </div>
      </div>
      <ul className="rounded-lg border border-[#F3F3F3]">
        <div className="rounded-t-md [&>*:first-child]:border-none">
          {selectList &&
            selectList.map((item: { id: string; title: string }) => (
              <li
              key={item.id}
              className="flex justify-between border-t px-3 py-4"
              >
                <span className="font-semibold">{item.title}</span>
                <input
                  type="checkbox"
                  id={item.id}
                  className="peer hidden"
                  onChange={(e) => handleSelected(e.target.checked, item)}
                  checked={
                    checkedList && checkedList.some((c: any) => c.id === item.id)
                  }
                  />
                <label
                  htmlFor={item.id}
                  className="cursor-pointer text-middle-gray peer-checked:text-main-purple"
                  >
                  <NewCheckSignIcon
                    circleClassName="fill-current"
                    checkClassName="fill-white"
                    />
                </label>
              </li>
            ))}
        </div>
      </ul>
    </>
  );
}

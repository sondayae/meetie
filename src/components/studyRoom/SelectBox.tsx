import { Dispatch } from 'react';

import { useModal } from '@/hooks/hooks';
import Mark from '../common/Mark';
import UpdownArrowIcon from '../icons/UpdownArrowIcon';


type TSelectBox = {
  list: [];
  selectedItem: {
    id: string;
    title: string;
    subtitle: string;
  };
  setSelectedItem: Dispatch<void>;
};

function SelectBox({ list, selectedItem, setSelectedItem }: TSelectBox) {
  const { openModal, closeModal, Modal } = useModal({
    type: 'data',
    data: list,
    onConfirm: () => closeModal(),
    onCancel: (data) => {
      setSelectedItem(data);
      closeModal();
    },
  });

  return (
    <>
      <div
        className="h-[70px] rounded-md border-2 border-light-gray bg-white drop-shadow-md"
        onClick={openModal}
        aria-hidden
      >
        <div className="flex">
          <div className="m-[16px] flex h-[40px] w-[18px] flex-col items-center justify-center rounded-lg border border-[#EBE9F5] bg-[#F7F3FF]">
            <UpdownArrowIcon className="h-5 w-5" />
          </div>
          <div className="flex flex-grow flex-col justify-center">
            <span className="mb-[2px] text-base font-medium">
              {selectedItem.title}
            </span>
            <span className="text-xs text-gray-purple">
              {selectedItem.subtitle}
            </span>
          </div>
          <div className="mb-[18px] mr-[18px] flex flex-col items-end justify-end">
            <Mark />
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
}
export default SelectBox;

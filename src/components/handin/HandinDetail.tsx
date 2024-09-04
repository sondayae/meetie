import useConfirm from '@/hooks/use-confirm';
import ProfileImg from '../common/ProfileImg';
import NewCheckSignIcon from '../icons/NewCheckSignIcon';
import DropDownMenu from './DropDownMenu';

type HandinDetail = {
  handin: any;
  editHandin: any;
  deleteHandin: any;
}

export default function HandinDetail({handin, editHandin, deleteHandin}: HandinDetail) {
  const { ConfirmModal, confirm } = useConfirm({title: '삭제', message: '삭제하시겠습니까?'});

  const handleDelete = async () => {
    const result = await confirm();
    if (result) {
      deleteHandin(handin.id);
    }
  }

  return (
    <>
      <ConfirmModal />
      <div>
        <div>
          <div className="flex justify-between p-[16px]">
            <div className="flex items-center flex-grow flex-shrink-0">
              <ProfileImg src={handin.user.images?.url}/>
              <span className="ml-[8px] font-bold">{handin.user.name}</span>
            </div>
            <div className='flex relative w-full items-center justify-end gap-[24px]'>
              <div className='flex items-center'>
                <span className="mr-[4px] text-sm text-gray-purple">
                  사진으로 인증됨
                </span>
                <NewCheckSignIcon circleClassName={'fill-main-purple'} checkClassName={'fill-white'}/>
              </div>
              <DropDownMenu handleEdit={editHandin} handleDelete={handleDelete}/>
            </div>
          </div>
        </div>
        <div className="border-b border-t border-[#E6E6E6] bg-[#FAFAFA] p-[16px]">
          <div className="mb-[60px] mt-[67px]">
            <span className="block break-all">{handin.text}</span>
          </div>
          <div className="mb-[20px]">
            <img
              src={handin.user.images?.url}
              alt=""
            />
          </div>
          <div className="flex items-center gap-[5px] text-xs text-[#636363]">
            <span>오전 9:00</span>
            <svg
              width="2"
              height="2"
              viewBox="0 0 2 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1" cy="1" r="1" fill="#636363" />
            </svg>
            <span>2024.6.4</span>
            <svg
              width="2"
              height="2"
              viewBox="0 0 2 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1" cy="1" r="1" fill="#636363" />
            </svg>
            <span>14일차 과제</span>
          </div>
        </div>
      </div>
    </>
  );
}

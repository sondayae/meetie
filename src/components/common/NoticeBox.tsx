import MegaphoneIcon from '../icons/MegaphoneIcon';
import RightArrowIcon from '../icons/RightArrowIcon';

const NoticeBox = () => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#ebe9f5] bg-[#f7f3ff] p-3 drop-shadow-sm hover:cursor-pointer">
      <div className="flex items-center">
        <MegaphoneIcon />
        <p className="text-sm">우리는 이렇게 피드백 해요!</p>
      </div>
      <RightArrowIcon className="h-3 w-3" />
    </div>
  );
};
export default NoticeBox;

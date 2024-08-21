import PlusIcon from '@/components/icons/PlusIcon';
import UpdownArrowIcon from '@/components/icons/UpdownArrowIcon';

const DashboardLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <section>
      <div className="bg-[#E3E3FA]">
        <div className="flex justify-between pb-[17px] mx-[16px]">
          <span>스터디룸</span>
          <PlusIcon className="h-5 w-5 fill-black" />
        </div>
        <div className="flex justify-end">
          <div>
            <span className="bg-sub-purple">진행중 3</span>
            <span className="text-purple-gray bg-white">진행완료</span>
          </div>
        </div>
        <div className="mx-[16px] pb-[20px] pt-[12px]">
          <div className="flex justify-around items-center p-3 bg-white border-light-gray rounded-lg">
            <UpdownArrowIcon className="h-10 w-5 rounded-lg border-[#EBE9F5] bg-light-purple fill-black" />
            <div>
              <p>피그마 정복하기</p>
              <span>디자인 | 멤버 5</span>
            </div>
            <div className="h-7 rounded-lg border-2 border-sub-purple">
              <span>D-30</span>
            </div>
          </div>
        </div>
        <ul className="flex justify-evenly border-t-2 border-middle-gray bg-white p-[14px]">
          <li>캘린더</li>
          <li>과제</li>
          <li>채팅</li>
        </ul>
      </div>
      {children}
    </section>
  );
};

export default DashboardLayout;

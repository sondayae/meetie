const page = () => {
  return (
    <div>
      <header className="bg-[#e3e3fa]">
        <div className="m-8 flex justify-between">
          <span>스터디룸</span>
          <button>+</button>
        </div>
        <section>
          <span>진행중</span>
          <span>진행완료</span>
          <section>
            <span>피그마 정복하기</span>
            <span>디자인 | 멤버 5</span>
            <span>D-30</span>
          </section>
        </section>
        <section className="bg-white">
          <ul className="flex justify-around">
            <li className="text-[#6224FD]">캘린더</li>
            <li className="text-[#82829B]">과제</li>
            <li className="text-[#82829B]">채팅</li>
          </ul>
        </section>
      </header>
    </div>
  );
};
export default page;

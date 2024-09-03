export default function page() {
  return (
    <>
      <div className="m-auto flex w-full max-w-[600px] flex-col px-4">
        <h1>진행중인스터디</h1>
        <div className="flex flex-col rounded-lg border-2 border-middle-gray">
          {[1, 2, 3, 4, 5].map(() => (
            <div className="flex items-center gap-2 border-b-2 border-middle-gray p-2">
              <img
                className="h-[38px] w-[38px] rounded-lg"
                src="https://th.bing.com/th/id/OIG3.6Q6JSjGGulke2mGv6MPj?pid=ImgGn"
                alt="Profile"
              />
              <div className="flex-col items-start justify-start gap-6">
                <div className="flex flex-col items-start justify-start gap-3">
                  <div className="flex w-full flex-col justify-start gap-1">
                    <p className="text- text-[16px] font-semibold text-black">
                      피그마 고급 스킬 스터디 모집
                    </p>
                    <div className="h-5 grow basis-0 text-xs font-medium text-gray-purple">
                      기획,디자인 | 멤버 5 | D-30
                    </div>
                    <div className="w-72 items-center justify-start"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

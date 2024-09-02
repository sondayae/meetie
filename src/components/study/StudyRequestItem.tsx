import Link from 'next/link';

export default function StudyRequestItem({ item }) {
  console.log(item);
  return (
    <>
      <li key={item.id}>
        {item.status === 'wating' && (
          <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 p-5">
            <div className="flex w-full items-start justify-between gap-4 p-5">
              <div className="flex items-start justify-start gap-2.5">
                <div className="flex flex-col items-end justify-start">
                  <Link href={`/profile/read/${item.user.id}`}>
                    <img
                      className="h-14 w-14 rounded-full"
                      src="https://th.bing.com/th/id/OIG3.Z11n1VN6NRw.IXOddq9X?w=1024&h=1024&rs=1&pid=ImgDetMain"
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-base font-semibold text-black">
                    {item.user.name}
                  </div>
                  <div className="text-xs font-medium text-gray-500">
                    {item.user.job}
                  </div>
                  <div className="flex gap-1">
                    <span className={'text-xs font-medium text-gray-500'}>
                      스터디
                    </span>
                    <span className="text-xs font-medium text-indigo-500">
                      8회
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      | 출석률
                    </span>
                    <span className="text-xs font-medium text-indigo-500">
                      98%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start gap-1.5">
                <button
                  type="button"
                  // onClick={() => modApply(id, 'refused')}
                  className="flex items-center justify-center gap-2 rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-dark-gray"
                >
                  거절
                </button>
                <button
                  type="button"
                  // onClick={() => modApply(id, 'accepted')}
                  className="flex items-center justify-center gap-2 rounded-full bg-main-purple px-4 py-2 text-sm font-medium text-white"
                >
                  수락
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-4">
              <div className="h-10 w-full px-6 text-sm font-normal leading-tight text-dark-gray">
                {item.user.introduce
                  ? item.user.introduce
                  : '자기소개가 없습니다.'}
              </div>
              <div className="flex items-start justify-start gap-2.5 px-6">
                {item.user.personality?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="mr-2 rounded-lg bg-[#f5f1ff] px-2 py-2 text-[14px] text-[#434343]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* {apply.status && (
                        <>
                          <div>{apply.id}</div>
                          <div>
                            <button>승인됨</button>
                          </div>
                        </>
                      )} */}
      </li>
    </>
  );
}

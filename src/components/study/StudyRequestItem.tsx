import Link from 'next/link';

type ItemType = {
  id: number;
  status: string;
  user: {
    id: number;
    name: string;
    job: string;
    introduce?: string;
    personality?: string[];
  };
};

export default function StudyRequestItem({
  params,
  item,
  acceptedStudy,
  recruitNum,
}: {
  params: string;
  item: ItemType;
  acceptedStudy: number;
  recruitNum: number;
}) {
  const modApply = async (id: number, status: string) => {
    console.log(acceptedStudy, recruitNum);
    const response = await fetch(`/api/studyrequest/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(
        result.error || 'Error occurred while updating profile',
      );
    }
    
    if (acceptedStudy === --recruitNum) {
      const studyResponse = await fetch('/api/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studyId: params,
        }),
      });

      const studyResult = await studyResponse.json();
      // console.log(studyResult);

      if (!studyResponse.ok) {
        throw new Error(
          studyResult.error || 'Error occurred while creating study',
        );
      }
      return alert('모집 인원이 다 찼습니다.');
    }
    return alert('수락 완료');
  };

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
                  onClick={() => modApply(item.id, 'refused')}
                  className="flex items-center justify-center gap-2 rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-dark-gray"
                >
                  거절
                </button>
                <button
                  type="button"
                  onClick={() => modApply(item.id, 'accepted')}
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
                {item.user.personality?.map((tag: string, idx: number) => (
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
      </li>
    </>
  );
}

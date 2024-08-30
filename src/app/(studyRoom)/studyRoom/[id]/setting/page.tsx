'use client';

import { useEffect, useState } from 'react';

interface Member {
  id: string;
  nickname: string;
  job: string;
  participating_study: string;
  personality: string[] | null;
  introduction: string;
  isLeader: boolean;
}

export default function StudyRoomSetting() {
  const [data, setData] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/studyRoom/setting');
        const result = await response.json();

        if (response.ok) {
          setData(result);
        } else {
          setError(result.error || '서버에서 오류가 발생했습니다.');
        }
      } catch (error) {
        setError('스터디 멤버 조회 중 오류 발생');
      }
    };

    fetchMembers();
  }, []);

  const handleDelegateAuthority = async (newLeaderId: string) => {
    try {
      const response = await fetch('/api/studyRoom/setting', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newLeaderId }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('권한 위임이 성공적으로 완료되었습니다.');

        setData((prevData) =>
          prevData.map((member) =>
            member.id === newLeaderId
              ? { ...member, isLeader: true }
              : { ...member, isLeader: false },
          ),
        );
      } else {
        alert(result.error || '권한 위임 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('권한 위임 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      {data.length > 0 ? (
        <div>
          {data.map((member) => (
            <div
              key={member.id}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 p-5"
            >
              <div className="flex w-full items-start justify-between gap-4 p-5">
                <div className="flex items-start justify-start gap-2.5">
                  <div className="flex flex-col items-end justify-start">
                    <img
                      className="h-14 w-14 rounded-full"
                      src="https://th.bing.com/th/id/OIG3.Z11n1VN6NRw.IXOddq9X?w=1024&h=1024&rs=1&pid=ImgDetMain"
                      alt={member.nickname}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1">
                    <div className="text-base font-semibold text-black">
                      {member.nickname}
                    </div>
                    <div className="text-xs font-medium text-gray-500">
                      {member.job}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        스터디{' '}
                      </span>
                      <span className="text-xs font-medium text-indigo-500">
                        예시 스터디 횟수
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        {' '}
                        | 출석률{' '}
                      </span>
                      <span className="text-xs font-medium text-indigo-500">
                        예시 출석률
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-start gap-1.5">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-dark-gray"
                  >
                    강퇴
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelegateAuthority(member.id)}
                    className={`flex items-center justify-center gap-2 rounded-full ${
                      member.isLeader ? 'bg-gray-400' : 'bg-main-purple'
                    } px-4 py-2 text-sm font-medium text-white`}
                    disabled={member.isLeader} // 이미 리더인 경우 버튼 비활성화
                  >
                    {member.isLeader ? '리더' : '권한 위임'}
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-4">
                <div className="h-10 w-full px-6 text-sm font-normal leading-tight text-dark-gray">
                  {member.introduction}
                </div>
                <div className="flex items-start justify-start gap-2.5 px-6">
                  {member.personality && member.personality.length > 0 ? (
                    member.personality.map((trait) => (
                      <div
                        key={trait}
                        className="flex items-center justify-center gap-2.5 rounded-lg bg-light-purple p-2.5"
                      >
                        <div className="text-xs font-normal text-dark-gray">
                          {trait}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs font-normal text-gray-500"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
}

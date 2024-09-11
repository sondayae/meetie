'use client';

import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import UserSkeleton from './UserSkeleton';

type UserCardProps = {
  id: string;
  name: string;
  nickname?: string;
  job: string;
  personality?: string[];
  imageUrl: string;
};

export default function UserList({
  filteredUsers,
}: {
  filteredUsers: UserCardProps[];
}) {
  const [users, setUsers] = useState<UserCardProps[]>([]);
  const [allUsers, setAllUsers] = useState<UserCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        const response = await fetch('/api/search/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user profiles');
        }
        const data: UserCardProps[] = await response.json();
        setAllUsers(data);
        setUsers(data); // 초기에는 모든 사용자로 설정
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    // 필터링된 결과가 있을 때, filteredUsers를 users 상태로 업데이트
    if (filteredUsers.length > 0) {
      setUsers(filteredUsers);
    } else {
      // 필터링된 결과가 없을 때, 빈 배열로 설정
      setUsers([]);
    }
  }, [filteredUsers]);

  return (
    <>
      {/* "총 X명"을 표시하는 독립적인 div */}
      <div className="mx-4 my-5 flex justify-between">
        <span className="text-xs text-[#555555]">총 {users.length}명</span>
      </div>

      <div className="min-h-dvh bg-[#F5F5FF] px-4 pb-[100px] pt-4">
        {loading ? (
          <UserSkeleton /> // 로딩 중일 때 UserSkeleton 표시
        ) : users.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-[14px] gap-y-[10px]">
            {users.map((user) => (
              <UserCard
                id={user.id}
                key={user.id}
                name={user.name}
                job={user.job}
                personality={user.personality}
                nickname={user.nickname}
                imageUrl={user.imageUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            찾으시는 사용자가 없습니다.
          </p>
        )}
      </div>
    </>
  );
}

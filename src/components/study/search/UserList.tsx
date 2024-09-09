'use client';

import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

type UserCardProps = {
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

  useEffect(() => {
    const fetchProfiles = async () => {
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
    <div className="px-4">
      {/* 상단에 "총 X명" 및 "인기순" 추가 */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">총 {users.length}명</span>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>인기순</span>
          <span className="text-xs">⇧</span>
        </div>
      </div>

      {/* 사용자 리스트 */}
      {users.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {users.map((user, index) => (
            <UserCard
              key={index}
              name={user.name}
              job={user.job}
              personality={user.personality}
              nickname={user.nickname}
              imageUrl={user.imageUrl}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">찾으시는 사용자가 없습니다.</p>
      )}
    </div>
  );
}

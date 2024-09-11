'use client';

import { useEffect, useState } from 'react';
import UserFilter, { UserCardProps } from './UserFilter';
import UserList from './UserList';

type FilterTags = {
  job: string | null;
  studySpan: string | null;
  purpose: string[];
  personality: string[];
};

export default function UserPage({
  userSearchTerm,
}: {
  userSearchTerm: string;
}) {
  const [filteredUsers, setFilteredUsers] = useState<UserCardProps[]>([]);
  const [tempFilterTags, setTempFilterTags] = useState<FilterTags>({
    job: null,
    studySpan: null,
    purpose: [],
    personality: [],
  });

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      console.log('Fetching users with filters:', tempFilterTags);
      console.log('Search term:', userSearchTerm);

      try {
        const response = await fetch('/api/search/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filters: tempFilterTags,
            searchTerm: userSearchTerm,
            searchField: 'name',
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch filtered users: ${errorText}`);
        }

        const data = await response.json();
        console.log('Filtered users data:', data);
        setFilteredUsers(data.users);
      } catch (error) {
        console.error('Failed to fetch filtered users:', error);
      }
    };

    fetchFilteredUsers();
  }, [userSearchTerm, tempFilterTags]); // tempFilterTags를 종속성 배열에 추가

  return (
    <div>
      <UserFilter
        onUsersUpdate={setFilteredUsers}
        currentFilters={tempFilterTags} // 필터 상태를 전달
        onFiltersChange={setTempFilterTags} // 필터 상태 변경 함수
        userSearchTerm={userSearchTerm}
      />
      <UserList filteredUsers={filteredUsers} />
    </div>
  );
}

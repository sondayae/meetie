'use client';

import { useState } from 'react';
import UserFilter from './UserFilter';
import UserList from './UserList';

export type UserCardProps = {
  id: string;
  name: string;
  nickname?: string;
  job: string;
  personality?: string[];
  imageUrl: string;
};

export default function UserPage() {
  const [filteredUsers, setFilteredUsers] = useState<UserCardProps[]>([]);

  return (
    <div>
      <UserFilter onUsersUpdate={setFilteredUsers} />
      <UserList filteredUsers={filteredUsers} />
    </div>
  );
}

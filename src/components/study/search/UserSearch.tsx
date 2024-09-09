// 'use client';

// import React from 'react';
// import UserFilter from './UserFilter';
// import UserList from './UserList';

// const UserSearch: React.FC = () => {
//   return (
//     <div className="px-4 py-4">
//       <UserFilter />
//       <UserList />
//     </div>
//   );
// };

// export default UserSearch;

'use client';

import { useState } from 'react';
import UserFilter from './UserFilter';
import UserList from './UserList';

export type UserCardProps = {
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

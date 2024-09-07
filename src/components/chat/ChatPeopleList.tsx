'use client';

import { useQuery } from '@tanstack/react-query';

import { getAllUsers } from '@/actions/chatActions';
import Person from './Person';
import { useChatStore } from '@/app/stores/chatStore';


export default function ChatPeopleList({ loggedinUser }) {
  const { selectedUserId, setSelectedUserId } = useChatStore();
  const getAllUsersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      console.log(allUsers);

      return allUsers?.filter((user) => user.id !== loggedinUser.id);
    },
  });

  return (
    <div>
      {getAllUsersQuery.data?.map(user => (
        <Person 
          key={user.id}
          id={user.email?.split('@')[0]}
          onlinedAt={new Date().toISOString()}
          onClick={() => setSelectedUserId(user.id)}
          isActive={user.id === selectedUserId}
        />
      ))}
    </div>
  );
}

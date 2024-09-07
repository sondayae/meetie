'use client';

import { useEffect, useState } from 'react';

import { getSession, getUser } from '@/actions/chatActions';
import ChatPeopleList from '@/components/chat/ChatPeopleList';

export default function page() {
  const [loginUser, setLoginUser] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      console.log(data);
      setLoginUser(data);
    }
    fetchUser();
  }, []);

  return (
    <div>
      <ChatPeopleList loggedinUser={loginUser} />
    </div>
  );
}

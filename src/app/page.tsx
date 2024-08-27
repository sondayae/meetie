'use client';

import { useEffect, useState } from 'react';

import { useUser } from '@/stores/user';
import supabase from '@/utils/supabase/client';

export default function Notes() {
  const user = useUser((s) => s.user);

  if (!user) return <div>로그인이 필요합니다.</div>;

  return (
    <div>
      <h1>환영합니다, {user.email}</h1>
      <p>유저 ID: {user.id}</p>
      <button onClick={() => supabase.auth.signOut()}>로그아웃</button>
    </div>
  );
}

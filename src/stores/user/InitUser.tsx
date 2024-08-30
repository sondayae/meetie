'use client';

import { useEffect } from 'react';

import { User } from '@supabase/supabase-js';

import { useUser } from '@/stores/user/user';

export default function InitUser({ user }: { user: User | null }) {
  useEffect(() => {
    useUser.setState({ user: user ?? undefined });
  }, [user]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

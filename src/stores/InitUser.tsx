'use client';

import React, { useEffect, useRef } from 'react';

import { User } from '@supabase/supabase-js';

import { useUser } from '@/stores/user';

export default function InitUser({ user }: { user: User | null }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useUser.setState({ user: user ?? undefined });
    }
    initState.current = true;
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

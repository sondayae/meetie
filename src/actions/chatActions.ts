'use server';

import supabaseServer, { adminAuthClient } from '@/utils/supabase/server';

export async function getAllUsers() {
  const {
    data: { users },
    error,
  } = await adminAuthClient.listUsers();
  if (error) {
    return null;
  }
  return users.slice(0,5);
}

export async function getUser() {
  const supabase = supabaseServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return user;
}

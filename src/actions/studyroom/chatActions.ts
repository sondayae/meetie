'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer, { adminAuthClient } from '@/utils/supabase/server';


// export async function getAllUsers() {
//   const {
//     data: { users },
//     error,
//   } = await adminAuthClient.listUsers();
//   if (error) {
//     return null;
//   }
//   return users.slice(0,5);
// }

export async function getUserById(userId: string) {
  if (!userId) {
    return null;
  }
  const supabase = supabaseServer();
  const {data, error} = await supabase.from('user').select('*').eq('id', userId).single();

  if (error) {
    return null;
  }
  return data;
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

export async function getMembers(studyId: string) {
  const supabase = supabaseServer();
  const {data, error} = await supabase.from('studymember').select('*, user(name)').eq('studyId', studyId);
  if (error) {
    return null;
  }
  return data;
}

export async function sendMessage({message, chatUserId}) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const {data, error} = await supabase.from('message').insert({ message: message, receiver: chatUserId, sender: userId});
  
  if (error) {
    return null;
  }
  
  return data;
}

export async function getAllMessages({chatUserId}: {chatUserId: string}) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const {data, error} = await supabase.from('message')
  .select('*')
  .or(`receiver.eq.${chatUserId}, receiver.eq.${userId}`)
  .or(`sender.eq.${chatUserId}, sender.eq.${userId}`)
  .order('created_at', {ascending: true});

  if (error) {
    return []
  }
  return data;
}
'use server';

import { getServerUserId } from '@/lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

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

export async function getUserById(userId: string | null) {
  if (!userId) {
    return null;
  }
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .single();

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

export async function getChatMembers(studyId: string) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();
  const { data, error } = await supabase
    .from('studymember')
    .select('*, user(name)')
    .eq('studyId', studyId)
    .not('participantId', 'eq', userId);

  if (error) {
    throw new Error(`There is an error ${error.message}`);
  }
  return data;
}

export async function sendMessage({
  message,
  chatUserId,
}: {
  message: string;
  chatUserId: string | null;
}) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const { data, error } = await supabase
    .from('message')
    .insert({ message: message, receiver: chatUserId, sender: userId });

  if (error) {
    return null;
  }

  return data;
}

export async function getAllMessages({
  chatUserId,
}: {
  chatUserId: string | null;
}) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const { data, error } = await supabase
    .from('message')
    .select('*')
    .or(`receiver.eq.${chatUserId}, receiver.eq.${userId}`)
    .or(`sender.eq.${chatUserId}, sender.eq.${userId}`)
    .order('created_at', { ascending: true });

  if (error) {
    return [];
  }
  return data;
}

export async function getChatRoomList() {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const { data, error } = await supabase.from('chat_room').select().eq('sender', userId);

  if (error) {
    return null;
  }
  return data;
}
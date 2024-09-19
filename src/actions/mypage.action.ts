'use server';

import supabase from '@/utils/supabase/client';
import supabaseServer from '@/utils/supabase/server';

export async function getUser({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select('*, images (url)')
    .eq('id', id)
    .maybeSingle();

  return data;
}

export async function getJoinInfo({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select(`*, bookmark (*), friend!friend_requester_fkey(*), studymember (*)`)
    .eq('id', id)
    .maybeSingle();

  return data;
}

export async function getBookMark({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select(`*, bookmark (*, study (*))`)
    .eq('id', id)
    .maybeSingle();

  return data;
}

export async function getJoinStudy({ id }: { id: any }) {
  const { data, count, error } = await supabase
    .from('user')
    .select(`*, studymember (*, study (*))`)
    .eq('id', id)
    .maybeSingle();

  return data;
}

export async function getUserBadgeList() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const { data, error } = await supabase
    .from('user_badge')
    .select('*, badge(*)')
    .eq('user_id', userId);
  if (error) {
    return null;
  }
  return data;
}

export async function getFriends({ id }: { id: any }) {
  // 내친구
  const { data: friends, error: friendsError } = await supabase
    .from('friend')
    .select('*')
    .eq('requester', id);

  if (friendsError) {
    console.error('Error fetching friends:', friendsError);
    return null;
  }

  const receiverIds = friends.map(friend => friend.receiver);

  // user 정보
  const { data: users, error: usersError } = await supabase
    .from('user')
    .select('*, images (url)')
    .in('id', receiverIds)
    // .range(0, 4);

  if (usersError) {
    console.error('Error fetching users:', usersError);
    return null;
  }

  const friendsWithDetails = friends.map(friend => {
    const user = users.find(user => user.id === friend.receiver);
    return {
      ...friend,
      receiverDetails: user,
    };
  });

  return friendsWithDetails;
}

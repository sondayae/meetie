import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.query; // URL에서 userId 추출

  console.log('userId2:', userId);

  try {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return res.json({ error: error.message });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error fetching user', error);
    return res.json({ error: '서버 오류' });
  }
}

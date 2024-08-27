import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';


export async function GET (req: NextRequest) {
  let query = supabase.from('handin').select('id, text, created_at, images(url), user(name)').order('created_at', {ascending: false});
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (id) {
    query = query.eq('id', id);
  }
  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error });
  }
  return NextResponse.json(data);
};

export async function POST (req: NextRequest) {
    const body = await req.json();

    const { data, error } = await supabase.from('handin')
    .insert({homework_id: '3', user_id: 'afbf8da9-baf2-4c34-ba94-49fa57b3c813', text: body.text, images: body.imgId});

    if (error) {
      return NextResponse.json({ error: error });
    }
    return NextResponse.json(data);
}
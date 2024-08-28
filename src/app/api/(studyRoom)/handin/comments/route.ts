import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export async function GET (req: NextRequest) {
    let query = supabase.from('comments').select('id, user_id, target_id, comment, created_at, user(name), reactions(reactions)').order('created_at', {ascending: false});
    const searchParams = req.nextUrl.searchParams;
    const targetId = searchParams.get('target_id');
    
    if (targetId) {
      query = query.eq('target_id', targetId);
    } else {
        return; // 없는 경우 error throw 필요
    }
    const { data, error } = await query;
  
    if (error) {
      return NextResponse.json({ error: error });
    }
    return NextResponse.json(data);
  };


export async function POST (req: NextRequest) {
    const body = await req.json();

    const { data, error } = await supabase.from('comments')
        .insert({target_id: body.handin_id, user_id: 'afbf8da9-baf2-4c34-ba94-49fa57b3c813', comment: body.comment});

    if (error) {
        return NextResponse.json({error: error});
    }
  
    return NextResponse.json(data);
}
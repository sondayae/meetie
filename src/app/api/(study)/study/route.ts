import supabase from '@/utils/supabase/client';
import { NextRequest } from 'next/server';

// 스터디룸 생성
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    console.log(body)
    console.log(body)
    console.log(body)
    console.log(body.studyId)
    console.log(body.studyId)
    console.log(body.studyId)
    
    if (body && body.studyId) {
      const { data, error } = await supabase
        .from('studyroom')
        .insert([{ studyId: body.studyId }]);

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ error: 'Request body is missing or studyId is undefined' }),
        { status: 400 },
      );
    }
  } catch (error) {
    console.error('Error creating study room:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create study room' }),
      { status: 500 },
    );
  }
}

import { NextResponse } from 'next/server';

import supabaseServer from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const url = new URL(request.url);
  const dateParam = url.searchParams.get('date');

  const supabase = supabaseServer();

  try {
    const { data, error } = await supabase
      .from('schedule')
      .select('*')
      .eq('study_room_id', params.id)
      .eq('event_date', dateParam);

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch schedule data',
      },
      { status: 500 },
    );
  }
}

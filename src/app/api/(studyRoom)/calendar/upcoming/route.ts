import { NextResponse } from 'next/server';

import { format, nextMonday } from 'date-fns';

import supabaseServer from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from('schedule')
      .select('*')
      .gte('event_date', format(new Date(), 'yyyy-MM-dd'))
      .lt('event_date', format(nextMonday(new Date()), 'yyyy-MM-dd'))
      .order('event_date', { ascending: true });

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

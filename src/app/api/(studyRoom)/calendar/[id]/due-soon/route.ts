import { NextResponse } from 'next/server';

import { add, formatISO } from 'date-fns';

import supabaseServer from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  try {
    const now = new Date();
    const twentyFourHoursLater = add(now, { hours: 24 });

    const nowISO = formatISO(now);
    const twentyFourHoursLaterISO = formatISO(twentyFourHoursLater);

    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from('homework')
      .select('*, handin(*, study(recruitNum))')
      .eq('study_id', params.id)
      .gte('endDate', nowISO)
      .lte('endDate', twentyFourHoursLaterISO);

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

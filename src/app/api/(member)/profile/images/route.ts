import supabase from '@/utils/supabase/client';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.url) {
    return new Response(JSON.stringify({ error: 'URL이 필요합니다.' }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from('images')
    .insert({ url: body.url })
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

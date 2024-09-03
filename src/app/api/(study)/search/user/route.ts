import { NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export async function POST(request: Request) {
  try {
    const { filter, tags } = await request.json();

    if (!filter || !tags || tags.length === 0) {
      return NextResponse.json({ users: [] }, { status: 400 });
    }

    let query = supabase.from('user').select('*'); // 기본 쿼리

    // 필터 조건을 배열에 저장
    const conditions: any[] = [];

    if (filter === '직무') {
      conditions.push({ column: 'job', operator: 'in', value: tags });
    } else if (filter === '스터디 목적') {
      conditions.push({ column: 'purpose', operator: 'cs', value: tags });
    } else if (filter === '작업 스타일') {
      conditions.push({ column: 'personality', operator: 'cs', value: tags });
    } else if (filter === '스터디 기간') {
      conditions.push({
        column: 'expected_study_span',
        operator: 'in',
        value: tags,
      });
    }

    // 조건을 모두 적용
    for (const condition of conditions) {
      if (condition.operator === 'in') {
        query = query.in(condition.column, condition.value);
      } else if (condition.operator === 'cs') {
        query = query.contains(condition.column, condition.value);
      }
    }

    const { data: users, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error('서버에서 사용자 검색 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

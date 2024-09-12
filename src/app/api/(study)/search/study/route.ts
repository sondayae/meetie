import supabase from '@/utils/supabase/client';
import { differenceInMonths } from 'date-fns';

export async function POST(request: Request) {
  try {
    const { filters } = await request.json();

    let query = supabase.from('study').select('*');

    // 직무 필터 적용
    if (filters.roles) {
      const rolesArray = Array.isArray(filters.roles)
        ? filters.roles
        : [filters.roles];
      query = query.contains('roles', rolesArray);
    }

    // 스터디 기간 필터 적용
    if (filters.studySpan) {
      const { data: studies, error } = await query;

      if (error) {
        throw error;
      }

      const filteredStudies = studies.filter((user) => {
        const startDate = new Date(user.startDate);
        const endDate = new Date(user.endDate);
        const studyDurationInMonths = differenceInMonths(endDate, startDate);

        switch (filters.studySpan) {
          case '1개월 이내':
            return studyDurationInMonths <= 1;
          case '1개월~3개월':
            return studyDurationInMonths > 1 && studyDurationInMonths <= 3;
          case '3개월~6개월':
            return studyDurationInMonths > 3 && studyDurationInMonths <= 6;
          case '6개월 이상':
            return studyDurationInMonths > 6;
          default:
            return true;
        }
      });

      return Response.json({ studies: filteredStudies });
    }

    // 스터디 목적 필터 적용
    if (filters.purposes?.length > 0) {
      query = query.contains('purposes', filters.purposes);
    }

    // 모집 인원 필터 적용
    if (filters.recruitNum?.length > 0) {
      const recruitNum = filters.recruitNum as string;
      const ranges: Record<string, [number, number]> = {
        '1-2명': [1, 2],
        '3-5명': [3, 5],
        '6-10명': [6, 10],
        '11-15명': [11, 15],
        '16-20명': [16, 20],
      };

      const selectedRange = ranges[recruitNum];

      if (selectedRange) {
        query = query
          // 크거나 같은 조건으로 필터링
          .gte('recruitNum', selectedRange[0])
          // 작거나 같은 조건으로 필터링
          .lte('recruitNum', selectedRange[1]);
      }
    }

    // 쿼리 실행
    const { data: studies, error } = await query;

    if (error) {
      throw error;
    }

    return Response.json({ studies });
  } catch (error) {
    console.error('서버에서 스터디 검색 중 오류 발생:', error);
    return Response.json({ error: '서버 오류' }, { status: 500 });
  }
}

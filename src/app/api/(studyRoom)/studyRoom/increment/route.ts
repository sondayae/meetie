import { incrementViewCount } from '@/actions/studyroom/incremetView.action';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { studyId } = await req.json();

    if (!studyId) {
      return NextResponse.json(
        { error: 'studyId가 필요합니다.' },
        { status: 400 },
      );
    }

    const { data, viewCount, error } = await incrementViewCount(studyId);

    if (error) {
      return NextResponse.json(
        { error: '뷰 카운트를 증가하는 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: '뷰 카운트가 증가되었습니다.',
      viewCount,
    });
  } catch (err) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

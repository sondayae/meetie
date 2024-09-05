const DUMMY = [
  {
    category: '업데이트',
    subcategory: '시스템',
    content: '시스템 정기 점검이 9월 15일 오전 2시에 예정되어 있습니다.',
  },
  {
    category: '업데이트',
    subcategory: '기능 추가',
    content: '새로운 파일 업로드 기능이 추가되었습니다. 사용법을 참고하세요.',
  },
  {
    category: '안내',
    subcategory: '이벤트',
    content:
      '가을 맞이 할인 이벤트가 시작되었습니다. 자세한 내용은 이벤트 페이지를 확인하세요.',
  },
  {
    category: '안내',
    subcategory: '보안',
    content: '계정 보안 강화를 위해 2단계 인증을 설정해 주세요.',
  },
  {
    category: '공지',
    subcategory: '정책 변경',
    content:
      '이용약관이 10월 1일부로 변경됩니다. 변경 내용을 반드시 확인하세요.',
  },
  {
    category: '공지',
    subcategory: '운영',
    content:
      '추석 연휴 동안 고객 센터 운영 시간이 변경됩니다. 참고 부탁드립니다.',
  },
  {
    category: '알림',
    subcategory: '회원 등급',
    content: 'VIP 회원 전용 혜택이 새롭게 추가되었습니다.',
  },
  {
    category: '알림',
    subcategory: '서비스 장애',
    content:
      '일부 서비스에서 접속 장애가 발생하여 복구 중입니다. 불편을 드려 죄송합니다.',
  },
  {
    category: '공지',
    subcategory: '점검 안내',
    content:
      '금일 오후 8시부터 서버 점검이 진행될 예정입니다. 이용에 참고 바랍니다.',
  },
  {
    category: '업데이트',
    subcategory: '버그 수정',
    content:
      '최근 보고된 오류가 수정되었습니다. 업데이트를 통해 개선된 내용을 확인해 주세요.',
  },
];

export default function page() {
  return (
    <>
      <div className="mb-5 flex flex-1 flex-col gap-5 px-4">
        {/* 1 */}
        <div className="flex h-12 flex-col items-start justify-start gap-2">
          <p className="text-lg font-bold text-dark-gray">
            📣 공지사항이 있습니다!
          </p>
          <p className="text-sm font-normal text-gray-purple">
            아래 내용을 확인해 주세요.
          </p>
        </div>
        {/* 2 */}
        <div className="flex h-14 w-full items-center rounded-md border border-light-purple bg-light-purple px-4 py-3">
          <p className="text-dark-gray">⚠️ 채팅 활동 주의사항을 확인하세요</p>
        </div>
        {/* 3 */}
        {DUMMY.map((item) => (
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-neutral-100 bg-neutral-100 px-4 py-3">
            <div className="flex w-full items-center justify-start gap-3">
              <div className="flex-2 flex w-16 text-sm font-medium text-dark-gray">
                {item.category}
              </div>
              <div className="h-5 w-px rounded-lg bg-[#7875e3]" />
              <div className="w-full flex-col items-start justify-start gap-0.5">
                <div className="self-stretch font-['Pretendard'] text-sm font-bold text-[#434343]">
                  {item.subcategory}
                </div>
                <div className="self-stretch font-['Pretendard'] text-xs font-normal text-[#81819b]">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

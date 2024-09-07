const DUMMY = [
  {
    question: '배송 기간은 얼마나 걸리나요?',
    answer: '평균적으로 주문 후 3-5일 이내에 배송됩니다.',
  },
  {
    question: '환불 정책은 어떻게 되나요?',
    answer: '제품 수령 후 14일 이내에 환불 요청이 가능합니다.',
  },
  {
    question: '해외 배송이 가능한가요?',
    answer: '네, 전 세계로 배송 가능합니다.',
  },
  {
    question: '회원 가입 없이도 주문이 가능한가요?',
    answer: '네, 비회원으로도 주문이 가능합니다.',
  },
  {
    question: '주문을 취소하고 싶어요. 어떻게 해야 하나요?',
    answer: '주문 내역에서 취소 요청을 하거나 고객센터에 문의해주세요.',
  },
  {
    question: '제품에 문제가 있습니다. 교환이 가능한가요?',
    answer: '네, 제품 수령 후 7일 이내에 교환 요청이 가능합니다.',
  },
  {
    question: '결제 방법에는 어떤 것이 있나요?',
    answer: '신용카드, 페이팔, 은행 송금 등 다양한 결제 방법을 지원합니다.',
  },
  {
    question: '회원 할인 혜택은 어떻게 받을 수 있나요?',
    answer: '회원 가입 후 첫 주문 시 자동으로 할인 혜택이 적용됩니다.',
  },
  {
    question: '내 계정을 어떻게 관리할 수 있나요?',
    answer:
      "로그인 후 '내 계정' 페이지에서 개인 정보를 수정하거나 비밀번호를 변경할 수 있습니다.",
  },
  {
    question: '구매 영수증은 어디서 확인할 수 있나요?',
    answer:
      "주문 완료 후 이메일로 영수증이 발송되며, '내 주문' 페이지에서도 확인 가능합니다.",
  },
];

export default function page() {
  return (
    <>
      <div className="mb-5 flex flex-1 flex-col gap-5 px-4">
        {/* 1 */}
        <div className="flex h-12 flex-col items-start justify-start gap-2">
          <p className="text-lg font-bold text-dark-gray">❓ 자주 묻는 질문</p>
          <p className="text-sm font-normal text-muted-foreground">
            아래에서 자주 묻는 질문과 답변을 확인하세요.
          </p>
        </div>
        {/* 2 */}

        {/* 3 */}
        {DUMMY.map((item) => (
          <div className="w-full rounded-lg border border-light-gray bg-muted px-4 py-3">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-normal text-dark-gray">
                {item.question}
              </div>
              <div className="text-sm font-normal text-dark-gray">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

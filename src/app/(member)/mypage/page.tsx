import Link from 'next/link';

function MyPage() {
  return (
    <>
      <div>MyPage</div>
      <ul>
        <li>
          <Link href="/mypage/editProfile">회원 정보 수정</Link>
        </li>
      </ul>
    </>
  );
}
export default MyPage;

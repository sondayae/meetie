'use client';
import { useUser } from '@/stores/user/user';
import { use, useState } from 'react';

export default function deleteUser() {
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  console.log(user);

  const deleteUser = async () => {
    const userId = await user?.id; // 실제 유저 ID를 여기에 설정해야 합니다.

    const response = await fetch('/api/deleteUser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('회원 탈퇴가 완료되었습니다.');
    } else {
      console.log(data.error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>회원 탈퇴</h1>
      <button onClick={deleteUser} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete User'}
      </button>
    </div>
  );
}

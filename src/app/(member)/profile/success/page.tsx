'use client';
import { useEffect, useState } from 'react';

import { getSpecificColumns } from './actions';

export default function ProfileSuccess() {
  const [profileData, setProfileData] = useState<any>(null); // 상태를 선언하여 데이터를 저장

  const userId = ''; // 하드코딩된 userId를 사용, 실제로는 다이나믹하게 설정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpecificColumns(userId);
        setProfileData(data); // 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData(); // 데이터 가져오기
  }, [userId]);

  return (
    <>
      <h1>ProfileSuccess</h1>
      <div>
        <h2>User Profile</h2>

        <p>
          <strong>Job:</strong> {profileData.job}
        </p>
        <p>
          <strong>Purpose:</strong>
          {/* purpose가 배열일 경우 각 요소를 나열 */}
          {Array.isArray(profileData.purpose) ? (
            <ul>
              {profileData.purpose.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <span>{profileData.purpose}</span>
          )}
        </p>
      </div>
    </>
  );
}

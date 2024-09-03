'use client';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { getSpecificColumns } from '../read/[userId]/actions';
import { useUser } from '@nextui-org/react';

export default function ProfileEditPage() {
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null); // 상태를 선언하여 데이터를 저장

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user data:', error);
      } else {
        const { user } = data;
        setUserData(user);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id) {
        console.log('userData.id:', userData.id);
        try {
          const data = await getSpecificColumns(userData.id);
          if (data) {
            setProfileData(data); // 데이터를 상태에 저장
            console.log('profileData:', data);
          } else {
            console.error('No profile data found for the given userId');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchData(); // 데이터 가져오기
  }, [userData]);

  return (
    <>
      <h1>ProfileEditPage </h1>
      {userData ? (
        <pre>{JSON.stringify(userData.id, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

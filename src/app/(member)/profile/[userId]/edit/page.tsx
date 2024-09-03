'use client';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
// import { getSpecificColumns } from '../read/[userId]/actions';
import { useUser } from '@nextui-org/react';
// import { getProfile } from '@/utils/member/profile';

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
    const fetchProfileData = async () => {
      if (userData?.id) {
        try {
          // const profileData = await getProfile(userData.id);
          const data = await supabase
            .from('user')
            .select('*')
            .eq('id', userData.id);
          // .single();
          const { data: profileData, error } = data;
          console.log('profileData:', profileData);
          setProfileData(profileData); // 사용자 ID를 전달하여 프로필 데이터를 가져옴
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, [userData]);

  return (
    <>
      <h1>ProfileEditPage </h1>
      {userData ? (
        <>
          <pre>
            {' '}
            현재 로그인 사용자 : {JSON.stringify(userData.id, null, 2)}
          </pre>
          <pre>
            {' '}
            현재 로그인 사용자 데이터 : {JSON.stringify(profileData, null, 2)}
          </pre>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

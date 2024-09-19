'use client';
import EditAccountForm from '@/components/mypage/EditAccountForm';
import { useUser } from '@/stores/user/user';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function ProfileEditPage() {
  const { user } = useUser();
  const [accountData, setAccountData] = useState<FormData>({
    email: user?.email || '',
    password: '',
    passwordConfirm: '',
  });

  const {
    register,
    formState: { errors, isDirty, isValid },
    reset,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: accountData,
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchEmail = () => {
      if (user) {
        const email = user.email || '';
        const newAccountData: FormData = {
          email: '',
          password: '',
          passwordConfirm: '',
        };
        setAccountData(newAccountData);
        reset(newAccountData);
      }
    };

    fetchEmail();
  }, [user]);

  return (
    <>
      {user ? (
        <EditAccountForm
          accountData={accountData}
          register={register}
          user={user}
          errors={errors}
          isValid={isValid}
          isDirty={isDirty}
          handleSubmit={handleSubmit}
          watch={watch}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

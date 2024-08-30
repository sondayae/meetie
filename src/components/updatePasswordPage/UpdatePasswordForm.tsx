'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import ErrorMessage from '@/components/form/ErrorMessage';
import Input from '@/components/form/Input';
import updatePassword from '@/components/updatePasswordPage/actions/updatePassword';
import { passwordPattern } from '@/constants/validationPatterns';
import { UpdatePasswordFormData } from '@/types/auth';

interface UpdatePasswordFormProps {
  searchParams?: { [key: string]: string };
}

export default function UpdatePasswordForm({
  searchParams,
}: UpdatePasswordFormProps) {
  const {
    register,
    watch,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({ mode: 'onBlur' });

  const router = useRouter();

  const onSubmit: SubmitHandler<UpdatePasswordFormData> = async (formData) => {
    const result = await updatePassword(formData, searchParams);
    if (result.success) {
      router.replace('/login');
    } else {
      alert(result.error);
    }
  };

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input<UpdatePasswordFormData>
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          label="비밀번호"
          errors={errors}
          register={register}
          rules={{
            required: '새 비밀번호를 입력해주세요.',
            pattern: passwordPattern,
          }}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div>
        <Input<UpdatePasswordFormData>
          id="passwordCheck"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          label="비밀번호 확인"
          errors={errors}
          register={register}
          rules={{
            required: '비밀번호를 입력해주세요.',
            validate: (value) =>
              value === watch('password') ||
              '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
          }}
        />
        {errors.passwordCheck && (
          <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
        )}
      </div>

      <div className="mt-5 flex justify-center">
        <Button label="비밀번호 변경" type="primary" size="large" />
      </div>
    </form>
  );
}

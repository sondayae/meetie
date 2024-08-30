'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import findPassword from '@/components/findPasswordPage/actions/findPassword';
import ErrorMessage from '@/components/form/ErrorMessage';
import Input from '@/components/form/Input';
import { emailPattern } from '@/constants/validationPatterns';
import { FindPasswordFormData } from '@/types/auth';

export default function FindPasswordForm() {
  const {
    register,
    setFocus,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormData>({ mode: 'onBlur' });

  const router = useRouter();

  const onSubmit: SubmitHandler<FindPasswordFormData> = async (formData) => {
    try {
      const result = await findPassword(formData);
      if (!result.success) {
        setError('email', {
          type: result.type,
          message: result.message,
        });
      } else {
        alert(
          '위 이메일로 비밀번호 설정 메일이 발송되었습니다. 메일이 확인되지 않을 경우, 스팸함을 확인해 주세요.',
        );
        router.replace('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input<FindPasswordFormData>
          id="email"
          name="email"
          type="email"
          placeholder="이메일"
          errors={errors}
          register={register}
          rules={{
            required: '이메일을 입력해주세요.',
            pattern: emailPattern,
          }}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="mt-5 flex justify-center">
        <Button label="변경 링크 전송하기" type="primary" size="large" />
      </div>
    </form>
  );
}

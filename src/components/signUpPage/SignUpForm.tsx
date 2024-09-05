'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { postSignUp } from '@/apis/auth';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/form/ErrorMessage';
import Input from '@/components/form/Input';
import ROUTE_PATH from '@/constants/route';
import { emailPattern, passwordPattern } from '@/constants/validationPatterns';
import { SignUpFormData } from '@/types/auth';

export default function SignUpForm() {
  const {
    register,
    watch,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ mode: 'onBlur' });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormData> = async (formData) => {
    try {
      await postSignUp(formData);
      router.replace('/login');
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
    <form
      className="flex flex-col gap-3 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input<SignUpFormData>
          id="email"
          name="email"
          type="email"
          placeholder="이메일"
          label="이메일 주소"
          errors={errors}
          register={register}
          rules={{
            required: emailPattern.message,
            pattern: emailPattern,
          }}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div>
        <Input<SignUpFormData>
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          label="비밀번호"
          errors={errors}
          register={register}
          rules={{
            required: passwordPattern.message,
            pattern: passwordPattern,
          }}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div>
        <Input<SignUpFormData>
          id="passwordCheck"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          label="비밀번호 확인"
          errors={errors}
          register={register}
          rules={{
            required: passwordPattern.message,
            validate: (value) =>
              value === watch('password') ||
              '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
          }}
        />
        {errors.passwordCheck && (
          <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
        )}
      </div>

      <div>
        <Input<SignUpFormData>
          id="name"
          name="name"
          type="text"
          placeholder="이름"
          label="이름"
          errors={errors}
          register={register}
          rules={{
            required: '이름을 입력해주세요.',
          }}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="mt-6 flex flex-col items-center">
        <Button label="계정 만들기" type="primary" size="large" />
        <Link
          className="after:contents-[''] relative mt-6 px-2 py-1 text-sm font-medium text-dark-gray after:absolute after:bottom-1 after:left-2 after:right-2 after:h-px after:bg-dark-gray"
          href={ROUTE_PATH.AUTH.LOGIN}
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </form>
  );
}

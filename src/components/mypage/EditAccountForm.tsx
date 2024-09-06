// components/mypage/EditAccountForm.tsx
import React, { useState } from 'react';
import {
  useForm,
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
} from 'react-hook-form';
import ErrorMessage from '@/components/form/ErrorMessage';
import { emailPattern, passwordPattern } from '@/constants/validationPatterns';
import { FormData } from '@/app/(member)/mypage/editAccount/page';
import StudyButton from '../common/StudyButton';
import InputField from '../common/InputField';
import EmailIcon from '../icons/EmailIcon';
import PasswordIcon from '../icons/PasswordIcon';

type EditAccountFormProps = {
  user: any;
  accountData: FormData;
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
  isValid: boolean;
  isDirty: boolean;
  handleSubmit: any;
  watch: any;
};

export default function EditAccountForm({
  user,
  register,
  accountData,
  errors,
  isValid,
  isDirty,
  handleSubmit,
  watch,
}: EditAccountFormProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('email'); // 탭 상태

  const watchPassword = watch('password');
  const watchPasswordConfirm = watch('passwordConfirm');

  const handleFormSubmit = (data: FormData) => {
    const endpoint =
      activeTab === 'email' ? '/api/editAccount' : '/api/changePassword';
    const body = JSON.stringify(
      activeTab === 'email'
        ? { newEmail: data.email }
        : { newPassword: data.password },
    );

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
      .then((response) => {
        if (response.ok) {
          alert(
            activeTab === 'email'
              ? '이메일 변경 링크가 전송되었습니다. 새 이메일을 확인해주세요.'
              : '비밀번호가 변경되었습니다.',
          );
        } else {
          alert('요청 처리 중 오류가 발생했습니다.');
        }
      })
      .catch((err) => {
        console.error('서버와의 통신 중 오류:', err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="mx-4 flex-1">
      {user?.email}
      <form className="py-10" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-8">
          <h3 className="mb-1 flex flex-col gap-2 text-2xl font-semibold">
            {activeTab === 'email' ? (
              <EmailIcon className="h-7 w-7 stroke-[#777777]" />
            ) : (
              <PasswordIcon className="h-7 w-7 stroke-[#777777]" />
            )}

            {activeTab === 'email' ? '이메일 변경' : '비밀번호 변경'}
          </h3>
          <p className="text-sm text-[#999999]">
            {activeTab === 'email'
              ? '변경할 이메일을 입력해주세요'
              : '변경할 비밀번호를 입력해주세요'}{' '}
          </p>
        </div>
        <InputField
          id={activeTab === 'email' ? 'email' : 'password'}
          label={activeTab === 'email' ? '이메일' : '비밀번호'}
          type={activeTab === 'email' ? 'email' : 'password'}
          placeholder={activeTab === 'email' ? '이메일' : '비밀번호'}
          register={register}
          validation={{
            required:
              activeTab === 'email'
                ? '이메일을 입력해주세요.'
                : '비밀번호를 입력해주세요.',
            pattern: activeTab === 'email' ? emailPattern : passwordPattern,
          }}
          errors={errors}
          defaultValue={user?.email}
        />
        {activeTab === 'password' && (
          <InputField
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            register={register}
            validation={{
              required: '비밀번호를 입력해주세요.',
              validate: (value) =>
                value === watchPassword ||
                '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
            }}
            errors={errors}
          />
        )}
        <div className="fixed bottom-0 w-full max-w-[600px] bg-white px-4 py-3 shadow-lg">
          <StudyButton
            disabled={!isDirty || !isValid}
            style={!isDirty || !isValid ? 'disabled' : 'primary'}
            label={activeTab === 'email' ? '이메일 변경' : '비밀번호 변경'}
            size="large"
            type="submit"
          />
        </div>
        <div className="text-right">
          {activeTab === 'password' ? (
            <button
              className="margin-auto border-b text-sm text-[#999999]"
              onClick={() => setActiveTab('email')}
            >
              이메일 변경
            </button>
          ) : (
            <button
              className="border-b text-sm text-[#999999]"
              onClick={() => setActiveTab('password')}
            >
              비밀번호 변경
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

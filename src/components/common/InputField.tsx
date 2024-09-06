import React from 'react';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import ErrorMessage from '@/components/form/ErrorMessage';
import { FormData } from '@/app/(member)/mypage/editAccount/page';

type InputFieldProps = {
  id: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FormData>;
  validation: RegisterOptions<FormData>;
  errors?: FieldErrors<FormData>;
  defaultValue?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  register,
  validation,
  errors,
  defaultValue,
}) => (
  <div className="mb-9 mt-[10px]">
    <label htmlFor={id} className="font-semibold leading-6 text-[#000417]">
      {label}
    </label>
    <div
      className={`flex items-center overflow-hidden rounded-lg border ${
        errors && errors[id]
          ? 'border-red-400'
          : 'border-[#e9e9e9] focus-within:border-main-purple'
      } tab mt-[10px]`}
    >
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full flex-initial border-none bg-[#fcfcfc] px-4 py-[14px] placeholder:text-gray-purple focus:outline-none"
        defaultValue={defaultValue}
        {...register(id, validation)}
      />
    </div>
    {errors && errors[id] && <ErrorMessage>{errors[id]?.message}</ErrorMessage>}
  </div>
);

export default InputField;

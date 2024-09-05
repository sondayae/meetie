import { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps<T extends FieldValues>
  extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  children?: ReactNode;
  background?: 'white' | 'gray';
  name: Path<T>;
  register: UseFormRegister<T>;
  rules: RegisterOptions<T, Path<T>>;
  errors: FieldErrors<T>;
  as?: 'input' | 'textarea';
}

export default function Input<T extends FieldValues>({
  id,
  name,
  type,
  label,
  children,
  background = 'white',
  placeholder,
  register,
  rules,
  errors,
  as = 'input',
}: InputProps<T>) {
  const hasError = !!errors[name];
  const Comp = as === 'input' ? 'input' : 'textarea';

  return (
    <div className="mt-5 flex flex-col gap-2">
      {label && (
        <label className="font-semibold leading-6 text-[#000417]" htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={`flex items-center overflow-hidden rounded-lg border ${background === 'white' ? 'bg-white' : 'bg-[#F9F9F9]'} ${hasError ? 'border-red-400' : 'border-[#e9e9e9] focus-within:border-main-purple hover:border-sub-purple'} tab`}
      >
        <Comp
          className={`w-full flex-initial border-none px-4 py-[14px] placeholder:text-gray-purple focus:outline-none ${background === 'white' ? 'bg-white' : 'bg-[#F9F9F9]'}`}
          id={id}
          type={as === 'input' ? type : undefined}
          placeholder={placeholder}
          {...register(name, rules)}
          rows={as === 'textarea' ? 4 : undefined}
        />
        {children}
      </div>
    </div>
  );
}

import React from 'react';
import './input.css';

export interface InputProps {
  id: string;
  name: string;
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  maxLength?: number;
  placeholder?: string;
  type?: string;
  defaultValue?: number | string;
  value?: any;
  inputStyle?: boolean;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
}

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  primary = false,
  size = 'medium',
  placeholder,
  ...props
}: InputProps) => {
  let mode = primary
    ? 'storybook-input--primary'
    : 'storybook-input--secondary';
  if (props.name === 'tags') mode = 'storybook-input--hashtag';
  return (
    <>
      <input
        type={props.type ? props.type : 'text'}
        placeholder={placeholder}
        className={['storybook-input', `storybook-input--${size}`, mode].join(
          ' ',
        )}
        {...props}
        maxLength={props.maxLength}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
    </>
  );
};

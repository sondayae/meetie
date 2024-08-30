import { EMAIL_REG, PASSWORD_REG } from '@/constants/regexPatterns';

export const emailPattern = {
  value: EMAIL_REG,
  message: '올바른 메일 형식으로 입력해주세요.',
};
export const passwordPattern = {
  value: PASSWORD_REG,
  message: '최소 8자의 영문, 숫자, 특수문자를 입력해주세요.',
};

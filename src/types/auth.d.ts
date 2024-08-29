export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
}

export interface FindPasswordFormData {
  email: string;
}

import { LoginFormData, SignUpFormData } from '@/types/auth';

export const postLogin = async (formData: LoginFormData) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  } else {
    const {
      data: { user },
    } = await response.json();

    return user;
  }
};

export const postSignUp = async (formData: SignUpFormData) => {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  } else {
    const {
      data: { user },
    } = await response.json();

    return user;
  }
};

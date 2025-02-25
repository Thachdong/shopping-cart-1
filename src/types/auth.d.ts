type TLoginForm = {
  emailOrPhone: string;
  password: string;
};

type TRegister = {
  username: string;
  phoneNumber: string;
  password: string;
  email?: string;
  birthday?: string;
};

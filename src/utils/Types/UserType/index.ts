export type TRegister = {
  email: string;
  username: string;
  password: string;
  role: string;
};

export type TUser = {
  id: string;
  email: string;
  username: string;
  password?: string;
  role: string;
};

export type TLogin = {
  emailORusername: string;
  password: string;
};

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  lastName: string;
  image: string;
  active?: boolean;
  token?: string;
  username: string;
  bio?: string;
}

export interface IRegisterUser {
  email: string;
  first_name: string;
  password: string;
  image: string;
}

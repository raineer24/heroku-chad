export interface ILoginUser {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  active?: boolean;
  token?: string;

  bio?: string;
}

export interface UserRegistration {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface ResultRegistration<T> {
  result: boolean;
  message: string;
  user: T;
}

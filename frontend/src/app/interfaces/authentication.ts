export interface Authentication {
  email: string;
  password: string;
}

export interface User {
  id: number;
  role: 'user' | 'restaurant';
}

export interface Result<T> {
  result: boolean;
  message: string;
  user: T;
}

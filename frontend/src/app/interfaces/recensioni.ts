export interface Recensione {
  id_restaurant: number;
  name_restaurant: string;
  id_user: number;
  name_user: string;
  date: string;
  score: number;
  description: string;
}

export interface ResultRecensione<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface Indirizzo {
  id: number;
  city: string;
  street: string;
  street_number: string;
  state: string;
  zip_code: string;
}

export interface ResultAddress<T> {
  result: boolean;
  message: string;
  data: T;
}

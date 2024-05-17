export interface Ristorante {
  id: number;
  email: string;
  name: string;
  owner_name: string;
  owner_surname: string;
  id_address: number;
  seats: number;
  website: string;
  price_tier: number;
  description: string;
  phone: string;
  childrenn_seats: number;
  accessibility: boolean;
  logo: string;
  banner_image: string;
}

export interface ResultRestaurants<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface ResultRestaurants<T> {
  result: boolean;
  message: string;
  data: T;
}

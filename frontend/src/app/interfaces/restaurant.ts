export interface RestaurantCreate {
  createRestaurantDto: Restaurant;
  createAddressDto: Address;
  banner_image: File;
  logo: File;
}

export interface Restaurant {
  email: string;
  password: string;
  name: string;
  owner_name: string;
  owner_surname: string;
  seats: number;
  price_tier: number;
  description: string;
  phone: string;
}

export interface Address {
  city: string;
  street: string;
  street_number: string;
  state: string;
  zip_code: string;
}

export interface OpeningHoursCreate {
  id_day: number;
  opening_time: string;
  closing_time: string;
}

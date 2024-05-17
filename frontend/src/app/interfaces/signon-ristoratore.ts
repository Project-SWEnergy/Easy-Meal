export interface SignonRistoratore {
  email: string;
  password: string;
  name: string;
  owner_name: string;
  owner_surname: string;
  seats: number;
  price_tier: number;
  description: string;
  phone: string;
  id_address: number;
}

export interface SignonRistoratoreAddress {
  city: string;
  street: string;
  street_number: string;
  state: string;
  zip_code: string;
}

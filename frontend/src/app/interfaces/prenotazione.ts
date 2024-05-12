export interface Prenotazione {
  restaurantId: number;
  date: string;
  partecipants: number;
  reservation_state: string;
  bill_splitting_method: string;
}

export interface ResultPrenotazione<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface InvitoPrenotazione {
  email_users: string[];
  id_reservation: number;
}

export interface PrenotazioneData {
  id: number;
  id_restaurant: number;
  date: string;
  partecipants: number;
  reservation_state: string;
  bill_splitting_method: string;
  paid_orders: number;
}

export interface FindPrenotazioni {
  id_user: number;
  name_user: string;
  surname_user: string;
  id_reservation: number;
  id_restaurant: number;
  name_restaurant: string;
  date: string;
  partecipants: number;
  state: string;
  bill_splitting_method: string;
  accepted: boolean;
}

export interface FindPrenotazionResult<T> {
  result: boolean;
  message: string;
  data: T;
}

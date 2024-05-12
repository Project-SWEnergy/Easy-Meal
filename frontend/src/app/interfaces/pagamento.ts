export interface Prenotazioni {
  id: number;
  id_restaurant: number;
  date: string;
  partecipants: number;
  reservation_state: string;
  bill_splitting_method: string;
  paid_orders: number;
}

export interface ResultPrenotazioni<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface PrenotazioneBill {
  id_reservation: number;
  total_bill: string;
}

export interface ResultPrenotazioneBill<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface UserBill {
  id_reservation: number;
  id_user: number;
  total_bill: string;
}

export interface ResultPrenotazioneBill<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface PagamentoIndividuale {
  id_user: number;
  id_reservation: number;
  date: string;
  total_bill: number;
  bill_state: string;
  id_ordered_dishes: number[];
}

export interface PagamentoEquidiviso {
  id_user: number;
  id_reservation: number;
  date: string;
  total_bill: number;
  bill_state: string;
}

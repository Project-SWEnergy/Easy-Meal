export interface Reservation {
  id: number;
  id_restaurant: number;
  date: string;
  partecipants: number;
  reservation_state: ReservationState;
  bill_splitting_method: BillSplittingMethod;
  paid_orders: number;
}

export interface ReservationUpdate {
  partecipants: number;
  reservation_state: ReservationState;
  bill_splitting_method: BillSplittingMethod;
}

export enum ReservationState {
  InAttesa = 'In attesa',
  Approvata = 'Approvata',
  Rifiutata = 'Rifiutata',
  Annullata = 'Annullata',
  InCorso = 'In corso',
  Pagamento = 'Pagamento',
  Concluso = 'Conclusa',
}

export enum BillSplittingMethod {
  Individuale = 'Individuale',
  Equidiviso = 'Equidiviso',
}

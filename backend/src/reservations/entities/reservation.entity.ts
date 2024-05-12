export enum ReservationState{
    InAttesa = 'In attesa',
    Approvata = 'Approvata',
    Rifiutata = 'Rifiutata',
    Annullata = 'Annullata',
    InCorso = 'In corso',
    Pagamento = 'Pagamento',
    Concluso = 'Conclusa'
}

export enum BillSplittingMethod{
    Individuale = "Individuale",
    Equidiviso = "Equidiviso",
}

/**
 * @param reservationId number: id del ristorante
 * @param restaurantId number: id del ristorante
 * @param date Date: timestamp con timezone della prenotazione
 * @param partecipants number: numero di partecipanti
 * @param reservationState string: stato della prenotazione
 * @param billSplittingMethod string: metodo di pagamento (opzionale) 
 * @param paidOrder number: numero di partecipanti che hanno pagato il conto
 */
export class Reservation {
    reservationId: number;
    restaurantId: number;
    date: Date;
    partecipants: number;
    reservationState: ReservationState;
    billSplittingMethod: BillSplittingMethod;
    paidOrder: number;
}

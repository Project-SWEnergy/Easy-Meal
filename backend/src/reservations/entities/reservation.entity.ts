import { ApiProperty } from "@nestjs/swagger";

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
    @ApiProperty()
    reservationId: number;
    @ApiProperty()
    restaurantId: number;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    partecipants: number;
    @ApiProperty()
    reservationState: ReservationState;
    @ApiProperty()
    billSplittingMethod: BillSplittingMethod;
    @ApiProperty()
    paidOrder: number;
}

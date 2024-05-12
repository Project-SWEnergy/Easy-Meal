import { Reservation } from "../entities/reservation.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Reservation} data Reservation[ ]: oggetto coinvolto nell'operazione.
 */
export class ResultReservationsDto {
    result: boolean;
    message: string;
    data: any;
}
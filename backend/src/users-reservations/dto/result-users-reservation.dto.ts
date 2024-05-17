import { UsersReservation } from "../entities/users-reservation.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data UsersReservation[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultUsersReservationDto {
    result: boolean;
    message: string;
    data: UsersReservation[];
}
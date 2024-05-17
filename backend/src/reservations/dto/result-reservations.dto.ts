import { ApiProperty } from "@nestjs/swagger";
import { Reservation } from "../entities/reservation.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Reservation} data Reservation[ ]: oggetto coinvolto nell'operazione.
 */
export class ResultReservationsDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: any;
}
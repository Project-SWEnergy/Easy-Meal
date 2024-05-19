import { UsersReservation } from "../entities/users-reservation.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data UsersReservation[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultUsersReservationDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: UsersReservation[];
}
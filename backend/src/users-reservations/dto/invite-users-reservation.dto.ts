import { IsArray, IsInt, IsNotEmpty } from "class-validator";

/**
 * @param email_users string[ ]: email utenti
 * @param id_reservation number: id prenotazione
 */
export class InviteUsersReservationDto {
    @IsNotEmpty()
    @IsArray()
    email_users: string[];

    @IsNotEmpty()
    @IsInt()
    id_reservation: number;
}

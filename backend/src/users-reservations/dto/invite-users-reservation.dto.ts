import { IsArray, IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param email_users string[ ]: email utenti
 * @param id_reservation number: id prenotazione
 */
export class InviteUsersReservationDto {
    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    email_users: string[];

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_reservation: number;
}

import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

/**
 * @param id_user number?: id utente
 * @param id_reservation number: id prenotazione
 * @param accepted boolean?: invito accettato dall'utente
 */
export class CreateUsersReservationDto {
    @IsOptional()
    @IsInt()
    id_user: number;

    @IsNotEmpty()
    @IsInt()
    id_reservation: number;

    @IsOptional()
    @IsBoolean()
    accepted?: boolean;
}

import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_user number?: id utente
 * @param id_reservation number: id prenotazione
 * @param accepted boolean?: invito accettato dall'utente
 */
export class CreateUsersReservationDto {
    @IsOptional()
    @IsInt()
    @ApiProperty()
    id_user: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_reservation: number;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    accepted?: boolean;
}

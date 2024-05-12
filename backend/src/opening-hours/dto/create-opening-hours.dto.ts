import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

/**
 * @param id_restaurant  number: identificativo del ristorante.
 * @param id_day number: identificativo del giorno.
 * @param opening_time string: orario di apertura.
 * @param closing_time string: orario di chiusura.
 */
export class CreateOpeningHoursDto {
    @IsInt()
    @IsOptional()
    id_restaurant: number

    @IsInt()
    @IsNotEmpty()
    id_day: number

    @IsString()
    @IsNotEmpty()
    opening_time: string
    
    @IsString()
    @IsNotEmpty()
    closing_time: string
}

import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_restaurant  number: identificativo del ristorante.
 * @param id_day number: identificativo del giorno.
 * @param opening_time string: orario di apertura.
 * @param closing_time string: orario di chiusura.
 */
export class CreateOpeningHoursDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    id_restaurant: number

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    id_day: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    opening_time: string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    closing_time: string
}

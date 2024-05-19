import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_user number?: id utente
 * @param id_reservation number: id prenotazione
 * @param id_dish number: id piatto
 * @param paid boolean: indica se il piatto è stato pagato
 * @param removed_ingredients number[ ]: identificativi degli ingredienti rimossi
 */
export class CreateOrderedDishDto {
    @IsOptional()
    @IsInt()
    @ApiProperty()
    id_user: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_reservation: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_dish: number;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    paid: boolean;

    @IsOptional()
    @ApiProperty()
    removed_ingredients: number[];
}

import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

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
    id_user: number;

    @IsNotEmpty()
    @IsInt()
    id_reservation: number;

    @IsNotEmpty()
    @IsInt()
    id_dish: number;

    @IsOptional()
    @IsBoolean()
    paid: boolean;

    @IsOptional()
    removed_ingredients: number[];
}

import { IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_dish number: id piatto
 * @param id_ingredient number: id ingrediente
 * @param quantity number?: quantità di ingrediente necessaria
 * @param units_of_measurement string?: unità di misura
 */
export class CreateDishesIngredientDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    id_dish: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    id_ingredient: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    quantity?: number;
}
